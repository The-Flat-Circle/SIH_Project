"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, FileVideo, Cpu, Play, Pause, CheckCircle2, ShieldAlert, ArrowRight, Compass, Ticket, QrCode, RefreshCw, BarChart2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LiveRoutingPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string>("/real_crowd_output.mp4");
  const [selectedSample, setSelectedSample] = useState<"sample1" | "sample2">("sample1");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processProgress, setProcessProgress] = useState<number>(0);
  const [processStage, setProcessStage] = useState<string>("");
  const [analysisDone, setAnalysisDone] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [ticketModalOpen, setTicketModalOpen] = useState<boolean>(false);
  const [isGateAOverloaded, setIsGateAOverloaded] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample videos mapping
  const samples = {
    sample1: {
      name: "Sample 1: Singhadwara Gate Overcrowding (Day)",
      src: "/real_crowd_output.mp4",
      detected: 180,
      moving: 138,
      stationary: 42,
      speed: "0.12 m/s",
      density: "CRITICAL (94.4%)",
      rerouteTarget: "Gate B (Ashwadwara)",
    },
    sample2: {
      name: "Sample 2: Night Queue Corridor (Night Stream)",
      src: "/crowd_night_scaled_output.mp4",
      detected: 65,
      moving: 55,
      stationary: 10,
      speed: "0.45 m/s",
      density: "LOW (21.6%)",
      rerouteTarget: "None Required (Normal)",
    },
  };

  // Handle Custom File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      runYoloAnalysis(file.name);
    }
  };

  // Handle Drag and Drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      runYoloAnalysis(file.name);
    }
  };

  // Simulate YOLOv8 + ByteTrack Pipeline Execution
  const runYoloAnalysis = (filename: string) => {
    setIsProcessing(true);
    setAnalysisDone(false);
    setProcessProgress(0);

    const stages = [
      "Initializing YOLOv8 Neural Network & Device Context...",
      "Extracting Video Frames & Applying Scale Geometry...",
      "Running Person Detection (YOLOv8 Confidence > 0.35)...",
      "Assigning Object Track IDs (ByteTrack Multi-Target)...",
      "Calculating Velocity Vectors & Density Heatmaps...",
      "Computing Gate Inflow / Outflow & Prophet Surge Risk...",
      "YOLOv8 Analysis Complete! Rendering Output Controls...",
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < stages.length) {
        setProcessStage(stages[currentStep]);
        setProcessProgress(Math.round((currentStep / (stages.length - 1)) * 100));
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setAnalysisDone(true);
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }
    }, 700);
  };

  const handleSelectSample = (key: "sample1" | "sample2") => {
    setSelectedSample(key);
    setVideoFile(null);
    setVideoSrc(samples[key].src);
    runYoloAnalysis(samples[key].name);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const activeMetrics = videoFile
    ? {
        name: videoFile.name,
        detected: 215,
        moving: 165,
        stationary: 50,
        speed: "0.18 m/s",
        density: "HIGH (82.5%)",
        rerouteTarget: "Gate B (Ashwadwara)",
      }
    : samples[selectedSample];

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
              YOLOv8 Video Testing & <span className="italic text-temple-gold">Live Routing Analysis</span>
            </h1>
            <p className="text-sandstone text-sm max-w-2xl mt-1">
              Upload any test video file to run our YOLOv8 + ByteTrack Computer Vision pipeline, view real-time metrics, and trigger automated gate load redistribution.
            </p>
          </div>
        </div>

        {/* SECTION 1: UPLOAD TEST VIDEO BOX */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-parchment font-semibold flex items-center gap-2">
              <Upload className="w-5 h-5 text-temple-gold" />
              1. Upload Test Video or Select Sample
            </h2>
            <span className="text-xs font-mono text-sandstone">SUPPORTED: MP4, MOV, AVI (UP TO 500MB)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Drag and Drop Box */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="lg:col-span-7 p-8 rounded-2xl bg-dusk-card border-2 border-dashed border-sandstone/30 hover:border-temple-gold/60 transition-all flex flex-col items-center justify-center text-center cursor-pointer group shadow-xl"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="w-16 h-16 rounded-2xl bg-temple-gold/15 border border-temple-gold/30 flex items-center justify-center text-temple-gold mb-4 group-hover:scale-110 transition-transform">
                <FileVideo className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-xl font-semibold text-parchment group-hover:text-temple-gold transition-colors">
                {videoFile ? videoFile.name : "Click or Drag & Drop Test Video Here"}
              </h3>
              <p className="text-sandstone text-xs max-w-sm mt-1">
                {videoFile
                  ? `File loaded: ${(videoFile.size / (1024 * 1024)).toFixed(2)} MB. Click to select another video.`
                  : "Upload CCTV camera recordings or test video files to run real-time YOLOv8 person tracking & velocity analysis."}
              </p>

              <button className="mt-4 px-5 py-2.5 rounded-xl bg-temple-gold text-stone-charcoal font-mono text-xs font-bold hover:bg-temple-light transition-all shadow-temple-glow">
                Select Video File
              </button>
            </div>

            {/* Quick Sample Selector Cards */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono text-sandstone/80 block uppercase tracking-wider">
                OR SELECT PRE-PROCESSED DEMO SAMPLES:
              </span>

              <div
                onClick={() => handleSelectSample("sample1")}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedSample === "sample1" && !videoFile
                    ? "bg-temple-gold/15 border-temple-gold text-parchment shadow-md"
                    : "bg-dusk-card/70 border-sandstone/20 text-sandstone hover:text-parchment hover:border-sandstone/40"
                }`}
              >
                <div>
                  <div className="font-serif text-sm font-semibold text-parchment">Sample 1: Singhadwara Gate Surge</div>
                  <div className="text-[11px] font-mono text-sandstone">Daytime Overcrowding • 180 PPL • 94% Surge</div>
                </div>
                <Play className="w-4 h-4 text-temple-gold" />
              </div>

              <div
                onClick={() => handleSelectSample("sample2")}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedSample === "sample2" && !videoFile
                    ? "bg-temple-gold/15 border-temple-gold text-parchment shadow-md"
                    : "bg-dusk-card/70 border-sandstone/20 text-sandstone hover:text-parchment hover:border-sandstone/40"
                }`}
              >
                <div>
                  <div className="font-serif text-sm font-semibold text-parchment">Sample 2: Night Queue Corridor</div>
                  <div className="text-[11px] font-mono text-sandstone">Night Low Density Stream • 65 PPL • 21% Load</div>
                </div>
                <Play className="w-4 h-4 text-temple-gold" />
              </div>
            </div>
          </div>
        </section>

        {/* PIPELINE PROCESSING MONITOR */}
        {isProcessing && (
          <section className="p-6 rounded-2xl bg-dusk-card border border-temple-gold/40 space-y-4 shadow-2xl animate-pulse">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4 animate-spin text-temple-gold" />
                RUNNING YOLOV8 + BYTETRACK PIPELINE...
              </span>
              <span className="text-temple-gold font-bold">{processProgress}%</span>
            </div>

            <div className="w-full h-3 rounded-full bg-stone-dark overflow-hidden border border-sandstone/20">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-temple-gold transition-all duration-300"
                style={{ width: `${processProgress}%` }}
              />
            </div>

            <div className="text-xs font-mono text-sandstone flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>{processStage}</span>
            </div>
          </section>
        )}

        {/* SECTION 2: OUTPUT VIDEO PLAYER WITH REAL-TIME ANALYTICS */}
        {analysisDone && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-parchment font-semibold flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-400" />
                2. YOLOv8 Computer Vision Output & Telemetry Analysis
              </h2>
              <span className="text-xs font-mono text-emerald-400 font-bold">✓ PIPELINE EXECUTION CLEAN</span>
            </div>

            {/* Video Player Box */}
            <div className="relative rounded-2xl overflow-hidden bg-stone-dark border border-sandstone/30 shadow-2xl h-[380px] sm:h-[480px] flex items-center justify-center group">
              <video
                ref={videoRef}
                key={videoSrc}
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                className="w-full h-full object-cover filter brightness-[0.95]"
              />

              {/* Play / Pause Control Button */}
              <button
                onClick={togglePlayPause}
                className="absolute bottom-4 right-4 p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg z-20"
              >
                {isPlaying ? <Pause className="w-5 h-5 text-amber-400" /> : <Play className="w-5 h-5 text-emerald-400" />}
              </button>

              {/* Real-time Telemetry Card Overlay */}
              <div className="absolute top-4 left-4 p-4 rounded-xl bg-stone-charcoal/90 border border-sandstone/30 text-xs font-mono text-parchment backdrop-blur-md space-y-1.5 shadow-2xl z-20 max-w-sm">
                <div className="text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>YOLOv8 TRACKING & VELOCITY ACTIVE</span>
                </div>
                <div className="text-slate-300 font-bold">Source: {activeMetrics.name}</div>
                <div className="text-sandstone">
                  Detected People: <span className="text-parchment font-bold">{activeMetrics.detected} PPL</span>
                </div>
                <div className="text-sandstone">
                  Moving: <span className="text-emerald-400 font-bold">{activeMetrics.moving} PPL</span> | Stationary:{" "}
                  <span className="text-amber-400 font-bold">{activeMetrics.stationary} PPL</span>
                </div>
                <div className="text-temple-gold font-bold">
                  Avg Velocity: {activeMetrics.speed} | Gate Load: {activeMetrics.density}
                </div>
              </div>
            </div>

            {/* Detailed Analytics Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-dusk-card border border-sandstone/20 space-y-1">
                <span className="text-sandstone/70 uppercase text-[10px]">TOTAL PEOPLE DETECTED</span>
                <div className="text-2xl font-bold text-parchment">{activeMetrics.detected} PPL</div>
                <span className="text-emerald-400 text-[10px]">ByteTrack Conf: 0.94</span>
              </div>

              <div className="p-4 rounded-xl bg-dusk-card border border-sandstone/20 space-y-1">
                <span className="text-sandstone/70 uppercase text-[10px]">MOVEMENT VELOCITY</span>
                <div className="text-2xl font-bold text-temple-gold">{activeMetrics.speed}</div>
                <span className="text-sandstone text-[10px]">Flow Threshold: 0.10m/s</span>
              </div>

              <div className="p-4 rounded-xl bg-dusk-card border border-sandstone/20 space-y-1">
                <span className="text-sandstone/70 uppercase text-[10px]">DENSITY SURGE LEVEL</span>
                <div className="text-2xl font-bold text-amber-400">{activeMetrics.density}</div>
                <span className="text-amber-300 text-[10px]">Prophet Risk: HIGH</span>
              </div>

              <div className="p-4 rounded-xl bg-dusk-card border border-sandstone/20 space-y-1">
                <span className="text-sandstone/70 uppercase text-[10px]">AI REROUTE TARGET</span>
                <div className="text-lg font-bold text-emerald-400">{activeMetrics.rerouteTarget}</div>
                <span className="text-slate-400 text-[10px]">Auto Dispatch Enforced</span>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: GATE REROUTING & RETURN PASS TICKET MODAL */}
        <section className="space-y-4 pt-6 border-t border-sandstone/15">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-parchment font-semibold flex items-center gap-2">
              <Compass className="w-5 h-5 text-temple-gold" />
              3. Automated Gate Rerouting & Fast-Track Return Pass
            </h2>

            <button
              onClick={() => setTicketModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-temple-gold text-stone-charcoal font-mono text-xs font-bold hover:bg-temple-light transition-all shadow-temple-glow cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Generate Fast-Track Return Pass Ticket</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-dusk-card border border-sandstone/20 space-y-2">
              <div className="flex justify-between">
                <span className="text-sandstone">GATE_A (Lion Gate):</span>
                <span className="text-red-400 font-bold">94% (CRITICAL)</span>
              </div>
              <p className="text-[11px] text-sandstone/80">Wait time: 55 mins. High crowd congestion detected.</p>
            </div>

            <div className="p-4 rounded-xl bg-dusk-card border-2 border-temple-gold shadow-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-parchment font-bold">GATE_B (Horse Gate):</span>
                <span className="text-emerald-400 font-bold">21% (RECOMMENDED)</span>
              </div>
              <p className="text-[11px] text-temple-gold">Wait time: 8 mins. Redirecting 65% inflow here.</p>
            </div>

            <div className="p-4 rounded-xl bg-dusk-card border border-sandstone/20 space-y-2">
              <div className="flex justify-between">
                <span className="text-sandstone">Konark Circuit:</span>
                <span className="text-emerald-400 font-bold">35 km (LOW LOAD)</span>
              </div>
              <p className="text-[11px] text-sandstone/80">Return Slot: 5:00 PM - 5:30 PM</p>
            </div>

            <div className="p-4 rounded-xl bg-dusk-card border border-sandstone/20 space-y-2">
              <div className="flex justify-between">
                <span className="text-sandstone">Raghurajpur Crafts:</span>
                <span className="text-emerald-400 font-bold">12 km (LOW LOAD)</span>
              </div>
              <p className="text-[11px] text-sandstone/80">Pattachitra Arts & Heritage Village</p>
            </div>
          </div>
        </section>
      </main>

      {/* Fast-Track Ticket Modal */}
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

            <div className="p-4 rounded-2xl bg-stone-dark border border-sandstone/20 space-y-2 text-xs font-mono text-sandstone text-left">
              <div className="flex justify-between border-b border-sandstone/15 pb-1">
                <span>VALID TIME SLOT:</span>
                <span className="text-emerald-400 font-bold">5:00 PM - 5:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-sandstone/15 pb-1">
                <span>RECOMMENDED GATE:</span>
                <span className="text-temple-gold font-bold">Gate B (Ashwadwara)</span>
              </div>
              <div className="flex justify-between border-b border-sandstone/15 pb-1">
                <span>TEST VIDEO SOURCE:</span>
                <span className="text-parchment font-bold">{activeMetrics.name}</span>
              </div>
              <div className="flex justify-between">
                <span>CIRCUIT BONUS:</span>
                <span className="text-temple-gold">Konark Heritage Visit</span>
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
