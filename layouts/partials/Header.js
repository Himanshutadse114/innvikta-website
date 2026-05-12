"use client";

import Logo from "@components/Logo";
import config from "@config/config.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { 
  FiChevronDown, 
  FiArrowRight, 
  FiCpu, 
  FiShield, 
  FiLayers, 
  FiActivity, 
  FiMonitor, 
  FiTrendingUp, 
  FiZap, 
  FiSmile, 
  FiAward, 
  FiGlobe, 
  FiBriefcase, 
  FiHeart, 
  FiLock, 
  FiCheckCircle, 
  FiPlay, 
  FiBookOpen, 
  FiFileText, 
  FiCalendar, 
  FiUsers, 
  FiMessageSquare, 
  FiMail, 
  FiMenu,
  FiSearch,
  FiPhone,
  FiHelpCircle,
  FiTarget,
  FiPieChart,
  FiBarChart2,
  FiCrosshair,
  FiAlertTriangle,
  FiBook,
  FiVideo,
  FiStar,
  FiDatabase,
  FiCloud,
  FiServer,
  FiSettings,
  FiSliders,
  FiTool,
  FiFolder,
  FiPenTool,
  FiMap,
  FiCompass,
  FiThumbsUp,
  FiCheck,
  FiKey
} from "react-icons/fi";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const headerRef = useRef(null);
  const [direction, setDirection] = useState(null);
  
  // Custom interactive search / language triggers
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const pathname = usePathname();
  const { logo } = config.site;

  // sticky header scroll listener
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const headerHeight = header.clientHeight + 100;
    let prevScroll = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollY > 20 ? setSticky(true) : setSticky(false);

      if (scrollY > headerHeight) {
        prevScroll > scrollY ? setDirection(-1) : setDirection(1);
        prevScroll = scrollY;
      } else {
        setDirection(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileTab = (tabName) => {
    if (mobileActiveTab === tabName) {
      setMobileActiveTab(null);
    } else {
      setMobileActiveTab(tabName);
    }
  };

  return (
    <>
      {/* Dynamic spacer supporting the dual-layer combined height */}
      <div className="header-height-fix"></div>
      
      <header
        className={`header flex flex-col ${sticky ? "header-sticky" : ""} ${
          direction === 1 && "unpinned"
        }`}
        ref={headerRef}
      >
        
        {/* =========================================================
            LAYER 1: TOP UTILITY BAR (Inspired by KnowBe4 Enterprise Layout)
            ========================================================= */}
        <div className="hidden lg:block w-full border-b border-orange-500/5 bg-transparent py-1.5 transition-all duration-300">
          <div className="container-xl flex items-center justify-between text-[11px] font-bold text-slate-500">
            
            {/* Left Info Headline Link */}
            <div className="flex items-center gap-3">
              <span className="bg-primary/10 text-primary font-extrabold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">NEW</span>
              <Link href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                InSAT Platform Release 2026: Human Behavior Analytics <FiArrowRight className="text-[10px]" />
              </Link>
            </div>

            {/* Right Side Utility Actions */}
            <div className="flex items-center gap-5">
              <Link href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                <FiPhone /> +1 (800) 555-0199
              </Link>
              <Link href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                <FiHelpCircle /> Support
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Contact Sales
              </Link>
              <span className="h-3 w-[1px] bg-slate-200"></span>
              
              {/* Language Switcher Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setLangOpen(!langOpen)}
                  onBlur={() => setTimeout(() => setLangOpen(false), 200)}
                  className="hover:text-primary transition-colors flex items-center gap-1 focus:outline-none"
                >
                  <FiGlobe /> English <FiChevronDown className="text-[9px]" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-[140px] bg-white border border-slate-100 rounded-lg shadow-xl py-1 z-50 animate-float-up">
                    {["English (US)", "Deutsch", "Français", "Español", "日本語"].map((lang, idx) => (
                      <button key={idx} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 hover:text-primary text-slate-600 font-semibold block transition-colors">
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="h-3 w-[1px] bg-slate-200"></span>
              <Link href="#" className="text-slate-700 hover:text-primary transition-colors font-extrabold">
                Customer Login
              </Link>
            </div>

          </div>
        </div>

        {/* =========================================================
            LAYER 2: MAIN NAVIGATION BAR (Contains Logo & Submenus)
            ========================================================= */}
        <div className="w-full py-3 lg:py-5 transition-all duration-300">
          <div className="container-xl flex items-center justify-between relative">
            
            {/* LOGO */}
            <div className="z-50">
              <Link href="/">
                <img 
                  src="/images/logo-main.png" 
                  alt="Innvikta" 
                  className="h-9 w-auto object-contain"
                />
              </Link>
            </div>

            {/* DESKTOP CORE NAVIGATION (Rich Columns and original content preserved) */}
            <ul className="hidden lg:flex items-center gap-1 xl:gap-1.5 ml-auto mr-3">
              
              {/* PLATFORM MEGA MENU */}
              <li className="group py-2">
                <span className="nav-link text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight">
                  Platform <FiChevronDown className="group-hover:rotate-180 duration-300 transition-transform text-xs text-slate-500 group-hover:text-primary" />
                </span>
                
                {/* PLATFORM DROPDOWN (4 columns) */}
                <div className="absolute left-6 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[1200px] glass-dropdown p-8 grid grid-cols-4 gap-8">
                    
                    {/* Column 1 - Core Platform */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiCpu className="text-lg animate-pulse group-hover/col:rotate-90 duration-500 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">InSAT Platform</h4>
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed mb-4">
                          AI-powered security awareness platform that transforms employee behavior.
                        </p>
                        <ul className="space-y-2">
                          {[
                            { name: "Security Awareness Training", icon: FiShield, href: "/security-awareness-training" },
                            { name: "Phishing Simulations", icon: FiMail, href: "#" },
                            { name: "Human Risk Dashboard", icon: FiActivity, href: "#" },
                            { name: "AI Adaptive Learning", icon: FiCpu, href: "#" },
                            { name: "Gamified Learning", icon: FiSmile, href: "#" },
                            { name: "Executive Reporting", icon: FiBarChart2, href: "#" },
                            { name: "Compliance Training", icon: FiCheckCircle, href: "#" }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href={link.href} className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-600 transition-colors">
                          See Platform Demo <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 2 - AI & Intelligence */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiShield className="text-lg group-hover/col:scale-110 duration-300 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Human Risk Intelligence</h4>
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed mb-4">
                          Real-time visibility into employee cyber risk and behavior maps.
                        </p>
                        <ul className="space-y-2">
                          {[
                            { name: "Risk Scoring", icon: FiTarget },
                            { name: "Behavioral Analytics", icon: FiPieChart },
                            { name: "Department Heatmaps", icon: FiMap },
                            { name: "Board Reports", icon: FiFileText },
                            { name: "Threat Intelligence", icon: FiAlertTriangle },
                            { name: "Risk Benchmarking", icon: FiCrosshair }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          Explore Dashboard <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 3 - Engagement & Learning */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiLayers className="text-lg group-hover/col:-translate-y-0.5 duration-300 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Employee Experience</h4>
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed mb-4">
                          Interactive training employees actually enjoy and participate in.
                        </p>
                        <ul className="space-y-2">
                          {[
                            { name: "Cybersecurity Arcade", icon: FiPlay },
                            { name: "Microlearning", icon: FiVideo },
                            { name: "Badges & XP System", icon: FiAward },
                            { name: "Leaderboards", icon: FiStar },
                            { name: "Adaptive Learning Paths", icon: FiCompass },
                            { name: "Story-Based Simulations", icon: FiBook }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          View Learning Experience <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 4 - Product Visual / Dashboard Preview */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group/card shadow-inner">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl group-hover/card:bg-orange-500/10 transition-all duration-500"></div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-orange-500/10 px-2 py-0.5 rounded-full">AI Live Dashboard</span>
                          <div className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                            <span className="text-[10px] text-slate-500 font-semibold">Simulation Active</span>
                          </div>
                        </div>

                        <div className="space-y-3 bg-white p-4 border border-slate-100 rounded-lg mb-4 shadow-md">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Risk Score Trend</span>
                            <span className="text-[10px] text-emerald-600 font-bold">-24% Safe</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[78%]"></div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-center pt-1">
                            <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                              <div className="text-slate-400 text-[8px] uppercase font-bold">Active Users</div>
                              <div className="text-slate-800 text-xs font-bold">1,482</div>
                            </div>
                            <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                              <div className="text-slate-400 text-[8px] uppercase font-bold">Simulations</div>
                              <div className="text-slate-800 text-xs font-bold">14.8k</div>
                            </div>
                          </div>
                        </div>

                        <h5 className="text-slate-800 text-sm font-bold mb-1">Human Security Insights</h5>
                        <p className="text-slate-500 text-[11px] leading-relaxed">
                          Deploy real-time phishing tests and monitor individual security behavior trends instantly.
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 mt-3">
                        <Link href="#" className="text-xs text-slate-800 hover:text-primary font-bold flex items-center gap-1 transition-colors">
                          Launch Sandbox Demo <FiArrowRight className="text-xs" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </li>

              {/* SOLUTIONS MEGA MENU */}
              <li className="group py-2">
                <span className="nav-link text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight">
                  Solutions <FiChevronDown className="group-hover:rotate-180 duration-300 transition-transform text-xs text-slate-500 group-hover:text-primary" />
                </span>
                
                {/* SOLUTIONS DROPDOWN (Balanced columns: Columns 1 & 2 standard, Column 3 Featured spans 2 columns) */}
                <div className="absolute left-6 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[1000px] glass-dropdown p-8 grid grid-cols-4 gap-8">
                    
                    {/* Column 1 - By Industry */}
                    <div className="flex flex-col justify-between col-span-1 group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiGlobe className="text-lg group-hover/col:animate-spin" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">By Industry</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "BFSI", icon: FiShield },
                            { name: "Healthcare", icon: FiHeart },
                            { name: "Government", icon: FiGlobe },
                            { name: "IT Services", icon: FiCpu },
                            { name: "SaaS Companies", icon: FiCloud },
                            { name: "Manufacturing", icon: FiSettings },
                            { name: "Education", icon: FiBookOpen }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          View All Industries <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 2 - By Need */}
                    <div className="flex flex-col justify-between col-span-1 group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiTrendingUp className="text-lg group-hover/col:translate-x-0.5 group-hover/col:-translate-y-0.5 duration-300 transition-all" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Use Cases</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "Phishing Prevention", icon: FiLock },
                            { name: "Human Risk Management", icon: FiActivity },
                            { name: "Compliance Training", icon: FiCheckCircle },
                            { name: "Security Culture Building", icon: FiUsers },
                            { name: "Remote Workforce Security", icon: FiGlobe },
                            { name: "Executive Risk Reporting", icon: FiBarChart2 }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          Explore Use Cases <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 3 - Featured card */}
                    <div className="col-span-2 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group/featured shadow-inner">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl group-hover/featured:bg-orange-500/10 transition-all duration-500"></div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-3 text-primary">
                          <FiZap className="text-lg animate-bounce" />
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-orange-500/10 px-2 py-0.5 rounded-full">Featured Highlight</span>
                        </div>
                        <h4 className="text-slate-900 text-xl font-bold mb-2">Turn Human Risk Into Human Strength</h4>
                        <p className="text-slate-500 text-xs leading-relaxed mb-6">
                          AI-native security awareness training with phishing simulations, adaptive learning paths, and real-time behavioral intelligence dashboards.
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-auto">
                        <Link href="#" className="px-5 py-2.5 text-xs font-bold text-white bg-primary hover:bg-orange-600 rounded-lg transition-all shadow-lg shadow-orange-500/20 whitespace-nowrap flex items-center gap-1">
                          Book a Demo <FiArrowRight className="text-xs" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </li>

              {/* INNVIKTA ARCADE MEGA MENU */}
              <li className="group py-2">
                <span className="nav-link text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight">
                  Innvikta Arcade <FiChevronDown className="group-hover:rotate-180 duration-300 transition-transform text-xs text-slate-500 group-hover:text-primary" />
                </span>
                
                <div className="absolute left-6 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[850px] glass-dropdown p-8 grid grid-cols-3 gap-8">
                    
                    {/* Left sub-column */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiAward className="text-lg group-hover/col:scale-110 duration-300 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Cyber Arcade</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "Cybersecurity Arcade", icon: FiPlay },
                            { name: "Microlearning", icon: FiVideo },
                            { name: "Badges & XP System", icon: FiAward }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <span className="text-primary text-[10px] font-bold uppercase tracking-wider">Level Up Skills</span>
                      </div>
                    </div>

                    {/* Right sub-column */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiSmile className="text-lg group-hover/col:rotate-12 duration-200 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Interactive Hub</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "Leaderboards", icon: FiStar },
                            { name: "Adaptive Learning Paths", icon: FiCompass },
                            { name: "Story-Based Simulations", icon: FiBook }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          View Learning Experience <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 3 - Arcade Highlight */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group/arcade-card shadow-inner text-center">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover/arcade-card:bg-orange-500/10 transition-all duration-500"></div>
                      
                      <div className="my-auto py-2">
                        <div className="text-3xl text-primary mb-2 flex justify-center animate-bounce"><FiPlay /></div>
                        <h5 className="text-slate-800 text-sm font-bold mb-1">Play & Learn Arcade</h5>
                        <p className="text-slate-500 text-[10px] leading-relaxed max-w-[180px] mx-auto">
                          High-engagement gamified simulations employees actually compete to complete.
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 mt-3">
                        <Link href="#" className="text-[10px] text-primary hover:text-orange-600 font-bold tracking-wider uppercase transition-colors">
                          Join Leaderboard →
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </li>

              {/* RESOURCES MEGA MENU */}
              <li className="group py-2">
                <span className="nav-link text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight">
                  Resources <FiChevronDown className="group-hover:rotate-180 duration-300 transition-transform text-xs text-slate-500 group-hover:text-primary" />
                </span>
                
                {/* RESOURCES DROPDOWN */}
                <div className="absolute left-6 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[1100px] glass-dropdown p-8 grid grid-cols-4 gap-8">
                    
                    {/* Column 1 - Learn */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiBookOpen className="text-lg group-hover/col:scale-105 duration-300 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Learning Center</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "Blog", icon: FiPenTool },
                            { name: "Cybersecurity Guides", icon: FiBook },
                            { name: "Security Awareness Playbooks", icon: FiFileText },
                            { name: "Phishing Examples 2026", icon: FiMail },
                            { name: "Human Risk Research", icon: FiActivity },
                            { name: "Compliance Guides", icon: FiShield }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          Visit Blog <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 2 - Research */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiFileText className="text-lg group-hover/col:-translate-y-0.5 duration-300 transition-all" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Research Hub</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "Security Benchmark Report", icon: FiBarChart2 },
                            { name: "ROI Reports", icon: FiTrendingUp },
                            { name: "Industry Research", icon: FiGlobe },
                            { name: "Threat Reports", icon: FiAlertTriangle },
                            { name: "Case Studies", icon: FiFolder },
                            { name: "Whitepapers", icon: FiFileText }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          Download Reports <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 3 - Community */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiCalendar className="text-lg group-hover/col:-rotate-6 duration-200 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Community</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "Webinars", icon: FiVideo },
                            { name: "Workshops", icon: FiUsers },
                            { name: "Podcasts", icon: FiPlay },
                            { name: "Product Updates", icon: FiZap },
                            { name: "Newsletter", icon: FiMail },
                            { name: "Security Awareness Events", icon: FiCalendar }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          Join Webinar <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 4 - Proof */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiUsers className="text-lg group-hover/col:scale-105 duration-300 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Proof & Trust</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "Customer Stories", icon: FiHeart },
                            { name: "Testimonials", icon: FiThumbsUp },
                            { name: "G2 Reviews", icon: FiStar },
                            { name: "Partner Network", icon: FiGlobe },
                            { name: "Success Metrics", icon: FiActivity }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          See Success Stories <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </li>

              {/* FREE TOOLS MEGA MENU */}
              <li className="group py-2">
                <span className="nav-link text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight">
                  Free Tools <FiChevronDown className="group-hover:rotate-180 duration-300 transition-transform text-xs text-slate-500 group-hover:text-primary" />
                </span>
                
                {/* FREE TOOLS DROPDOWN */}
                <div className="absolute left-6 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[1150px] glass-dropdown p-8 grid grid-cols-4 gap-8">
                    
                    {/* Column 1 - Risk Assessments */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiActivity className="text-lg group-hover/col:animate-[pulse_1s_infinite]" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Security Assessments</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "Security Awareness Maturity Calculator", icon: FiActivity },
                            { name: "Phishing Risk Assessment", icon: FiMail },
                            { name: "Human Risk Score Tool", icon: FiTarget },
                            { name: "Security Culture Benchmark", icon: FiUsers }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          Run Free Assessment <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 2 - Utilities */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiMonitor className="text-lg group-hover/col:scale-105 duration-300 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Free Cyber Tools</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "Password Exposure Checker", icon: FiKey },
                            { name: "Email Security Analyzer", icon: FiMail },
                            { name: "Compliance Readiness Checker", icon: FiCheckCircle },
                            { name: "Security ROI Calculator", icon: FiPieChart }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          Try Free Tools <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 3 - Templates */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiFileText className="text-lg group-hover/col:-translate-y-0.5 duration-300 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Templates</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "Phishing Templates", icon: FiMail },
                            { name: "Security Policies", icon: FiShield },
                            { name: "Incident Response Checklists", icon: FiFileText },
                            { name: "Awareness Campaign Planner", icon: FiCalendar }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          Download Templates <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 4 - Lead Acquisition Hero Card */}
                    <div className="bg-gradient-to-br from-orange-500/10 to-slate-50/50 border border-orange-200 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group/tools shadow-inner">
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-orange-500/5 rounded-full blur-xl group-hover/tools:bg-orange-500/10 transition-all duration-300"></div>
                      
                      <div>
                        
                        <h4 className="text-slate-900 text-base font-bold mb-1">Try InSAT up to 50 Users</h4>
                        <p className="text-slate-500 text-xs leading-relaxed mb-4">
                          Generate reports, benchmark risk, and improve employee security awareness instantly.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                        <Link href="#" className="w-full text-center py-2 text-xs font-bold text-white bg-primary hover:bg-orange-600 rounded-lg transition-colors whitespace-nowrap">
                          Book a Demo
                        </Link>
                        <Link href="#" className="w-full text-center py-2 text-xs font-bold text-slate-700 border border-slate-200 hover:border-slate-300 hover:text-slate-900 rounded-lg bg-white transition-colors whitespace-nowrap">
                          Explore Tools
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </li>

              {/* PRICING LINK */}
              <li className="py-2">
                <Link href="#" className="nav-link text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight">
                  Pricing
                </Link>
              </li>

              {/* COMPANY MEGA MENU */}
              <li className="group py-2">
                <span className="nav-link text-[15px] font-extrabold text-slate-800 hover:text-primary tracking-tight">
                  Company <FiChevronDown className="group-hover:rotate-180 duration-300 transition-transform text-xs text-slate-500 group-hover:text-primary" />
                </span>
                
                {/* COMPANY DROPDOWN */}
                <div className="absolute right-6 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="w-[850px] glass-dropdown p-8 grid grid-cols-3 gap-8">
                    
                    {/* Column 1 - About */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiBriefcase className="text-lg group-hover/col:-rotate-12 duration-300 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">About Us</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "About Innvikta", icon: FiBriefcase },
                            { name: "Our Mission", icon: FiHeart },
                            { name: "Leadership Team", icon: FiUsers },
                            { name: "Careers", icon: FiSmile },
                            { name: "Press & Media", icon: FiFileText }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          Learn About Us <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 2 - Partners */}
                    <div className="flex flex-col justify-between group/col">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600"><FiLayers className="text-lg group-hover/col:scale-110 duration-300 transition-transform" /></div>
                          <h4 className="text-slate-900 text-base font-bold whitespace-nowrap">Ecosystem</h4>
                        </div>
                        <ul className="space-y-2">
                          {[
                            { name: "Technology Partners", icon: FiCpu },
                            { name: "MSSP Program", icon: FiShield },
                            { name: "Channel Partners", icon: FiGlobe }
                          ].map((link, idx) => (
                            <li key={idx} className="group/sublink">
                              <Link href="#" className="flex items-center gap-2 text-slate-600 hover:text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                                <link.icon className="shrink-0 text-[10px] text-primary group-hover/sublink:text-primary group-hover/sublink:scale-110 group-hover/sublink:rotate-3 transition-all duration-300" />
                                <span className="group-hover/sublink:translate-x-1 transition-transform duration-300">{link.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <Link href="#" className="group/cta text-primary text-xs font-bold flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                          Become a Partner <FiArrowRight className="group-hover/cta:translate-x-1 duration-200 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 3 - Contact Highlights */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group/contact shadow-inner">
                      <div>
                        <div className="flex items-center gap-2 mb-3 text-primary">
                          <FiMail className="text-lg" />
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-orange-500/10 px-2 py-0.5 rounded-full">Get In Touch</span>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {["Contact Sales", "Book Demo"].map((link, idx) => (
                            <li key={idx}>
                              <Link href="#" className="text-slate-600 hover:text-primary text-xs font-semibold block whitespace-nowrap transition-colors duration-150">
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col gap-2 mt-auto">
                        <Link href="#" className="w-full text-center py-2 text-xs font-bold text-white bg-primary hover:bg-orange-600 rounded-lg transition-colors whitespace-nowrap">
                          Talk to Sales
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </li>

            </ul>

            {/* RIGHT SIDE STICKY CONVERSION AREA (Primary and Secondary CTAs + Search Trigger) */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Secondary CTA: Highlighted Premium "Start Free" Button */}
              <Link 
                href="#" 
                className="px-4 py-2.5 bg-orange-500/5 hover:bg-primary border-2 border-primary/30 hover:border-primary text-primary hover:text-white rounded-lg text-[13px] font-extrabold transition-all duration-300 shadow-sm hover:shadow-orange-500/25 flex items-center gap-1 hover:-translate-y-0.5"
              >
                Start Free
              </Link>

              {/* Primary CTA: High-Contrast Premium Filled "Book Demo" */}
              <Link 
                href="#" 
                className="px-5 py-2.5 bg-primary hover:bg-orange-600 text-white rounded-lg text-[13px] font-bold transition-all duration-300 shadow-md shadow-orange-500/15 flex items-center gap-1"
              >
                Book Demo <FiArrowRight className="text-xs" />
              </Link>

            </div>

            {/* MOBILE NAV TOGGLER */}
            <div className="flex items-center lg:hidden z-50">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-slate-800 hover:text-primary text-2xl transition-colors duration-200"
                aria-label="Toggle Menu"
              >
                {showMenu ? <CgClose /> : <FiMenu />}
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE NAVIGATION STRUCTURE (Accordion-based menu - Original Content Intact) */}
        <div className={`fixed inset-x-0 top-0 h-screen bg-white z-40 px-6 pt-24 pb-28 overflow-y-auto transition-all duration-500 lg:hidden flex flex-col justify-between ${
          showMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}>
          
          <div className="space-y-4">
            
            {/* Platform Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("platform")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Platform</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "platform" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "platform" ? "max-h-[500px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <div className="space-y-4 py-2">
                  <div>
                    <h5 className="text-primary text-xs uppercase tracking-widest font-bold mb-2">Core Platform</h5>
                    <ul className="space-y-2">
                      {["Security Awareness Training", "Phishing Simulations", "Human Risk Dashboard", "AI Adaptive Learning", "Gamified Learning", "Executive Reporting", "Compliance Training"].map((link, idx) => (
                        <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-primary text-xs uppercase tracking-widest font-bold mb-2">Risk Intelligence</h5>
                    <ul className="space-y-2">
                      {["Risk Scoring", "Behavioral Analytics", "Department Heatmaps", "Board Reports", "Threat Intelligence", "Risk Benchmarking"].map((link, idx) => (
                        <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("solutions")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Solutions</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "solutions" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "solutions" ? "max-h-[500px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <div className="space-y-4 py-2">
                  <div>
                    <h5 className="text-primary text-xs uppercase tracking-widest font-bold mb-2">By Industry</h5>
                    <ul className="space-y-2">
                      {["BFSI", "Healthcare", "Government", "IT Services", "SaaS Companies", "Manufacturing", "Education"].map((link, idx) => (
                        <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-primary text-xs uppercase tracking-widest font-bold mb-2">By Need</h5>
                    <ul className="space-y-2">
                      {["Phishing Prevention", "Human Risk Management", "Compliance Training", "Security Culture Building", "Remote Workforce Security", "Executive Risk Reporting"].map((link, idx) => (
                        <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Innvikta Arcade Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("arcade")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Innvikta Arcade</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "arcade" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "arcade" ? "max-h-[300px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <ul className="space-y-2 py-2">
                  {["Cybersecurity Arcade", "Microlearning", "Badges & XP System", "Leaderboards", "Adaptive Learning Paths", "Story-Based Simulations"].map((link, idx) => (
                    <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resources Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("resources")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Resources</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "resources" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "resources" ? "max-h-[400px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <ul className="space-y-2 py-2">
                  {["Blog", "Cybersecurity Guides", "Security Awareness Playbooks", "Phishing Examples 2026", "Human Risk Research", "Compliance Guides", "Security Benchmark Report", "ROI Reports", "Case Studies", "Webinars", "Workshops"].map((link, idx) => (
                    <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Free Tools Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("freetools")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Free Tools</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "freetools" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "freetools" ? "max-h-[300px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <ul className="space-y-2 py-2">
                  {["Security Awareness Maturity Calculator", "Phishing Risk Assessment", "Human Risk Score Tool", "Password Exposure Checker", "Email Security Analyzer", "Compliance Readiness Checker", "Security ROI Calculator"].map((link, idx) => (
                    <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing direct link */}
            <div className="border-b border-slate-100 pb-2">
              <Link href="#" className="w-full block text-left text-slate-800 text-base font-bold py-2" onClick={() => setShowMenu(false)}>
                Pricing
              </Link>
            </div>

            {/* Company Mobile Accordion */}
            <div className="border-b border-slate-100 pb-2">
              <button 
                onClick={() => toggleMobileTab("company")}
                className="w-full flex items-center justify-between text-left text-slate-800 text-base font-bold py-2"
              >
                <span>Company</span>
                <FiChevronDown className={`transform transition-transform duration-300 ${mobileActiveTab === "company" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${mobileActiveTab === "company" ? "max-h-[250px] opacity-100 mt-2 pl-4" : "max-h-0 opacity-0"}`}>
                <ul className="space-y-2 py-2">
                  {["About Innvikta", "Our Mission", "Leadership Team", "Careers", "Press & Media", "Technology Partners", "MSSP Program", "Contact Sales"].map((link, idx) => (
                    <li key={idx}><Link href="#" className="text-slate-600 text-sm hover:text-slate-900 block" onClick={() => setShowMenu(false)}>{link}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* BOTTOM MOBILE STICKY CONVERSION BUTTONS */}
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 mt-6">
            <Link 
              href="#" 
              onClick={() => setShowMenu(false)}
              className="w-full text-center py-3 bg-primary text-white font-bold rounded-xl text-base shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-colors"
            >
              Book Demo
            </Link>
          </div>

        </div>

      </header>
    </>
  );
};

export default Header;
