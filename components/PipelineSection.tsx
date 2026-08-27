"use client";

import React, { useState } from "react";
import { Camera, Cpu, Activity, LineChart, GitFork, Compass, LayoutDashboard, Code, CheckCircle } from "lucide-react";

export default function PipelineSection() {
  const [activeStage, setActiveStage] = useState<number>(1);

  const pipelineStages = [
    {
      id: 1,
      name: "CCTV Footage",
      tech: "RTSP / IP Video Stream",
      icon: Camera,
      description: "Captures multi-angle camera feeds from entry gates, queue corridors, temple interiors, and outer perimeter.",
      schema: {
        camera_id: "CAM_01_SINGHADWARA",
        location: "Gate_A_LionGate",
        fps: 30,
        resolution: "1920x1080",
        protocol: "RTSP/H.264",
      },
    },
    {
      id: 2,
      name: "Computer Vision",
      tech: "YOLOv8 + PyTorch",
      icon: Cpu,
      description: "Executes real-time person detection, bounding box extraction, and density mapping across camera frames.",
      schema: {
        timestamp: "2026-08-27T18:45:00Z",
        crowd_number: 180,
        gate_no: "Gate_A",
        density: "high",
        confidence: 0.94,
      },
    },
    {
      id: 3,
      name: "Crowd Tracking",
      tech: "ByteTrack + OpenCV",
      icon: Activity,
      description: "Tracks individual movement vectors, inflow/outflow velocity, and detects localized queue stagnation.",
      schema: {
        tracked_ids: 180,
        inflow_rate_per_min: 42,
        outflow_rate_per_min: 15,
        velocity_vector_avg: "0.12 m/s",
      },
    },
    {
      id: 4,
      name: "Prediction Engine",
      tech: "Prophet + Scikit-Learn",
      icon: LineChart,
      description: "Forecasts crowd growth, queue waiting time, and capacity overflow probability for the next 15–30 minutes.",
      schema: {
        zone: "Gate_A",
        capacity_utilization: 90,
        predicted_crowd: 230,
        prediction_window: "15min",
        congestion_probability: 85,
      },
    },
    {
      id: 5,
      name: "Decision Engine",
      tech: "Rule Optimization & Heuristics",
      icon: GitFork,
      description: "Generates optimal operational actions: trigger gate rerouting, issue overcrowding alerts, and select return-slots.",
      schema: {
        alerts: [{ severity: "high", zone: "Gate_A", message: "Gate approaching 90% capacity" }],
        recommended_action: "Redirect visitors to Gate B",
        recommended_visit_time: "5:00 PM",
      },
    },
    {
      id: 6,
      name: "Dual Redistribution",
      tech: "Geospatial Circuit Optimizer",
      icon: Compass,
      description: "Balances internal gates while promoting nearby heritage sites (Raghurajpur), local food (Mahaprasad), and culture.",
      schema: {
        internal_rerouting: { recommended_gate: "Gate_B", occupancy: 30 },
        external_recommendations: {
          heritage_sites: [{ name: "Raghurajpur Village", distance: "12 km" }],
          food: [{ name: "Ananda Bazar Mahaprasad", distance: "200 m" }],
        },
      },
    },
    {
      id: 7,
      name: "User Dashboards",
      tech: "FastAPI + WebSockets + React",
      icon: LayoutDashboard,
      description: "Pushes real-time alerts and recommendations to Tourist Mobile App, Admin Dashboard, and Field Technicians.",
      schema: {
        channel: "ws://api.yatraflow.gov.in/ws/live-feed",
        client_target: "TouristApp_AdminRoom",
        sync_latency: "120ms",
      },
    },
  ];

  const currentStage = pipelineStages.find((s) => s.id === activeStage) || pipelineStages[0];

  return (
    <section id="pipeline" className="py-24 bg-stone-charcoal relative temple-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-temple-gold/15 border border-temple-gold/30 text-xs font-mono text-temple-gold">
            <Activity className="w-3.5 h-3.5" />
            <span>REAL-TIME END-TO-END PIPELINE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-parchment leading-tight">
            How CCTV streams become <br />
            <span className="italic text-temple-gold">predictive crowd intelligence</span>.
          </h2>

          <p className="text-sandstone text-base leading-relaxed">
            Click any stage in the flow sequence below to inspect the underlying machine learning models, domain logic, and real JSON API payloads exchanged across modules.
          </p>
        </div>

        {/* Pipeline Flow Stepper (Horizontal Scroll on Mobile) */}
        <div className="overflow-x-auto pb-6 mb-8 scrollbar-thin">
          <div className="flex items-center min-w-[900px] justify-between relative">
            {/* Connecting Track Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sandstone/20 -translate-y-1/2 z-0" />

            {pipelineStages.map((stage) => {
              const StageIcon = stage.icon;
              const isActive = stage.id === activeStage;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`relative z-10 flex flex-col items-center gap-2 p-2 rounded-xl transition-all focus:outline-none ${
                    isActive ? "scale-110" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border text-sm font-mono transition-all ${
                      isActive
                        ? "bg-temple-gold text-stone-charcoal border-temple-gold shadow-temple-glow font-bold"
                        : "bg-dusk-indigo text-sandstone border-sandstone/30 hover:border-temple-gold/50"
                    }`}
                  >
                    <StageIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-parchment whitespace-nowrap">
                    0{stage.id}. {stage.name}
                  </span>
                  <span className="text-[9px] font-mono text-sandstone/60 whitespace-nowrap">
                    {stage.tech}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Inspector Detail Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-dusk-card border border-sandstone/25 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-temple-gold">
              <CheckCircle className="w-4 h-4 text-temple-gold" />
              <span>STAGE 0{currentStage.id} OF 07 DETAILS</span>
            </div>

            <h3 className="font-serif text-2xl text-parchment font-semibold flex items-center gap-3">
              {currentStage.name}
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-stone-charcoal text-sandstone border border-sandstone/20">
                {currentStage.tech}
              </span>
            </h3>

            <p className="text-sm text-sandstone leading-relaxed font-normal">{currentStage.description}</p>

            <div className="p-4 rounded-xl bg-stone-charcoal/80 border border-sandstone/20 space-y-2 text-xs font-mono text-sandstone">
              <span className="text-temple-gold font-bold">Key Domain Responsibility:</span>
              <p>
                Strictly scoped processing stage. Converts raw visual input into deterministic JSON contracts for downstream recommendation and API consumption.
              </p>
            </div>
          </div>

          {/* Right Column: Live Schema Code Viewer */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-sandstone px-1">
              <span className="flex items-center gap-1.5 text-temple-gold font-bold">
                <Code className="w-4 h-4" /> JSON PAYLOAD CONTRACT
              </span>
              <span>SCHEMA_VER_1.0</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-dark border border-sandstone/20 font-mono text-xs text-parchment overflow-x-auto">
              <pre className="text-temple-light">{JSON.stringify(currentStage.schema, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
