"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, ShieldCheck, MapPin, Eye, Zap, Layers, Sparkles } from "lucide-react";

// Dynamically import 3D Canvas to prevent SSR hydration mismatches
const TempleDigitalTwin = dynamic(() => import("./3d/TempleDigitalTwin"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-2xl bg-stone-charcoal/90 border border-sandstone/20 flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-temple-gold border-t-transparent animate-spin" />
      <span className="text-xs font-mono text-sandstone/80">ASSEMBLING 3D TEMPLE DIGITAL TWIN...</span>
    </div>
  ),
});

interface HeroSectionProps {
  densityLevel: "low" | "moderate" | "high" | "critical";
  setDensityLevel: (level: "low" | "moderate" | "high" | "critical") => void;
}

export default function HeroSection({ densityLevel, setDensityLevel }: HeroSectionProps) {
  const heritageSites = [
    { name: "Jagannath Temple, Puri", status: "FLAGSHIP PILOT", active: true },
    { name: "Tirupati Balaji", status: "MAPPED", active: false },
    { name: "Vaishno Devi", status: "MAPPED", active: false },
    { name: "Kashi Vishwanath", status: "MAPPED", active: false },
    { name: "Kedarnath Dham", status: "MAPPED", active: false },
  ];

  return (
    <section id="overview" className="relative min-h-screen pt-28 pb-16 overflow-hidden temple-grid-pattern">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-temple-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-vermilion/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Operational Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sandstone/30 bg-dusk-indigo/40 text-xs font-mono text-parchment mb-6 backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-temple-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-temple-gold"></span>
          </span>
          <span className="text-sandstone">SIH 2026 BENCHMARK PLATFORM</span>
          <span className="text-sandstone/40">|</span>
          <span className="text-temple-gold font-semibold">PILGRIMAGE FLOW ENGINE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Pitch */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-parchment tracking-tight">
              Predict crowd congestion. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-temple-gold via-parchment to-temple-amber italic font-semibold">
                Redistribute tourism flow
              </span>{" "}
              in real-time.
            </h1>

            <p className="text-base sm:text-lg text-sandstone font-normal leading-relaxed max-w-xl">
              An AI-powered smart tourism platform that continuously monitors CCTV feeds at sacred heritage destinations, predicts bottleneck queues before they form, enables internal gate rerouting, and dynamically redistributes visitors into the wider local tourism ecosystem.
            </p>

            {/* Target Pilgrimage Locations Pills */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono tracking-widest text-sandstone/70 uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-temple-gold" /> Supported Heritage Ecosystems:
              </span>
              <div className="flex flex-wrap gap-2">
                {heritageSites.map((site) => (
                  <span
                    key={site.name}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono border transition-all ${
                      site.active
                        ? "bg-dusk-indigo text-temple-gold border-temple-gold/50 font-semibold"
                        : "bg-stone-dark/60 text-sandstone/80 border-sandstone/20"
                    }`}
                  >
                    {site.name}
                    {site.active && <span className="w-1.5 h-1.5 rounded-full bg-temple-gold animate-pulse" />}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Density Simulation Control Panel */}
            <div className="p-4 rounded-xl border border-sandstone/25 bg-dusk-indigo/40 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-parchment font-semibold flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-temple-gold" /> LIVE CROWD LOAD SIMULATOR
                </span>
                <span className="text-sandstone/80 uppercase">GATE_A STATUS: {densityLevel}</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {(["low", "moderate", "high", "critical"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDensityLevel(level)}
                    className={`py-2 px-2 text-xs font-mono rounded-lg border text-center transition-all ${
                      densityLevel === level
                        ? level === "critical"
                          ? "bg-vermilion text-parchment border-vermilion shadow-vermilion-glow font-bold"
                          : "bg-temple-gold text-stone-charcoal border-temple-gold shadow-temple-glow font-bold"
                        : "bg-stone-charcoal/80 text-sandstone border-sandstone/20 hover:border-sandstone/50"
                    }`}
                  >
                    {level.toUpperCase()}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-sandstone/70 font-mono italic">
                * Click to change live crowd density and see how 3D particles & gate rerouting rules respond.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#dual-flow"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono font-bold uppercase tracking-wider text-stone-charcoal bg-temple-gold hover:bg-temple-amber transition-all shadow-temple-glow active:scale-95"
              >
                Explore Rerouting Flow
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#pipeline"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono tracking-wider text-parchment border border-sandstone/30 hover:border-temple-gold/60 bg-stone-dark/50 transition-all"
              >
                System Architecture
              </a>
            </div>
          </div>

          {/* Right Column: 3D Digital Twin Centerpiece */}
          <div className="lg:col-span-6 relative">
            <TempleDigitalTwin densityLevel={densityLevel} />
          </div>
        </div>
      </div>
    </section>
  );
}
