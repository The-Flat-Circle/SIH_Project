"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Home,
  Compass,
  Zap,
  Volume2,
  VolumeX,
  Clock,
  MapPin,
  QrCode,
  Sparkles,
  Search,
  Star,
  SlidersHorizontal,
  ChevronRight,
  Accessibility,
  Footprints,
  User,
  LogOut,
  CheckCircle2,
  X,
  ShieldCheck,
  Navigation,
  ExternalLink,
  Moon,
  Sun
} from "lucide-react";
import { supabase, signInWithGoogle } from "@/lib/supabaseClient";

const LiveNavigationMap = dynamic(() => import("./LiveNavigationMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-72 rounded-3xl bg-stone-100 border border-stone-200 flex flex-col items-center justify-center text-stone-500 font-mono text-xs gap-2 shadow-inner">
      <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      <span>Loading Interactive Live Map...</span>
    </div>
  ),
});

export type SupportedSite = "puri" | "vaishnodevi" | "tirupati" | "varanasi" | "kedarnath" | "siddhivinayak";

interface Destination {
  id: SupportedSite;
  name: string;
  state: string;
  status: string;
  badgeType: string;
  waitTime: string;
  bestGate: string;
  avoidGate: string;
  avoidWait: string;
  navMapImage: string;
  image: string;
  rating: string;
  category: "surge" | "moderate" | "offpeak";
  hasSeniorAccess: boolean;
  lat: number;
  lng: number;
  gateLat: number;
  gateLng: number;
  pathSteps: string[];
}

