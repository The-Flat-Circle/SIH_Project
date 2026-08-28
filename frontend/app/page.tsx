"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import PipelineSection from "@/components/PipelineSection";
import DualSolutionSection from "@/components/DualSolutionSection";
import DashboardsPreviewSection from "@/components/DashboardsPreviewSection";
import ImpactKPISection from "@/components/ImpactKPISection";
import Footer from "@/components/Footer";

export default function Home() {
  const [densityLevel, setDensityLevel] = useState<"low" | "moderate" | "high" | "critical">("high");

  return (
    <main className="min-h-screen bg-stone-charcoal text-parchment relative selection:bg-temple-gold selection:text-stone-charcoal">
      {/* Fixed Header */}
      <Navbar densityLevel={densityLevel} setDensityLevel={setDensityLevel} />

      {/* Main Page Sections */}
      <HeroSection densityLevel={densityLevel} setDensityLevel={setDensityLevel} />
      <ProblemSection />
      <PipelineSection />
      <DualSolutionSection />
      <DashboardsPreviewSection />
      <ImpactKPISection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
