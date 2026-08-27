"use client";

import React from "react";
import { AlertTriangle, Clock, TrendingDown, ShieldAlert, ArrowRight } from "lucide-react";

export default function ProblemSection() {
  const problemCards = [
    {
      icon: Clock,
      title: "Excessive Wait Times",
      stat: "4 - 6 Hours",
      desc: "Visitors endure exhausting queue lines under harsh weather conditions due to static entry management and unmonitored gate bottlenecks.",
    },
    {
      icon: ShieldAlert,
      title: "Safety & Stampede Risk",
      stat: "Critical Density",
      desc: "Traditional CCTV setups only provide passive visual recording. Authorities lack predictive indicators before dangerous localized overcrowding occurs.",
    },
    {
      icon: TrendingDown,
      title: "Uneven Tourism Economy",
      stat: "85% Bottlenecked",
      desc: "Over 85% of visitor footfall and spending remains trapped within 500m of the primary shrine, bypassing nearby cultural villages and secondary heritage circuits.",
    },
  ];

  return (
    <section id="problem" className="py-24 bg-stone-dark/80 border-y border-sandstone/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-vermilion-dark/30 border border-vermilion/40 text-xs font-mono text-vermilion-glow">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>THE CRISIS IN SACRED HERITAGE DESTINATIONS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-parchment leading-tight">
            Pilgrimage overcrowding is an <br />
            <span className="italic text-temple-gold">information distribution problem</span>.
          </h2>

          <p className="text-sandstone text-base leading-relaxed">
            During major festivals and peak seasons, destinations like Puri Jagannath Temple receive upwards of 500,000 visitors daily. Current crowd control relies on static barricades and manual intervention—reacting after queues overflow rather than preventing bottlenecks proactively.
          </p>
        </div>

        {/* Problem Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problemCards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.title}
                className="p-6 rounded-xl bg-stone-charcoal/90 border border-sandstone/20 hover:border-temple-gold/40 transition-all duration-300 space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-dusk-indigo flex items-center justify-center text-temple-gold border border-sandstone/20 group-hover:border-temple-gold/50 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-sandstone/50">PROBLEM_0{idx + 1}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-vermilion-glow uppercase tracking-wider">
                    {card.stat}
                  </span>
                  <h3 className="font-serif text-xl text-parchment font-semibold">{card.title}</h3>
                </div>

                <p className="text-sm text-sandstone/80 leading-relaxed font-normal">{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Traditional vs YatraFlow Contrast Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-dusk-indigo/50 border border-sandstone/25 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono text-temple-gold uppercase tracking-wider">TRADITIONAL VS AI FLOW ENGINE</span>
            <h4 className="font-serif text-2xl text-parchment">Why manual barricading fails</h4>
            <p className="text-xs text-sandstone leading-relaxed font-mono">
              Manual gate management operates blind to real-time spatial density. YatraFlow introduces continuous Computer Vision monitoring coupled with 15-minute predictive forecasting.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-stone-charcoal/80 border border-red-900/40 space-y-2">
              <span className="text-xs font-mono text-red-400 font-bold">LEGACY APPROACH</span>
              <ul className="text-xs text-sandstone/70 space-y-1.5 font-mono">
                <li>• Reactive barricade locking</li>
                <li>• Unbalanced gate waiting times</li>
                <li>• Zero visibility into visitor intent</li>
                <li>• Secondary sites ignored</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-stone-charcoal/80 border border-temple-gold/40 space-y-2">
              <span className="text-xs font-mono text-temple-gold font-bold">YATRAFLOW PLATFORM</span>
              <ul className="text-xs text-sandstone space-y-1.5 font-mono">
                <li>✓ 15-min predictive crowd alert</li>
                <li>✓ Dynamic gate-to-gate rerouting</li>
                <li>✓ Personalised return-time slots</li>
                <li>✓ Tourism circuit redistribution</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
