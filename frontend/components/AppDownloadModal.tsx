"use client";

import React, { useState } from "react";
import { X, Smartphone, Download, Github, CheckCircle2, Zap, ExternalLink } from "lucide-react";

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppDownloadModal({ isOpen, onClose }: AppDownloadModalProps) {
  const [installed, setInstalled] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-dark/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl p-6 rounded-3xl bg-stone-charcoal border border-temple-gold/40 shadow-2xl space-y-6 text-parchment font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-sandstone hover:text-parchment hover:bg-stone-dark transition-colors z-30 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-sandstone/15 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shadow-lg">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl sm:text-2xl text-parchment font-semibold">
                Get YatraFlow Mobile App
              </h3>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold uppercase">
                FREE (ANDROID)
              </span>
            </div>
            <p className="text-xs text-sandstone font-mono">
              NATIVE ANDROID APK & PWA INSTANT INSTALL
            </p>
          </div>
        </div>

        {/* Download & Installation Options */}
        <div className="space-y-3">
          {/* Option 1: Direct APK Download */}
          <a
            href="https://github.com/The-Flat-Circle/SIH_Project/actions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-dusk-card border border-emerald-500/40 hover:border-emerald-400/80 transition-all group cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-serif font-semibold text-parchment group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <span>Download YatraFlow.apk</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </div>
                <div className="text-[11px] font-mono text-sandstone">
                  Direct GitHub Cloud Artifact (Compiled .apk file)
                </div>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
              Download
            </span>
          </a>

          {/* Option 2: Instant PWA Install (No Download Needed) */}
          <div className="p-4 rounded-2xl bg-stone-dark border border-sandstone/20 space-y-2">
            <div className="flex items-center gap-2 text-temple-gold text-xs font-mono font-bold">
              <Zap className="w-4 h-4 text-temple-gold" />
              <span>INSTANT INSTALL (NO APK DOWNLOAD NEEDED)</span>
            </div>
            <p className="text-xs font-mono text-sandstone leading-relaxed">
              Open <span className="text-parchment font-bold">yatraaflow.vercel.app</span> on Android Chrome → Tap the 3 dots (⋮) → Tap <span className="text-temple-gold font-bold">"Add to Home Screen"</span> to install YatraFlow directly to your phone screen!
            </p>
          </div>

          {/* Option 3: GitHub Repository Code */}
          <a
            href="https://github.com/The-Flat-Circle/SIH_Project"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-stone-dark/80 border border-sandstone/20 text-xs font-mono text-sandstone hover:text-parchment transition-colors"
          >
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-parchment" />
              <span>View Android Source Code on GitHub</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-sandstone" />
          </a>
        </div>
      </div>
    </div>
  );
}
