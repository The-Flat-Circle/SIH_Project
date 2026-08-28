"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Menu, X, Sparkles } from "lucide-react";

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 pb-2 pointer-events-none">
      {/* Floating Glass Marble Pill Container */}
      <div
        className={`pointer-events-auto w-full max-w-6xl rounded-full transition-all duration-500 border relative overflow-hidden backdrop-blur-2xl ${
          scrolled
            ? "bg-stone-charcoal/70 border-temple-gold/30 shadow-[0_16px_40px_rgba(0,0,0,0.6)] py-2.5 px-6"
            : "bg-stone-charcoal/40 border-parchment/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-3.5 px-7"
        }`}
      >
        {/* Glass Marble Ambient Specular Reflection Line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-parchment/10 to-transparent pointer-events-none opacity-40 animate-pulse-slow" />
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-temple-gold/40 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          {/* Brand Logo & Emblem */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-temple-gold rounded-full px-2 py-1 transition-all"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full border border-temple-gold/50 bg-dusk-indigo/80 text-temple-gold shadow-[0_0_15px_rgba(201,151,62,0.3)] group-hover:scale-105 transition-transform">
              <span className="font-serif text-lg font-bold">Y</span>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-bold tracking-tight text-parchment group-hover:text-temple-gold transition-colors flex items-center gap-2">
                YATRA_FLOW
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-temple-gold/15 text-temple-gold border border-temple-gold/30">
                  SIH 2026
                </span>
              </span>
            </div>
          </a>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
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
              Pipeline
            </a>
            <a
              href="#dual-flow"
              className="text-sandstone hover:text-parchment transition-colors py-1 hover:border-b-2 hover:border-temple-gold"
            >
              Rerouting
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
              Impact
            </a>
          </nav>

          {/* Right Action: Clean Demo Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#dashboards"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-charcoal bg-gradient-to-r from-temple-gold to-temple-amber border border-temple-gold/60 rounded-full shadow-[0_0_20px_rgba(201,151,62,0.35)] hover:scale-105 active:scale-95 transition-all"
            >
              <Cpu className="w-3.5 h-3.5" />
              Live Demo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-sandstone hover:text-parchment hover:bg-dusk-indigo/50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-sandstone/20 mt-3 space-y-3 font-mono text-xs animate-in fade-in duration-200">
            <div className="flex flex-col space-y-2">
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
                Pipeline
              </a>
              <a
                href="#dual-flow"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sandstone hover:text-temple-gold py-1"
              >
                Rerouting
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
                Impact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
