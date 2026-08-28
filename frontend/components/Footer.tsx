"use client";

import React from "react";
import { ShieldCheck, Cpu, Github, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-charcoal text-sandstone border-t border-sandstone/20 pt-16 pb-12 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded border border-temple-gold/40 bg-dusk-indigo text-temple-gold font-serif font-bold text-lg">
                Y
              </div>
              <span className="font-serif text-xl font-bold text-parchment tracking-tight">
                YATRA_FLOW
              </span>
            </div>

            <p className="text-xs text-sandstone/70 leading-relaxed font-normal max-w-sm">
              Adaptive Crowd Management & Visitor Flow Optimization Platform for Pilgrimage and Heritage Tourism Networks. Engineered for Smart India Hackathon 2026.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-temple-gold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>FLAGSHIP DEPLOYMENT TARGET: PURI SHREE MANDIRA, ODISHA</span>
            </div>
          </div>

          {/* Architecture Pillars */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-parchment font-bold uppercase tracking-wider block">
              SYSTEM MODULES
            </span>
            <ul className="space-y-1.5 text-sandstone/70">
              <li>• Computer Vision (YOLOv8 + ByteTrack)</li>
              <li>• Analytics Engine (Prophet + Risk Models)</li>
              <li>• Backend REST/WebSocket (FastAPI + Supabase)</li>
              <li>• Tourist Mobile App (Flutter)</li>
              <li>• Admin Control Room (React + Leaflet)</li>
            </ul>
          </div>

          {/* Team Credits */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-parchment font-bold uppercase tracking-wider block">
              SIH 2026 INNOVATION TEAM
            </span>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-sandstone/80">
              <span>• Soumyashree (Research/CV)</span>
              <span>• Aditya (Research/PPT)</span>
              <span>• Abinash (CV/Analytics)</span>
              <span>• Soumyadeep (CV/Frontend)</span>
              <span>• Akashdeepti (Analytics/BE)</span>
              <span>• Debayan (BE/Deploy)</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sandstone/15 flex flex-wrap items-center justify-between gap-4 text-[11px] text-sandstone/50">
          <div className="flex items-center gap-2">
            <span>© 2026 YATRAFLOW PLATFORM</span>
            <span>|</span>
            <span>SMART INDIA HACKATHON SUBMISSION</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-parchment cursor-pointer">PRIVACY & PROTOCOL</span>
            <span className="hover:text-parchment cursor-pointer">SYSTEM DIAGNOSTICS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
