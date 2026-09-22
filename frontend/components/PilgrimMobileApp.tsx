"use client";

import React, { useState } from "react";
import {
  Home,
  Navigation,
  Compass,
  Zap,
  User,
  Volume2,
  VolumeX,
  Type,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ShieldAlert,
  QrCode,
  Sparkles,
  Search,
  Bell,
  ChevronRight,
  RefreshCw,
  Plus,
  Play,
  Share2,
  Accessibility
} from "lucide-react";

export type SupportedSite = "puri" | "vaishnodevi" | "tirupati" | "varanasi" | "kedarnath" | "siddhivinayak";

const TEMPLES = [
  { id: "puri", name: "Puri Shree Mandira", status: "85% Crowd", color: "bg-red-500", icon: "🛕" },
  { id: "vaishnodevi", name: "Mata Vaishno Devi", status: "92% Crowd", color: "bg-red-500", icon: "🏔️" },
  { id: "tirupati", name: "Tirupati Balaji", status: "78% Crowd", color: "bg-amber-500", icon: "✨" },
  { id: "varanasi", name: "Kashi Vishwanath", status: "65% Crowd", color: "bg-amber-500", icon: "🔱" },
  { id: "kedarnath", name: "Kedarnath Dham", status: "40% Crowd", color: "bg-emerald-500", icon: "🏔️" },
  { id: "siddhivinayak", name: "Siddhivinayak", status: "88% Crowd", color: "bg-red-500", icon: "🐘" },
];

const GATES = [
  {
    code: "GATE_A",
    name: "Singhadwara (Lion Gate)",
    count: 340,
    time: "55 MINS",
    status: "CRITICAL",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/50",
    dotColor: "bg-red-500 animate-ping",
  },
  {
    code: "GATE_B",
    name: "Ashwadwara (Horse Gate)",
    count: 65,
    time: "8 MINS",
    status: "BEST PATH",
    badgeColor: "bg-yellow-400 text-black font-extrabold border-yellow-400",
    dotColor: "bg-yellow-400 animate-pulse",
    recommended: true,
  },
  {
    code: "GATE_C",
    name: "Vyaghradwara (Tiger Gate)",
    count: 140,
    time: "18 MINS",
    status: "NORMAL",
    badgeColor: "bg-stone-800 text-stone-300 border-stone-700",
    dotColor: "bg-amber-400",
  },
  {
    code: "GATE_D",
    name: "Hastidwara (Elephant Gate)",
    count: 88,
    time: "12 MINS",
    status: "NORMAL",
    badgeColor: "bg-stone-800 text-stone-300 border-stone-700",
    dotColor: "bg-emerald-400",
  },
];

