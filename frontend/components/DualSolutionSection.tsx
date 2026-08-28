"use client";

import React, { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Compass, ShieldAlert, Sparkles, MapPin, Clock, ExternalLink } from "lucide-react";

export default function DualSolutionSection() {
  const [simulationActive, setSimulationActive] = useState(false);

  const secondaryAttractions = [
    {
      name: "Raghurajpur Heritage Crafts Village",
      type: "Heritage & Art",
      distance: "12 km",
      travelTime: "20 mins",
      crowdLevel: "Low (20% cap)",
      highlight: "Master Pattachitra artisans & Gotipua dance",
    },
    {
      name: "Narendra Pushkarini Tank",
      type: "Sacred Water Body",
      distance: "1.5 km",
      travelTime: "5 mins",
      crowdLevel: "Moderate (35% cap)",
      highlight: "Chandan Yatra boat festival pavilion",
    },
    {
      name: "Puri Blue Flag Beach",
      type: "Coastal Eco-Tourism",
      distance: "2.8 km",
      travelTime: "8 mins",
      crowdLevel: "Low (15% cap)",
      highlight: "Certified clean beach & sunset boardwalk",
    },
  ];

  return (
    <section id="dual-flow" className="py-24 bg-stone-dark/90 relative border-t border-sandstone/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-temple-gold/15 border border-temple-gold/30 text-xs font-mono text-temple-gold">
            <Compass className="w-3.5 h-3.5" />
            <span>TWO-TIER TOURISM FLOW OPTIMIZATION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-parchment leading-tight">
            Inward gate balancing vs. <br />
            <span className="italic text-temple-gold">outward ecosystem redistribution</span>.
          </h2>

          <p className="text-sandstone text-base leading-relaxed">
            The system operates simultaneously across micro-scale internal rerouting (redirecting visitors across temple gates) and macro-scale external redistribution (guiding tourists to surrounding cultural circuits).
          </p>
        </div>

        {/* Interactive Trigger Button */}
        <div className="mb-10 flex items-center justify-between p-4 rounded-xl bg-stone-charcoal border border-sandstone/25">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-vermilion animate-ping" />
            <span className="text-xs font-mono text-parchment font-semibold">
              SIMULATE REAL-TIME BOTTLENECK SURGE AT GATE A (SINGHADWARA)
            </span>
          </div>
          <button
            onClick={() => setSimulationActive(!simulationActive)}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all ${
              simulationActive
                ? "bg-vermilion text-parchment border border-vermilion shadow-vermilion-glow"
                : "bg-temple-gold text-stone-charcoal hover:bg-temple-amber shadow-temple-glow"
            }`}
          >
            {simulationActive ? "RESET SIMULATION" : "TRIGGER GATE OVERLOAD"}
          </button>
        </div>

        {/* Two-Sided Split Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel 1: Internal Rerouting (Inward Flow) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-stone-charcoal/95 border border-sandstone/25 space-y-6 relative overflow-hidden group hover:border-temple-gold/40 transition-colors shadow-xl">
            {/* Visual Header */}
            <div className="flex items-center justify-between border-b border-sandstone/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-dusk-indigo flex items-center justify-center text-temple-gold border border-sandstone/30">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-sandstone/70 uppercase">MICRO-SCALE ACTION</span>
                  <h3 className="font-serif text-xl text-parchment font-semibold">1. Internal Rerouting</h3>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-stone-dark text-temple-gold border border-temple-gold/30">
                INWARD FLOW
              </span>
            </div>

            <p className="text-sm text-sandstone leading-relaxed font-normal">
              Dynamically senses queue density across all 4 gates (Singhadwara, Ashwadwara, Vyaghradwara, Hastidwara). Redirects arriving pilgrims to alternate un-crowded entryways to collapse waiting times.
            </p>

            {/* Inward Flow Diagram Card */}
            <div className="p-4 rounded-xl bg-dusk-indigo/40 border border-sandstone/20 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-sandstone">GATE CAPACITY BALANCING</span>
                <span className={simulationActive ? "text-vermilion font-bold" : "text-emerald-400"}>
                  {simulationActive ? "GATE_A OVERFLOW (94%)" : "BALANCED (45%)"}
                </span>
              </div>

              {/* Gate Visual Lines */}
              <div className="space-y-3 font-mono text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-sandstone">
                    <span>Gate A (Singhadwara Main)</span>
                    <span className={simulationActive ? "text-vermilion font-bold" : "text-sandstone"}>
                      {simulationActive ? "380 PPL / 45m wait" : "120 PPL / 8m wait"}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-dark overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        simulationActive ? "w-[94%] bg-vermilion" : "w-[45%] bg-temple-gold"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-sandstone">
                    <span>Gate B (Ashwadwara South)</span>
                    <span className={simulationActive ? "text-emerald-400 font-bold" : "text-sandstone"}>
                      {simulationActive ? "REC: 40 PPL / 2m wait" : "65 PPL / 5m wait"}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-dark overflow-hidden">
                    <div className="h-full w-[25%] bg-emerald-500 transition-all duration-500" />
                  </div>
                </div>
              </div>

              {simulationActive && (
                <div className="p-3 rounded bg-vermilion-dark/30 border border-vermilion/40 text-xs font-mono text-vermilion-glow flex items-center gap-2 animate-pulse">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>ACTION TRIGGERED: Directing 60% inflow from Gate A → Gate B.</span>
                </div>
              )}
            </div>
          </div>

          {/* Panel 2: External Redistribution (Outward Flow) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-stone-charcoal/95 border border-sandstone/25 space-y-6 relative overflow-hidden group hover:border-temple-gold/40 transition-colors shadow-xl">
            {/* Visual Header */}
            <div className="flex items-center justify-between border-b border-sandstone/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-dusk-indigo flex items-center justify-center text-temple-gold border border-sandstone/30">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-sandstone/70 uppercase">MACRO-SCALE ACTION</span>
                  <h3 className="font-serif text-xl text-parchment font-semibold">2. External Redistribution</h3>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-stone-dark text-temple-gold border border-temple-gold/30">
                OUTWARD FLOW
              </span>
            </div>

            <p className="text-sm text-sandstone leading-relaxed font-normal">
              Instead of forcing visitors to wait hours in line during peak surges, YatraFlow issues optimal return-time slots (e.g. 5:00 PM) and recommends nearby heritage craft villages, water tanks, and pristine beaches.
            </p>

            {/* Radiating Secondary Circuit Cards */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-sandstone text-[11px] uppercase tracking-wider block">
                RECOMMENDED SECONDARY HERITAGE CIRCUITS:
              </span>

              {secondaryAttractions.map((site) => (
                <div
                  key={site.name}
                  className="p-3 rounded-xl bg-dusk-indigo/40 border border-sandstone/20 hover:border-temple-gold/40 transition-colors flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-parchment font-bold text-xs">{site.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-dark text-sandstone border border-sandstone/20">
                        {site.type}
                      </span>
                    </div>
                    <p className="text-[10px] text-sandstone/70">{site.highlight}</p>
                  </div>
                  <div className="text-right text-[10px]">
                    <span className="text-temple-gold font-bold block">{site.distance} ({site.travelTime})</span>
                    <span className="text-emerald-400 block">{site.crowdLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
