"use client";

import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl p-4 sm:p-6 rounded-3xl bg-stone-charcoal border border-temple-gold/40 shadow-2xl space-y-4 text-parchment font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-sandstone hover:text-parchment hover:bg-stone-dark transition-colors z-30 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-sandstone/15 pb-3">
          <h3 className="font-serif text-xl sm:text-2xl text-parchment font-semibold">
            Live Crowd Reference Video Stream
          </h3>
        </div>

        {/* Clean Video Player Box (No Overlays, No YOLO Badges) */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-dark border border-sandstone/30 shadow-2xl h-[380px] sm:h-[480px] flex items-center justify-center">
          <video
            ref={videoRef}
            controls
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/generate_video_crowd.mp4" type="video/mp4" />
            Your browser does not support HTML5 video playback.
          </video>
        </div>
      </div>
    </div>
  );
}
