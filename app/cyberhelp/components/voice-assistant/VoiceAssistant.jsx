"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Send, Volume2, VolumeX, AlertTriangle, ShieldCheck, CheckCircle2, Bot } from 'lucide-react';
import { SUPPORTED_LANGUAGES, INCIDENT_CATEGORIES, MULTILINGUAL_PLAYBOOKS, classifyIntentFromText } from './voiceAssistantKnowledge.js';
import './VoiceAssistant.css';

export default function VoiceAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('en-US');
    const [detectedLang, setDetectedLang] = useState('en-US');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
    const [feedbackError, setFeedbackError] = useState('');
    
    const [sessionId] = useState(() => 'va_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6));
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [step, setStep] = useState('greeting'); // 'greeting', 'clarify', 'action', 'ended'
    const [incidentCategory, setIncidentCategory] = useState('general');
    const [summary, setSummary] = useState('');
    const [resolutionStatus, setResolutionStatus] = useState('in_progress');

    const [transcript, setTranscript] = useState([
        { sender: 'bot', text: MULTILINGUAL_PLAYBOOKS['en-US'].greeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    const recognitionRef = useRef(null);
    const transcriptEndRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    // Auto-scroll transcript
    useEffect(() => {
        if (transcriptEndRef.current) {
            transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [transcript, isOpen]);

    // Auto-open chatbot panel after 4 seconds on site landing
    useEffect(() => {
        const landingTimer = setTimeout(() => {
            setIsOpen(true);
            setTimerActive(true);
        }, 4000); // 4 seconds delay
        return () => clearTimeout(landingTimer);
    }, []);


    // Session Timer
    useEffect(() => {
        let interval;
        if (isOpen && timerActive && step !== 'ended') {
            interval = setInterval(() => {
                setSecondsElapsed(prev => {
                    if (prev >= 240 && step !== 'ended') { // 4 minutes limit reached
                        handleBotTurn("Session duration limit reached. Summarizing and closing session.", 'general', 'ended', 'resolved');
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOpen, timerActive, step]);

    // Sync session to backend cleanly when transcript updates
    useEffect(() => {
        if (transcript.length > 0) {
            saveSessionToBackend(transcript, incidentCategory, resolutionStatus);
        }
    }, [transcript, incidentCategory, resolutionStatus, selectedLang]);

    // Sync speech synthesis on language change or bot turns
    const speakText = (text, langCode) => {
        if (isMuted || !synthRef.current) return;
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langCode || selectedLang;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
    };

    const handleBotTurn = (text, category = incidentCategory, nextStep = step, resStatus = resolutionStatus) => {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newTurn = { sender: 'bot', text, time: timeStr };
        
        setTranscript(prev => [...prev, newTurn]);

        if (category) setIncidentCategory(category);
        if (nextStep) setStep(nextStep);
        if (resStatus) setResolutionStatus(resStatus);

        speakText(text, selectedLang);
    };

    const handleUserTurn = (text) => {
        if (!text.trim()) return;
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newTurn = { sender: 'user', text, time: timeStr };

        setTranscript(prev => [...prev, newTurn]);

        if (!timerActive) setTimerActive(true);
        setFeedbackError('');

        // Intent classification and conversation state machine
        const playbook = MULTILINGUAL_PLAYBOOKS[selectedLang] || MULTILINGUAL_PLAYBOOKS['en-US'];
        const classifiedCat = classifyIntentFromText(text);

        if (step === 'greeting') {
            setIncidentCategory(classifiedCat);
            setSummary(text);
            setStep('clarify');
            handleBotTurn(playbook.clarify, classifiedCat, 'clarify', 'in_progress');
        } else if (step === 'clarify') {
            const isEmergency = text.toLowerCase().includes('yes') || text.toLowerCase().includes('lost') || text.toLowerCase().includes('compromised') || text.toLowerCase().includes('हां') || text.toLowerCase().includes('होయ');
            const currentCat = incidentCategory === 'general' ? classifiedCat : incidentCategory;
            const catData = playbook.categories[currentCat] || playbook.categories['general'];

            let responseText = "";
            if (isEmergency) {
                responseText += playbook.emergencyWarning + "\n\n";
                responseText += playbook.evidenceNote + "\n\n";
            }
            responseText += `${catData.title}:\n` + catData.actions.map((act, i) => `${i + 1}. ${act}`).join("\n") + `\n\n${playbook.ending}`;

            handleBotTurn(responseText, currentCat, 'ended', 'resolved');
        } else {
            handleBotTurn(playbook.ending, incidentCategory, 'ended', 'resolved');
        }
    };

    // Speech Recognition Setup
    const toggleListening = () => {
        setFeedbackError('');
        if (isListening) {
            stopListening();
            return;
        }

        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) {
            setFeedbackError('Voice input is not supported in this browser. Please type your message below.');
            return;
        }

        try {
            recognitionRef.current = new SpeechRec();
            recognitionRef.current.lang = selectedLang;
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onstart = () => setIsListening(true);
            recognitionRef.current.onend = () => setIsListening(false);

            recognitionRef.current.onresult = (e) => {
                const speechToText = e.results[0][0].transcript;
                handleUserTurn(speechToText);
            };

            recognitionRef.current.onerror = (e) => {
                setIsListening(false);
                if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
                    setFeedbackError('Microphone permission denied. Please use the text input.');
                } else {
                    setFeedbackError('Voice recognition error. Please try again or type.');
                }
            };

            recognitionRef.current.start();
        } catch (err) {
            setIsListening(false);
            setFeedbackError('Failed to access microphone. Please type your message.');
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
    };

    const handleLanguageChange = (e) => {
        const code = e.target.value;
        setSelectedLang(code);
        setDetectedLang(code);
        
        const playbook = MULTILINGUAL_PLAYBOOKS[code] || MULTILINGUAL_PLAYBOOKS['en-US'];
        setTranscript([{ sender: 'bot', text: playbook.greeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        setStep('greeting');
        setSecondsElapsed(0);

        speakText(playbook.greeting, code);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!typedText.trim()) return;
        const txt = typedText;
        setTypedText('');
        handleUserTurn(txt);
    };

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Save session to backend
    const saveSessionToBackend = async (currentTranscript, cat, res) => {
        setSaveStatus('saving');
        try {
            const payload = {
                session_id: sessionId,
                selected_language: selectedLang,
                detected_language: detectedLang,
                incident_category: cat,
                summary: summary || 'Guided Session',
                resolution_status: res,
                transcript: currentTranscript
            };

            const backendUrl = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "http://localhost/Innvikta-Website/Cyberhelp_Innvikta/server";
            const resObj = await fetch(`${backendUrl}/api/save_voice_session.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (resObj.ok) {
                setSaveStatus('saved');
            } else {
                setSaveStatus('error');
            }
        } catch (err) {
            setSaveStatus('error');
        }
    };


    return (
        <div className="voice-assistant-container">
            {/* Launcher Button */}
            {!isOpen && (
                <button 
                    className={`va-launcher-btn ${!isListening ? 'va-pulse' : ''}`}
                    onClick={() => { setIsOpen(true); setTimerActive(true); }}
                    title="Open CyberHelp Voice Guide"
                >
                    <Bot size={32} />
                </button>
            )}

            {/* Assistant Panel */}
            {isOpen && (
                <div className="va-panel">
                    {/* Header */}
                    <div className="va-header">
                        <div className="va-header-title">
                            <ShieldCheck size={20} color="#3b82f6" />
                            <span>CyberHelp Voice Guide</span>
                        </div>
                        <div className="va-timer">{formatTime(secondsElapsed)}</div>
                        <button 
                            className="va-close-btn" 
                            onClick={() => { setIsOpen(false); stopListening(); }}
                            title="Minimize"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Language & Save Status Row */}
                    <div className="va-config-row">
                        <select className="va-lang-select" value={selectedLang} onChange={handleLanguageChange}>
                            {SUPPORTED_LANGUAGES.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.label} ({lang.native})
                                </option>
                            ))}
                        </select>
                        <span className={`va-status-badge va-status-${saveStatus}`}>
                            {saveStatus === 'saved' && 'Saved'}
                            {saveStatus === 'saving' && 'Saving...'}
                            {saveStatus === 'error' && 'Save Error'}
                        </span>
                    </div>

                    {/* Transcript Area */}
                    <div className="va-transcript-area">
                        {transcript.map((item, index) => (
                            <div key={index} className={`va-turn va-turn-${item.sender}`}>
                                <div style={{ whiteSpace: 'pre-line' }}>{item.text}</div>
                                <span className="va-turn-time">{item.time}</span>
                            </div>
                        ))}
                        {step === 'ended' && (
                            <div className="va-evidence-alert">
                                <CheckCircle2 size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                                Session recorded. Please preserve all evidence and file reports via national portals.
                            </div>
                        )}
                        <div ref={transcriptEndRef} />
                    </div>

                    {/* Feedback / Error Message */}
                    {feedbackError && (
                        <div className="va-feedback-msg">{feedbackError}</div>
                    )}

                    {/* Controls Footer */}
                    <div className="va-controls">
                        <div className="va-mic-row">
                            <button 
                                className={`va-mic-btn ${isListening ? 'va-mic-listening' : 'va-mic-idle'}`}
                                onClick={toggleListening}
                                title={isListening ? "Stop listening" : "Start speaking"}
                            >
                                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                            </button>

                            <div className="va-state-label">
                                {isListening ? (
                                    <div className="va-waveform">
                                        <span className="va-bar"></span>
                                        <span className="va-bar"></span>
                                        <span className="va-bar"></span>
                                        <span className="va-bar"></span>
                                        <span className="va-bar"></span>
                                    </div>
                                ) : isSpeaking ? (
                                    "Speaking..."
                                ) : (
                                    "Tap Mic to Speak"
                                )}
                            </div>

                            <button 
                                className="va-mic-btn"
                                style={{ background: isMuted ? '#64748b' : '#3b82f6', width: '48px', height: '48px' }}
                                onClick={() => {
                                    setIsMuted(!isMuted);
                                    if (synthRef.current) synthRef.current.cancel();
                                }}
                                title={isMuted ? "Unmute Bot" : "Mute Bot"}
                            >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                        </div>

                        {/* Typed Fallback Form */}
                        <form className="va-input-form" onSubmit={handleFormSubmit}>
                            <input 
                                type="text"
                                className="va-typed-input"
                                placeholder="Or type your response here..."
                                value={typedText}
                                onChange={(e) => setTypedText(e.target.value)}
                            />
                            <button type="submit" className="va-send-btn" title="Send">
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