const DESTINATIONS: Destination[] = [
  {
    id: "puri",
    name: "Jagannath Temple Puri",
    state: "ODISHA, INDIA",
    status: "85% High Surge",
    badgeType: "surge",
    waitTime: "55 Mins",
    bestGate: "Ashwadwara Gate B (8 Mins)",
    avoidGate: "Singhadwara Gate (East)",
    avoidWait: "55 Mins (340 PPL)",
    navMapImage: "/nav_maps/jagannathtempnav.jpeg",
    image: "/puri_jagannath.jpg",
    rating: "4.9",
    category: "surge",
    hasSeniorAccess: true,
    lat: 19.8134,
    lng: 85.8180,
    gateLat: 19.8131,
    gateLng: 85.8174,
    pathSteps: [
      "Pass Aruna Stambha (Sun Pillar) on your left",
      "Proceed through Bada Danda (Grand Road) bypass corridor",
      "Enter via Ashwadwara Gate B (Priority Fast-Track)"
    ]
  },
  {
    id: "vaishnodevi",
    name: "Mata Vaishno Devi",
    state: "KATRA, J&K",
    status: "92% Critical",
    badgeType: "surge",
    waitTime: "75 Mins",
    bestGate: "Bhairon Ropeway Gate B (10 Mins)",
    avoidGate: "Bhavan Main Darshan Queue",
    avoidWait: "75 Mins (520 PPL)",
    navMapImage: "/nav_maps/matavaishnodevinav.jpeg",
    image: "/vaishno_devi.jpg",
    rating: "4.9",
    category: "surge",
    hasSeniorAccess: false,
    lat: 33.0308,
    lng: 74.9490,
    gateLat: 33.0312,
    gateLng: 74.9495,
    pathSteps: [
      "Take Sanjichhat bypass route toward Bhairon Ghati",
      "Follow shaded mountain corridor path",
      "Enter via Bhairon Ropeway Gate B (Fast-Track Entry)"
    ]
  },
  {
    id: "tirupati",
    name: "Tirupati Balaji",
    state: "ANDHRA PRADESH",
    status: "78% Moderate",
    badgeType: "moderate",
    waitTime: "40 Mins",
    bestGate: "Supadam Gate B (12 Mins)",
    avoidGate: "Vaikuntam Queue Complex 1",
    avoidWait: "90 Mins (680 PPL)",
    navMapImage: "/nav_maps/tirupatibalajinav.jpeg",
    image: "/tirupati_balaji.jpg",
    rating: "4.8",
    category: "moderate",
    hasSeniorAccess: true,
    lat: 13.6833,
    lng: 79.3472,
    gateLat: 13.6836,
    gateLng: 79.3475,
    pathSteps: [
      "Head right past Akhilandam coconut breaking area",
      "Walk along North Mada Street corridor",
      "Enter via Supadam Special Queue Gate B"
    ]
  },
  {
    id: "varanasi",
    name: "Kashi Vishwanath",
    state: "VARANASI, UP",
    status: "65% Normal",
    badgeType: "normal",
    waitTime: "20 Mins",
    bestGate: "Dhundhiraj Gali Gate 3 (7 Mins)",
    avoidGate: "Ganges Ghat Main Gate 1",
    avoidWait: "60 Mins (410 PPL)",
    navMapImage: "/nav_maps/kashivishwanathtemp.jpeg",
    image: "/kashi_vishwanath.jpg",
    rating: "4.9",
    category: "offpeak",
    hasSeniorAccess: true,
    lat: 25.3109,
    lng: 83.0107,
    gateLat: 25.3112,
    gateLng: 83.0112,
    pathSteps: [
      "Bypass main River Ghat crowd at Chowk Crossing",
      "Enter through Dhundhiraj Gali heritage corridor",
      "Enter via Vishwanath Corridor Gate 3"
    ]
  },
  {
    id: "kedarnath",
    name: "Kedarnath Dham",
    state: "UTTARAKHAND",
    status: "40% Low Load",
    badgeType: "low",
    waitTime: "10 Mins",
    bestGate: "Bhairavnath Path Gate 2 (9 Mins)",
    avoidGate: "Mandir Sangam Main Gate",
    avoidWait: "80 Mins (490 PPL)",
    navMapImage: "/nav_maps/kedarnathtemp.jpeg",
    image: "/kedarnath.avif",
    rating: "5.0",
    category: "offpeak",
    hasSeniorAccess: true,
    lat: 30.7346,
    lng: 79.0669,
    gateLat: 30.7348,
    gateLng: 79.0672,
    pathSteps: [
      "Turn left at Helipad bypass point",
      "Walk along Mandakini riverbank walkway",
      "Enter via Bhairavnath VIP Entry Gate 2"
    ]
  },
  {
    id: "siddhivinayak",
    name: "Siddhivinayak",
    state: "MUMBAI, MH",
    status: "88% High Surge",
    badgeType: "surge",
    waitTime: "45 Mins",
    bestGate: "Prabhadevi Gate 2 (8 Mins)",
    avoidGate: "SK Bole Road Main Gate 1",
    avoidWait: "45 Mins (310 PPL)",
    navMapImage: "/nav_maps/siddhivinayaktemp.jpeg",
    image: "/siddhivinayak.jpg",
    rating: "4.8",
    category: "surge",
    hasSeniorAccess: false,
    lat: 19.0169,
    lng: 72.8304,
    gateLat: 19.0172,
    gateLng: 72.8308,
    pathSteps: [
      "Walk past Prabhadevi Corner landmark",
      "Follow Kakasaheb Gadgil Marg fast lane",
      "Enter via Gate 2 (Senior / Fast-Track Gate)"
    ]
  }
];

const CATEGORY_TABS = [
  { id: "all", label: "All Temples" },
  { id: "surge", label: "High Surge" },
  { id: "senior", label: "Senior Early Access" },
  { id: "offpeak", label: "Low Surge Circuits" },
];

