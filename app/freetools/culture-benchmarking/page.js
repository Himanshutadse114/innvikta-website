"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";

const CultureBenchmarkingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formData, setFormData] = useState({
    industry: "",
    orgSize: "",
    attitudes: "",
    behaviors: "",
    knowledge: "",
    communication: "",
    compliance: "",
    norms: "",
    ownership: ""
  });
  const [benchmarkResult, setBenchmarkResult] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      ).fromTo(
        ".hero-visual-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        ">-0.4"
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateBenchmark = () => {
    let score = 55;

    // Weight formulas for realism based on answers
    if (formData.attitudes === "high") score += 6;
    else if (formData.attitudes === "medium") score += 3;

    if (formData.behaviors === "high") score += 12;
    else if (formData.behaviors === "medium") score += 6;

    if (formData.knowledge === "high") score += 10;
    else if (formData.knowledge === "medium") score += 5;

    if (formData.communication === "high") score += 8;
    else if (formData.communication === "medium") score += 4;

    if (formData.compliance === "high") score += 10;
    else if (formData.compliance === "medium") score += 5;

    if (formData.norms === "high") score += 7;
    else if (formData.norms === "medium") score += 3;

    if (formData.ownership === "high") score += 8;
    else if (formData.ownership === "medium") score += 4;

    // Constrain score
    const finalScore = Math.min(98, Math.max(34, score));
    
    let band = "Developing";
    let bandDesc = "Human risk behaviors are inconsistently managed. Training is treated primarily as a check-the-box exercise.";
    if (finalScore >= 86) {
      band = "Security-First Culture";
      bandDesc = "Security is deeply integrated into daily operations. Employees actively detect, report, and reinforcement security norms.";
    } else if (finalScore >= 76) {
      band = "Mature";
      bandDesc = "Strong security habits are established. Most employees take ownership, though peer-led reinforcement has room to grow.";
    } else if (finalScore >= 61) {
      band = "Emerging";
      bandDesc = "Baseline training completed. Behavior management is taking shape, but gaps exist in proactive risk communication.";
    } else if (finalScore <= 40) {
      band = "High Risk";
      bandDesc = "Critical vulnerabilities in security attitudes and behaviors. Social engineering threat exposure remains high.";
    }

    setBenchmarkResult({
      score: finalScore,
      band: band,
      bandDesc: bandDesc,
      ownership: Math.min(100, Math.max(45, finalScore + 8)),
      norms: Math.min(100, Math.max(35, finalScore - 9)),
      comparison: finalScore - 72 >= 0 ? `${finalScore - 72}% Above Industry Average` : `${72 - finalScore}% Below Industry Average`,
      trend: finalScore - 70 >= 0 ? `+${finalScore - 70} Points Improvement` : `${finalScore - 70} Points Trend`
    });

    setTimeout(() => {
      document.getElementById("benchmark-report")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setFormData({
      industry: "",
      orgSize: "",
      attitudes: "",
      behaviors: "",
      knowledge: "",
      communication: "",
      compliance: "",
      norms: "",
      ownership: ""
    });
    setCurrentQuestion(1);
    setBenchmarkResult(null);
  };

  const faqData = [
    {
      q: "What is a security culture benchmark?",
      a: "A security culture benchmark evaluates how employees think about, communicate about, and practice security across an organization. It goes beyond technical controls to measure human risk variables, helping identify cultural strengths, blind spots, and specific maturity improvement opportunities."
    },
    {
      q: "How is the benchmark score calculated?",
      a: "Scores are generated using a weighted algorithm across seven critical security dimensions. The calculation incorporates security behaviors (25%), compliance practices (15%), responsibilities/ownership (15%), knowledge (15%), attitudes (10%), communication (10%), and team norms (10%)."
    },
    {
      q: "Does this benchmark replace a security assessment?",
      a: "No. This benchmark evaluates human and cultural risk factors, reflecting workforce vulnerability and behavioral security maturity. It should complement broader cybersecurity penetration tests, vulnerability assessments, and technical audits."
    },
    {
      q: "How long does the benchmark take?",
      a: "Most organizations can complete the benchmarking questionnaire in less than five minutes. Results are generated instantly, providing a clear score, maturity band, and specific improvement actions."
    },
    {
      q: "Who should use this tool?",
      a: "Security leaders, CISOs, HR teams, compliance managers, and organizations seeking to measure human risk, satisfy compliance mandates, and build a resilient workforce security posture."
    }
  ];

  return (
    <GSAPWrapper>
      <div className="insat-page" ref={heroRef} style={{ background: "#FFFFFF", color: "#1F1F1F" }}>
        <div className="main-content">

          {/* SECTION 1: HERO */}
          <section className="hero-section" style={{ background: "#FFFFFF", paddingBottom: "5rem", paddingTop: "4rem" }}>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" style={{ minHeight: "75vh" }}>
                
                {/* Left Column: Headlines */}
                <div className="lg:col-span-7 hero-content" style={{ textAlign: "left", padding: "0" }}>
                  <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "500" }}>FREE HUMAN RISK SCAN</span>
                  <h1 className="text-64-heading" style={{ color: "#1F1F1F", fontWeight: "600", lineHeight: "1.05", marginBottom: "1.5rem" }}>
                    Security Culture Maturity Benchmark & <span style={{ color: "#F15A24" }}>Human Risk Assessment</span>
                  </h1>
                  <p className="text-18-content" style={{ color: "#3A3A3A", opacity: "0.9", lineHeight: "1.6", marginBottom: "2rem", maxWidth: "600px" }}>
                    Measure how your organization&apos;s security culture compares against industry standards. Evaluate awareness, behaviors, reporting habits, compliance practices, and human risk indicators to understand where your culture stands today.
                  </p>
                </div>

                {/* Right Column: Premium Benchmark Visual / Form Card */}
                <div className="lg:col-span-5 hero-visual-card">
                  <div
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E7E7E7",
                      borderLeft: "4px solid #F15A24",
                      borderRadius: "20px",
                      padding: "2.25rem",
                      boxShadow: "0 30px 60px -12px rgba(31, 31, 31, 0.08), 0 12px 24px -8px rgba(31, 31, 31, 0.04)",
                      transform: "translateY(-8px)"
                    }}
                  >
                    {!benchmarkResult ? (
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#F15A24" }}>
                            Question {currentQuestion} of 9
                          </span>
                          <div style={{ display: "flex", gap: "0.25rem" }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                              <div
                                key={i}
                                style={{
                                  width: "10px",
                                  height: "4px",
                                  borderRadius: "2px",
                                  backgroundColor: i <= currentQuestion ? "#F15A24" : "#E7E7E7",
                                  transition: "background-color 0.3s ease"
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Questions */}
                        {currentQuestion === 1 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Select Industry</h3>
                            <select
                              value={formData.industry}
                              onChange={(e) => handleInputChange("industry", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Select industry...</option>
                              <option value="bfsi">BFSI</option>
                              <option value="healthcare">Healthcare</option>
                              <option value="manufacturing">Manufacturing</option>
                              <option value="technology">Technology & IT</option>
                              <option value="government">Government & Public</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 2 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Organization Size</h3>
                            <select
                              value={formData.orgSize}
                              onChange={(e) => handleInputChange("orgSize", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Select workforce size...</option>
                              <option value="1-99">1 - 99 employees</option>
                              <option value="100-499">100 - 499 employees</option>
                              <option value="500-2499">500 - 2,499 employees</option>
                              <option value="2500+">2,500+ employees</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 3 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Attitudes</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>How do employees perceive security policies and mandates?</p>
                            <select
                              value={formData.attitudes}
                              onChange={(e) => handleInputChange("attitudes", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Positive/Understands business importance</option>
                              <option value="medium">Neutral/Complies but finds it disruptive</option>
                              <option value="low">Negative/Views security as an obstacle</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 4 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Behaviors</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>How regularly do employees exhibit safe security habits in their daily workflows?</p>
                            <select
                              value={formData.behaviors}
                              onChange={(e) => handleInputChange("behaviors", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Always lock screens, verify senders, use safe managers</option>
                              <option value="medium">Occasionally bypass safety for convenience</option>
                              <option value="low">Frequent security shortcuts and policy workarounds</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 5 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Knowledge</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do employees understand cybersecurity threat vectors (phishing, social engineering, AI-clones)?</p>
                            <select
                              value={formData.knowledge}
                              onChange={(e) => handleInputChange("knowledge", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Highly aware of modern and AI-driven attack vectors</option>
                              <option value="medium">Familiar with phishing, but lacks knowledge of deepfakes/BEC</option>
                              <option value="low">Minimal knowledge, struggles to identify threats</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 6 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Communication</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do employees know where and how to report security concerns?</p>
                            <select
                              value={formData.communication}
                              onChange={(e) => handleInputChange("communication", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Reports threats immediately via structured channels</option>
                              <option value="medium">Discusses concerns with peers but rarely logs them formally</option>
                              <option value="low">Avoids reporting due to complex channels or fear of blame</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 7 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Compliance Practices</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Are compliance policies followed consistently rather than just during audits?</p>
                            <select
                              value={formData.compliance}
                              onChange={(e) => handleInputChange("compliance", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Continuous policy compliance and clean audits</option>
                              <option value="medium">Policies followed loosely outside of review seasons</option>
                              <option value="low">Widespread non-compliance or lack of policy awareness</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 8 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Team Norms</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do peers actively encourage and reinforce secure behaviors among one another?</p>
                            <select
                              value={formData.norms}
                              onChange={(e) => handleInputChange("norms", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">Peers actively support and check on security habits</option>
                              <option value="medium">Tolerates secure behaviors but doesn&apos;t advocate them</option>
                              <option value="low">Secure behavior is often teased or bypassed by team pressure</option>
                            </select>
                          </div>
                        )}

                        {currentQuestion === 9 && (
                          <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.75rem" }}>Security Ownership</h3>
                            <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "1rem" }}>Do employees feel personally responsible for protecting the organization?</p>
                            <select
                              value={formData.ownership}
                              onChange={(e) => handleInputChange("ownership", e.target.value)}
                              style={{ width: "100%", padding: "0.8rem", border: "1px solid #E7E7E7", borderRadius: "8px", background: "#FFFFFF", color: "#1F1F1F" }}
                            >
                              <option value="">Choose option...</option>
                              <option value="high">High ownership; views security as part of their job role</option>
                              <option value="medium">Moderate; feels it is primarily IT/Security&apos;s responsibility</option>
                              <option value="low">Zero ownership; assumes security teams handle everything</option>
                            </select>
                          </div>
                        )}

                        {/* Controls */}
                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
                          {currentQuestion > 1 && (
                            <button
                              type="button"
                              onClick={handleBack}
                              style={{
                                flex: 1,
                                padding: "0.75rem",
                                border: "1px solid #E7E7E7",
                                background: "#FFFFFF",
                                color: "#3A3A3A",
                                fontWeight: "400",
                                borderRadius: "8px",
                                cursor: "pointer"
                              }}
                            >
                              Back
                            </button>
                          )}
                          
                          {currentQuestion < 9 ? (
                            <button
                              type="button"
                              onClick={handleNext}
                              disabled={
                                (currentQuestion === 1 && !formData.industry) ||
                                (currentQuestion === 2 && !formData.orgSize) ||
                                (currentQuestion === 3 && !formData.attitudes) ||
                                (currentQuestion === 4 && !formData.behaviors) ||
                                (currentQuestion === 5 && !formData.knowledge) ||
                                (currentQuestion === 6 && !formData.communication) ||
                                (currentQuestion === 7 && !formData.compliance) ||
                                (currentQuestion === 8 && !formData.norms)
                              }
                              style={{
                                flex: 2,
                                padding: "0.75rem",
                                background: "#F15A24",
                                color: "#FFFFFF",
                                fontWeight: "500",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                opacity: (
                                  (currentQuestion === 1 && !formData.industry) ||
                                  (currentQuestion === 2 && !formData.orgSize) ||
                                  (currentQuestion === 3 && !formData.attitudes) ||
                                  (currentQuestion === 4 && !formData.behaviors) ||
                                  (currentQuestion === 5 && !formData.knowledge) ||
                                  (currentQuestion === 6 && !formData.communication) ||
                                  (currentQuestion === 7 && !formData.compliance) ||
                                  (currentQuestion === 8 && !formData.norms)
                                ) ? 0.5 : 1
                              }}
                            >
                              Next Question
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={calculateBenchmark}
                              disabled={!formData.ownership}
                              style={{
                                flex: 2,
                                padding: "0.75rem",
                                background: "#F15A24",
                                color: "#FFFFFF",
                                fontWeight: "500",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                opacity: !formData.ownership ? 0.5 : 1
                              }}
                            >
                              Calculate My Culture Score
                            </button>
                          )}
                        </div>

                        {currentQuestion === 9 && (
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                industry: "technology",
                                orgSize: "500-2499",
                                attitudes: "high",
                                behaviors: "high",
                                knowledge: "medium",
                                communication: "high",
                                compliance: "high",
                                norms: "medium",
                                ownership: "high"
                              });
                              setBenchmarkResult({
                                score: 84,
                                band: "Mature",
                                bandDesc: "Strong security habits are established. Most employees take ownership, though peer-led reinforcement has room to grow.",
                                ownership: 92,
                                norms: 75,
                                comparison: "12% Above Industry Average",
                                trend: "+6 Points Improvement"
                              });
                              setTimeout(() => {
                                document.getElementById("benchmark-report")?.scrollIntoView({ behavior: "smooth" });
                              }, 100);
                            }}
                            style={{
                              width: "100%",
                              marginTop: "0.75rem",
                              background: "none",
                              border: "none",
                              color: "#6B7280",
                              fontSize: "0.8rem",
                              fontWeight: "400",
                              textDecoration: "underline",
                              cursor: "pointer",
                              textAlign: "center"
                            }}
                          >
                            View Sample Report
                          </button>
                        )}
                      </div>
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                          Security Culture Score
                        </div>
                        <div style={{ fontSize: "5rem", fontWeight: "600", color: "#F15A24", lineHeight: "1" }}>
                          {benchmarkResult.score}
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#6B7280", marginTop: "0.25rem", fontWeight: "500" }}>
                          Top 20% of Peer Organizations
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1.5rem", textAlign: "left", fontSize: "0.85rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", color: "#10B981" }}>
                            <span>↑ Reporting Culture</span>
                            <strong>Active</strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", color: "#10B981" }}>
                            <span>↑ Security Ownership</span>
                            <strong>Active</strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", color: "#EF4444" }}>
                            <span>↓ Peer Security Reinforcement</span>
                            <strong>Risk Area</strong>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleReset}
                          style={{
                            width: "100%",
                            marginTop: "1.5rem",
                            padding: "0.75rem",
                            backgroundColor: "#1F1F1F",
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            border: "none",
                            fontWeight: "600",
                            cursor: "pointer"
                          }}
                        >
                          Reset Benchmark
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 2: WHAT IS SECURITY CULTURE BENCHMARKING */}
          <section style={{ background: "#F8F6F1", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Column: Editorial Content */}
                <div className="lg:col-span-6" style={{ textAlign: "left" }}>
                  <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>
                    CULTURE DEFINED
                  </span>
                  <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
                    What Does Security Culture Actually Measure?
                  </h2>
                  <p className="text-18-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    Security culture goes beyond awareness training. Organizations with strong security cultures consistently demonstrate safer employee behaviors, faster threat reporting, stronger accountability, and lower human-driven security incidents.
                  </p>
                  <p className="text-16-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    A mature security culture is not defined by completed training alone. It is reflected in how employees recognize threats, make security decisions, follow policies, and support secure behaviors across teams.
                  </p>
                  <p className="text-16-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    Organizations with stronger reporting and ownership cultures often detect threats earlier and reduce the impact of human-related security incidents.
                  </p>
                </div>

                {/* Right Column: Visual Bento Grid Framework */}
                <div className="lg:col-span-6">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                    
                    {/* Section Header (Spans 2 columns, borderless) */}
                    <div style={{ gridColumn: "span 2", marginBottom: "0.25rem", textAlign: "left" }}>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#1F1F1F", margin: 0 }}>
                        Seven Core Culture Dimensions Evaluated:
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0.25rem 0 0 0" }}>
                        Inspired by global human risk management research.
                      </p>
                    </div>

                    {/* Bento Grid Items */}
                    {[
                      { title: "Security Attitudes", desc: "Beliefs and perceptions about security policies." },
                      { title: "Security Behaviors", desc: "Active safe habits in daily system interactions." },
                      { title: "Security Knowledge", desc: "Understanding vectors, mechanics, and reporting." },
                      { title: "Security Communication", desc: "How feedback loops and incidents are reported." },
                      { title: "Compliance Practices", desc: "Consistency in policy acceptance and execution." },
                      { title: "Team Norms", desc: "Peer-to-peer security reinforcement and check-ins." },
                      { title: "Security Ownership", desc: "Personal responsibility and duty of care." }
                    ].map((dim, i) => (
                      <div
                        key={i}
                        className="risk-stat-card"
                        style={{
                          gridColumn: i === 6 ? "span 2" : "auto", // Spans 2 columns for the last item (Security Ownership)
                          background: "#FFFFFF",
                          border: "1px solid #E7E7E7",
                          borderLeft: "4px solid #F15A24",
                          borderRadius: "16px",
                          padding: "1.25rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          textAlign: "left"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                          <span style={{
                            background: "#FFEFEA",
                            color: "#F15A24",
                            borderRadius: "50%",
                            minWidth: "22px",
                            minHeight: "22px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontWeight: "600"
                          }}>
                            0{i + 1}
                          </span>
                          <strong style={{ fontSize: "0.95rem", color: "#1F1F1F" }}>{dim.title}</strong>
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: 0, lineHeight: "1.4" }}>{dim.desc}</p>
                      </div>
                    ))}

                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 3: HOW YOUR SCORE IS CALCULATED */}
          <section style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
            <div className="container">
              <div className="section-intro" style={{ textAlign: "center", marginBottom: "4rem" }}>
                <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>METHODOLOGY</span>
                <h2 className="text-52-heading" style={{ color: "#1F1F1F", marginBottom: "1rem" }}>
                  Transparent Scoring Methodology
                </h2>
                <p className="text-18-content" style={{ color: "#6B7280", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6", textAlign: "center" }}>
                  Every benchmark score is calculated using measurable culture indicators rather than arbitrary ratings.
                </p>
              </div>

              {/* Horizontal weighted framework visualization */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "4.5rem" }}>
                {[
                  { title: "Behaviors", weight: "25%" },
                  { title: "Compliance", weight: "15%" },
                  { title: "Responsibilities", weight: "15%" },
                  { title: "Knowledge", weight: "15%" },
                  { title: "Attitudes", weight: "10%" },
                  { title: "Communication", weight: "10%" },
                  { title: "Norms", weight: "10%" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="risk-stat-card"
                    style={{
                      background: "#FFFBF7",
                      border: "1px solid #FFEAD4",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      minWidth: "150px",
                      flex: "1 1 12%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      textAlign: "center"
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "2rem", fontWeight: "600", color: "#F15A24", display: "block", marginBottom: "0.25rem" }}>{item.weight}</span>
                      <strong style={{ fontSize: "0.95rem", color: "#1F1F1F" }}>{item.title}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", fontSize: "0.95rem", color: "#6B7280", lineHeight: "1.6" }}>
                <p style={{ marginBottom: "2.5rem" }}>
                  The benchmark combines employee behavior indicators, awareness metrics, reporting activity, compliance signals, and cultural maturity factors to generate a score between 0 and 100.
                </p>

                {/* Score Bands */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
                  {[
                    { range: "0–40", label: "High Risk", color: "#EF4444" },
                    { range: "41–60", label: "Developing", color: "#F59E0B" },
                    { range: "61–75", label: "Emerging", color: "#3B82F6" },
                    { range: "76–85", label: "Mature", color: "#F15A24" },
                    { range: "86–100", label: "Security-First Culture", color: "#10B981" }
                  ].map((band, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "1rem 1.5rem",
                        border: "1px solid #E7E7E7",
                        borderRadius: "10px",
                        flex: "1 1 18%",
                        minWidth: "140px",
                        textAlign: "center"
                      }}
                    >
                      <span style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase" }}>{band.range}</span>
                      <strong style={{ display: "block", fontSize: "1rem", color: band.color, marginTop: "0.25rem" }}>{band.label}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: SAMPLE BENCHMARK REPORT */}
          <section id="benchmark-report" style={{ background: "#F8F6F1", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
            <div className="container">
              <div className="section-intro" style={{ textAlign: "center", marginBottom: "4rem" }}>
                <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>REPORTS</span>
                <h2 className="text-52-heading" style={{ color: "#1F1F1F", marginBottom: "1rem" }}>
                  {benchmarkResult ? "Your Custom Benchmarking Report" : "See What Your Results Look Like"}
                </h2>
                <p className="text-18-content" style={{ color: "#6B7280", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
                  Below is a representation of security culture maturity parameters derived from the assessment inputs.
                </p>
              </div>

              {/* Bento Grid */}
              <div
                style={{
                  border: "1px solid #E7E7E7",
                  borderLeft: "4px solid #F15A24",
                  borderRadius: "20px",
                  padding: "3rem 2.25rem",
                  boxShadow: "0 30px 60px -12px rgba(31, 31, 31, 0.08), 0 12px 24px -8px rgba(31, 31, 31, 0.04)",
                  transform: "translateY(-8px)",
                  background: "#FFFFFF",
                  maxWidth: "960px",
                  margin: "0 auto"
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: "2.5rem" }}>
                  
                  {/* Tile 1: Overall Score */}
                  <div style={{ background: "#F8F6F1", padding: "1.5rem", borderRadius: "12px", border: "1px solid #E7E7E7", textAlign: "center" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase" }}>Overall Score</span>
                    <strong style={{ fontSize: "3.5rem", color: "#F15A24", display: "block", lineHeight: "1.1", marginTop: "0.5rem" }}>
                      {benchmarkResult ? benchmarkResult.score : "84"}
                    </strong>
                  </div>

                  {/* Tile 2: Maturity Level */}
                  <div style={{ background: "#F8F6F1", padding: "1.5rem", borderRadius: "12px", border: "1px solid #E7E7E7", textAlign: "center" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase" }}>Maturity Level</span>
                    <strong style={{ fontSize: "1.35rem", color: "#1F1F1F", display: "block", marginTop: "1rem" }}>
                      {benchmarkResult ? benchmarkResult.band : "Mature"}
                    </strong>
                    <span style={{ fontSize: "0.75rem", color: "#6B7280", display: "block", marginTop: "0.25rem" }}>
                      Security Behavior Management
                    </span>
                  </div>

                  {/* Tile 3: Strongest Dimension */}
                  <div style={{ background: "#F8F6F1", padding: "1.5rem", borderRadius: "12px", border: "1px solid #E7E7E7", textAlign: "center" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase" }}>Strongest Dimension</span>
                    <strong style={{ fontSize: "1.2rem", color: "#10B981", display: "block", marginTop: "0.75rem" }}>
                      Security Ownership
                    </strong>
                    <strong style={{ fontSize: "1.8rem", color: "#10B981", display: "block" }}>
                      {benchmarkResult ? `${benchmarkResult.ownership}/100` : "92/100"}
                    </strong>
                  </div>

                  {/* Tile 4: Improvement Area */}
                  <div style={{ background: "#F8F6F1", padding: "1.5rem", borderRadius: "12px", border: "1px solid #E7E7E7", textAlign: "center" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase" }}>Improvement Area</span>
                    <strong style={{ fontSize: "1.2rem", color: "#EF4444", display: "block", marginTop: "0.75rem" }}>
                      Team Security Norms
                    </strong>
                    <strong style={{ fontSize: "1.8rem", color: "#EF4444", display: "block" }}>
                      {benchmarkResult ? `${benchmarkResult.norms}/100` : "75/100"}
                    </strong>
                  </div>

                  {/* Tile 5: Industry Comparison */}
                  <div style={{ background: "#F8F6F1", padding: "1.5rem", borderRadius: "12px", border: "1px solid #E7E7E7", textAlign: "center" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase" }}>Industry Comparison</span>
                    <strong style={{ fontSize: "1.15rem", color: "#1F1F1F", display: "block", marginTop: "1rem" }}>
                      {benchmarkResult ? benchmarkResult.comparison : "12% Above Industry Average"}
                    </strong>
                  </div>

                  {/* Tile 6: Trend */}
                  <div style={{ background: "#F8F6F1", padding: "1.5rem", borderRadius: "12px", border: "1px solid #E7E7E7", textAlign: "center" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6B7280", textTransform: "uppercase" }}>Trend</span>
                    <strong style={{ fontSize: "1.35rem", color: "#10B981", display: "block", marginTop: "1rem" }}>
                      {benchmarkResult ? benchmarkResult.trend : "+6 Points Improvement"}
                    </strong>
                  </div>

                </div>

                {/* Executive Insight Block */}
                <div style={{ borderTop: "1px solid #E7E7E7", paddingTop: "2rem", textAlign: "left" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1F1F1F", marginBottom: "0.5rem" }}>
                    Executive Insight
                  </h4>
                  <p style={{ fontSize: "0.95rem", color: "#6B7280", lineHeight: "1.6", margin: 0 }}>
                    {benchmarkResult ? (
                      `Your Security Culture Score is ${benchmarkResult.score}/100. ${benchmarkResult.bandDesc} Your strongest cultural metric is Security Ownership (${benchmarkResult.ownership}/100), showing solid employee accountability. Focus immediate behavioral improvements on Team Security Norms (${benchmarkResult.norms}/100) to reinforce secure habits dynamically.`
                    ) : (
                      "Your organization demonstrates strong employee accountability and reporting culture. The greatest opportunity lies in strengthening peer-driven security behaviors and reinforcing security expectations across teams."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: WHY SECURITY CULTURE MATTERS */}
          <section style={{ background: "#FFFFFF", paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid #E7E7E7" }}>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Content */}
                <div className="lg:col-span-7" style={{ textAlign: "left" }}>
                  <span className="text-subheading" style={{ color: "#F15A24", fontWeight: "600" }}>
                    THE HUMAN FIREWALL
                  </span>
                  <h2 className="text-52-heading" style={{ color: "#1F1F1F", lineHeight: "1.1", marginBottom: "1.5rem" }}>
                    Human Behavior Remains One of the Largest Security Risks
                  </h2>
                  <p className="text-18-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    Technical controls alone cannot eliminate risk. Many security incidents still involve phishing, credential misuse, social engineering, policy violations, or unsafe employee behavior.
                  </p>
                  <p className="text-16-content" style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                    Organizations that continuously measure and improve security culture are better positioned to:
                  </p>
                  <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {["Reduce human risk", "Improve threat reporting rates", "Strengthen security awareness", "Support compliance initiatives", "Build long-term security resilience"].map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", color: "#1F1F1F" }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="6" cy="6" r="4" fill="#F15A24" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Editorial Statistic Presentation */}
                <div className="lg:col-span-5" style={{ textAlign: "center" }}>
                  <div
                    style={{
                      background: "#FFFBF7",
                      border: "1px solid #FFEAD4",
                      borderRadius: "20px",
                      padding: "3.5rem 2rem",
                      boxShadow: "0 10px 30px rgba(241, 90, 36, 0.02)"
                    }}
                  >
                    <div style={{ fontSize: "6.5rem", fontWeight: "700", color: "#F15A24", lineHeight: "1" }}>
                      91%
                    </div>
                    <strong style={{ fontSize: "1.2rem", color: "#1F1F1F", display: "block", marginTop: "1rem" }}>
                      of cyber attacks begin with human interaction.
                    </strong>
                    <span style={{ fontSize: "0.75rem", color: "#6B7280", display: "block", marginTop: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Source: Threat Intelligence Reports
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 6: FINAL CTA + FAQ */}
          
          {/* FAQ SUBSECTION */}
          <section className="bg-grey-5" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div className="container faq-grid">
              <div className="faq-title-col animate from-left">
                <h2 className="text-40-heading">Frequently Asked Questions</h2>
                <Link className="arrow-link" href="/contact" style={{ marginTop: "1.25rem" }}>
                  <div className="arrow-circle">
                    <span className="arrow-circle-bg"></span>
                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                    </svg>
                  </div>
                  <span>Still have questions? Contact us</span>
                </Link>
              </div>

              <div className="faq-list-col animate from-right">
                {faqData.map((item, index) => (
                  <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={index}>
                    <button type="button" className="faq-trigger" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                      <span className="faq-question">{item.q}</span>
                      <div className="faq-icon-wrapper">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                          <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                        </svg>
                      </div>
                    </button>
                    <div className="faq-panel">
                      <div className="faq-panel-inner">
                        <div className="faq-answer">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL CTA SUBSECTION (WAVE STYLE) */}
          <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "0" }}>
            <div className="container-xl">
              <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                <div className="animate">
                  <h2 className="section-title leading-tight" style={{ maxWidth: "1100px", marginLeft: "auto", marginRight: "auto", fontSize: "2.25rem", fontWeight: "600" }}>
                    Benchmark Your Security Culture in Minutes
                  </h2>
                  <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                    Get an instant assessment of your organization&apos;s security culture maturity and discover opportunities to strengthen human risk resilience.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-10 animate-fade-in" style={{ marginTop: "2.5rem" }}>
                    <button
                      type="button"
                      onClick={() => {
                        document.body.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="btn btn-secondary"
                    >
                      Start Free
                    </button>
                    <Link href="/demo" className="btn btn-primary btn-cta">
                      <span className="hover-sweep"></span>
                      <span>Book a Demo</span>
                      <div className="arrow-wrapper">
                        <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="bg-theme animated-bg absolute top-0 left-0 w-full after:hidden overflow-hidden">
                  <div className="animate-wave absolute inset-0 w-full h-full">
                    <ImageFallback
                      src="/images/wave.svg"
                      fill={true}
                      sizes="100vw"
                      alt="bg wave"
                    />
                  </div>
                  <Circle className="left-[10%] top-12" width={32} height={32} fill={false} fillValue="#FF5A1F" />
                  <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
                  <Circle className="left-[15%] bottom-[35%]" width={47} height={47} fill={false} fillValue="#FF5A1F" />
                  <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
                  <Circle className="right-[2%] bottom-[30%]" width={73} height={73} fill={false} fillValue="#FF5A1F" />
                </div>
              </div>
            </div>
          </section>

          {/* Embedded Styles for Hover Popups */}
          <style>{`
            .risk-stat-card {
              transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
              box-shadow: 0 4px 12px rgba(31, 31, 31, 0.03);
            }
            .risk-stat-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 16px 32px rgba(241, 90, 36, 0.08);
              border-color: #F15A24 !important;
            }
          `}</style>

        </div>
      </div>
    </GSAPWrapper>
  );
};

export default CultureBenchmarkingPage;
