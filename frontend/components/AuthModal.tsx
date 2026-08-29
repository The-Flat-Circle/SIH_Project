"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Play, Pause, Camera, Cpu, Eye, Zap } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-dark/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl p-6 rounded-3xl bg-stone-charcoal border border-temple-gold/40 shadow-2xl space-y-5 text-parchment font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-sandstone hover:text-parchment hover:bg-stone-dark transition-colors z-30 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-sandstone/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-temple-gold/20 border border-temple-gold/40 flex items-center justify-center text-temple-gold font-serif font-bold text-xl shadow-temple-glow">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl sm:text-2xl text-parchment font-semibold">
                  Live Crowd Pipeline Demo Stream
                </h3>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold uppercase">
                  YOLOv8 LIVE
                </span>
              </div>
              <p className="text-xs text-sandstone font-mono">
                Source: Generate_a_video_where_a_crowd.mp4 (Temple Crowd Reference Stream)
              </p>
            </div>
          </div>
        </div>

        {/* Video Player Box */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-dark border border-sandstone/30 shadow-2xl h-[340px] sm:h-[440px] flex items-center justify-center group">
          <video
            ref={videoRef}
            src="/generate_video_crowd.mp4"
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
              <span>YOLOv8 STREAM REFERENCE ACTIVE</span>
            </div>
            <div className="text-slate-300 font-bold">File: Generate_a_video_where_a_crowd.mp4</div>
            <div className="text-sandstone">
              Detected Crowd: <span className="text-emerald-400 font-bold">185 PPL</span>
            </div>
            <div className="text-sandstone">
              Moving: <span className="text-emerald-400 font-bold">142 PPL</span> | Stationary:{" "}
              <span className="text-amber-400 font-bold">43 PPL</span>
            </div>
            <div className="text-temple-gold font-bold">
              Avg Speed: 0.14 m/s | Gate Load: HIGH (88.4%)
            </div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="grid grid-cols-3 gap-3 text-xs font-mono text-center">
          <div className="p-3 rounded-xl bg-stone-dark border border-sandstone/20">
            <span className="text-sandstone/70 block text-[10px]">CROWD INFLOW</span>
            <span className="text-parchment font-bold text-sm">48 PPL / min</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-dark border border-sandstone/20">
            <span className="text-sandstone/70 block text-[10px]">CONGESTION LEVEL</span>
            <span className="text-amber-400 font-bold text-sm">88.4% (SURGE)</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-dark border border-sandstone/20">
            <span className="text-sandstone/70 block text-[10px]">RECOMMENDED ACTION</span>
            <span className="text-emerald-400 font-bold text-sm">Reroute to Gate B</span>
          </div>
        </div>
      </div>
    </div>
  );
}
