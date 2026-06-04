"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../../../styles/insat.scss";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import { gsap } from "@lib/gsap";
import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";

const HumanRiskIntelligencePage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const heroRef = useRef(null);
  
  // Testimonials Slider state & refs
  const sliderWrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const faqData = [
    {
      question: "How does the platform calculate user and department risk scores?",
      answer: "Our AI-powered engine aggregates signals from simulated phishing click rates, active report rates, cybersecurity awareness quiz performance, and repeated risky behaviours. These are weighted dynamically to assign scores between 0 (Lowest Risk) and 100 (Highest Risk)."
    },
    {
      question: "Can we export these reports to share with compliance auditors?",
      answer: "Yes. Every report generated can be downloaded in audit-ready PDF formats containing telemetry metrics and action plans. They serve as defensible evidence for compliance audits like SOC 2, ISO 27001, and HIPAA."
    },
    {
      question: "How often are the risk analytics and heatmaps updated?",
      answer: "All metrics, heatmaps, and risk intelligence dashboards update in real time as employees complete training courses, report simulations, or take action in active phishing campaigns."
    },
    {
      question: "What compliance standards does your human risk dashboard cover?",
      answer: "InSAT compiles comprehensive, audit-ready compliance records and human risk telemetry matching global frameworks, including SOC 2 Type II, ISO 27001, GDPR, and India's DPDP Act."
    }
  ];
  
  const updateSlider = () => {
    const wrapper = sliderWrapperRef.current;
    if (!wrapper) return;
    const slides = wrapper.children;
    if (slides.length === 0) return;
    
    const spacing = 12;
    let offset = 0;
    for (let i = 0; i < currentIndex; i++) {
      offset += slides[i].offsetWidth + spacing;
    }
    wrapper.style.transform = `translate3d(${-offset}px, 0, 0)`;
    
    setPrevDisabled(currentIndex === 0);
    
    const containerWidth = wrapper.parentElement.offsetWidth;
    let totalRemainingWidth = 0;
    for (let i = currentIndex + 1; i < slides.length; i++) {
      totalRemainingWidth += slides[i].offsetWidth + spacing;
    }
    setNextDisabled(totalRemainingWidth <= containerWidth);
  };
  
  useEffect(() => {
    updateSlider();
    const handleResize = () => updateSlider();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-content > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      ).fromTo(
        ".hero-visual",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        ">-0.4"
      ).fromTo(
        ".hero-bg-decor",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "<"
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <GSAPWrapper>
      <div className="insat-page" ref={heroRef}>
        <div className="main-content">
        
        {/* 1. HERO SECTION */}
        <section className="hero-section">
            <div className="hero-outer-wrapper">

                {/* Background SVG Decor */}
                <div className="hero-bg-decor" aria-hidden="true">
                    
                    <svg className="hero-network" viewBox="0 0 680 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="78" y1="198" x2="158" y2="88" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="78" y1="198" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="78" y1="198" x2="52" y2="352" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="158" y1="88" x2="278" y2="44" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="158" y1="88" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="158" y1="88" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="158" y1="308" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="158" y1="308" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="52" y1="352" x2="158" y2="308" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="52" y1="352" x2="102" y2="430" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="278" y1="44" x2="258" y2="174" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="278" y1="44" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="258" y1="174" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="258" y1="174" x2="398" y2="78" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="258" y1="174" x2="188" y2="238" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="268" y1="338" x2="388" y2="218" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="268" y1="338" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="268" y1="338" x2="398" y2="378" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="102" y1="430" x2="268" y2="338" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="102" y1="430" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="398" y1="78" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="388" y1="218" x2="488" y2="128" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="388" y1="218" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="398" y1="378" x2="508" y2="288" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="398" y1="378" x2="348" y2="432" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="488" y1="128" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="508" y1="288" x2="578" y2="178" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="578" y1="178" x2="648" y2="110" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="578" y1="178" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
                        <line x1="508" y1="288" x2="638" y2="278" stroke="#FF7A00" strokeWidth="1" />
                        
                        <line x1="78" y1="198" x2="188" y2="238" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
                        <line x1="388" y1="218" x2="268" y2="338" stroke="#FF7A00" strokeWidth="0.7" strokeDasharray="6 4" opacity="0.6" />
                        
                        <circle cx="78" cy="198" r="5" fill="#FF7A00" />
                        <circle cx="158" cy="88" r="4.5" fill="#FF7A00" />
                        <circle cx="158" cy="308" r="4" fill="#FF7A00" />
                        <circle cx="52" cy="352" r="3.5" fill="#FF7A00" />
                        <circle cx="278" cy="44" r="5.5" fill="#FF7A00" />
                        <circle cx="258" cy="174" r="4.5" fill="#FF7A00" />
                        <circle cx="268" cy="338" r="4" fill="#FF7A00" />
                        <circle cx="188" cy="238" r="4" fill="#FF7A00" />
                        <circle cx="398" cy="78" r="5" fill="#FF7A00" />
                        <circle cx="388" cy="218" r="4.5" fill="#FF7A00" />
                        <circle cx="398" cy="378" r="3.5" fill="#FF7A00" />
                        <circle cx="488" cy="128" r="4" fill="#FF7A00" />
                        <circle cx="508" cy="288" r="4.5" fill="#FF7A00" />
                        <circle cx="578" cy="178" r="5.5" fill="#FF7A00" />
                        <circle cx="348" cy="432" r="3.5" fill="#FF7A00" />
                        <circle cx="102" cy="430" r="3.5" fill="#FF7A00" />
                        <circle cx="648" cy="110" r="4" fill="#FF7A00" />
                        <circle cx="638" cy="278" r="4" fill="#FF7A00" />
                        
                        <circle cx="278" cy="44" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                        <circle cx="578" cy="178" r="10" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                        <circle cx="78" cy="198" r="9" stroke="#FF7A00" strokeWidth="1" fill="none" opacity="0.3" />
                    </svg>

                    <svg className="hero-shield" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60 7 L108 26 L108 68 Q108 104 60 125 Q12 104 12 68 L12 26 Z" stroke="#FF7A00" strokeWidth="2.5" fill="rgba(255,122,0,0.07)" />
                        <path d="M60 20 L96 36 L96 66 Q96 90 60 108 Q24 90 24 66 L24 36 Z" stroke="#FF7A00" strokeWidth="1.2" fill="none" opacity="0.45" />
                        <path d="M40 66 L53 80 L80 50" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="60" cy="7" r="3" fill="#FF7A00" opacity="0.8" />
                        <circle cx="108" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
                        <circle cx="108" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
                        <circle cx="12" cy="26" r="2.5" fill="#FF7A00" opacity="0.6" />
                        <circle cx="12" cy="68" r="2.5" fill="#FF7A00" opacity="0.5" />
                    </svg>

                </div>

                <div className="hero-backdrop-wrapper">
                    <div className="backdrop-shape shape-1">
                        <svg width="100%" height="100%" viewBox="0 0 538 474" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.7661 473.556L225.596 416.77L537.141 0.191406L314.856 52.6573L0.7661 473.556Z" fill="url(#paint0_linear_hero_1)" />
                            <defs>
                                <linearGradient id="paint0_linear_hero_1" x1="732.88" y1="1520.88" x2="-118.181" y2="18.3884" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.31" stopColor="#FF7A00" />
                                    <stop offset="0.59" stopColor="#F59E0B" />
                                    <stop offset="0.78" stopColor="#EF4444" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="backdrop-shape shape-2">
                        <div className="shape-2-inner-1">
                            <svg width="100%" height="100%" viewBox="0 0 537 517" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M243.007 443.747L0.726096 516.282L295.51 69.4185L536.066 0.564209L243.007 443.747Z" fill="url(#paint0_linear_hero_2)" />
                                <defs>
                                    <linearGradient id="paint0_linear_hero_2" x1="626.513" y1="479.564" x2="320.001" y2="-98.1139" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.22" stopColor="#FF7A00" />
                                        <stop offset="0.55" stopColor="#F59E0B" />
                                        <stop offset="0.89" stopColor="#EF4444" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="shape-2-inner-2">
                            <svg width="100%" height="100%" viewBox="0 0 426 613" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M241.39 507.775L0.180044 612.19L185.387 100.986L425.875 0.00805664L241.39 507.775Z" fill="url(#paint0_linear_hero_3)" />
                                <defs>
                                    <linearGradient id="paint0_linear_hero_3" x1="426.129" y1="607.122" x2="-243.854" y2="-82.0361" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.22" stopColor="#FF7A00" />
                                        <stop offset="0.55" stopColor="#F59E0B" />
                                        <stop offset="0.89" stopColor="#EF4444" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="shape-2-inner-3">
                            <svg width="100%" height="100%" viewBox="0 0 313 684" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M259.325 543.891L0.873635 683.366L54.1947 136.437L312.926 0.0959473L259.325 543.891Z" fill="url(#paint0_linear_hero_4)" />
                                <defs>
                                    <linearGradient id="paint0_linear_hero_4" x1="541.623" y1="465.932" x2="-672.11" y2="-514.628" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.22" stopColor="#FF7A00" />
                                        <stop offset="0.55" stopColor="#F59E0B" />
                                        <stop offset="0.89" stopColor="#EF4444" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="shape-2-inner-4">
                            <svg width="100%" height="100%" viewBox="0 0 272 715" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M271.797 551.346L36.791 714.998L0.988926 160.822L236.664 0.241187L271.797 551.346Z" fill="#FF7A00" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <span className="text-subheading">AI-Powered Human Risk Intelligence</span>
                        <h1 className="text-96-heading">AI-Powered Human Risk Intelligence</h1>

                        <div className="hero-text-wrapper">
                            <p className="text-20-content hero-paragraph">
                                Uncover risky users, weak teams, behaviour trends, and training gaps — before they become incidents.
                            </p>
                        </div>

                        <div className="hero-actions-row">
                            <Link className="btn btn-primary btn-cta" href="/contact">
                                <span className="hover-sweep"></span>
                                <span>Start Free</span>
                                <div className="arrow-wrapper">
                                    <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                                    </svg>
                                </div>
                            </Link>
                            <Link className="btn btn-secondary" href="/demo">
                                <span>Book a Demo</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container container-hero-visual">
                    <div className="hero-visual">
                        <img src="/insat/images/platform.png" alt="InSAT Platform Dashboard" className="hero-platform-img" />
                    </div>
                </div>

            </div>
        </section>

        {/* 2. STATS/CHECKLIST ROW */}
        <section className="bg-white">
            <div className="container two-col-grid">
                <div className="two-col-content-block animate from-left">
                    <h2 className="text-52-heading">Human Risk Is Still the Weakest Link</h2>

                    <div style={{marginTop: "1.5rem", opacity: "0.7"}}>
                        <p className="text-18-content">
                            Traditional training stops at completions — InSAT converts training, simulation, quiz, and behaviour signals into AI-assisted insights your teams can act on.
                        </p>
                    </div>

                    <ul className="check-list">
                        <li className="check-item">
                            <div className="check-icon-wrapper">
                                <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.12482 5.50058L0 1.37577L1.17852 0.197266L6.48182 5.50058L1.17852 10.8038L0 9.62533L4.12482 5.50058Z" fill="var(--color-emerald)" />
                                </svg>
                            </div>
                            <span className="check-text"><strong>68%</strong> of breaches involve a non-malicious human element (Verizon DBIR)</span>
                        </li>
                        <li className="check-item">
                            <div className="check-icon-wrapper">
                                <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.12482 5.50058L0 1.37577L1.17852 0.197266L6.48182 5.50058L1.17852 10.8038L0 9.62533L4.12482 5.50058Z" fill="var(--color-emerald)" />
                                </svg>
                            </div>
                            <span className="check-text"><strong>71%</strong> of employees admit to taking risky actions online (Proofpoint)</span>
                        </li>
                        <li className="check-item">
                            <div className="check-icon-wrapper">
                                <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.12482 5.50058L0 1.37577L1.17852 0.197266L6.48182 5.50058L1.17852 10.8038L0 9.62533L4.12482 5.50058Z" fill="var(--color-emerald)" />
                                </svg>
                            </div>
                            <span className="check-text"><strong>$4.44M</strong> average global cost of a data breach (IBM)</span>
                        </li>
                        <li className="check-item">
                            <div className="check-icon-wrapper">
                                <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.12482 5.50058L0 1.37577L1.17852 0.197266L6.48182 5.50058L1.17852 10.8038L0 9.62533L4.12482 5.50058Z" fill="var(--color-emerald)" />
                                </svg>
                            </div>
                            <span className="check-text">Automate human risk intelligence and compliance updates</span>
                        </li>
                    </ul>
                </div>

                <div className="two-col-visual-block aspect-square animate from-right">
                    <img alt="Human risk overview" loading="lazy" src="/insat/images/section2.png" />
                </div>
            </div>
        </section>

        {/* 3. FEATURES GRID */}
        <section className="bg-grey-5">
            <div className="container">
                <div className="section-intro animate">
                    <span className="text-subheading">Turn Awareness Data into Actionable Risk Intelligence</span>
                    <h2 className="text-52-heading">Turn Awareness Data into Actionable Risk Intelligence</h2>
                </div>

                <div className="features-grid">
                    
                    <div className="feature-card animate">
                        <div className="feature-visual">
                            <img alt="Workforce Risk Scoring" loading="lazy" src="/insat/images/awareness-section3.png" />
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">AI Risk Scoring</h3>
                            <p className="feature-desc">
                                AI-assisted user and team risk scores calculated from simulations, clicks, and quiz performance telemetry.
                            </p>
                        </div>
                    </div>

                    <div className="feature-card animate">
                        <div className="feature-visual bg-grey-30">
                            <img alt="Department risk heatmap" loading="lazy" src="/insat/images/Risk-Scoring-1.jpg" />
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">Department Heatmaps</h3>
                            <p className="feature-desc">
                                Spot vulnerable departments, weak office locations, and compliance training gaps at a glance.
                            </p>
                        </div>
                    </div>

                    <div className="feature-card animate">
                        <div className="feature-visual bg-aquamarine">
                            <img alt="Audit-ready compliance reports" loading="lazy" src="/insat/images/api-new-static.jpg" />
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">Executive & Board Reports</h3>
                            <p className="feature-desc">
                                Generate clear, structured logs and human risk telemetry suited for internal reviews and compliance audits.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. ALTERNATING GRID SECTIONS */}
        <section className="bg-white">
            <div className="container">
                <div className="section-intro animate" style={{textAlign: "center"}}>
                    <h2 className="text-64-heading">See and Prioritize Risk in Real Time</h2>
                </div>

                {/* Grid 1 */}
                <div className="two-col-grid" style={{marginTop: "4rem"}}>
                    <div className="two-col-content-block animate from-left">
                        <h2 className="text-40-heading">Departmental & Manager Reports</h2>
                        <div style={{marginTop: "1.5rem", opacity: "0.7"}}>
                            <p className="text-18-content">
                                Generate structured records of threat susceptibility tailored specifically to individual business units and manager scopes.
                            </p>
                        </div>

                        <Link className="arrow-link" href="/solutions/insat">
                            <div className="arrow-circle">
                                <span className="arrow-circle-bg"></span>
                                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                </svg>
                            </div>
                            <span>Explore Reporting Features</span>
                        </Link>
                    </div>
                    <div className="two-col-visual-block aspect-628-517 bg-grey animate from-right">
                        <img alt="Department risk telemetry charts" loading="lazy" src="/insat/images/Transfers.jpg" />
                    </div>
                </div>

                {/* Grid 2 */}
                <div className="two-col-grid reverse" style={{marginTop: "6rem"}}>
                    <div className="two-col-content-block animate from-right">
                        <h2 className="text-40-heading">AI Action Recommendations</h2>
                        <div style={{marginTop: "1.5rem", opacity: "0.7"}}>
                            <p className="text-18-content">
                                Receive automated, prioritised suggestions to deploy specific targeted reinforcement or phishing courses based on department click spikes.
                            </p>
                        </div>

                        <Link className="arrow-link" href="/solutions/insat">
                            <div className="arrow-circle">
                                <span className="arrow-circle-bg"></span>
                                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                </svg>
                            </div>
                            <span>View Recommended Actions</span>
                        </Link>
                    </div>
                    <div className="two-col-visual-block aspect-628-517 bg-midnight animate from-left">
                        <img alt="Monitor threats and recommendations" loading="lazy" src="/insat/images/Monitor-Paymentsmidnight.jpg" />
                    </div>
                </div>

                {/* Grid 3 */}
                <div className="two-col-grid" style={{marginTop: "6rem"}}>
                    <div className="two-col-content-block animate from-left">
                        <h2 className="text-40-heading">SOC 2 & ISO Compliance Verification</h2>
                        <div style={{marginTop: "1.5rem", opacity: "0.7"}}>
                            <p className="text-18-content">
                                Keep track of all mandatory compliance attestations, security awareness completions, and DPDP logs in a central dashboard.
                            </p>
                        </div>

                        <Link className="arrow-link" href="/solutions/insat">
                            <div className="arrow-circle">
                                <span className="arrow-circle-bg"></span>
                                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                </svg>
                            </div>
                            <span>Explore Compliance Ready Data</span>
                        </Link>
                    </div>
                    <div className="two-col-visual-block aspect-628-517 bg-plum animate from-right">
                        <img alt="SOC 2 framework verification logs" loading="lazy" src="/insat/images/Protection-1.jpg" />
                    </div>
                </div>

                {/* Grid 4 */}
                <div className="two-col-grid reverse" style={{marginTop: "6rem"}}>
                    <div className="two-col-content-block animate from-right">
                        <h2 className="text-40-heading">Campaign Impact Analytics</h2>
                        <div style={{marginTop: "1.5rem", opacity: "0.7"}}>
                            <p className="text-18-content">
                                Analyze click rates and response times before and after campaigns to measure security awareness improvement and risk reduction ROI.
                            </p>
                        </div>

                        <Link className="arrow-link" href="/solutions/insat">
                            <div className="arrow-circle">
                                <span className="arrow-circle-bg"></span>
                                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                </svg>
                            </div>
                            <span>Explore Threat Telemetry</span>
                        </Link>
                    </div>
                    <div className="two-col-visual-block aspect-628-517 bg-midnight animate from-left">
                        <img alt="Campaign pre post comparison telemetry" loading="lazy" src="/insat/images/Risk-Scoring-1.jpg" />
                    </div>
                </div>
            </div>
        </section>

        {/* 5. SLIDER SECTION */}
        <section className="bg-white">
            <div className="container">
                <div className="slider-container animate" id="testimonialsSlider">
                    <div className="slider-wrapper" ref={sliderWrapperRef}>

                        {/* Slide 1 */}
                        <div className="slide slide-quote-card">
                            <div className="testimonial-card bg-plum" style={{color: "var(--color-lavender)"}}>
                                <blockquote className="testimonial-quote">
                                    “InSAT is a true security awareness partner: not only is the training highly
                                    engaging for our teams, but it also delivers real behavior change and measurable
                                    risk reduction.”
                                </blockquote>
                                <div className="testimonial-author-row">
                                    <div className="testimonial-author-name">Katharina Schneider</div>
                                    <div className="testimonial-author-role">VP Security Strategy</div>
                                </div>
                                <div className="testimonial-footer">
                                    <Link className="arrow-link" href="/solutions/insat" style={{color: "var(--color-lavender)", marginTop: "0"}}>
                                        <div className="arrow-circle">
                                            <span className="arrow-circle-bg" style={{backgroundColor: "var(--color-white)"}}></span>
                                            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" style={{color: "var(--color-plum)"}} d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                            </svg>
                                        </div>
                                        <span>Read success story</span>
                                    </Link>
                                    <div className="testimonial-logo">
                                        <img alt="malt unbound" src="/insat/images/malt-unbound.svg" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide 2 */}
                        <div className="slide slide-promo-card">
                            <div className="testimonial-card bg-sky" style={{color: "var(--color-midnight)"}}>
                                <div className="testimonial-logo">
                                    <img alt="StaffMe Powered by NOWJOBS" src="/insat/images/StaffMe-Powered-by-NOWJOBS-Forest.svg" />
                                </div>
                                <div style={{marginTop: "3rem"}}>
                                    <h3 className="text-28-heading">StaffMe reduces phishing click rates by 80% with InSAT</h3>
                                    <Link className="arrow-link" href="/solutions/insat" style={{color: "var(--color-midnight)", marginTop: "2rem"}}>
                                        <div className="arrow-circle">
                                            <span className="arrow-circle-bg"></span>
                                            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                            </svg>
                                        </div>
                                        <span>Read success story</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Slide 3 */}
                        <div className="slide slide-quote-card">
                            <div className="testimonial-card bg-forest" style={{color: "var(--color-white)"}}>
                                <blockquote className="testimonial-quote">
                                    “InSAT is a 2.0, if not 3.0 security awareness solution, and it’s entirely evident.
                                    It has transformed our security culture into something our employees actually enjoy.”
                                </blockquote>
                                <div className="testimonial-author-row">
                                    <div className="testimonial-author-name">Antoine Bordalis</div>
                                    <div className="testimonial-author-role">CISO at Comet</div>
                                </div>
                                <div className="testimonial-footer">
                                    <Link className="arrow-link" href="/" style={{color: "var(--color-white)", marginTop: "0"}}>
                                        <div className="arrow-circle">
                                            <span className="arrow-circle-bg" style={{backgroundColor: "var(--color-white)"}}></span>
                                            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" style={{color: "var(--color-forest)"}} d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                            </svg>
                                        </div>
                                        <span>Learn more</span>
                                    </Link>
                                    <div className="testimonial-logo">
                                        <img alt="Comet White" src="/insat/images/Comet-White.svg" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide 4 */}
                        <div className="slide slide-promo-card">
                            <div className="testimonial-card bg-salmon" style={{color: "var(--color-brick)"}}>
                                <div className="testimonial-logo">
                                    <img alt="JUMP Brick" src="/insat/images/JUMP_Brick.svg" />
                                </div>
                                <div style={{marginTop: "3rem"}}>
                                    <h3 className="text-28-heading">Jump turns compliance training into everyday secure habits in less than 30 days with InSAT</h3>
                                    <Link className="arrow-link" href="/solutions/insat" style={{color: "var(--color-brick)", marginTop: "2rem"}}>
                                        <div className="arrow-circle">
                                            <span className="arrow-circle-bg" style={{backgroundColor: "var(--color-brick)"}}></span>
                                            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" style={{color: "var(--color-salmon)"}} d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                            </svg>
                                        </div>
                                        <span>Read success story</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="slider-controls">
                        <button type="button" className="slider-btn prev" id="sliderPrevBtn" aria-label="Previous Slide" disabled={prevDisabled} onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}>
                            <span className="slider-btn-ring"></span>
                            <span className="slider-btn-fill"></span>
                            <span className="slider-btn-inner"></span>
                            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.44095 7.0007L0.364258 1.92401L1.81474 0.473541L8.34188 7.0007L1.81474 13.5278L0.364258 12.0773L5.44095 7.0007Z" fill="var(--color-forest)" />
                            </svg>
                        </button>
                        <button type="button" className="slider-btn next" id="sliderNextBtn" aria-label="Next Slide" disabled={nextDisabled} onClick={() => currentIndex < 3 && setCurrentIndex(currentIndex + 1)}>
                            <span className="slider-btn-ring"></span>
                            <span className="slider-btn-fill"></span>
                            <span className="slider-btn-inner"></span>
                            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.44095 7.0007L0.364258 1.92401L1.81474 0.473541L8.34188 7.0007L1.81474 13.5278L0.364258 12.0773L5.44095 7.0007Z" fill="var(--color-forest)" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* 6. ROUNDED VIDEO CARD BOX */}
        <section className="bg-white" style={{paddingTop: "0", paddingBottom: "0"}}>
            <div className="container" style={{padding: "0"}}>
                <div className="rounded-card-box bg-forest">
                    
                    <div className="box-backdrop-visual">
                        <div className="visual-inner">
                            <video autoPlay loop playsInline muted width="100%" height="100%">
                                <source src="/insat/images/currencies.webm" type="video/webm" />
                                <source src="/insat/images/currencies-1.mov" type="video/quicktime" />
                            </video>
                        </div>
                    </div>

                    <div className="rounded-card-content animate">
                        <h2>See Your Workforce Risk Clearly</h2>
                        <p className="text-20-content rounded-card-desc">
                            Deliver continuous human risk telemetry, customized analytics, department scores, and automated recommendations.
                        </p>
                        <Link className="arrow-link" href="/solutions/insat" style={{color: "var(--color-white)", marginTop: "2rem"}}>
                            <div className="arrow-circle">
                                <span className="arrow-circle-bg" style={{backgroundColor: "var(--color-white)"}}></span>
                                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" style={{color: "var(--color-forest)"}} d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                </svg>
                            </div>
                            <span>Explore Platform Capabilities</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* 7. INTEGRATIONS TICKER */}
        <section className="bg-white" style={{paddingBottom: "0"}}>
            <div className="container">
                <div style={{textAlign: "center"}} className="animate">
                    <h2 className="text-40-heading">Integrate with Your IT & Security Stack</h2>
                    <p className="text-18-content opacity-70" style={{marginTop: "0.75rem", maxWidth: "523px", marginLeft: "auto", marginRight: "auto"}}>
                        Automate compliance management and human risk tracking. InSAT syncs with your directories, identity providers, SIEM systems, and HR tools.
                    </p>
                </div>
            </div>

            <div className="ticker-container animate">
                <div className="ticker-track ticker-forward">
                    <div className="ticker-item"><img alt="Microsoft 365" src="/insat/images/Frame-1000003126.svg" /></div>
                    <div className="ticker-item"><img alt="Google Workspace" src="/insat/images/Frame-1000003125.svg" /></div>
                    <div className="ticker-item"><img alt="Slack" src="/insat/images/Frame-1000003127.svg" /></div>
                    <div className="ticker-item"><img alt="Teams" src="/insat/images/Frame-1000003129.svg" /></div>
                    <div className="ticker-item"><img alt="LMS" src="/insat/images/Frame-1000003130.svg" /></div>
                    <div className="ticker-item"><img alt="SIEM" src="/insat/images/Frame-1000003131.svg" /></div>
                    <div className="ticker-item"><img alt="HRMS" src="/insat/images/Frame-1000003132.svg" /></div>
                    <div className="ticker-item"><img alt="Identity" src="/insat/images/Frame-1000003133.svg" /></div>
                    
                    <div className="ticker-item"><img alt="Microsoft 365" src="/insat/images/Frame-1000003126.svg" /></div>
                    <div className="ticker-item"><img alt="Google Workspace" src="/insat/images/Frame-1000003125.svg" /></div>
                    <div className="ticker-item"><img alt="Slack" src="/insat/images/Frame-1000003127.svg" /></div>
                    <div className="ticker-item"><img alt="Teams" src="/insat/images/Frame-1000003129.svg" /></div>
                    <div className="ticker-item"><img alt="LMS" src="/insat/images/Frame-1000003130.svg" /></div>
                    <div className="ticker-item"><img alt="SIEM" src="/insat/images/Frame-1000003131.svg" /></div>
                    <div className="ticker-item"><img alt="HRMS" src="/insat/images/Frame-1000003132.svg" /></div>
                    <div className="ticker-item"><img alt="Identity" src="/insat/images/Frame-1000003133.svg" /></div>
                </div>
                
                <div className="ticker-track ticker-reverse">
                    <div className="ticker-item"><img alt="LMS" src="/insat/images/Frame-1000003130.svg" /></div>
                    <div className="ticker-item"><img alt="SIEM" src="/insat/images/Frame-1000003131.svg" /></div>
                    <div className="ticker-item"><img alt="HRMS" src="/insat/images/Frame-1000003132.svg" /></div>
                    <div className="ticker-item"><img alt="Identity" src="/insat/images/Frame-1000003133.svg" /></div>
                    <div className="ticker-item"><img alt="Microsoft 365" src="/insat/images/Frame-1000003126.svg" /></div>
                    <div className="ticker-item"><img alt="Google Workspace" src="/insat/images/Frame-1000003125.svg" /></div>
                    <div className="ticker-item"><img alt="Slack" src="/insat/images/Frame-1000003127.svg" /></div>
                    <div className="ticker-item"><img alt="Teams" src="/insat/images/Frame-1000003129.svg" /></div>
                    
                    <div className="ticker-item"><img alt="LMS" src="/insat/images/Frame-1000003130.svg" /></div>
                    <div className="ticker-item"><img alt="SIEM" src="/insat/images/Frame-1000003131.svg" /></div>
                    <div className="ticker-item"><img alt="HRMS" src="/insat/images/Frame-1000003132.svg" /></div>
                    <div className="ticker-item"><img alt="Identity" src="/insat/images/Frame-1000003133.svg" /></div>
                    <div className="ticker-item"><img alt="Microsoft 365" src="/insat/images/Frame-1000003126.svg" /></div>
                    <div className="ticker-item"><img alt="Google Workspace" src="/insat/images/Frame-1000003125.svg" /></div>
                    <div className="ticker-item"><img alt="Slack" src="/insat/images/Frame-1000003127.svg" /></div>
                    <div className="ticker-item"><img alt="Teams" src="/insat/images/Frame-1000003129.svg" /></div>
                </div>
            </div>
        </section>

        {/* 8. EVERYTHING NEEDED SECTION */}
        <section className="bg-white">
            <div className="container">
                <div style={{display: "flex", flexDirection: "column", gap: "4rem"}}>

                    <div className="two-col-grid" style={{alignItems: "start"}}>
                        <div className="two-col-content-block" style={{maxWidth: "413px"}}>
                            <h2 className="text-40-heading">Everything Needed to Secure Your Human Layer</h2>
                        </div>

                        <div className="faq-list-col" style={{maxWidth: "652px", display: "flex", flexDirection: "column", gap: "2rem"}}>
                            
                            <div className="info-row">
                                <div className="info-icon-box">
                                    <img alt="Granular User Telemetry icon" src="/insat/images/Products.svg" />
                                </div>
                                <div className="info-card-text">
                                    <h3 className="text-22-heading">Granular User Telemetry</h3>
                                    <p className="info-desc">
                                        Monitor user security behaviour indicators, click response rates, and active simulation reporting actions over time.
                                    </p>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="info-icon-box">
                                    <img alt="Cross-Department Heatmaps icon" src="/insat/images/Products-1.svg" />
                                </div>
                                <div className="info-card-text">
                                    <h3 className="text-22-heading">Cross-Department Heatmaps</h3>
                                    <p className="info-desc">
                                        Compare susceptibility metrics and quiz outcomes by business departments to target reinforcement campaigns efficiently.
                                    </p>
                                </div>
                            </div>

                            <div className="info-row" style={{borderBottom: "none", paddingBottom: "0"}}>
                                <div className="info-icon-box">
                                    <img alt="Always-On compliance reporting icon" src="/insat/images/Products-2.svg" />
                                </div>
                                <div className="info-card-text">
                                    <h3 className="text-22-heading">Audit-Ready Attestations</h3>
                                    <p className="info-desc">
                                        Instantly export executive dashboards and training history packages designed to meet SOC 2, ISO 27001, and HIPAA verification standards.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="info-banner-visual">
                        <img alt="Human risk analytics platform dashboard overview" loading="lazy" src="/insat/images/api-new-static.jpg" />
                    </div>
                </div>
            </div>
        </section>

        {/* 9. STICKY LAYOUT SECTION */}
        <section className="bg-white">
            <div className="container">
                <div className="section-intro animate" style={{maxWidth: "740px"}}>
                    <h2 className="text-52-heading">Intelligence That Matches Real Employee Risk</h2>
                    <p className="text-20-content opacity-70" style={{marginTop: "1rem"}}>
                        Different departments face different threats. InSAT delivers relevant risk analytics and intelligence based on role, department, and behaviour.
                    </p>
                </div>

                <div className="grid-sticky-layout">
                    
                    <div className="sticky-col animate from-left">
                        <div className="sticky-inner-box">
                            <div className="sticky-text-wrapper">
                                <span className="text-subheading" style={{color: "var(--color-night)", opacity: "0.5"}}>Departmental Threat Intelligence</span>
                                <h3 className="text-40-heading" style={{marginTop: "1rem"}}>Customized telemetry tracking specific threat profiles for each department</h3>
                                <Link className="arrow-link" href="/solutions/insat">
                                    <div className="arrow-circle">
                                        <span className="arrow-circle-bg"></span>
                                        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                        </svg>
                                    </div>
                                    <span>Learn more</span>
                                </Link>
                            </div>
                            <div className="sticky-visual">
                                <img alt="Departmental threats dashboard mockup" loading="lazy" src="/insat/images/api-new-static.jpg" />
                            </div>
                        </div>
                    </div>

                    <div className="side-grid-col animate from-right">
                        
                        <div className="side-card">
                            <div className="side-card-text-wrapper">
                                <div className="side-card-title-row">
                                    <Link className="arrow-link" href="/solutions/insat" style={{marginTop: "0"}}>
                                        <div className="arrow-circle">
                                            <span className="arrow-circle-bg"></span>
                                            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                            </svg>
                                        </div>
                                        <span className="side-card-title">Finance & HR Risk Telemetry</span>
                                    </Link>
                                </div>
                                <p className="side-card-desc">
                                    <strong>Finance:</strong> Highlights risk indicators for invoice fraud, BEC redirection, and fake vendor requests.
                                    <br /><strong>HR:</strong> Identifies resume malware risks and handling of sensitive candidate documents.
                                </p>
                            </div>
                            <div className="side-card-visual bg-plum">
                                <img alt="Finance & HR risks illustration" loading="lazy" src="/insat/images/Protection-1.jpg" />
                            </div>
                        </div>

                        <div className="side-card">
                            <div className="side-card-text-wrapper">
                                <div className="side-card-title-row">
                                    <Link className="arrow-link" href="/solutions/insat" style={{marginTop: "0"}}>
                                        <div className="arrow-circle">
                                            <span className="arrow-circle-bg"></span>
                                            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                                            </svg>
                                        </div>
                                        <span className="side-card-title">Sales & IT Risk Telemetry</span>
                                    </Link>
                                </div>
                                <p className="side-card-desc">
                                    <strong>Sales:</strong> Impersonation attacks, mobile work threats, CRM credentials risk.
                                    <br /><strong>IT:</strong> Privileged credentials risk, cloud security awareness gaps, and SaaS connection alerts.
                                </p>
                            </div>
                            <div className="side-card-visual bg-plum">
                                <img alt="Sales & IT risks illustration" loading="lazy" src="/insat/images/Risk-Scoring-1.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 10. FAQ SECTION */}
        <section className="bg-grey-5">
            <div className="container faq-grid">
                <div className="faq-title-col animate from-left">
                    <h2 className="text-40-heading">We’re here to help</h2>
                    <a className="arrow-link" href="https://docs.insat.training/docs/getting-started" target="_blank" rel="noopener noreferrer" style={{marginTop: "1.25rem"}}>
                        <div className="arrow-circle">
                            <span className="arrow-circle-bg"></span>
                            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="M3.86426 4.00028L0.818237 0.954267L1.68853 0.0839844L5.60481 4.00028L1.68853 7.91652L0.818237 7.04625L3.86426 4.00028Z" />
                            </svg>
                        </div>
                        <span>Learn more</span>
                    </a>
                </div>

                <div className="faq-list-col animate from-right">
                    {faqData.map((faq, index) => (
                        <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                            <button type="button" className="faq-trigger" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                                <span className="faq-question">{faq.question}</span>
                                <div className="faq-icon-wrapper">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.1659 8.16671H1.83594V7.83337H14.1659V8.16671Z" stroke="var(--color-grey-30)" />
                                        <path d="M7.83463 14.1652L7.83464 1.83521L8.16797 1.83521L8.16797 14.1652L7.83463 14.1652Z" stroke="var(--color-grey-30)" />
                                    </svg>
                                </div>
                            </button>
                            <div className="faq-panel" style={{ maxHeight: activeFaq === index ? "120px" : "0px", opacity: activeFaq === index ? 1 : 0, transition: "max-height 0.4s ease, opacity 0.4s ease", overflow: "hidden" }}>
                                <div className="faq-panel-inner">
                                    <div className="faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 11. FINAL CTA SECTION (MATCHES PHISHING SIMULATION EXACTLY) */}
        <section className="cta" style={{ marginTop: "-3.5rem", paddingTop: "0", paddingBottom: "4rem" }}>
            <div className="container-xl">
              <div className="section relative px-4 text-center" style={{ isolation: "isolate", paddingTop: "4.5rem", paddingBottom: "4.5rem" }}>
                <div className="animate">
                  <h2 className="section-title leading-tight">
                    Ready to See Human Risk Clearly?
                  </h2>
                  <p className="mt-10 font-primary text-base text-slate-600 leading-relaxed" style={{ marginTop: "2.5rem" }}>
                    Use AI-assisted intelligence to uncover, prioritize, and reduce workforce risk.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mt-10" style={{ marginTop: "2.5rem" }}>
                    <Link href="/demo" className="btn btn-primary">
                      Book a Demo
                    </Link>
                    <Link href="/contact" className="btn btn-outline-primary">
                      Start Free
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
                  <Circle
                    className="left-[10%] top-12"
                    width={32}
                    height={32}
                    fill={false}
                    fillValue="#FF5A1F"
                  />
                  <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
                  <Circle
                    className="left-[15%] bottom-[35%]"
                    width={47}
                    height={47}
                    fill={false}
                    fillValue="#FF5A1F"
                  />

                  <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
                  <Circle
                    className="right-[2%] bottom-[30%]"
                    width={73}
                    height={73}
                    fill={false}
                    fillValue="#FF5A1F"
                  />
                  <Circle
                    className="right-[19%] bottom-[16%]"
                    width={37}
                    height={37}
                    fill={false}
                    fillValue="#FF5A1F"
                  />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </GSAPWrapper>
  );
};

export default HumanRiskIntelligencePage;
