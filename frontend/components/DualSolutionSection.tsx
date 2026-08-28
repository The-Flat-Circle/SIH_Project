"use client";

import React, { useState } from "react";
import { GitFork, Compass, ArrowRight, CheckCircle2, ShieldAlert, Sparkles, MapPin, Play, Pause } from "lucide-react";

export default function DualSolutionSection() {
  const [activeTab, setActiveTab] = useState<"internal" | "external" | "cv_video">("internal");
  const [isGateAOverloaded, setIsGateAOverloaded] = useState<boolean>(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);

  const internalGates = [
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
    <section id="dual-solution" className="py-24 bg-stone-charcoal relative temple-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-temple-gold/15 border border-temple-gold/30 text-xs font-mono text-temple-gold">
            <GitFork className="w-3.5 h-3.5" />
            <span>DYNAMIC DUAL REDISTRIBUTION ENGINE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-parchment leading-tight">
            Balanced internal gates. <br />
            <span className="italic text-temple-gold">Redistributed regional tourism</span>.
          </h2>

          <p className="text-sandstone text-base leading-relaxed">
            When YOLOv8 detects overcrowding at Singhadwara (Gate A), YatraFlow triggers a two-pronged solution: re-routing queue traffic to Ashwadwara (Gate B) and suggesting return-time slots via nearby cultural circuits.
          </p>
        </div>

        {/* Interactive Controls & Mode Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-dusk-card border border-sandstone/25 text-xs font-mono">
            <button
              onClick={() => setActiveTab("internal")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === "internal"
                  ? "bg-temple-gold text-stone-charcoal shadow-temple-glow"
                  : "text-sandstone hover:text-parchment"
              }`}
            >
              1. Internal Gate Rerouting
            </button>
            <button
              onClick={() => setActiveTab("external")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === "external"
                  ? "bg-temple-gold text-stone-charcoal shadow-temple-glow"
                  : "text-sandstone hover:text-parchment"
              }`}
            >
              2. External Tourism Circuit
            </button>
            <button
              onClick={() => setActiveTab("cv_video")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === "cv_video"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-sandstone hover:text-parchment"
              }`}
            >
              3. Live YOLOv8 CV Stream
            </button>
          </div>

          {/* Interactive Trigger Button */}
          <button
            onClick={() => setIsGateAOverloaded(!isGateAOverloaded)}
            className={`px-4 py-2.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              isGateAOverloaded
                ? "bg-red-950/80 border-red-500/50 text-red-300 hover:bg-red-900"
                : "bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>
              {isGateAOverloaded ? "Gate A Overloaded (Simulating 96%)" : "Gate A Load Normal (45%)"}
            </span>
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === "internal" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {internalGates.map((gate) => (
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
                    <span className="text-sandstone/70">Current Load:</span>
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
                    <span>Redirecting Gate A Visitors</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "external" && (
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
                  <span>Fast-Track Return Pass: 5:00 PM</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "cv_video" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-dusk-card border border-sandstone/30 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-sandstone">
              <span className="text-amber-400 font-bold flex items-center gap-2">
                <Play className="w-4 h-4" /> LIVE COMPUTER VISION PROCESSING STREAM (YOLOv8 + ByteTrack)
              </span>
              <span>CAM_01_SINGHADWARA_PROCESSED.MP4</span>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-stone-dark border border-sandstone/20 h-[340px] sm:h-[420px] flex items-center justify-center">
              <video
                src="/real_crowd_output.mp4"
                autoPlay={isVideoPlaying}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-slate-950/80 border border-emerald-500/40 text-xs font-mono text-slate-200 backdrop-blur-md space-y-1">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  YOLOv8 TRACKING ACTIVE
                </div>
                <div>Moving IDs: 138 PPL | Speed: 0.12 m/s</div>
                <div>Inflow: 42/min | Outflow: 15/min</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