export default function PilgrimMobileApp() {
  const [activeTab, setActiveTab] = useState<"home" | "gates" | "route" | "sos" | "pass">("home");
  const [selectedSite, setSelectedSite] = useState<SupportedSite>("puri");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [navStarted, setNavStarted] = useState<boolean>(false);
  const [voiceActive, setVoiceActive] = useState<boolean>(false);
  const [sosActive, setSosActive] = useState<boolean>(false);

  const activeTemple = TEMPLES.find((t) => t.id === selectedSite) || TEMPLES[0];

  const runBestPathAlgorithm = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setActiveTab("route");
    }, 700);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#0B0B0B] text-white font-sans min-h-screen relative flex flex-col pb-24 selection:bg-yellow-400 selection:text-black">
      
      {/* MINIMAL TOP HEADER (AURA / UBER STYLE) */}
      <header className="px-5 pt-4 pb-3 flex items-center justify-between bg-[#0B0B0B]/90 sticky top-0 z-40 backdrop-blur-md border-b border-stone-900">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center text-black font-extrabold text-xl shadow-lg">
            Y
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider text-white block leading-none">
              YATRA<span className="text-yellow-400">FLOW</span>
            </span>
            <span className="text-[9px] font-mono text-stone-400 tracking-widest uppercase">
              SMART CROWD ENGINE
            </span>
          </div>
        </div>

        {/* Top Header Icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVoiceActive(!voiceActive)}
            className={`p-2 rounded-xl border transition-all ${
              voiceActive ? "bg-yellow-400 text-black border-yellow-400" : "bg-stone-900 border-stone-800 text-stone-400"
            }`}
          >
            {voiceActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <div className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300">
            <MapPin className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
      </header>

      {/* STORY / QUICK TEMPLE CHIPS CAROUSEL (STRAVA / AURA STYLE) */}
      <div className="px-5 pt-4 pb-2 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">SELECT TEMPLE</span>
          <span className="text-[10px] font-mono text-yellow-400 font-bold">LIVE TELEMETRY ACTIVE</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {TEMPLES.map((t) => {
            const isSelected = selectedSite === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedSite(t.id as SupportedSite)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-yellow-400 text-black border-yellow-400 shadow-lg scale-105"
                    : "bg-[#161616] text-stone-300 border-stone-800 hover:border-stone-700"
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="px-5 pt-2 flex-1 space-y-5">
        
        {/* ================= TAB 1: HOME ================= */}
        {activeTab === "home" && (
          <div className="space-y-4">
            
            {/* HERO PROMOTIONAL BANNER CARD (AURA REWARDS STYLE) */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1E1E1E] via-[#161616] to-[#0D0D0D] border border-stone-800 relative overflow-hidden shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-md bg-yellow-400 text-black uppercase">
                  {activeTemple.name}
                </span>
                <span className="text-xs text-yellow-400 font-bold">⚡ AI Reroute</span>
              </div>

              <h2 className="text-xl font-extrabold text-white leading-tight">
                Avoid Long Temple Lines & Save Time
              </h2>
              <p className="text-xs text-stone-400 leading-relaxed">
                Check real-time gate numbers and navigate via the easiest, least crowded gate.
              </p>

              {/* Uber / Swiggy Style Prominent Yellow Action Button */}
              <button
                onClick={runBestPathAlgorithm}
                className="w-full py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-current text-black" />
                <span>FIND BEST GATE PATH NOW</span>
              </button>
            </div>

            {/* QUICK STATS CARDS */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#161616] border border-stone-800 space-y-1">
                <span className="text-stone-500 text-[10px] uppercase block">MOST CROWDED</span>
                <span className="text-red-400 font-extrabold text-sm block">Singhadwara</span>
                <span className="text-stone-400 text-[10px]">55 Min Wait</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#161616] border border-stone-800 space-y-1">
                <span className="text-stone-500 text-[10px] uppercase block">RECOMMENDED</span>
                <span className="text-yellow-400 font-extrabold text-sm block">Ashwadwara</span>
                <span className="text-emerald-400 text-[10px]">Only 8 Min Wait</span>
              </div>
            </div>

            {/* SWIGGY / UBER STYLE GATES LIST */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">LIVE TEMPLE GATES</span>
                <button onClick={() => setActiveTab("gates")} className="text-xs font-bold text-yellow-400">
                  See All →
                </button>
              </div>

              <div className="space-y-2.5">
                {GATES.slice(0, 2).map((g) => (
                  <div
                    key={g.code}
                    onClick={() => setActiveTab("gates")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      g.recommended
                        ? "bg-[#1A1810] border-yellow-400/80 ring-1 ring-yellow-400/40"
                        : "bg-[#161616] border-stone-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${g.dotColor}`} />
                      <div>
                        <h3 className="font-extrabold text-sm text-white">{g.name}</h3>
                        <span className="text-xs text-stone-400 font-mono">{g.count} People in queue</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border font-bold block ${g.badgeColor}`}>
                        {g.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: LIVE GATES ================= */}
        {activeTab === "gates" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <h2 className="text-lg font-extrabold text-white">{activeTemple.name} Gates</h2>
              <span className="text-xs text-yellow-400 font-mono font-bold">4 GATES MONITORED</span>
            </div>

            <div className="space-y-3">
              {GATES.map((g) => (
                <div
                  key={g.code}
                  className={`p-4 rounded-2xl border space-y-3 ${
                    g.recommended
                      ? "bg-[#1C180C] border-yellow-400 ring-2 ring-yellow-400/30"
                      : "bg-[#161616] border-stone-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${g.dotColor}`} />
                      <h3 className="font-extrabold text-base text-white">{g.name}</h3>
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border font-bold ${g.badgeColor}`}>
                      {g.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-black/60">
                      <span className="text-stone-500 text-[9px] uppercase block">WAIT TIME</span>
                      <span className={`font-extrabold text-sm ${g.recommended ? "text-yellow-400" : "text-white"}`}>
                        {g.time}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/60">
                      <span className="text-stone-500 text-[9px] uppercase block">CROWD COUNT</span>
                      <span className="font-extrabold text-sm text-white">{g.count} PPL</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Trigger */}
            <button
              onClick={runBestPathAlgorithm}
              className="w-full py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-current text-black" />
              <span>SUGGEST BEST GATE PATH</span>
            </button>
          </div>
        )}

        {/* ================= TAB 3: AI BEST ROUTE & NAVIGATION ================= */}
        {activeTab === "route" && (
          <div className="space-y-4">
            
            {/* RECOMMENDED ROUTE CARD */}
            <div className="p-5 rounded-3xl bg-[#1A1810] border-2 border-yellow-400 text-white space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-yellow-400/30 pb-2">
                <span className="text-xs font-mono text-yellow-400 font-extrabold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-yellow-400" /> AI BEST GATE PATH
                </span>
                <span className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded bg-yellow-400 text-black">
                  SAVE 47 MINS
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-white">
                Ashwadwara (Horse Gate)
              </h2>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-stone-400 block text-[10px]">WAIT TIME</span>
                  <span className="text-yellow-400 font-extrabold text-base">8 MINS</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">CROWD COUNT</span>
                  <span className="text-white font-extrabold text-base">65 PPL</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">ACCESSIBILITY</span>
                  <span className="text-emerald-400 font-extrabold text-base">Ramp ♿</span>
                </div>
              </div>
            </div>

            {/* UBER-STYLE TURN BY TURN DIRECTIONS */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                TURN-BY-TURN GUIDANCE
              </span>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-[#161616] border border-stone-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black font-extrabold flex items-center justify-center shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <span className="text-white font-bold block">Walk straight for 120m</span>
                    <span className="text-stone-400">Pass Aruna Stambha Sun Pillar on your left.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#161616] border border-stone-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black font-extrabold flex items-center justify-center shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <span className="text-white font-bold block">Turn Right at Ashwadwara Sign</span>
                    <span className="text-stone-400">Wheelchair ramp & resting benches available.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1A1810] border border-yellow-400/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black font-extrabold flex items-center justify-center shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <span className="text-yellow-400 font-bold block">Enter Gate B Priority Line</span>
                    <span className="text-stone-300">Show your Digital Pass for 1-tap entry.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* START NAVIGATION BUTTON */}
            <button
              onClick={() => setNavStarted(!navStarted)}
              className={`w-full py-4 rounded-2xl font-extrabold text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                navStarted
                  ? "bg-emerald-500 text-black"
                  : "bg-yellow-400 hover:bg-yellow-300 text-black"
              }`}
            >
              <Play className="w-5 h-5 fill-current text-black" />
              <span>{navStarted ? "NAVIGATION ACTIVE (TAP TO STOP)" : "START LIVE NAVIGATION"}</span>
            </button>

          </div>
        )}

        {/* ================= TAB 4: SOS EMERGENCY ================= */}
        {activeTab === "sos" && (
          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-red-950/80 border-2 border-red-500 text-white text-center space-y-3 shadow-2xl">
              <ShieldAlert className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
              <h2 className="text-xl font-extrabold">Emergency SOS Help</h2>
              <p className="text-xs text-stone-300">
                Tap below if an elderly pilgrim needs immediate medical help or is separated.
              </p>

              {sosActive ? (
                <div className="p-3 rounded-xl bg-red-900 border border-red-400 text-xs font-mono text-white font-bold animate-pulse">
                  🚨 EMERGENCY ALERT SENT TO TEMPLE CONTROL ROOM!
                </div>
              ) : (
                <button
                  onClick={() => setSosActive(true)}
                  className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm shadow-xl transition-all cursor-pointer"
                >
                  🆘 PRESS FOR EMERGENCY HELP
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 5: PASS ================= */}
        {activeTab === "pass" && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-[#161616] border-2 border-yellow-400 text-center space-y-4 shadow-2xl">
              <span className="text-xs font-mono text-yellow-400 font-extrabold uppercase tracking-widest block">
                DIGITAL FAST-TRACK PASS
              </span>

              <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl border-4 border-yellow-400 flex items-center justify-center">
                <QrCode className="w-full h-full text-black" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white">Pass ID: #PUR-2026-9842</h3>
                <span className="text-xs font-mono text-yellow-400 font-bold block">VALID FOR GATE B (ASHWADWARA)</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* SLEEK BLACK & YELLOW BOTTOM NAVIGATION BAR (AURA / STRAVA MATCHING SCREENSHOT) */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-[#0D0D0D] border-t border-stone-800 px-3 py-2.5">
        <div className="grid grid-cols-5 gap-1 text-center">
          
          {/* 1. Home */}
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === "home" ? "text-yellow-400 font-bold" : "text-stone-500 hover:text-stone-300"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">Home</span>
          </button>

          {/* 2. Gates */}
          <button
            onClick={() => setActiveTab("gates")}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === "gates" ? "text-yellow-400 font-bold" : "text-stone-500 hover:text-stone-300"
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">Gates</span>
          </button>

          {/* 3. Best Route (Center Highlighted Action) */}
          <button
            onClick={runBestPathAlgorithm}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === "route" ? "text-yellow-400 font-bold" : "text-yellow-400 hover:text-yellow-300"
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg font-bold">
              <Zap className="w-4 h-4 fill-current text-black" />
            </div>
            <span className="text-[9px] font-mono mt-0.5 font-bold">Best Path</span>
          </button>

          {/* 4. SOS */}
          <button
            onClick={() => setActiveTab("sos")}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === "sos" ? "text-red-400 font-bold" : "text-stone-500 hover:text-stone-300"
            }`}
          >
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span className="text-[9px] font-mono mt-0.5 text-red-400">SOS</span>
          </button>

          {/* 5. Pass */}
          <button
            onClick={() => setActiveTab("pass")}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === "pass" ? "text-yellow-400 font-bold" : "text-stone-500 hover:text-stone-300"
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">Pass</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
