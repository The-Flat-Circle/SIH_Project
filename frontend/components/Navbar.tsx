"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Menu, X, LogIn } from "lucide-react";
import Link from "next/link";

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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-stone-charcoal/85 backdrop-blur-xl border-b border-sandstone/20 py-3 shadow-2xl"
          : "bg-gradient-to-b from-stone-charcoal/90 via-stone-charcoal/60 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Emblem */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-temple-gold rounded-lg p-1"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded border border-temple-gold/50 bg-dusk-indigo/80 text-temple-gold group-hover:border-temple-gold transition-colors shadow-temple-glow">
              <span className="font-serif text-xl font-bold tracking-tighter">Y</span>
              <span className="absolute -bottom-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-tight text-parchment group-hover:text-temple-gold transition-colors flex items-center gap-2">
                YATRA_FLOW
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-temple-gold/15 text-temple-gold border border-temple-gold/30">
                  SIH 2026
                </span>
              </span>
              <span className="text-[10px] font-mono tracking-wider text-sandstone/80 uppercase">
                Puri Destination Engine
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation Anchors */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase font-medium">
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

          {/* Right Corner Buttons: Admin Login & Live Demo */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono text-parchment hover:text-temple-gold bg-stone-dark/80 hover:bg-stone-dark border border-sandstone/30 hover:border-temple-gold/60 rounded-lg transition-all shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-temple-gold" />
              Admin Login
            </Link>

            <a
              href="#dashboards"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-charcoal bg-temple-gold hover:bg-temple-amber border border-temple-gold rounded-lg transition-all shadow-temple-glow active:scale-95"
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

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-sandstone/20 mt-3 space-y-3 font-mono text-xs animate-in fade-in duration-200">
            <div className="flex flex-col space-y-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left text-temple-gold font-bold py-1 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Admin Login / Sign In
              </Link>
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