export default function PilgrimMobileApp() {
  const [activeTab, setActiveTab] = useState<"home" | "explore" | "route" | "pass">("home");
  const [selectedSite, setSelectedSite] = useState<SupportedSite>("puri");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [navStarted, setNavStarted] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(["puri", "kedarnath"]);

  // Night Mode Display State
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("yatra_night_mode");
    if (saved === "true") {
      setIsNightMode(true);
    }
  }, []);

  const toggleNightMode = (enabled: boolean) => {
    setIsNightMode(enabled);
    localStorage.setItem("yatra_night_mode", enabled ? "true" : "false");
  };

  // Supabase Authentication & Profile States
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [userSession, setUserSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const activeTemple = DESTINATIONS.find((d) => d.id === selectedSite) || DESTINATIONS[0];

  const filteredDestinations = DESTINATIONS.filter((d) => {
    let matchesCategory = true;
    if (activeCategory === "surge") {
      matchesCategory = d.status.includes("Surge") || d.status.includes("Critical") || d.category === "surge";
    } else if (activeCategory === "senior") {
      matchesCategory = d.hasSeniorAccess === true;
    } else if (activeCategory === "offpeak") {
      matchesCategory = d.status.includes("Low") || d.status.includes("Normal") || d.category === "offpeak";
    }

    let matchesSearch = true;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      matchesSearch =
        d.name.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.bestGate.toLowerCase().includes(q) ||
        d.status.toLowerCase().includes(q);
    }

    return matchesCategory && matchesSearch;
  });

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

  const handleGoogleLogin = async () => {
    try {
      setAuthLoading(true);
      setAuthError("");
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (err: any) {
      setAuthError(err.message || "Google sign in failed.");
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setAuthLoading(true);
    await supabase.auth.signOut();
    setUserSession(null);
    setAuthLoading(false);
  };

  return (
    <div className={`w-full min-h-screen font-sans relative flex flex-col pb-28 selection:bg-yellow-300 selection:text-slate-900 overflow-x-hidden transition-colors duration-300 ${
      isNightMode
        ? "bg-[#0B0C0E] text-stone-100"
        : "bg-gradient-to-b from-[#FAF8F2] via-[#F6F3EA] to-[#F1EDE2] text-slate-800"
    }`}>
      
      {/* TOP HEADER BAR */}
      <header className={`px-4 pt-5 pb-3 sticky top-0 z-40 backdrop-blur-md transition-colors duration-300 ${
        isNightMode
          ? "bg-[#111318]/95 border-b border-amber-500/20 shadow-black/40"
          : "bg-[#FAF8F2]/95 border-b border-stone-200/60 shadow-xs"
      }`}>
        <div className="max-w-2xl mx-auto flex items-center justify-between w-full">
          {/* Leftmost Top: App Icon */}
          <button
            onClick={() => setActiveTab("home")}
            className={`relative w-10 h-10 rounded-2xl overflow-hidden border shadow-xs shrink-0 hover:scale-105 transition-transform ${
              isNightMode ? "border-amber-500/40 bg-amber-950/40" : "border-amber-300 bg-amber-100"
            }`}
            title="Home"
          >
            <Image src="/app-icon.jpg" alt="App Icon" fill className="object-cover" priority />
          </button>

          {/* Center: Location Selector Pill */}
          <div className={`px-3.5 py-1.5 rounded-full border shadow-2xs flex items-center gap-1.5 max-w-[190px] sm:max-w-xs truncate transition-colors ${
            isNightMode ? "bg-[#1A1D26] border-amber-500/30 text-amber-300" : "bg-white border-stone-200 text-slate-800"
          }`}>
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="text-[11px] font-bold truncate">{activeTemple.name}</span>
          </div>

          {/* Right Top: Profile Icon */}
          <button
            onClick={() => setIsProfileOpen(true)}
            title="User Profile & Auth"
            className={`w-10 h-10 rounded-2xl border shadow-xs shrink-0 flex items-center justify-center hover:scale-105 transition-all relative ${
              isNightMode ? "bg-amber-500/20 text-yellow-400 border-amber-500/40 hover:bg-amber-500/30" : "bg-slate-900 text-yellow-400 border-slate-800 hover:bg-slate-800"
            }`}
          >
            <User className="w-5 h-5 text-yellow-400" />
            {userSession && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
            )}
          </button>
        </div>
      </header>

      {/* MAIN BODY AREA */}
      <main className="px-4 sm:px-6 pt-4 flex-1 space-y-6 w-full max-w-2xl mx-auto">
        
        {/* ================= TAB 1: HOME ================= */}
        {activeTab === "home" && (
          <div className="space-y-6">
            
            {/* FUNCTIONAL SEARCH BAR */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search temples, locations, gates..."
                className={`w-full py-3.5 pl-11 pr-11 rounded-full text-xs font-medium shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                  isNightMode
                    ? "bg-[#161922] border border-amber-500/25 text-stone-100 placeholder-stone-500 focus:ring-amber-500"
                    : "bg-white border border-stone-200/80 text-slate-800 placeholder-stone-400 focus:ring-yellow-400"
                }`}
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <SlidersHorizontal className={`w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer ${isNightMode ? "text-amber-400" : "text-slate-700"}`} />
              )}
            </div>

            {/* FEATURED TEMPLE COVER CARD */}
            <div className={`relative rounded-[32px] overflow-hidden border transition-colors group ${
              isNightMode ? "bg-[#161922] border-amber-500/25 shadow-2xl shadow-black/80" : "bg-white border-stone-200/60 shadow-xl shadow-stone-200/60"
            }`}>
              <div className="relative h-64 w-full">
                <Image
                  src={activeTemple.image}
                  alt={activeTemple.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-bold tracking-wide backdrop-blur-md shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    {activeTemple.status}
                  </span>

                  <button
                    onClick={() => toggleFavorite(activeTemple.id)}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg"
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
                    {activeTemple.state}
                  </span>
                  <h2 className="font-serif text-2xl font-bold leading-tight text-white">{activeTemple.name}</h2>
                </div>
              </div>

              {/* Bottom White & Yellow Sheet */}
              <div className={`p-5 space-y-4 transition-colors ${
                isNightMode ? "bg-[#11131A] text-stone-200" : "bg-gradient-to-b from-white to-[#FFFDF6] text-slate-600"
              }`}>
                <div className={`flex items-center justify-between text-xs font-medium ${isNightMode ? "text-stone-300" : "text-slate-600"}`}>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" /> Wait: <strong className={isNightMode ? "text-stone-100" : "text-slate-900"}>{activeTemple.waitTime}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-400" /> Best: <strong className="text-emerald-400">{activeTemple.bestGate}</strong>
                  </span>
                </div>

                {/* Action Button */}
                <button
                  onClick={runBestPathAlgorithm}
                  className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isNightMode
                      ? "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110"
                      : "bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-slate-950 shadow-lg shadow-yellow-500/30 hover:brightness-105"
                  }`}
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>FIND & NAVIGATE BEST PATH</span>
                </button>
              </div>
            </div>

            {/* CATEGORY SELECTOR PILLS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className={`font-serif text-lg font-bold ${isNightMode ? "text-white" : "text-slate-900"}`}>Select Destination</h3>
                <span className={`text-xs font-mono font-bold ${isNightMode ? "text-amber-400" : "text-amber-700"}`}>
                  Showing {filteredDestinations.length} Locations
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {CATEGORY_TABS.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full border text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                      activeCategory === cat.id
                        ? isNightMode
                          ? "bg-amber-500/30 text-amber-300 border-amber-500/60 shadow-amber-500/10"
                          : "bg-slate-900 text-yellow-400 border-slate-900 shadow-md"
                        : isNightMode
                          ? "bg-[#161922] text-stone-400 border-stone-800 hover:text-stone-200"
                          : "bg-white text-slate-700 border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DYNAMIC SEARCH & FILTER DESTINATION CARDS GRID */}
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-2 gap-3.5">
                {filteredDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => setSelectedSite(dest.id as SupportedSite)}
                    className={`relative rounded-3xl overflow-hidden border transition-all cursor-pointer shadow-md group ${
                      isNightMode ? "bg-[#161922] border-stone-800 hover:border-amber-500/40" : "bg-white border-stone-200/80"
                    } ${
                      selectedSite === dest.id ? "ring-2 ring-amber-400 border-amber-400" : ""
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
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            favorites.includes(dest.id) ? "fill-yellow-400 text-yellow-400" : ""
                          }`}
                        />
                      </button>

                      {/* Status Badge */}
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-bold text-white border border-white/10">
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
            ) : (
              <div className={`p-8 text-center rounded-3xl border space-y-2 ${
                isNightMode ? "bg-[#161922] border-stone-800 text-stone-300" : "bg-white border-stone-200"
              }`}>
                <Search className="w-8 h-8 text-stone-400 mx-auto" />
                <h4 className={`font-serif font-bold text-base ${isNightMode ? "text-white" : "text-slate-800"}`}>No Temples Found</h4>
                <p className="text-xs text-stone-400">No destination matching &quot;{searchQuery}&quot;.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="px-4 py-2 rounded-full bg-amber-500/20 text-yellow-300 text-xs font-bold mt-2 border border-amber-500/30"
                >
                  Clear Search Filter
                </button>
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 2: EXPLORE ALL POPULAR DESTINATIONS ================= */}
        {activeTab === "explore" && (
          <div className="space-y-4">
            <div className={`flex items-center justify-between border-b pb-2 ${isNightMode ? "border-stone-800" : "border-stone-200"}`}>
              <h2 className={`font-serif text-xl font-bold ${isNightMode ? "text-white" : "text-slate-900"}`}>Popular Tourist Destinations</h2>
              <span className={`text-xs font-mono font-bold ${isNightMode ? "text-amber-400" : "text-amber-600"}`}>{filteredDestinations.length} Locations</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredDestinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => {
                    setSelectedSite(dest.id as SupportedSite);
                    setActiveTab("home");
                  }}
                  className={`relative rounded-3xl overflow-hidden border shadow-lg flex items-center p-3 gap-3 cursor-pointer group transition-colors ${
                    isNightMode ? "bg-[#161922] border-stone-800 text-white" : "bg-white border-stone-200 text-slate-900"
                  }`}
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] font-mono text-amber-500 font-bold uppercase">{dest.state}</span>
                    <h3 className={`font-serif font-bold text-base leading-tight ${isNightMode ? "text-white" : "text-slate-900"}`}>{dest.name}</h3>
                    <div className={`flex items-center gap-2 text-xs font-mono ${isNightMode ? "text-stone-300" : "text-slate-600"}`}>
                      <span>Wait: <strong className={isNightMode ? "text-yellow-300" : "text-slate-900"}>{dest.waitTime}</strong></span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">{dest.status}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-stone-400 pr-1" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: ROUTE (AIRLINE TICKET STYLE WITH EMBEDDED MAP) ================= */}
        {activeTab === "route" && (
          <div className="space-y-5">
            {/* AIRLINE TICKET STYLE ROUTE CARD WITH EMBEDDED MAP */}
            <div className={`rounded-[32px] overflow-hidden border shadow-xl space-y-0 transition-colors ${
              isNightMode ? "bg-[#161922] border-amber-500/30 text-white" : "bg-white border-stone-200 text-slate-900"
            }`}>
              {/* Header Green & Yellow Strip */}
              <div className={`p-4 font-mono text-xs font-bold flex items-center justify-between ${
                isNightMode
                  ? "bg-amber-500/20 text-yellow-300 border-b border-amber-500/30"
                  : "bg-gradient-to-r from-amber-400 via-yellow-400 to-yellow-300 text-slate-950"
              }`}>
                <span className="flex items-center gap-1.5 uppercase">
                  <Sparkles className="w-4 h-4 fill-current" /> OPTIMAL PATH CONFIRMED
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-yellow-400 text-[10px] font-bold border border-yellow-400/30">
                  SAVE 47 MINS
                </span>
              </div>

              {/* Main Ticket Body */}
              <div className="p-4 space-y-4">
                <div className={`flex items-center justify-between border-b pb-3 ${isNightMode ? "border-stone-800" : "border-stone-100"}`}>
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 block uppercase">AVOID OVERCROWDED</span>
                    <span className="text-sm font-serif font-bold text-red-500 line-through">{activeTemple.avoidGate}</span>
                    <span className="text-xs font-mono text-stone-400 block">{activeTemple.avoidWait}</span>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    isNightMode ? "bg-stone-800 text-yellow-400" : "bg-stone-100 text-slate-600"
                  }`}>
                    ➔
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">RECOMMENDED GATE</span>
                    <span className={`text-base font-serif font-bold ${isNightMode ? "text-white" : "text-slate-900"}`}>{activeTemple.bestGate}</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold block">Priority Entry Active ✓</span>
                  </div>
                </div>

                {/* LIVE INTERACTIVE MAP EMBEDDED DIRECTLY INSIDE TICKET CARD */}
                <LiveNavigationMap
                  templeName={activeTemple.name}
                  destLat={activeTemple.lat}
                  destLng={activeTemple.lng}
                  bestGateName={activeTemple.bestGate}
                  gateLat={activeTemple.gateLat}
                  gateLng={activeTemple.gateLng}
                  navMapImage={activeTemple.navMapImage}
                  isNightMode={isNightMode}
                />

                {/* CONCISE TEMPLE TURN-BY-TURN PATH DETAILS */}
                <div className={`p-3.5 rounded-2xl border text-xs font-mono space-y-2 ${
                  isNightMode
                    ? "bg-[#10131A] border-amber-500/20 text-stone-200"
                    : "bg-amber-50/70 border-amber-200 text-slate-800"
                }`}>
                  <div className="font-bold text-amber-500 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      <Footprints className="w-3.5 h-3.5 text-amber-500" /> Shortest Walking Path
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">Fastest Route</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    {activeTemple.pathSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ticket Details Grid */}
                <div className={`grid grid-cols-3 gap-2 p-3 rounded-2xl text-xs font-mono text-center border ${
                  isNightMode ? "bg-[#10131A] border-stone-800" : "bg-stone-50 border-stone-100"
                }`}>
                  <div>
                    <span className="text-[9px] text-stone-400 block uppercase">GATE CODE</span>
                    <span className={`font-bold text-sm ${isNightMode ? "text-white" : "text-slate-900"}`}>GATE B</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 block uppercase">WAIT TIME</span>
                    <span className="font-bold text-emerald-400 text-sm">{activeTemple.bestGate.match(/\(\d+ Mins\)/)?.[0] || "8 MINS"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 block uppercase">QUEUE LOAD</span>
                    <span className={`font-bold text-sm ${isNightMode ? "text-amber-400" : "text-slate-900"}`}>22% LOW</span>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation Trigger */}
              <div className={`p-4 border-t ${isNightMode ? "bg-[#10131A] border-stone-800" : "bg-stone-50 border-stone-100"}`}>
                <button
                  onClick={() => setNavStarted(!navStarted)}
                  className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    navStarted
                      ? "bg-emerald-600 text-white"
                      : isNightMode
                        ? "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-amber-500/20"
                        : "bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-slate-950"
                  }`}
                >
                  <Footprints className="w-4 h-4" />
                  <span>{navStarted ? "LIVE GPS TRACKING ACTIVE" : "START TURN-BY-TURN NAVIGATION"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: PASS ================= */}
        {activeTab === "pass" && (
          <div className="space-y-5">
            <div className={`p-6 rounded-[32px] border text-center space-y-4 shadow-xl transition-colors ${
              isNightMode ? "bg-[#161922] border-amber-500/30 text-white" : "bg-white border-stone-200 text-slate-900"
            }`}>
              <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest block">
                SHREE MANDIRA DIGITAL QR PASS
              </span>

              <div className={`w-48 h-48 mx-auto p-4 rounded-3xl border-2 flex items-center justify-center shadow-inner ${
                isNightMode ? "bg-[#0E1017] border-amber-500/30" : "bg-stone-50 border-stone-200"
              }`}>
                <QrCode className={`w-full h-full ${isNightMode ? "text-amber-400" : "text-slate-800"}`} />
              </div>

              <div>
                <h3 className={`text-lg font-serif font-bold ${isNightMode ? "text-white" : "text-slate-900"}`}>Pass ID: #PUR-2026-9842</h3>
                <span className="text-xs font-mono text-emerald-400 font-bold block">VALID FOR GATE B (ASHWADWARA)</span>
              </div>

              <div className={`p-3.5 rounded-2xl border text-xs font-mono text-left space-y-1 ${
                isNightMode ? "bg-[#10131A] border-stone-800 text-stone-300" : "bg-amber-50/60 border-amber-200 text-slate-700"
              }`}>
                <div>Pilgrim: Senior Citizen / Family</div>
                <div>Time Slot: 10:30 AM - 11:30 AM</div>
                <div>Status: Priority Fast-Track Entry Granted ✓</div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FLOATING BOTTOM NAVIGATION BAR */}
      <nav className={`fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 backdrop-blur-xl border rounded-full px-3 py-2 transition-all ${
        isNightMode
          ? "bg-[#111318]/95 border-amber-500/30 shadow-2xl shadow-black/80"
          : "bg-white/95 border-stone-200/80 shadow-2xl shadow-stone-900/15"
      }`}>
        <div className="grid grid-cols-4 gap-1 text-center">
          
          {/* 1. Home */}
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center justify-center py-1.5 rounded-full transition-all ${
              activeTab === "home"
                ? isNightMode ? "text-amber-300 font-bold bg-amber-500/25 border border-amber-500/30" : "text-slate-950 font-bold bg-amber-300/40"
                : isNightMode ? "text-stone-400 hover:text-stone-200" : "text-stone-400 hover:text-slate-700"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">Home</span>
          </button>

          {/* 2. Explore */}
          <button
            onClick={() => setActiveTab("explore")}
            className={`flex flex-col items-center justify-center py-1.5 rounded-full transition-all ${
              activeTab === "explore"
                ? isNightMode ? "text-amber-300 font-bold bg-amber-500/25 border border-amber-500/30" : "text-slate-950 font-bold bg-amber-300/40"
                : isNightMode ? "text-stone-400 hover:text-stone-200" : "text-stone-400 hover:text-slate-700"
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">Explore</span>
          </button>

          {/* 3. AI Route */}
          <button
            onClick={runBestPathAlgorithm}
            className={`flex flex-col items-center justify-center py-1.5 rounded-full transition-all ${
              activeTab === "route" ? "text-slate-950 font-bold bg-amber-400" : isNightMode ? "text-amber-300" : "text-slate-900"
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
              activeTab === "pass"
                ? isNightMode ? "text-amber-300 font-bold bg-amber-500/25 border border-amber-500/30" : "text-slate-950 font-bold bg-amber-300/40"
                : isNightMode ? "text-stone-400 hover:text-stone-200" : "text-stone-400 hover:text-slate-700"
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">Pass</span>
          </button>

        </div>
      </nav>

      {/* PROFILE MODAL */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-md rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl border p-6 space-y-5 max-h-[90vh] overflow-y-auto transition-colors ${
            isNightMode ? "bg-[#161922] border-amber-500/30 text-white" : "bg-white border-stone-200 text-slate-900"
          }`}>
            
            {/* Modal Header */}
            <div className={`flex items-center justify-between border-b pb-3 ${isNightMode ? "border-stone-800" : "border-stone-100"}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center font-bold shadow-xs ${
                  isNightMode ? "bg-amber-500/20 text-yellow-400 border-amber-500/40" : "bg-amber-100 text-amber-700 border-amber-300"
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-serif font-bold text-lg ${isNightMode ? "text-white" : "text-slate-900"}`}>Pilgrim Profile</h3>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Direct Google Auth</span>
                </div>
              </div>
              <button
                onClick={() => setIsProfileOpen(false)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isNightMode ? "bg-stone-800 text-stone-400 hover:text-white" : "bg-stone-100 text-stone-500 hover:text-slate-900"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* THEME MODE TOGGLE SWITCH (NIGHT MODE / LIGHT MODE) */}
            <div className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
              isNightMode
                ? "bg-[#10131A] border-amber-500/30 text-stone-200"
                : "bg-amber-50/70 border-amber-200/80 text-slate-800"
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isNightMode ? "bg-amber-500/20 text-yellow-400" : "bg-amber-100 text-amber-800"
                }`}>
                  {isNightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className={`text-xs font-bold font-serif ${isNightMode ? "text-white" : "text-slate-900"}`}>
                    {isNightMode ? "Night Mode" : "Light Mode"}
                  </h4>
                  <span className="text-[10px] font-mono text-stone-400 block">Appearance theme</span>
                </div>
              </div>

              <div className={`flex items-center gap-1 p-1 rounded-xl border ${
                isNightMode ? "bg-[#1A1D26] border-stone-800" : "bg-white border-stone-200"
              }`}>
                <button
                  onClick={() => toggleNightMode(false)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                    !isNightMode
                      ? "bg-amber-400 text-slate-950 shadow-xs"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" /> Light
                </button>

                <button
                  onClick={() => toggleNightMode(true)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                    isNightMode
                      ? "bg-amber-500 text-slate-950 shadow-xs font-bold"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" /> Night
                </button>
              </div>
            </div>

            {/* Auth Content */}
            {userSession ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isNightMode ? "bg-[#10131A] border-amber-500/30" : "bg-amber-50/70 border-amber-200/80"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase">Active Session</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Authenticated
                    </span>
                  </div>
                  <div className={`text-sm font-bold truncate ${isNightMode ? "text-white" : "text-slate-900"}`}>
                    {userSession.user.email}
                  </div>
                  <div className="text-[11px] font-mono text-stone-400">
                    User ID: <span className={isNightMode ? "text-amber-300" : "text-slate-700 font-semibold"}>{userSession.user.id.slice(0, 12)}...</span>
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border text-xs font-mono space-y-1 ${
                  isNightMode ? "bg-[#10131A] border-stone-800 text-stone-300" : "bg-stone-50 border-stone-200 text-slate-700"
                }`}>
                  <div className="font-bold flex items-center gap-1.5 text-amber-400">
                    <ShieldCheck className="w-4 h-4 text-amber-500" /> Pilgrim Benefits Active:
                  </div>
                  <div>• Senior Citizen Fast-Track Queue Pass</div>
                  <div>• Real-time Crowd Surge Alerts</div>
                  <div>• Saved Favorite Destinations</div>
                </div>

                <button
                  onClick={handleSignOut}
                  disabled={authLoading}
                  className="w-full py-3.5 rounded-2xl bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{authLoading ? "Signing Out..." : "Sign Out"}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-5 text-center py-2">
                <div className="space-y-1">
                  <h4 className={`font-serif font-bold text-base ${isNightMode ? "text-white" : "text-slate-900"}`}>Sign In to YatraFlow</h4>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto">
                    Authenticate directly using your Google Account to manage live passes and navigation.
                  </p>
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-medium text-left">
                    {authError}
                  </div>
                )}

                {/* DIRECT GOOGLE AUTH BUTTON ONLY */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={authLoading}
                  className={`w-full py-4 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-md group cursor-pointer ${
                    isNightMode
                      ? "bg-[#10131A] border-stone-700 hover:border-amber-400 text-white"
                      : "bg-white border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-900"
                  }`}
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>{authLoading ? "Connecting..." : "Continue with Google"}</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
