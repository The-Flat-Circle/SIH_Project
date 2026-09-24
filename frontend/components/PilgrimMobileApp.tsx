"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Home,
  Compass,
  Zap,
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
  Star,
  SlidersHorizontal,
  ArrowLeft,
  ChevronRight,
  Accessibility,
  Footprints,
  Heart,
  Share2,
  Users
} from "lucide-react";

export type SupportedSite = "puri" | "vaishnodevi" | "tirupati" | "varanasi" | "kedarnath" | "siddhivinayak";

const DESTINATIONS = [
  {
    id: "puri",
    name: "Puri Shree Mandira",
    state: "ODISHA, INDIA",
    status: "85% High Surge",
    badgeType: "surge",
    waitTime: "55 Mins",
    bestGate: "Ashwadwara (8 Mins)",
    image: "/puri_jagannath.jpg",
    rating: "4.9",
  },
  {
    id: "vaishnodevi",
    name: "Mata Vaishno Devi",
    state: "KATRA, J&K",
    status: "92% Critical",
    badgeType: "surge",
    waitTime: "75 Mins",
    bestGate: "Bhairon Ropeway (10 Mins)",
    image: "/vaishno_devi.jpg",
    rating: "4.9",
  },
  {
    id: "tirupati",
    name: "Tirupati Balaji",
    state: "ANDHRA PRADESH",
    status: "78% Moderate",
    badgeType: "moderate",
    waitTime: "40 Mins",
    bestGate: "Sampangi Pradakshinam (12 Mins)",
    image: "/tirupati_balaji.jpg",
    rating: "4.8",
  },
  {
    id: "varanasi",
    name: "Kashi Vishwanath",
    state: "VARANASI, UP",
    status: "65% Normal",
    badgeType: "normal",
    waitTime: "20 Mins",
    bestGate: "Ganga Corridor (5 Mins)",
    image: "/kashi_vishwanath.jpg",
    rating: "4.9",
  },
  {
    id: "kedarnath",
    name: "Kedarnath Dham",
    state: "UTTARAKHAND",
    status: "40% Low Load",
    badgeType: "low",
    waitTime: "10 Mins",
    bestGate: "Main Mandap (5 Mins)",
    image: "/kedarnath_dham.jpg",
    rating: "5.0",
  },
  {
    id: "siddhivinayak",
    name: "Siddhivinayak",
    state: "MUMBAI, MH",
    status: "88% High Surge",
    badgeType: "surge",
    waitTime: "45 Mins",
    bestGate: "Prabhadevi Bypass (8 Mins)",
    image: "/siddhivinayak.jpg",
    rating: "4.8",
  },
];

const GATES = [
  {
    code: "GATE_A",
    name: "Singhadwara (Lion Gate)",
    count: 340,
    time: "55 Mins",
    status: "High Surge",
    accessibility: "Stairs Only ⚠️",
    color: "bg-red-50 text-red-700 border-red-200",
  },
  {
    code: "GATE_B",
    name: "Ashwadwara (Horse Gate)",
    count: 65,
    time: "8 Mins",
    status: "Recommended",
    accessibility: "Wheelchair Ramp ♿ • Bench 🪑",
    color: "bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-yellow-400",
    recommended: true,
  },
  {
    code: "GATE_C",
    name: "Vyaghradwara (Tiger Gate)",
    count: 140,
    time: "18 Mins",
    status: "Normal",
    accessibility: "Water Station 💧",
    color: "bg-stone-50 text-stone-700 border-stone-200",
  },
  {
    code: "GATE_D",
    name: "Hastidwara (Elephant Gate)",
    count: 88,
    time: "12 Mins",
    status: "Normal",
    accessibility: "Shaded Area ☂️",
    color: "bg-stone-50 text-stone-700 border-stone-200",
  },
];

