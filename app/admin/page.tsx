"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Camera, Cpu, Activity, AlertTriangle, GitFork, RefreshCw, LogOut, CheckCircle, Radio, Database, Lock } from "lucide-react";
import Link from "next/link";

export default function AdminControlPanel() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("2405872@kiit.ac.in");
  const [overrideActive, setOverrideActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM_INIT] FastAPI Gateway connected to Supabase PostgreSQL at 20:23:00Z",
    "[CV_INGEST] CAM_01_SINGHADWARA: 180 PPL detected (YOLOv8 + ByteTrack confidence: 0.94)",
    "[ANALYTICS] Prophet 15-min forecast computed: Gate_A surge probability 84%",
    "[REROUTING] Auto-recommendation generated: Redirect 60% inflow from Gate_A to Gate_B",
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("yatra_admin_user");
      if (stored) {
        setAdminEmail(stored);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("yatra_admin_user");
    }
    router.push("/login");
  };

  const handleManualOverride = () => {
    setOverrideActive(!overrideActive);
    const newLog = overrideActive
      ? "[OVERRIDE_RESET] Manual gate lock released. Reverting to automated AI flow rules."
      : "[OVERRIDE_TRIGGERED] MANUAL GATE LOCK ENFORCED BY ADMIN. Redirecting Gate A to Gate E.";
    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-mono select-none">
      {/* Top Fixed Admin Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 border-b border-slate-800 backdrop-blur-md px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-lg">
            Y
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                YATRAFLOW CONTROL ROOM
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold">
                ADMIN ACCESS
              </span>
            </div>
            <span className="text-[10px] text-slate-400">
              Shree Jagannath Temple Destination Engine (Puri)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">AUTHENTICATED:</span>
            <span className="text-amber-300 font-bold">{adminEmail}</span>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/60 border border-red-500/30 text-red-300 hover:text-white transition-all text-xs font-bold"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Control Panel Workspace */}
      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Status Bar Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 text-[10px] uppercase">TOTAL CROWD PRESENT</span>
            <div className="text-xl font-bold text-white">14,280 PPL</div>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 text-[10px] uppercase">GATE_A UTILIZATION</span>
            <div className="text-xl font-bold text-amber-400">94.0% (Critical)</div>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 text-[10px] uppercase">15M PROPHET SURGE</span>
            <div className="text-xl font-bold text-orange-400">+211 PPL (84%)</div>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 text-[10px] uppercase">ACTIVE DISPATCH ALERTS</span>
            <div className="text-xl font-bold text-red-400">2 High Severity</div>
          </div>
        </div>

        {/* Section 1: CCTV Camera Streams Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-400 font-bold flex items-center gap-2">
              <Camera className="w-4 h-4" /> LIVE CCTV CAMERA NODE STREAMS (RTSP / YOLOv8)
            </span>
            <span className="text-slate-400 text-[10px]">CAM_NODES: 4 ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Cam 1 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-red-500/40 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-300 font-bold">CAM_01_SINGHADWARA</span>
                <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 font-bold">94% SURGE</span>
              </div>
              <div className="h-28 rounded bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-slate-600 text-[10px] space-y-1 relative">
                <Camera className="w-6 h-6 text-red-500/60 animate-pulse" />
                <span>RTSP Stream: 30 FPS</span>
                <span className="text-slate-400 font-bold text-xs">180 Detected Persons</span>
              </div>
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>Inflow: 42/min</span>
                <span>Outflow: 15/min</span>
              </div>
            </div>

            {/* Cam 2 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-300 font-bold">CAM_02_ASHWADWARA</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">25% LOW</span>
              </div>
              <div className="h-28 rounded bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-slate-600 text-[10px] space-y-1">
                <Camera className="w-6 h-6 text-emerald-500/60" />
                <span>RTSP Stream: 30 FPS</span>
                <span className="text-slate-400 font-bold text-xs">65 Detected Persons</span>
              </div>
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>Inflow: 12/min</span>
                <span>Outflow: 18/min</span>
              </div>
            </div>

            {/* Cam 3 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-300 font-bold">CAM_03_QUEUE_CORRIDOR</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">52% MODERATE</span>
              </div>
              <div className="h-28 rounded bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-slate-600 text-[10px] space-y-1">
                <Camera className="w-6 h-6 text-amber-500/60" />
                <span>ByteTrack Velocity: 0.12m/s</span>
                <span className="text-slate-400 font-bold text-xs">240 Tracked IDs</span>
              </div>
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>Queue Len: 180m</span>
                <span>Wait: 22m</span>
              </div>
            </div>

            {/* Cam 4 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-300 font-bold">CAM_04_INNER_SANCTUM</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">34% NORMAL</span>
              </div>
              <div className="h-28 rounded bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-slate-600 text-[10px] space-y-1">
                <Camera className="w-6 h-6 text-slate-500" />
                <span>Interior Density Map</span>
                <span className="text-slate-400 font-bold text-xs">95 Present</span>
              </div>
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>Inflow: 20/min</span>
                <span>Outflow: 24/min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Technical Telemetry & Operational Override */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Operational Override Panel */}
          <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="text-amber-400 font-bold flex items-center gap-2">
                <GitFork className="w-4 h-4" /> MANUAL GATE OVERRIDE & DISPATCH CONSOLE
              </span>
              <span className="text-[10px] text-slate-500">AUTHORITY LEVEL: HIGH</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Allows control room operators to manually lock congested gates, issue fast-track return slots, or override automated AI flow algorithms.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">AUTOMATED RECOMMENDATION:</span>
                <span className="text-amber-300 font-bold">Redirect Gate A to Gate B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">PROPOSED RETURN SLOT:</span>
                <span className="text-white font-bold">5:00 PM - 5:30 PM Pass</span>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={handleManualOverride}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                  overrideActive
                    ? "bg-red-600 hover:bg-red-500 text-white shadow-lg"
                    : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg"
                }`}
              >
                {overrideActive ? "RELEASE GATE LOCK" : "ENFORCE MANUAL OVERRIDE LOCK"}
              </button>
            </div>
          </div>

          {/* Right: Live Ingestion Log Console */}
          <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-300 font-bold flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" /> WEBSOCKET & INGESTION LOG CONSOLE
              </span>
              <span className="text-[10px] text-emerald-400">POSTGRESQL SYNCED</span>
            </div>

            <div className="h-44 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 overflow-y-auto space-y-1.5 scrollbar-thin">
              {logs.map((log, i) => (
                <div key={i} className="text-slate-300">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
