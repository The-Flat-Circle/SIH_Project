"use client";

import React from "react";
import { TrendingUp, BarChart3, Users, ShieldCheck } from "lucide-react";

export default function ImpactKPISection() {
  const kpis = [
    {
      metric: "-42%",
      label: "QUEUE WAIT-TIME REDUCTION",
      detail: "Average shrine entry waiting time reduced from 4.5 hours down to 48 minutes during peak surge.",
    },
    {
      metric: "3.8x",
      label: "SECONDARY ATTRACTION FOOTFALL",
      detail: "Multiplied visitor visits to Raghurajpur Craft Village, Narendra Tank, and Blue Flag Beach.",
    },
    {
      metric: "89.4%",
      label: "PREDICTION ACCURACY",
      detail: "15-minute machine learning forecast precision for localized gate congestion bottlenecks.",
    },
    {
      metric: "+28%",
      label: "HOTEL OCCUPANCY SPREAD",
      detail: "Distributed overnight tourist stays across wider regional hospitality clusters beyond main temple zone.",
    },
  ];

  return (
    <section id="impact" className="py-24 bg-stone-dark/90 relative border-t border-sandstone/15 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-temple-gold/15 border border-temple-gold/30 text-xs text-temple-gold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>MEASURABLE PROJECT kpi FRAMEWORK</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-parchment leading-tight">
            Quantifiable impact on <br />
            <span className="italic text-temple-gold">safety, experience & local economy</span>.
          </h2>
        </div>

        {/* Clean Monospace Stat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((item, idx) => (
            <div
              key={item.label}
              className="p-6 rounded-xl bg-stone-charcoal/90 border border-sandstone/20 hover:border-temple-gold/50 transition-all space-y-3"
            >
              <span className="text-[10px] text-sandstone/50 block">METRIC_0{idx + 1}</span>

              <div className="text-4xl sm:text-5xl font-bold text-temple-gold tracking-tight font-mono">
                {item.metric}
              </div>

              <span className="text-xs font-bold text-parchment uppercase tracking-wider block">
                {item.label}
              </span>

              <p className="text-xs text-sandstone/70 leading-relaxed font-normal">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