export default function PilgrimMobileApp() {
  const [activeTab, setActiveTab] = useState<"home" | "explore" | "route" | "pass">("home");
  const [selectedSite, setSelectedSite] = useState<SupportedSite>("puri");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [navStarted, setNavStarted] = useState<boolean>(false);
  const [voiceActive, setVoiceActive] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(["puri", "kedarnath"]);

  const activeTemple = DESTINATIONS.find((d) => d.id === selectedSite) || DESTINATIONS[0];

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const runBestPathAlgorithm = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setActiveTab("route");
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-b from-[#FAF8F2] via-[#F6F3EA] to-[#F1EDE2] text-slate-800 font-sans min-h-screen relative flex flex-col pb-28 selection:bg-yellow-300 selection:text-slate-900 shadow-2xl rounded-[40px] overflow-hidden border-8 border-stone-900/10">
      
      {/* MODERN FLOATING HEADER BAR (LIKE REFERENCED DESIGN) */}
      <header className="px-5 pt-6 pb-3 flex items-center justify-between sticky top-0 z-40 bg-[#FAF8F2]/90 backdrop-blur-md border-b border-stone-200/60">
        <button
          onClick={() => setActiveTab("home")}
          className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-stone-50 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Location Selector Pill */}
        <div className="px-4 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          <span className="text-xs font-bold text-slate-800 tracking-wide">{activeTemple.name}</span>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceActive(!voiceActive)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm ${
              voiceActive
                ? "bg-amber-400 border-amber-500 text-slate-900 ring-2 ring-amber-300"
                : "bg-white border-stone-200 text-slate-600"
            }`}
          >
            {voiceActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MAIN BODY AREA */}
      <main className="px-5 pt-4 flex-1 space-y-6">
        
        {/* ================= TAB 1: HOME (MODERN HERO & FEATURED DESTINATION) ================= */}
        {activeTab === "home" && (
          <div className="space-y-6">
            
            {/* SEARCH BAR (LIKE DESIGN 1 & 3) */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search crowded temples, gates..."
                className="w-full py-3.5 pl-11 pr-11 rounded-full bg-white border border-stone-200/80 text-xs font-medium text-slate-800 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <SlidersHorizontal className="w-4 h-4 text-slate-700 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
            </div>

            {/* FEATURED TEMPLE COVER CARD (LIKE DESIGN 2 - DONAU ELEGANCE HOTEL CARD) */}
            <div className="relative rounded-[32px] overflow-hidden bg-white border border-stone-200/60 shadow-xl shadow-stone-200/60 group">
              {/* Cover Photo */}
              <div className="relative h-64 w-full">
                <Image
                  src={activeTemple.image}
                  alt={activeTemple.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-bold tracking-wide backdrop-blur-md shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    {activeTemple.status}
                  </span>

                  <button
                    onClick={() => toggleFavorite(activeTemple.id)}
                    className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        favorites.includes(activeTemple.id) ? "fill-yellow-400 text-yellow-400" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Overlaid Title on Image */}
                <div className="absolute bottom-4 left-5 right-5 text-white z-10 space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-yellow-300 uppercase font-semibold">
                    📍 {activeTemple.state}
                  </span>
                  <h2 className="font-serif text-2xl font-bold leading-tight">{activeTemple.name}</h2>
                </div>
              </div>

              {/* Bottom White & Yellow Curved Sheet (Matching Reference Image 2 Bottom Layout) */}
              <div className="p-5 bg-gradient-to-b from-white to-[#FFFDF6] space-y-4">
                <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" /> Wait: <strong>{activeTemple.waitTime}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-500" /> Best: <strong className="text-emerald-700">{activeTemple.bestGate}</strong>
                  </span>
                </div>

                {/* Modern Gradient Action Button */}
                <button
                  onClick={runBestPathAlgorithm}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-lg shadow-yellow-500/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>FIND & NAVIGATE BEST PATH</span>
                </button>
              </div>
            </div>

            {/* CATEGORY SELECTOR PILLS (LIKE DESIGN 3 - HIKING, KAYAKING, BIKING) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-slate-900">Select Destination</h3>
                <button onClick={() => setActiveTab("explore")} className="text-xs font-bold text-amber-600">
                  See All ({DESTINATIONS.length})
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: "all", label: "🛕 All Temples" },
                  { id: "surge", label: "🔥 High Surge" },
                  { id: "senior", label: "♿ Senior Easy Access" },
                  { id: "offpeak", label: "🌿 Off-Peak Circuits" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full border text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                      activeCategory === cat.id
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2x2 DESTINATION CARDS GRID (LIKE DESIGN 3 - SWITZERLAND EMERALD PASS, CANADA SERENITY) */}
            <div className="grid grid-cols-2 gap-3.5">
              {DESTINATIONS.slice(0, 4).map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => setSelectedSite(dest.id as SupportedSite)}
                  className={`relative rounded-3xl overflow-hidden bg-white border transition-all cursor-pointer shadow-md group ${
                    selectedSite === dest.id ? "ring-2 ring-amber-400 border-amber-400" : "border-stone-200/80"
                  }`}
                >
                  <div className="relative h-44 w-full">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(dest.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          favorites.includes(dest.id) ? "fill-yellow-400 text-yellow-400" : ""
                        }`}
                      />
                    </button>

                    {/* Status Badge */}
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[9px] font-bold text-white">
                      {dest.status.split(" ")[0]}
                    </span>

                    {/* Bottom Info on Card */}
                    <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                      <span className="text-[8px] font-mono tracking-wider text-yellow-300 uppercase block font-semibold">
                        {dest.state}
                      </span>
                      <h4 className="font-serif font-bold text-sm leading-tight text-white line-clamp-1">
                        {dest.name}
                      </h4>
                      <span className="text-[10px] font-mono text-stone-300 block">
                        Wait: <strong className="text-yellow-400">{dest.waitTime}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB 2: EXPLORE ALL POPULAR DESTINATIONS ================= */}
        {activeTab === "explore" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <h2 className="font-serif text-xl font-bold text-slate-900">Popular Tourist Destinations</h2>
              <span className="text-xs font-mono text-amber-600 font-bold">{DESTINATIONS.length} Locations</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {DESTINATIONS.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => {
                    setSelectedSite(dest.id as SupportedSite);
                    setActiveTab("home");
                  }}
                  className="relative rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-lg flex items-center p-3 gap-3 cursor-pointer group"
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] font-mono text-amber-600 font-bold uppercase">{dest.state}</span>
                    <h3 className="font-serif font-bold text-base text-slate-900 leading-tight">{dest.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                      <span>Wait: <strong className="text-slate-900">{dest.waitTime}</strong></span>
                      <span>•</span>
                      <span className="text-emerald-600 font-bold">{dest.status}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-stone-400 pr-1" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: ROUTE (AIRLINE TICKET STYLE - REFERENCED DESIGN 1) ================= */}
        {activeTab === "route" && (
          <div className="space-y-5">
            
            {/* AIRLINE TICKET STYLE ROUTE CARD (REFERENCED DESIGN 1 - AIRLINES TICKET) */}
            <div className="rounded-[32px] overflow-hidden bg-white border border-stone-200 shadow-xl space-y-0">
              
              {/* Header Green & Yellow Strip */}
              <div className="p-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-yellow-300 text-slate-950 font-mono text-xs font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5 uppercase">
                  <Sparkles className="w-4 h-4 fill-slate-950" /> OPTIMAL PATH CONFIRMED
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-yellow-400 text-[10px] font-bold">
                  SAVE 47 MINS
                </span>
              </div>

              {/* Main Ticket Body */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 block uppercase">AVOID OVERCROWDED</span>
                    <span className="text-sm font-serif font-bold text-red-600 line-through">Singhadwara Gate</span>
                    <span className="text-xs font-mono text-stone-500 block">55 Mins Wait (340 PPL)</span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-slate-600">
                    ➔
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-emerald-600 font-bold block uppercase">RECOMMENDED GATE</span>
                    <span className="text-base font-serif font-bold text-slate-900">Ashwadwara Gate</span>
                    <span className="text-xs font-mono text-emerald-600 font-bold block">Only 8 Mins Wait!</span>
                  </div>
                </div>

                {/* Senior Citizen Facilities Card */}
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs font-mono space-y-1 text-slate-700">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Accessibility className="w-4 h-4 text-amber-600" /> Senior Citizen Facilities:
                  </div>
                  <div>• Wheelchair Ramp at Gate Entry ♿</div>
                  <div>• Shaded Benches every 50m 🪑</div>
                  <div>• Cold Drinking Water Station 💧</div>
                </div>

                {/* Ticket Details Grid (Matching Design 1 Seats, Terminal, Gate Layout) */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-stone-50 text-xs font-mono text-center">
                  <div>
                    <span className="text-[9px] text-stone-400 block uppercase">GATE CODE</span>
                    <span className="font-bold text-slate-900 text-sm">GATE B</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 block uppercase">WAIT TIME</span>
                    <span className="font-bold text-emerald-600 text-sm">8 MINS</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 block uppercase">QUEUE LOAD</span>
                    <span className="font-bold text-slate-900 text-sm">22% LOW</span>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation Trigger */}
              <div className="p-4 bg-stone-50 border-t border-stone-100">
                <button
                  onClick={() => setNavStarted(!navStarted)}
                  className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    navStarted
                      ? "bg-emerald-600 text-white"
                      : "bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-slate-950"
                  }`}
                >
                  <Footprints className="w-4 h-4" />
                  <span>{navStarted ? "LIVE NAVIGATION ACTIVE (TAP TO STOP)" : "START TURN-BY-TURN NAVIGATION"}</span>
                </button>
              </div>
            </div>

            {/* STEP BY STEP DIRECTIONS */}
            <div className="space-y-2">
              <h3 className="font-serif text-base font-bold text-slate-900">Walking Steps</h3>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 flex items-center gap-3 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <span className="text-slate-900 font-bold block">Walk straight 120m</span>
                    <span className="text-stone-500">Pass Aruna Stambha Sun Pillar on your left.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 flex items-center gap-3 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <span className="text-slate-900 font-bold block">Turn Right at Ashwadwara Sign</span>
                    <span className="text-stone-500">Wheelchair ramp & resting benches available.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 4: PASS (DIGITAL TICKET PASS) ================= */}
        {activeTab === "pass" && (
          <div className="space-y-5">
            <div className="p-6 rounded-[32px] bg-white border border-stone-200 text-center space-y-4 shadow-xl">
              <span className="text-xs font-mono text-amber-600 font-bold uppercase tracking-widest block">
                SHREE MANDIRA DIGITAL QR PASS
              </span>

              <div className="w-48 h-48 mx-auto bg-stone-50 p-4 rounded-3xl border-2 border-stone-200 flex items-center justify-center shadow-inner">
                <QrCode className="w-full h-full text-slate-800" />
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">Pass ID: #PUR-2026-9842</h3>
                <span className="text-xs font-mono text-emerald-600 font-bold block">VALID FOR GATE B (ASHWADWARA)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs font-mono text-slate-700 text-left space-y-1">
                <div>Pilgrim: Senior Citizen / Family</div>
                <div>Time Slot: 10:30 AM - 11:30 AM</div>
                <div>Status: Priority Fast-Track Entry Granted ✓</div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODERN FLOATING BOTTOM NAVIGATION BAR (LIKE REFERENCED DESIGN FLOATING NAV) */}
      <nav className="fixed bottom-4 left-4 right-4 max-w-sm mx-auto z-50 bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-full px-3 py-2 shadow-2xl shadow-stone-900/15">
        <div className="grid grid-cols-4 gap-1 text-center">
          
          {/* 1. Home */}
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center justify-center py-1.5 rounded-full transition-all ${
              activeTab === "home" ? "text-slate-950 font-bold bg-amber-300/40" : "text-stone-400 hover:text-slate-700"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">Home</span>
          </button>

          {/* 2. Explore */}
          <button
            onClick={() => setActiveTab("explore")}
            className={`flex flex-col items-center justify-center py-1.5 rounded-full transition-all ${
              activeTab === "explore" ? "text-slate-950 font-bold bg-amber-300/40" : "text-stone-400 hover:text-slate-700"
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">Explore</span>
          </button>

          {/* 3. AI Route (Highlighted Yellow Action) */}
          <button
            onClick={runBestPathAlgorithm}
            className={`flex flex-col items-center justify-center py-1.5 rounded-full transition-all ${
              activeTab === "route" ? "text-slate-950 font-bold bg-amber-400" : "text-slate-900"
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-950 flex items-center justify-center shadow-md font-bold">
              <Zap className="w-4 h-4 fill-slate-950" />
            </div>
            <span className="text-[9px] font-mono mt-0.5 font-bold">Best Path</span>
          </button>

          {/* 4. Pass */}
          <button
            onClick={() => setActiveTab("pass")}
            className={`flex flex-col items-center justify-center py-1.5 rounded-full transition-all ${
              activeTab === "pass" ? "text-slate-950 font-bold bg-amber-300/40" : "text-stone-400 hover:text-slate-700"
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
