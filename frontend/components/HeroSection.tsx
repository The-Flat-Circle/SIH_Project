"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Users, Activity, Play, Pause, ArrowUpRight, ShieldCheck, MapPin } from "lucide-react";
import TempleDigitalTwin, { SupportedSite } from "./3d/TempleDigitalTwin";

interface HeroSectionProps {
  densityLevel?: "low" | "moderate" | "high" | "critical";
  setDensityLevel?: (level: "low" | "moderate" | "high" | "critical") => void;
}

const DESTINATIONS: { id: SupportedSite; name: string }[] = [
  { id: "puri", name: "Puri Shree Mandira" },
  { id: "vaishnodevi", name: "Mata Vaishno Devi" },
  { id: "tirupati", name: "Tirupati Balaji" },
  { id: "varanasi", name: "Kashi Vishwanath" },
  { id: "kedarnath", name: "Kedarnath Dham" },
  { id: "siddhivinayak", name: "Siddhivinayak Mumbai" },
];

export default function HeroSection({
  densityLevel: externalDensity,
  setDensityLevel: externalSetDensity,
}: HeroSectionProps) {
  const [internalDensityLevel, setInternalDensityLevel] = useState<"low" | "moderate" | "high" | "critical">("high");
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [selectedSite, setSelectedSite] = useState<SupportedSite>("puri");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const densityLevel = externalDensity || internalDensityLevel;
  const setDensityLevel = externalSetDensity || setInternalDensityLevel;

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
  }, [isSimulating, setDensityLevel]);

  const activeDestObj = DESTINATIONS.find((d) => d.id === selectedSite) || DESTINATIONS[0];

  return (
    <section className="relative min-h-screen pt-28 pb-12 bg-stone-charcoal temple-grid-pattern flex flex-col justify-center overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline, Value Proposition, Destination Selector */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Headline Ticker */}
            <div className="min-h-[130px] sm:min-h-[150px] flex flex-col justify-start">
              <div className="h-[46px] sm:h-[54px] overflow-hidden relative">
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

            {/* Subheading Paragraph */}
            <p className="text-sandstone text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              An intelligent 3D Digital Twin and predictive AI system for high-density pilgrimage destinations. Forecast 15-minute crowd surges and balance internal gate loads.
            </p>

            {/* Pilgrimage Destination Selector (Placed below the paragraph) */}
            <div className="flex flex-col space-y-2 pt-1">
              <span className="text-[10px] font-mono text-sandstone/70 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-temple-gold" /> PILGRIMAGE DESTINATIONS (6 SITES ACTIVE):
              </span>
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-stone-charcoal/90 border border-sandstone/30 backdrop-blur-md max-w-xl">
                {DESTINATIONS.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedSite(dest.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedSite === dest.id
                        ? "bg-temple-gold text-stone-charcoal shadow-md"
                        : "text-sandstone hover:text-parchment hover:bg-stone-charcoal/60"
                    }`}
                  >
                    {dest.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons & Simulator Toggle */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#dual-solution"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-temple-gold text-stone-charcoal font-semibold text-sm hover:bg-temple-light transition-all shadow-temple-glow group"
              >
                <span>Explore Live Rerouting</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-dusk-card/80 border border-sandstone/30 text-sandstone text-xs font-mono hover:text-parchment hover:border-sandstone/60 transition-all backdrop-blur-sm"
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
            <div className="pt-3 grid grid-cols-3 gap-3 max-w-lg border-t border-sandstone/15">
              <div>
                <span className="text-[10px] font-mono text-sandstone/70 block uppercase">
                  {activeDestObj.name.split(" ")[0]} SURGE
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-parchment">
                  {densityLevel === "critical" ? "94.0%" : "52.0%"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-sandstone/70 block uppercase">ALT REROUTE</span>
                <span className="font-mono text-sm sm:text-base font-bold text-emerald-400">
                  {selectedSite === "vaishnodevi" ? "Bhairon Ropeway" : selectedSite === "puri" ? "Gate B (Ashwa)" : "Gate 02 East"}
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
            {/* R3F 3D Model Component */}
            <TempleDigitalTwin
              densityLevel={densityLevel}
              selectedSite={selectedSite}
              onSelectSite={(s) => setSelectedSite(s)}
            />

            {/* Caption Note */}
            <div className="mt-2 text-right">
              <span className="text-[10px] font-mono text-sandstone/60">
                Interactive 3D Digital Twin • Drag to rotate
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
