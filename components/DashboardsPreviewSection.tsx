"use client";

import React, { useState } from "react";
import { Smartphone, LayoutDashboard, Radio, Bell, MapPin, CheckCircle2, ShieldCheck, AlertCircle, Compass, RefreshCw } from "lucide-react";

export default function DashboardsPreviewSection() {
  const [activeTab, setActiveTab] = useState<"tourist" | "admin" | "technician">("tourist");

  return (
    <section id="dashboards" className="py-24 bg-stone-charcoal relative border-t border-sandstone/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-temple-gold/15 border border-temple-gold/30 text-xs font-mono text-temple-gold">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>ROLE-BASED USER INTERFACES</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-parchment leading-tight">
            Tailored interfaces for <br />
            <span className="italic text-temple-gold">tourists, admins & field officers</span>.
          </h2>

          <p className="text-sandstone text-base leading-relaxed">
            The platform delivers real-time crowd insights tailored specifically to the needs of each stakeholder in the pilgrimage ecosystem.
          </p>
        </div>

        {/* Dashboard Role Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-sandstone/20 pb-4">
          <button
            onClick={() => setActiveTab("tourist")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "tourist"
                ? "bg-temple-gold text-stone-charcoal font-bold shadow-temple-glow"
                : "bg-dusk-indigo/60 text-sandstone hover:text-parchment border border-sandstone/20"
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Tourist Mobile App
          </button>

          <button
            onClick={() => setActiveTab("admin")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "admin"
                ? "bg-temple-gold text-stone-charcoal font-bold shadow-temple-glow"
                : "bg-dusk-indigo/60 text-sandstone hover:text-parchment border border-sandstone/20"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Admin Control Room
          </button>

          <button
            onClick={() => setActiveTab("technician")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "technician"
                ? "bg-temple-gold text-stone-charcoal font-bold shadow-temple-glow"
                : "bg-dusk-indigo/60 text-sandstone hover:text-parchment border border-sandstone/20"
            }`}
          >
            <Radio className="w-4 h-4" />
            Field Technician / Security
          </button>
        </div>

        {/* Tab 1: Tourist App Mock UI */}
        {activeTab === "tourist" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            {/* Mobile App Screen Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-[320px] rounded-[36px] bg-stone-dark border-4 border-sandstone/30 p-4 shadow-2xl space-y-4 text-parchment relative">
                {/* Mobile Status Bar */}
                <div className="flex items-center justify-between text-[10px] font-mono text-sandstone/60 pt-1 px-2">
                  <span>9:41 AM</span>
                  <span className="font-bold text-temple-gold">SHREE JAGANNATH FLOW</span>
                  <span>100% ⚡</span>
                </div>

                {/* Hero Status Card */}
                <div className="p-3.5 rounded-2xl bg-dusk-indigo border border-sandstone/30 space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-sandstone">
                    <span>CURRENT DESTINATION:</span>
                    <span className="text-emerald-400 font-bold">LIVE</span>
                  </div>
                  <h4 className="font-serif text-lg text-parchment font-semibold">Puri Shree Mandira</h4>
                  <div className="p-2 rounded-xl bg-stone-charcoal/90 border border-emerald-500/40 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-[9px] text-sandstone block">RECOMMENDED ENTRY:</span>
                      <span className="text-emerald-300 font-bold">Gate B (Ashwadwara)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">
                      2 MIN WAIT
                    </span>
                  </div>
                </div>

                {/* Recommended Slot Pill */}
                <div className="p-3 rounded-xl bg-stone-charcoal/90 border border-sandstone/20 text-xs font-mono space-y-1">
                  <span className="text-[10px] text-temple-gold font-bold uppercase block">
                    OPTIONAL RETURN SLOT ISSUED:
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-parchment font-bold">5:00 PM - 5:30 PM</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-temple-gold text-stone-charcoal font-bold">
                      FAST TRACK PASS
                    </span>
                  </div>
                </div>

                {/* Nearby Experiences Segment */}
                <div className="space-y-2 pt-1 font-mono">
                  <span className="text-[10px] text-sandstone/80 uppercase tracking-wider block">
                    EXPLORE WHILE YOU WAIT:
                  </span>

                  <div className="p-2.5 rounded-xl bg-dusk-card border border-sandstone/20 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-parchment font-bold block">Raghurajpur Village</span>
                      <span className="text-[10px] text-sandstone/70">Heritage Craft & Pattachitra</span>
                    </div>
                    <span className="text-[10px] text-temple-gold font-bold">12 km</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-dusk-card border border-sandstone/20 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-parchment font-bold block">Ananda Bazar Mahaprasad</span>
                      <span className="text-[10px] text-sandstone/70">Traditional Temple Feast</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">Low Queue</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Description */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-temple-gold uppercase tracking-wider">
                TOURIST MOBILE APP (FLUTTER)
              </span>
              <h3 className="font-serif text-3xl text-parchment font-semibold">
                Personalized queue avoidance for every pilgrim.
              </h3>
              <p className="text-sandstone text-sm leading-relaxed">
                Empowers visitors with real-time gate waiting times, automatic return-time slot booking, step-by-step route visualization, and curated recommendations for nearby handicraft villages, pristine beaches, and authentic local cuisine.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs text-sandstone">
                <div className="p-3 rounded-lg bg-dusk-indigo/40 border border-sandstone/20">
                  <span className="text-parchment font-bold block">✓ Gate Rerouting</span>
                  Shows least congested entryway in real time.
                </div>
                <div className="p-3 rounded-lg bg-dusk-indigo/40 border border-sandstone/20">
                  <span className="text-parchment font-bold block">✓ Return-Slot Pass</span>
                  Guarantees fast-track access during lower load windows.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Admin Dashboard Mock UI */}
        {activeTab === "admin" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-8 p-6 rounded-2xl bg-stone-dark border border-sandstone/30 space-y-4 shadow-2xl">
              {/* Dashboard Top Header */}
              <div className="flex items-center justify-between border-b border-sandstone/20 pb-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-parchment font-bold">PURI_DESTINATION_COMMAND_CENTER</span>
                </div>
                <span className="text-sandstone/70">UPDATED 2 SEC AGO</span>
              </div>

              {/* Stat Counters Row */}
              <div className="grid grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-dusk-indigo/60 border border-sandstone/20">
                  <span className="text-[10px] text-sandstone block">TOTAL PRESENT</span>
                  <span className="text-lg font-bold text-parchment">14,280</span>
                </div>
                <div className="p-3 rounded-xl bg-dusk-indigo/60 border border-sandstone/20">
                  <span className="text-[10px] text-sandstone block">CAPACITY UTIL</span>
                  <span className="text-lg font-bold text-temple-gold">74.2%</span>
                </div>
                <div className="p-3 rounded-xl bg-dusk-indigo/60 border border-sandstone/20">
                  <span className="text-[10px] text-sandstone block">15M FORECAST</span>
                  <span className="text-lg font-bold text-orange-400">+12% Surge</span>
                </div>
                <div className="p-3 rounded-xl bg-dusk-indigo/60 border border-sandstone/20">
                  <span className="text-[10px] text-sandstone block">ACTIVE ALERTS</span>
                  <span className="text-lg font-bold text-vermilion-glow">1 High</span>
                </div>
              </div>

              {/* Analytics Graph Fragment */}
              <div className="p-4 rounded-xl bg-stone-charcoal/90 border border-sandstone/20 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-sandstone">
                  <span>LIVE CROWD DENSITY vs 15-MIN PREDICTION</span>
                  <span className="text-temple-gold">GATE A vs GATE B</span>
                </div>
                <div className="h-24 w-full flex items-end gap-1 pt-4 border-b border-sandstone/20">
                  {[30, 45, 55, 60, 75, 82, 90, 85, 70, 65, 50, 40].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        style={{ height: `${val}%` }}
                        className={`w-full rounded-t transition-all ${
                          val > 80 ? "bg-vermilion" : val > 60 ? "bg-temple-gold" : "bg-emerald-500"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono text-temple-gold uppercase tracking-wider">
                ADMIN CONTROL ROOM (REACT)
              </span>
              <h3 className="font-serif text-3xl text-parchment font-semibold">
                Complete situational awareness for temple authorities.
              </h3>
              <p className="text-sandstone text-sm leading-relaxed">
                Provides administrators with live heatmaps, automated capacity utilization alerts, 15-minute predictive risk scores, and one-click operational override triggers.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Field Technician View */}
        {activeTab === "technician" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 p-6 rounded-2xl bg-stone-dark border border-sandstone/30 space-y-4 shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-sandstone/20 pb-3">
                <span className="text-temple-gold font-bold flex items-center gap-2">
                  <Radio className="w-4 h-4 animate-pulse" /> FIELD OFFICER DISPATCH TERMINAL
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                  ACTION REQUIRED
                </span>
              </div>

              <div className="p-4 rounded-xl bg-vermilion-dark/20 border border-vermilion/50 space-y-2 text-parchment">
                <span className="text-vermilion-glow font-bold block text-sm">
                  ⚠️ DISPATCH ALERT #402: GATE A SURGE
                </span>
                <p className="text-sandstone text-xs">
                  Singhadwara queue length exceeded 300 meters. Deploy 4 officers to open auxiliary barricade towards Gate B.
                </p>
                <div className="flex gap-2 pt-2">
                  <button className="px-3 py-1.5 rounded bg-temple-gold text-stone-charcoal font-bold text-xs">
                    ACKNOWLEDGE & DEPLOY
                  </button>
                  <button className="px-3 py-1.5 rounded bg-stone-charcoal text-sandstone border border-sandstone/30 text-xs">
                    REQUEST REINFORCEMENTS
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono text-temple-gold uppercase tracking-wider">
                FIELD OFFICER TERMINAL
              </span>
              <h3 className="font-serif text-3xl text-parchment font-semibold">
                Direct operational instructions for ground staff.
              </h3>
              <p className="text-sandstone text-sm leading-relaxed">
                Connects command center algorithms directly to police personnel and temple volunteers on the ground, delivering immediate barricade adjustment tasks and crowd dispersal instructions.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
