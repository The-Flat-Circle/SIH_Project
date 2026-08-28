"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, AlertTriangle, Cpu, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export function LoginGate({
  authError,
  setAuthError,
  onAuthSuccess,
}: {
  authError: string;
  setAuthError: (err: string) => void;
  onAuthSuccess?: (user: any) => void;
}) {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track cursor position to update pupil offset and tilt positions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - window.innerWidth / 2;
      const dy = e.clientY - window.innerHeight / 2;
      const angle = Math.atan2(dy, dx);

      // Limit pupil motion to a maximum offset of 5 pixels
      const maxOffset = 5;
      const distance = Math.min(maxOffset, Math.sqrt(dx * dx + dy * dy) * 0.015);

      setPupilOffset({
        x: distance * Math.cos(angle),
        y: distance * Math.sin(angle),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGoogleLogin = async () => {
    setAuthError("");
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });

    if (error) {
      setAuthError(`Sign-in error: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-[#020617] overflow-hidden">
      {/* Calm Temple Background Image with Atmosphere */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/jagannathpuriimage.jpg"
          alt="Shree Jagannath Temple Calm Background"
          fill
          priority
          className="object-cover object-center scale-105 filter brightness-[0.35] contrast-[1.1] blur-[2px]"
        />
        {/* Soft Glass Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#020617]/75 to-[#020617]/95 z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,151,62,0.06)_0%,transparent_75%)] z-2" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] z-2 pointer-events-none" />
      </div>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to YatraFlow Home
      </Link>

      {/* Login Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[940px] h-auto md:h-[520px] rounded-3xl overflow-hidden border border-white/15 bg-slate-950/70 backdrop-blur-2xl shadow-[0_0_80px_rgba(201,151,62,0.1)] grid md:grid-cols-2"
      >
        {/* LEFT COLUMN: Character Parallax Illustration */}
        <div className="relative w-full h-[280px] md:h-full bg-slate-900/40 border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center overflow-hidden p-6 select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[80px]" />

          {/* Character Canvas Stack */}
          <div className="relative w-[340px] h-[250px] mt-8 overflow-visible">
            {/* 1. Tall Purple Block */}
            <motion.div
              style={{ x: pupilOffset.x * 0.6, y: pupilOffset.y * 0.4 }}
              className="absolute left-[70px] bottom-0 w-24 h-48 bg-indigo-600 rounded-2xl flex flex-col justify-start items-center pt-8 shadow-lg z-0"
            >
              <div className="flex gap-4 mb-3">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-3 h-3 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-3 h-3 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
              </div>
              <div className="w-4 h-1.5 rounded-full bg-slate-950 opacity-80" />
            </motion.div>

            {/* 2. Dark Slate Block */}
            <motion.div
              style={{ x: pupilOffset.x * -0.4, y: pupilOffset.y * -0.2 }}
              className="absolute left-[165px] bottom-0 w-20 h-36 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-start items-center pt-6 shadow-xl z-10"
            >
              <div className="flex gap-3 mb-2">
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
              </div>
            </motion.div>

            {/* 3. Orange Blob */}
            <motion.div
              style={{ x: pupilOffset.x * 0.9, y: pupilOffset.y * 0.7 }}
              className="absolute left-0 bottom-0 w-44 h-24 bg-orange-500 rounded-t-[70px] flex flex-col justify-start items-center pt-6 shadow-2xl z-20"
            >
              <div className="flex gap-8 mb-2">
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
              </div>
              <div className="w-4.5 h-2 rounded-b-full bg-slate-950 opacity-80" />
            </motion.div>

            {/* 4. Yellow Block */}
            <motion.div
              style={{ x: pupilOffset.x * -0.6, y: pupilOffset.y * -0.5 }}
              className="absolute left-[215px] bottom-0 w-24 h-28 bg-amber-500 rounded-tr-[45px] rounded-tl-md flex flex-col justify-start items-center pt-5 shadow-2xl z-30"
            >
              <div className="flex gap-4 mb-2">
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
              </div>
              <div className="w-6 h-0.75 bg-slate-950 opacity-80 mt-1 rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN: Google Sign-In Form */}
        <div className="relative w-full h-full flex flex-col justify-between p-10 md:p-12 text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-950/50 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Cpu className="w-4 h-4 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
              YATRAFLOW SECURE ACCESS
            </span>
          </div>

          <div className="space-y-6 my-auto">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-white font-serif">
                Welcome back!
              </h1>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sign in with Google to access the YatraFlow pilgrimage control room, claim fast-track passes, and manage assets.
              </p>
            </div>

            {/* Error Notification Banner */}
            <AnimatePresence>
              {authError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl border border-red-500/30 bg-red-950/40 text-red-300 text-xs flex gap-3 items-start text-left overflow-hidden"
                >
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                  <span>{authError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3 pt-2">
              <motion.button
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-3 px-6 py-4 w-full bg-white hover:bg-slate-100 text-slate-900 rounded-xl transition-all font-bold text-sm cursor-pointer shadow-lg disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.99 5.99 0 0 1 8 12.5a5.99 5.99 0 0 1 5.99-6c1.472 0 2.8.534 3.824 1.416l3.21-3.21C18.99 2.764 16.5 1.5 13.99 1.5A11 11 0 0 0 3 12.5a11 11 0 0 0 10.99 11c5.96 0 10.01-4.11 10.01-10.03 0-.64-.06-1.3-.17-1.89l-11.59-.295z"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] text-slate-400 font-mono">
            <Shield className="w-3.5 h-3.5 text-amber-400/60" />
            <span>Identity verification powered by Supabase Auth OAuth 2.0.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
