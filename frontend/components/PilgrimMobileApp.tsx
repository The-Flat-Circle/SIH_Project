"use client";

import React, { useState } from "react";
import {
  Home,
  Navigation,
  Compass,
  Zap,
  PhoneCall,
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
  Accessibility,
  Footprints,
  ChevronRight,
  RefreshCw,
  Bell
} from "lucide-react";

export type SupportedSite = "puri" | "vaishnodevi" | "tirupati" | "varanasi" | "kedarnath" | "siddhivinayak";

const DESTINATIONS = [
  { id: "puri", name: "Puri Shree Mandira", location: "Puri, Odisha", status: "85% Crowd (High)", img: "🛕" },
  { id: "vaishnodevi", name: "Mata Vaishno Devi", location: "Katra, J&K", status: "92% Crowd (Critical)", img: "🏔️" },
  { id: "tirupati", name: "Tirupati Balaji", location: "Tirumala, AP", status: "78% Crowd (Moderate)", img: "✨" },
  { id: "varanasi", name: "Kashi Vishwanath", location: "Varanasi, UP", status: "65% Crowd (Normal)", img: "🔱" },
  { id: "kedarnath", name: "Kedarnath Dham", location: "Uttarakhand", status: "40% Crowd (Low)", img: "🏔️" },
  { id: "siddhivinayak", name: "Siddhivinayak", location: "Mumbai, MH", status: "88% Crowd (High)", img: "🐘" },
];

const GATES = [
  {
    code: "GATE_A",
    name: "Singhadwara (Lion Gate)",
    count: 340,
    capacity: 85,
    waitTime: "55 Mins",
    status: "CRITICAL",
    accessibility: "Stair Steps Only ⚠️",
  },
  {
    code: "GATE_B",
    name: "Ashwadwara (Horse Gate)",
    count: 65,
    capacity: 22,
    waitTime: "8 Mins",
    status: "RECOMMENDED",
    accessibility: "Wheelchair Ramp ♿ • Bench at 50m 🪑",
  },
  {
    code: "GATE_C",
    name: "Vyaghradwara (Tiger Gate)",
    count: 140,
    capacity: 48,
    waitTime: "18 Mins",
    status: "NORMAL",
    accessibility: "Water Station 💧",
  },
  {
    code: "GATE_D",
    name: "Hastidwara (Elephant Gate)",
    count: 88,
    capacity: 32,
    waitTime: "12 Mins",
    status: "NORMAL",
    accessibility: "Shaded Holding Area ☂️",
  },
];

