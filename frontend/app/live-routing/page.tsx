"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, GitFork, Camera, ShieldAlert, Play, Pause, ArrowRight, Compass, Ticket, CheckCircle, QrCode } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LiveRoutingPage() {
  const [selectedCam, setSelectedCam] = useState<"cam1" | "cam2">("cam1");
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isGateAOverloaded, setIsGateAOverloaded] = useState<boolean>(true);
  const [ticketModalOpen, setTicketModalOpen] = useState<boolean>(false);

  const gates = [
    {
      id: "GATE_A",
      name: "Singhadwara (Lion Gate)",
      count: isGateAOverloaded ? 480 : 180,
      capacity: 500,
      status: isGateAOverloaded ? "CRITICAL" : "NORMAL",
      wait: isGateAOverloaded ? "55 mins" : "12 mins",
      isRecommended: false,
    },
    {
      id: "GATE_B",
      name: "Ashwadwara (Horse Gate)",
      count: 65,
      capacity: 400,
      status: "NORMAL",
      wait: "8 mins",
      isRecommended: isGateAOverloaded,
    },
    {
      id: "GATE_C",
      name: "Vyaghradwara (Tiger Gate)",
      count: 140,
      capacity: 350,
      status: "NORMAL",
      wait: "15 mins",
      isRecommended: false,
    },
    {
      id: "GATE_D",
      name: "Hastidwara (Elephant Gate)",
      count: 88,
      capacity: 350,
      status: "NORMAL",
      wait: "10 mins",
      isRecommended: false,
    },
  ];

  const externalCircuits = [
    {
      name: "Konark Sun Temple & Black Pagoda",
      distance: "35 km away",
      travelTime: "45 mins",
      crowdStatus: "LOW LOAD",
      tag: "UNESCO Heritage",
    },
    {
      name: "Raghurajpur Heritage Crafts Village",
      distance: "12 km away",
      travelTime: "20 mins",
      crowdStatus: "LOW LOAD",
      tag: "Pattachitra Arts",
    },
    {
      name: "Narendra Sacred Tank",
      distance: "2 km away",
      travelTime: "5 mins",
      crowdStatus: "LOW LOAD",
      tag: "Chandan Yatra Site",
    },
    {
      name: "Blue Flag Certified Puri Beach",
      distance: "4 km away",
      travelTime: "10 mins",
      crowdStatus: "MODERATE",
      tag: "Coastal Promenade",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-charcoal text-parchment font-sans relative selection:bg-temple-gold selection:text-stone-charcoal">
      <Navbar />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sandstone/15 pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-temple-gold hover:text-parchment mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-parchment">
              Live Routing & <span className="italic text-temple-gold">Crowd Redistribution</span>
            </h1>
            <p className="text-sandstone text-sm max-w-2xl mt-1">
              Real-time YOLOv8 Computer Vision video tracking, gate load balancing, and regional tourism circuit pass generation.
            </p>
          </div>

          {/* Interactive Gate Simulator Button */}
          <button
            onClick={() => setIsGateAOverloaded(!isGateAOverloaded)}
            className={`px-4 py-2.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer ${
              isGateAOverloaded
                ? "bg-red-950/90 border-red-500/50 text-red-200 hover:bg-red-900"
                : "bg-emerald-950/90 border-emerald-500/50 text-emerald-200 hover:bg-emerald-900"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>
              {isGateAOverloaded ? "Gate A Overloaded (Simulating 96%)" : "Gate A Load Normal (45%)"}
            </span>
          </button>
        </div>

        {/* SECTION 1: FIRST SHOW LIVE VIDEO MAPPING */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-temple-gold/20 border border-temple-gold/40 flex items-center justify-center text-temple-gold">
                <Camera className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-2xl text-parchment font-semibold">
                1. Live Computer Vision Video Mapping
              </h2>
            </div>

            {/* Video Node Switcher */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-dusk-card border border-sandstone/25 text-xs font-mono">
              <button
                onClick={() => setSelectedCam("cam1")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedCam === "cam1"
                    ? "bg-temple-gold text-stone-charcoal shadow-md"
                    : "text-sandstone hover:text-parchment"
                }`}
              >
                CAM_01 Singhadwara
              </button>
              <button
                onClick={() => setSelectedCam("cam2")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedCam === "cam2"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-sandstone hover:text-parchment"
                }`}
              >
                CAM_02 Ashwadwara
              </button>
            </div>
          </div>

          {/* Main Video Stream Container */}
          <div className="relative rounded-2xl overflow-hidden bg-stone-dark border border-sandstone/30 shadow-2xl h-[380px] sm:h-[480px] flex items-center justify-center group">
            <video
              src={selectedCam === "cam1" ? "/real_crowd_output.mp4" : "/crowd_night_scaled_output.mp4"}
              autoPlay={isVideoPlaying}
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter brightness-[0.95]"
            />

            {/* Live Video Control Overlay */}
            <button
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className="absolute bottom-4 right-4 p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
            >
              {isVideoPlaying ? <Pause className="w-5 h-5 text-amber-400" /> : <Play className="w-5 h-5 text-emerald-400" />}
            </button>

            {/* Live Telemetry Overlay Card */}
            <div className="absolute top-4 left-4 p-4 rounded-xl bg-stone-charcoal/90 border border-sandstone/30 text-xs font-mono text-parchment backdrop-blur-md space-y-1.5 shadow-2xl">
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>YOLOv8 + ByteTrack Live Stream</span>
              </div>
              <div className="text-slate-300">
                Camera Node: {selectedCam === "cam1" ? "CAM_01_SINGHADWARA" : "CAM_02_ASHWADWARA"}
              </div>
              <div className="text-sandstone">
                Inflow: {selectedCam === "cam1" ? "42 PPL/min" : "12 PPL/min"} | Outflow: {selectedCam === "cam1" ? "15 PPL/min" : "18 PPL/min"}
              </div>
              <div className="text-temple-gold font-bold">
                Movement Velocity: 0.12 m/s | Density: {selectedCam === "cam1" ? "HIGH (88%)" : "LOW (21%)"}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: OTHER MATRICES - GATE LOAD BALANCING */}
        <section className="space-y-4 pt-6 border-t border-sandstone/15">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-temple-gold/20 border border-temple-gold/40 flex items-center justify-center text-temple-gold">
              <GitFork className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-2xl text-parchment font-semibold">
              2. Internal Gate Load Balancing Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gates.map((gate) => (
              <div
                key={gate.id}
                className={`p-6 rounded-2xl border transition-all ${
                  gate.isRecommended
                    ? "bg-dusk-card border-temple-gold ring-2 ring-temple-gold/40 shadow-2xl scale-105"
                    : gate.status === "CRITICAL"
                    ? "bg-red-950/20 border-red-500/50"
                    : "bg-dusk-card/70 border-sandstone/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-sandstone/80">{gate.id}</span>
                  {gate.isRecommended && (
                    <span className="px-2 py-0.5 rounded bg-temple-gold text-stone-charcoal text-[10px] font-mono font-extrabold uppercase">
                      ★ Recommended
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg text-parchment font-semibold mb-2">{gate.name}</h3>

                <div className="space-y-2 pt-2 text-xs font-mono border-t border-sandstone/15">
                  <div className="flex justify-between">
                    <span className="text-sandstone/70">Current Count:</span>
                    <span className="text-parchment font-bold">{gate.count} PPL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sandstone/70">Capacity:</span>
                    <span className="text-parchment">
                      {Math.round((gate.count / gate.capacity) * 100)}% ({gate.status})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sandstone/70">Estimated Wait:</span>
                    <span className={`font-bold ${gate.status === "CRITICAL" ? "text-red-400" : "text-emerald-400"}`}>
                      {gate.wait}
                    </span>
                  </div>
                </div>

                {gate.isRecommended && (
                  <div className="mt-4 pt-3 border-t border-temple-gold/30 text-xs font-mono text-temple-gold font-bold flex items-center justify-between">
                    <span>Redirecting Gate A Inflow</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: EXTERNAL REGIONAL TOURISM CIRCUITS & RETURN PASS */}
        <section className="space-y-4 pt-6 border-t border-sandstone/15">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-temple-gold/20 border border-temple-gold/40 flex items-center justify-center text-temple-gold">
                <Compass className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-2xl text-parchment font-semibold">
                3. Regional External Tourism Redistribution
              </h2>
            </div>

            <button
              onClick={() => setTicketModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-temple-gold text-stone-charcoal font-mono text-xs font-bold hover:bg-temple-light transition-all shadow-temple-glow cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Claim Fast-Track Return Pass</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {externalCircuits.map((site, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-dusk-card border border-sandstone/25 space-y-4 hover:border-temple-gold/50 transition-all group"
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-stone-charcoal text-temple-gold border border-sandstone/20">
                    {site.tag}
                  </span>
                  <span className="text-emerald-400 font-bold">{site.crowdStatus}</span>
                </div>

                <h3 className="font-serif text-lg text-parchment font-semibold group-hover:text-temple-gold transition-colors">
                  {site.name}
                </h3>

                <div className="pt-2 border-t border-sandstone/15 space-y-1.5 text-xs font-mono text-sandstone">
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span className="text-parchment font-bold">{site.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travel Time:</span>
                    <span className="text-parchment">{site.travelTime}</span>
                  </div>
                </div>

                <div className="pt-2 text-xs font-mono text-temple-gold font-semibold flex items-center gap-1.5">
                  <span>Slot Slot: 5:00 PM - 5:30 PM</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Ticket Modal */}
      {ticketModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-charcoal border border-temple-gold/50 rounded-3xl p-8 max-w-md w-full space-y-6 text-center shadow-2xl relative">
            <div className="w-12 h-12 rounded-2xl bg-temple-gold/20 border border-temple-gold/40 flex items-center justify-center text-temple-gold mx-auto">
              <QrCode className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-temple-gold uppercase tracking-widest font-bold">
                FAST-TRACK RETURN PASS TICKET
              </span>
              <h3 className="font-serif text-2xl text-parchment font-bold">Shree Jagannath Puri Temple</h3>
              <p className="text-xs text-sandstone">Valid for Entry at Gate B (Ashwadwara)</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-dark border border-sandstone/20 space-y-2 text-xs font-mono text-sandstone">
              <div className="flex justify-between border-b border-sandstone/15 pb-1">
                <span>VALID SLOT:</span>
                <span className="text-emerald-400 font-bold">5:00 PM - 5:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-sandstone/15 pb-1">
                <span>PASS HOLDER:</span>
                <span className="text-parchment font-bold">Pilgrim Visitor</span>
              </div>
              <div className="flex justify-between">
                <span>CIRCUIT BONUS:</span>
                <span className="text-temple-gold">Konark Sun Temple Visit</span>
              </div>
            </div>

            <button
              onClick={() => setTicketModalOpen(false)}
              className="w-full py-3 rounded-xl bg-temple-gold text-stone-charcoal font-mono text-xs font-bold hover:bg-temple-light transition-all cursor-pointer"
            >
              Close Ticket
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
