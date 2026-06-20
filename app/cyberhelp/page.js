import React from "react";
import HeroSection from "./components/HeroSection";
import EmergencyBanner from "./components/EmergencyBanner";
import SectionCards from "./components/SectionCards";
import FaqSection from "./components/FaqSection";

export default function CyberhelpHome() {
  return (
    <>
      <HeroSection />
      <EmergencyBanner />
      <SectionCards />
      <FaqSection />
    </>
  );
}