export default function PilgrimMobileApp() {
  const [activeTab, setActiveTab] = useState<"home" | "gates" | "route" | "sos" | "pass">("home");
  const [selectedSite, setSelectedSite] = useState<SupportedSite>("puri");
  const [isLargeText, setIsLargeText] = useState<boolean>(false);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);

  // Algorithm Execution State
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [algoStep, setAlgoStep] = useState<string>("");
  const [bestRouteFound, setBestRouteFound] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [sosActive, setSosActive] = useState<boolean>(false);

  const activeTemple = DESTINATIONS.find((d) => d.id === selectedSite) || DESTINATIONS[0];

  // Trigger AI Route Optimization Algorithm
  const runBestPathAlgorithm = () => {
    setIsCalculating(true);
    setBestRouteFound(false);
    setShowNotification(false);

    const steps = [
      "1/3 Ingesting live CCTV gate headcounts...",
      "2/3 Analyzing walking steps & senior rest areas...",
      "3/3 Calculating fastest & easiest entry path...",
    ];

    let currentStep = 0;
    setAlgoStep(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setAlgoStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        setIsCalculating(false);
        setBestRouteFound(true);
        setShowNotification(true);
        setActiveTab("route");
      }
    }, 600);
  };

  return (
    <div className={`w-full max-w-md mx-auto bg-stone-charcoal text-parchment font-sans min-h-screen relative flex flex-col pb-24 shadow-2xl border-x border-sandstone/20 ${isLargeText ? "text-lg" : "text-sm"}`}>
      
      {/* APP HEADER */}
      <header className="sticky top-0 z-40 bg-stone-charcoal/95 backdrop-blur-md px-4 py-3 border-b border-sandstone/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-temple-gold/20 border border-temple-gold/40 flex items-center justify-center text-temple-gold font-serif font-bold text-lg">
            Y
          </div>
          <div>
            <h1 className="font-serif font-bold text-base tracking-wide text-parchment leading-tight">
              YATRA_FLOW <span className="text-[10px] font-mono text-temple-gold px-1.5 py-0.2 rounded bg-temple-gold/15">PILGRIM APP</span>
            </h1>
            <span className="text-[10px] font-mono text-sandstone/80">Simple Senior-Citizen Mode</span>
          </div>
        </div>

        {/* Accessibility Action Controls */}
        <div className="flex items-center gap-2">
          {/* Voice Audio Assistant Toggle */}
          <button
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={`p-2 rounded-xl border text-xs font-mono transition-all ${
              isVoiceActive
                ? "bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/50"
                : "bg-dusk-card border-sandstone/30 text-sandstone"
            }`}
            title="Voice Assistance Guide"
          >
            {isVoiceActive ? <Volume2 className="w-4 h-4 text-amber-300" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Large Text Size Booster Toggle */}
          <button
            onClick={() => setIsLargeText(!isLargeText)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
              isLargeText
                ? "bg-temple-gold text-stone-charcoal border-temple-gold"
                : "bg-dusk-card border-sandstone/30 text-sandstone"
            }`}
            title="Boost Text Size"
          >
            A+
          </button>
        </div>
      </header>

      {/* AI RECOMMENDATION POPUP NOTIFICATION BANNER */}
      {showNotification && (
        <div className="m-4 p-4 rounded-2xl bg-emerald-950/90 border-2 border-emerald-500 text-emerald-100 shadow-2xl animate-in slide-in-from-top duration-300 flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
          <div className="flex-1 space-y-1">
            <div className="font-bold text-sm text-emerald-300 uppercase font-mono flex items-center justify-between">
              <span>BEST PATH FOUND!</span>
              <span className="text-[10px] bg-emerald-500 text-stone-charcoal px-2 py-0.5 rounded font-bold">SAVED 47 MINS</span>
            </div>
            <p className="text-xs font-mono leading-relaxed text-parchment">
              Redirecting to <strong className="text-emerald-300">Ashwadwara (Horse Gate)</strong>. Only 8 min wait time with wheelchair ramp access!
            </p>
          </div>
          <button onClick={() => setShowNotification(false)} className="text-emerald-400 font-bold p-1">
            ✕
          </button>
        </div>
      )}

      {/* MAIN SCREEN BODY BASED ON TABS */}
      <main className="flex-1 px-4 pt-4 space-y-5">
        
        {/* ================= TABS 1: HOME (CHOOSE DESTINATION TEMPLE) ================= */}
        {activeTab === "home" && (
          <div className="space-y-5">
            {/* Pilgrim Welcome Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-dusk-card via-stone-charcoal to-dusk-card border border-sandstone/25 shadow-xl space-y-2">
              <span className="text-xs font-mono text-temple-gold uppercase font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Welcome, Jay Jagannath Pilgrim
              </span>
              <h2 className="font-serif text-xl font-bold text-parchment leading-tight">
                Select Your Destination Temple
              </h2>
              <p className="text-xs text-sandstone leading-relaxed">
                Choose a holy site below to view real-time crowd numbers and find the easiest, least crowded gate path.
              </p>
            </div>

            {/* DESTINATION CARDS LIST (Large touch targets for seniors) */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-sandstone uppercase font-bold tracking-wider">
                1. CHOOSE TEMPLE DESTINATION
              </span>

              <div className="grid grid-cols-1 gap-3">
                {DESTINATIONS.map((temple) => {
                  const isSelected = selectedSite === temple.id;
                  return (
                    <div
                      key={temple.id}
                      onClick={() => setSelectedSite(temple.id as SupportedSite)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-lg ${
                        isSelected
                          ? "bg-dusk-card border-temple-gold ring-2 ring-temple-gold/40"
                          : "bg-stone-dark/80 border-sandstone/20 hover:border-sandstone/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-temple-gold/15 border border-temple-gold/30 flex items-center justify-center text-2xl shadow-inner">
                          {temple.img}
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-base text-parchment">
                            {temple.name}
                          </h3>
                          <span className="text-xs font-mono text-sandstone block">{temple.location}</span>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          temple.status.includes("Critical")
                            ? "bg-red-950 text-red-300 border-red-500"
                            : temple.status.includes("High")
                            ? "bg-amber-950 text-amber-300 border-amber-500"
                            : "bg-emerald-950 text-emerald-300 border-emerald-500"
                        }`}>
                          {temple.status}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-mono text-temple-gold font-bold block flex items-center justify-end gap-1">
                            Selected <CheckCircle2 className="w-3 h-3 text-temple-gold" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ACTION BUTTON TO CHECK GATES */}
            <button
              onClick={() => setActiveTab("gates")}
              className="w-full py-4 rounded-2xl bg-temple-gold text-stone-charcoal font-mono font-bold text-sm hover:bg-temple-light transition-all shadow-temple-glow flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>VIEW GATE CROWD NUMBERS FOR {activeTemple.name.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================= TABS 2: LIVE GATES (CHECK CROWD & SUGGEST PATH) ================= */}
        {activeTab === "gates" && (
          <div className="space-y-5">
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-sandstone/15 pb-2">
              <div>
                <span className="text-xs font-mono text-sandstone uppercase">Active Site</span>
                <h2 className="font-serif text-xl font-bold text-parchment">{activeTemple.name}</h2>
              </div>
              <button
                onClick={() => setActiveTab("home")}
                className="text-xs font-mono text-temple-gold underline"
              >
                Change Temple
              </button>
            </div>

            <span className="text-xs font-mono text-sandstone uppercase font-bold tracking-wider block">
              2. LIVE CROWD NUMBERS AT TEMPLE GATES
            </span>

            {/* GATE CROWD DENSITY CARDS */}
            <div className="space-y-3">
              {GATES.map((gate) => (
                <div
                  key={gate.code}
                  className={`p-4 rounded-2xl border space-y-2 shadow-xl ${
                    gate.status === "RECOMMENDED"
                      ? "bg-emerald-950/40 border-emerald-500/80 ring-2 ring-emerald-500/30"
                      : gate.status === "CRITICAL"
                      ? "bg-red-950/30 border-red-500/60"
                      : "bg-dusk-card border-sandstone/25"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${
                        gate.status === "CRITICAL" ? "bg-red-500 animate-ping" : gate.status === "RECOMMENDED" ? "bg-emerald-400" : "bg-amber-400"
                      }`} />
                      <h3 className="font-serif font-bold text-base text-parchment">{gate.name}</h3>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                      gate.status === "RECOMMENDED"
                        ? "bg-emerald-500 text-stone-charcoal border-emerald-400"
                        : gate.status === "CRITICAL"
                        ? "bg-red-900/80 text-red-200 border-red-500"
                        : "bg-amber-950 text-amber-300 border-amber-500"
                    }`}>
                      {gate.status === "RECOMMENDED" ? "BEST CHOICE" : gate.status}
                    </span>
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-stone-dark/80 text-xs font-mono">
                    <div>
                      <span className="text-sandstone/70 text-[9px] block">CROWD COUNT</span>
                      <span className="font-bold text-parchment text-sm">{gate.count} PPL</span>
                    </div>
                    <div>
                      <span className="text-sandstone/70 text-[9px] block">WAIT TIME</span>
                      <span className={`font-bold text-sm ${gate.status === "RECOMMENDED" ? "text-emerald-400" : "text-amber-400"}`}>
                        {gate.waitTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-sandstone/70 text-[9px] block">CAPACITY</span>
                      <span className="font-bold text-parchment text-sm">{gate.capacity}%</span>
                    </div>
                  </div>

                  {/* Senior Citizen Accessibility Note */}
                  <div className="text-xs font-mono text-sandstone flex items-center gap-1.5 pt-1">
                    <Accessibility className="w-3.5 h-3.5 text-temple-gold shrink-0" />
                    <span>{gate.accessibility}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ALGORITHM CALCULATION PROMPT OR RUNNING STATE */}
            {isCalculating ? (
              <div className="p-6 rounded-2xl bg-dusk-card border border-temple-gold/50 text-center space-y-3 shadow-2xl animate-pulse">
                <RefreshCw className="w-8 h-8 text-temple-gold animate-spin mx-auto" />
                <div className="text-sm font-mono text-temple-gold font-bold">
                  AI ROUTE OPTIMIZER RUNNING...
                </div>
                <p className="text-xs font-mono text-sandstone">{algoStep}</p>
              </div>
            ) : (
              <button
                onClick={runBestPathAlgorithm}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-temple-gold text-stone-charcoal font-mono font-bold text-sm hover:from-amber-400 hover:to-temple-light transition-all shadow-temple-glow flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-current text-stone-charcoal" />
                <span>SUGGEST BEST & FASTEST PATH NOW</span>
              </button>
            )}
          </div>
        )}

        {/* ================= TABS 3: BEST ROUTE & NAVIGATION ================= */}
        {activeTab === "route" && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500 text-emerald-100 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI RECOMMENDED GATE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400 text-stone-charcoal font-bold">
                  8 MIN WAIT
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-parchment">
                Ashwadwara (Horse Gate)
              </h2>

              <p className="text-xs font-mono text-emerald-200 leading-relaxed">
                By choosing this gate, you bypass 340 pilgrims at Singhadwara Lion Gate and save **47 minutes of standing in line**.
              </p>

              <div className="p-3 rounded-xl bg-stone-charcoal/90 text-xs font-mono space-y-1.5 text-sandstone">
                <div className="text-temple-gold font-bold flex items-center gap-1.5">
                  <Accessibility className="w-4 h-4 text-temple-gold" /> Senior Citizen Friendly Features:
                </div>
                <div>• Wheelchair Ramp Available at Gate Entry ♿</div>
                <div>• Shaded Resting Benches every 50 meters 🪑</div>
                <div>• Free Cold Drinking Water Counter 💧</div>
              </div>
            </div>

            {/* TURN BY TURN NAVIGATION STEPS */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-sandstone uppercase font-bold tracking-wider">
                STEP-BY-STEP WALKING DIRECTIONS
              </span>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-dusk-card border border-sandstone/20 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-temple-gold text-stone-charcoal font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <span className="text-parchment font-bold block">Walk straight for 120 meters</span>
                    <span className="text-sandstone">Pass Aruna Stambha Sun Pillar on your left side.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-dusk-card border border-sandstone/20 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-temple-gold text-stone-charcoal font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <span className="text-parchment font-bold block">Turn Right towards Ashwadwara Lane</span>
                    <span className="text-sandstone">Look for green directional signage overhead.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-400 text-stone-charcoal font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <span className="text-emerald-300 font-bold block">Enter via Senior Citizen Fast Gate B</span>
                    <span className="text-emerald-200">Show your Digital QR Pass for instant entry!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VOICE ASSIST PLAY BUTTON */}
            {isVoiceActive && (
              <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-500/60 text-amber-200 text-xs font-mono flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-amber-400" />
                  <span>PLAYING AUDIO VOICE GUIDANCE...</span>
                </div>
                <button onClick={() => setIsVoiceActive(false)} className="text-amber-400 underline font-bold">
                  Stop
                </button>
              </div>
            )}

            <button
              onClick={() => setActiveTab("pass")}
              className="w-full py-4 rounded-2xl bg-temple-gold text-stone-charcoal font-mono font-bold text-sm hover:bg-temple-light transition-all shadow-temple-glow flex items-center justify-center gap-2 cursor-pointer"
            >
              <QrCode className="w-5 h-5" />
              <span>SHOW MY SENIOR CITIZEN FAST-TRACK QR PASS</span>
            </button>
          </div>
        )}

        {/* ================= TABS 4: EMERGENCY SOS & HELP ================= */}
        {activeTab === "sos" && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-red-950/90 border-2 border-red-500 text-red-100 text-center space-y-3 shadow-2xl">
              <ShieldAlert className="w-12 h-12 text-red-400 mx-auto animate-bounce" />
              <h2 className="font-serif text-2xl font-bold">Emergency Assistance</h2>
              <p className="text-xs font-mono leading-relaxed text-red-200">
                Tap below if an elderly family member is separated, feeling unwell, or requires immediate medical help.
              </p>

              {sosActive ? (
                <div className="p-4 rounded-xl bg-red-900 border border-red-400 text-xs font-mono text-white font-bold animate-pulse space-y-1">
                  <div>🚨 EMERGENCY ALERT SENT TO TEMPLE CONTROL ROOM!</div>
                  <div className="text-[10px] text-red-200">GPS Location: Puri Shree Mandira Gate B (Ashwadwara)</div>
                  <div className="text-[10px] text-emerald-300">Nearest Medical Officer Dispatched (ETA 2 Mins)</div>
                </div>
              ) : (
                <button
                  onClick={() => setSosActive(true)}
                  className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-base shadow-2xl transition-all cursor-pointer border-2 border-red-300"
                >
                  🆘 PRESS FOR IMMEDIATE EMERGENCY HELP
                </button>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-dusk-card border border-sandstone/20 space-y-3 text-xs font-mono">
              <span className="text-temple-gold font-bold block">DIRECT HELPLINE CONTACTS</span>
              <div className="flex items-center justify-between border-b border-sandstone/15 pb-2">
                <span>Temple Police Control Room</span>
                <span className="text-emerald-400 font-bold">100 / 06752-222044</span>
              </div>
              <div className="flex items-center justify-between border-b border-sandstone/15 pb-2">
                <span>Ambulance & Medical Post</span>
                <span className="text-emerald-400 font-bold">108</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Senior Citizen Support Desk</span>
                <span className="text-emerald-400 font-bold">1850</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TABS 5: QR TICKET PASS ================= */}
        {activeTab === "pass" && (
          <div className="space-y-5">
            <div className="p-6 rounded-3xl bg-dusk-card border-2 border-temple-gold text-center space-y-4 shadow-2xl">
              <div className="text-xs font-mono text-temple-gold uppercase font-bold tracking-widest border-b border-sandstone/20 pb-2">
                SHREE MANDIRA FAST-TRACK RETURN PASS
              </div>

              {/* QR Code Placeholder Box */}
              <div className="w-48 h-48 mx-auto bg-parchment p-3 rounded-2xl border-4 border-temple-gold flex items-center justify-center shadow-inner">
                <QrCode className="w-full h-full text-stone-charcoal" />
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-parchment">Pass ID: #PUR-2026-9842</h3>
                <span className="text-xs font-mono text-emerald-400 font-bold block">VALID FOR GATE B (ASHWADWARA)</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-dark text-xs font-mono text-sandstone text-left space-y-1">
                <div>Holder: Senior Citizen / Family</div>
                <div>Allocated Slot: 10:30 AM - 11:30 AM</div>
                <div>Status: Priority Entry Granted ✓</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR (INSPIRED BY STRAVA UI SCREENSHOT) */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-stone-charcoal/95 backdrop-blur-md border-t border-sandstone/20 px-2 py-2">
        <div className="grid grid-cols-5 gap-1 text-center">
          
          {/* 1. Home */}
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              activeTab === "home" ? "text-temple-gold bg-temple-gold/15 font-bold" : "text-sandstone hover:text-parchment"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-mono mt-0.5">Home</span>
          </button>

          {/* 2. Live Gates */}
          <button
            onClick={() => setActiveTab("gates")}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              activeTab === "gates" ? "text-temple-gold bg-temple-gold/15 font-bold" : "text-sandstone hover:text-parchment"
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-mono mt-0.5">Gates</span>
          </button>

          {/* 3. Best Route (Center Highlighted Action Button) */}
          <button
            onClick={runBestPathAlgorithm}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              activeTab === "route" ? "text-emerald-400 bg-emerald-950/80 font-bold ring-1 ring-emerald-500" : "text-temple-gold hover:text-parchment"
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-temple-gold text-stone-charcoal flex items-center justify-center shadow-lg font-bold">
              <Zap className="w-4 h-4 fill-current text-stone-charcoal" />
            </div>
            <span className="text-[10px] font-mono mt-0.5 font-bold">Best Path</span>
          </button>

          {/* 4. SOS Emergency */}
          <button
            onClick={() => setActiveTab("sos")}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              activeTab === "sos" ? "text-red-400 bg-red-950/80 font-bold ring-1 ring-red-500" : "text-sandstone hover:text-parchment"
            }`}
          >
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span className="text-[10px] font-mono mt-0.5 text-red-400">SOS</span>
          </button>

          {/* 5. Pass */}
          <button
            onClick={() => setActiveTab("pass")}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              activeTab === "pass" ? "text-temple-gold bg-temple-gold/15 font-bold" : "text-sandstone hover:text-parchment"
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span className="text-[10px] font-mono mt-0.5">Pass</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
