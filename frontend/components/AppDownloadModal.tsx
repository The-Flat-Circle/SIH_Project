"use client";

import React from "react";
import { X, Smartphone, Download, Github, Zap, ExternalLink, ShieldCheck } from "lucide-react";

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppDownloadModal({ isOpen, onClose }: AppDownloadModalProps) {
  if (!isOpen) return null;

  const directApkUrl = "https://github.com/The-Flat-Circle/SIH_Project/releases/download/v1.0.0/YatraFlow.apk";
  const actionsUrl = "https://github.com/The-Flat-Circle/SIH_Project/actions";

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
                Download YatraFlow Android App
              </h3>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold uppercase">
                APK PACKAGE
              </span>
            </div>
            <p className="text-xs text-sandstone font-mono">
              COMPATIBLE WITH ANDROID PACKAGE INSTALLER
            </p>
          </div>
        </div>

        {/* Download & Installation Options */}
        <div className="space-y-3">
          {/* Primary Action: Direct Download YatraFlow.apk */}
          <a
            href={directApkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/90 border-2 border-emerald-500 hover:bg-emerald-900 transition-all group cursor-pointer shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-serif font-bold text-parchment group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <span>Download YatraFlow.apk</span>
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs font-mono text-emerald-400/90 font-medium">
                  Direct Download for Android Package Installer (.apk)
                </div>
              </div>
            </div>
            <span className="px-4 py-2 rounded-xl bg-emerald-500 text-stone-charcoal text-xs font-mono font-bold shadow-md">
              Download
            </span>
          </a>

          {/* Backup Cloud Build Option */}
          <a
            href={actionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-dusk-card border border-sandstone/30 hover:border-sandstone/60 text-xs font-mono text-sandstone hover:text-parchment transition-colors"
          >
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-parchment" />
              <span>GitHub Actions Build Artifacts (.apk)</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-sandstone" />
          </a>

          {/* Installation Steps Box */}
          <div className="p-4 rounded-2xl bg-stone-dark border border-sandstone/20 space-y-2">
            <div className="flex items-center gap-2 text-temple-gold text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-temple-gold" />
              <span>HOW TO INSTALL ON YOUR PHONE:</span>
            </div>
            <ol className="text-xs font-mono text-sandstone leading-relaxed list-decimal list-inside space-y-1">
              <li>Tap <span className="text-emerald-400 font-bold">"Download YatraFlow.apk"</span> above.</li>
              <li>When download finishes, tap the notification or open <span className="text-parchment font-bold">Downloads</span>.</li>
              <li>Select <span className="text-temple-gold font-bold">Package Installer</span> & tap <span className="text-parchment font-bold">Install</span> to launch YatraFlow!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
