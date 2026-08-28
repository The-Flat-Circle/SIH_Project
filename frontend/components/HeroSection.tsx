"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Users, Activity, Play, Pause, ArrowUpRight, ShieldCheck, MapPin } from "lucide-react";
import TempleDigitalTwin from "./3d/TempleDigitalTwin";

export default function HeroSection() {
  const [densityLevel, setDensityLevel] = useState<"low" | "moderate" | "high" | "critical">("high");
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [selectedSite, setSelectedSite] = useState<"puri" | "vaishnodevi">("puri");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  // Elderly-Friendly, Simple Phrasing Ticker
  const simplePhrases = [
    "Predict crowd congestion.",
    "Avoid long queue lines.",
    "Find easy temple entry.",
    "Plan peaceful visits.",
    "Check live waiting time.",
    "Discover nearby spots.",
  ];

  // Rotate text ticker every 3.2 seconds
  useEffect(() => {
    const tickerTimer = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % simplePhrases.length);
    }, 3200);
    return () => clearInterval(tickerTimer);
  }, [simplePhrases.length]);

  // Simulate dynamic crowd density shifts
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      const levels: Array<"low" | "moderate" | "high" | "critical"> = [
        "low",
        "moderate",
        "high",
        "critical",
      ];
      const randomIndex = Math.floor(Math.random() * levels.length);
      setDensityLevel(levels[randomIndex]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const densityBadgeConfig = {
    low: { label: "LOW LOAD (15-25%)", color: "bg-emerald-950/90 text-emerald-400 border-emerald-500/50" },
    moderate: { label: "MODERATE (50-65%)", color: "bg-temple-gold/20 text-temple-gold border-temple-gold/50" },
    high: { label: "HIGH SURGE (80-88%)", color: "bg-amber-950/90 text-amber-400 border-amber-500/50" },
    critical: { label: "CRITICAL OVERLOAD (94%+)", color: "bg-red-950/90 text-red-400 border-red-500 animate-pulse" },
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 bg-stone-charcoal temple-grid-pattern flex flex-col justify-center overflow-hidden">
      {/* Calm Temple Photo Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/jagannathpuriimage.jpg"
          alt="Shree Jagannath Puri Temple Backdrop"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.1] transition-all duration-700"
        />
        {/* Soft Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-charcoal/85 via-stone-charcoal/60 to-stone-charcoal/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,151,62,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Top Destination Selector Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-stone-charcoal/90 border border-sandstone/30 text-xs font-mono text-sandstone backdrop-blur-md">
              <span className="flex items-center gap-1.5 text-temple-gold font-semibold">
                <MapPin className="w-3.5 h-3.5" /> DESTINATION:
              </span>
              <button
                onClick={() => setSelectedSite("puri")}
                className={`px-2 py-0.5 rounded transition-all ${
                  selectedSite === "puri"
                    ? "bg-temple-gold text-stone-charcoal font-bold"
                    : "hover:text-parchment"
                }`}
              >
                Puri Shree Mandira
              </button>
              <span className="text-sandstone/40">|</span>
              <button
                onClick={() => setSelectedSite("vaishnodevi")}
                className={`px-2 py-0.5 rounded transition-all ${
                  selectedSite === "vaishnodevi"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "hover:text-parchment"
                }`}
              >
                Mata Vaishno Devi
              </button>
            </div>

            {/* Headline Ticker */}
            <div className="min-h-[140px] sm:min-h-[160px] flex flex-col justify-start">
              <div className="h-[48px] sm:h-[56px] overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentPhraseIndex}
                    initial={{ y: 35, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -35, opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-parchment tracking-tight leading-tight absolute top-0 left-0"
                  >
                    {simplePhrases[currentPhraseIndex]}
                  </motion.h1>
                </AnimatePresence>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-parchment tracking-tight leading-tight mt-1">
                Optimized <span className="italic text-temple-gold">visitor flow</span>.
              </h2>
            </div>

            {/* Subheading */}
            <p className="text-sandstone text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              An intelligent 3D Digital Twin and predictive AI system for high-density pilgrimage destinations. Forecast 15-minute crowd surges and balance internal gate loads.
            </p>

            {/* Action Buttons & Simulator Toggle */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#dual-solution"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-temple-gold text-stone-charcoal font-semibold text-sm hover:bg-temple-light transition-all shadow-temple-glow group"
              >
                <span>Explore Live Rerouting</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-dusk-card/80 border border-sandstone/30 text-sandstone text-xs font-mono hover:text-parchment hover:border-sandstone/60 transition-all backdrop-blur-sm"
              >
                {isSimulating ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pause Load Sim</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Resume Sim</span>
                  </>
                )}
              </button>
            </div>

            {/* Real-time Telemetry Bar */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg border-t border-sandstone/15">
              <div>
                <span className="text-[10px] font-mono text-sandstone/70 block uppercase">
                  {selectedSite === "vaishnodevi" ? "BHAWAN SURGE" : "SINGHADWARA"}
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-parchment">
                  {densityLevel === "critical" ? "94.0%" : "52.0%"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-sandstone/70 block uppercase">ALT REROUTE</span>
                <span className="font-mono text-sm sm:text-base font-bold text-emerald-400">
                  {selectedSite === "vaishnodevi" ? "Bhairon Ropeway" : "Gate B (Ashwa)"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-sandstone/70 block uppercase">WAIT TIME</span>
                <span className="font-mono text-sm sm:text-base font-bold text-temple-gold">
                  {densityLevel === "critical" ? "45 mins" : "12 mins"}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Digital Twin Container */}
          <div className="lg:col-span-6 relative">
            
            {/* Live Indicator Pill */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <div
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono backdrop-blur-md transition-all ${
                  densityBadgeConfig[densityLevel].color
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                  <span className="font-bold">{densityBadgeConfig[densityLevel].label}</span>
                </div>
              </div>
            </div>

            {/* R3F 3D Model Component */}
            <TempleDigitalTwin
              densityLevel={densityLevel}
              selectedSite={selectedSite}
              onSelectSite={(s) => setSelectedSite(s)}
            />

            {/* Caption Note */}
            <div className="mt-3 text-right">
              <span className="text-[11px] font-mono text-sandstone/60">
                Interactive 3D Digital Twin • Drag to rotate camera
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
