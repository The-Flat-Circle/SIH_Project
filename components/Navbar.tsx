"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Activity, Menu, X, Cpu } from "lucide-react";

interface NavbarProps {
  densityLevel: "low" | "moderate" | "high" | "critical";
  setDensityLevel: (level: "low" | "moderate" | "high" | "critical") => void;
}

export default function Navbar({ densityLevel, setDensityLevel }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const densityBadgeColors = {
    low: "bg-emerald-950/80 text-emerald-300 border-emerald-700/50",
    moderate: "bg-amber-950/80 text-amber-300 border-amber-700/50",
    high: "bg-orange-950/80 text-orange-300 border-orange-700/50",
    critical: "bg-vermilion-dark/90 text-red-200 border-vermilion/60 animate-pulse",
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-stone-charcoal/95 backdrop-blur-md border-b border-sandstone/20 py-3 shadow-xl"
          : "bg-gradient-to-b from-stone-charcoal/90 via-stone-charcoal/50 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Emblem */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-temple-gold rounded-lg p-1">
            <div className="relative flex items-center justify-center w-10 h-10 rounded border border-temple-gold/40 bg-dusk-indigo/60 text-temple-gold group-hover:border-temple-gold transition-colors">
              <span className="font-serif text-xl font-bold tracking-tighter">Y</span>
              <span className="absolute -bottom-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-tight text-parchment group-hover:text-temple-gold transition-colors flex items-center gap-1.5">
                YATRA_FLOW
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-temple-gold/15 text-temple-gold border border-temple-gold/30">
                  SIH'26
                </span>
              </span>
              <span className="text-[10px] font-mono tracking-wider text-sandstone/70 uppercase">
                Puri Destination Twin
              </span>
            </div>
          </a>

          {/* Desktop Nav Anchors */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a
              href="#overview"
              className="text-sandstone hover:text-parchment transition-colors py-1 hover:border-b-2 hover:border-temple-gold"
            >
              Overview
            </a>
            <a
              href="#pipeline"
              className="text-sandstone hover:text-parchment transition-colors py-1 hover:border-b-2 hover:border-temple-gold"
            >
              How It Works
            </a>
            <a
              href="#dual-flow"
              className="text-sandstone hover:text-parchment transition-colors py-1 hover:border-b-2 hover:border-temple-gold"
            >
              Dual Rerouting
            </a>
            <a
              href="#dashboards"
              className="text-sandstone hover:text-parchment transition-colors py-1 hover:border-b-2 hover:border-temple-gold"
            >
              Dashboards
            </a>
            <a
              href="#impact"
              className="text-sandstone hover:text-parchment transition-colors py-1 hover:border-b-2 hover:border-temple-gold"
            >
              Impact KPI
            </a>
          </nav>

          {/* Live Density Simulator Control Badge */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-stone-dark/80 text-xs font-mono">
              <Activity className="w-3.5 h-3.5 text-temple-gold animate-pulse" />
              <span className="text-sandstone/80">SIMULATED LOAD:</span>
              <div className="flex gap-1 bg-stone-charcoal/90 p-0.5 rounded border border-sandstone/20">
                {(["low", "moderate", "high", "critical"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDensityLevel(level)}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded uppercase transition-all ${
                      densityLevel === level
                        ? "bg-temple-gold text-stone-charcoal font-bold shadow"
                        : "text-sandstone/60 hover:text-parchment"
                    }`}
                  >
                    {level[0]}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="#dashboards"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-stone-charcoal bg-temple-gold hover:bg-temple-amber border border-temple-gold rounded transition-all shadow-temple-glow active:scale-95"
            >
              <Cpu className="w-3.5 h-3.5" />
              Live Demo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-sandstone hover:text-parchment hover:bg-dusk-indigo/50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-charcoal/98 border-b border-sandstone/20 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-sandstone/15">
            <span className="text-xs font-mono text-sandstone">SIMULATE CROWD LEVEL</span>
            <div className="flex gap-1.5">
              {(["low", "moderate", "high", "critical"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDensityLevel(level)}
                  className={`px-2.5 py-1 text-xs font-mono rounded uppercase ${
                    densityLevel === level
                      ? "bg-temple-gold text-stone-charcoal font-bold"
                      : "bg-dusk-indigo/60 text-sandstone"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-3 font-medium text-sm">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sandstone hover:text-temple-gold py-1"
            >
              Overview
            </a>
            <a
              href="#pipeline"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sandstone hover:text-temple-gold py-1"
            >
              How It Works
            </a>
            <a
              href="#dual-flow"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sandstone hover:text-temple-gold py-1"
            >
              Dual Rerouting
            </a>
            <a
              href="#dashboards"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sandstone hover:text-temple-gold py-1"
            >
              Dashboards
            </a>
            <a
              href="#impact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sandstone hover:text-temple-gold py-1"
            >
              Impact KPI
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
