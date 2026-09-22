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
import PilgrimMobileApp from "@/components/PilgrimMobileApp";
import { Smartphone, Monitor } from "lucide-react";

export default function Home() {
  const [densityLevel, setDensityLevel] = useState<"low" | "moderate" | "high" | "critical">("high");
  const [viewMode, setViewMode] = useState<"web" | "app">("web");

  return (
    <main className="min-h-screen bg-stone-charcoal text-parchment relative selection:bg-temple-gold selection:text-stone-charcoal">
      {/* View Mode Switcher Header Bar */}
      <div className="bg-stone-dark border-b border-sandstone/20 py-2 px-4 z-50 sticky top-0 backdrop-blur-md flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-sandstone hidden sm:inline">VIEW MODE:</span>
          <span className="text-temple-gold font-bold uppercase">{viewMode === "web" ? "Full Web Platform" : "Pilgrim Mobile App"}</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-charcoal border border-sandstone/20">
          <button
            onClick={() => setViewMode("web")}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === "web"
                ? "bg-temple-gold text-stone-charcoal font-bold"
                : "text-sandstone hover:text-parchment"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Web View</span>
          </button>

          <button
            onClick={() => setViewMode("app")}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
              viewMode === "app"
                ? "bg-temple-gold text-stone-charcoal font-bold"
                : "text-sandstone hover:text-parchment"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App Mode</span>
          </button>
        </div>
      </div>

      {viewMode === "app" ? (
        <div className="py-6 px-2 bg-stone-dark min-h-screen">
          <PilgrimMobileApp />
        </div>
      ) : (
        <>
          {/* Fixed Header */}
          <Navbar />

          {/* Main Page Sections */}
          <HeroSection densityLevel={densityLevel} setDensityLevel={setDensityLevel} />
          <ProblemSection />
          <PipelineSection />
          <DualSolutionSection />
          <DashboardsPreviewSection />
          <ImpactKPISection />

          {/* Footer */}
          <Footer />
        </>
      )}
    </main>
  );
}
