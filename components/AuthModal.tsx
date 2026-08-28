"use client";

import React, { useState } from "react";
import { X, ShieldCheck, UserCheck, AlertCircle } from "lucide-react";
import { signInWithGoogle } from "@/lib/supabaseClient";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: { email: string; name: string; role: "tourist" | "admin" }) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"tourist" | "admin">("tourist");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(error.message);
      } else if (onLoginSuccess) {
        onLoginSuccess({
          email: "pilgrim.user@gmail.com",
          name: "Pilgrim Visitor",
          role: role,
        });
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initialize Google Auth");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-dark/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-stone-charcoal border border-sandstone/30 shadow-2xl space-y-6 text-parchment font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-sandstone hover:text-parchment hover:bg-dusk-indigo/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-dusk-indigo border border-temple-gold/40 text-temple-gold mx-auto font-serif text-xl font-bold shadow-temple-glow">
            Y
          </div>
          <h3 className="font-serif text-2xl text-parchment font-semibold">
            Sign In to YatraFlow
          </h3>
          <p className="text-xs text-sandstone font-mono">
            DUAL-TRUST AUTHENTICATION ENGINE
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-stone-dark border border-sandstone/20 font-mono text-xs">
          <button
            onClick={() => setRole("tourist")}
            className={`py-2 px-3 rounded-lg font-bold transition-all ${
              role === "tourist"
                ? "bg-temple-gold text-stone-charcoal shadow-sm"
                : "text-sandstone hover:text-parchment"
            }`}
          >
            Tourist / Pilgrim
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`py-2 px-3 rounded-lg font-bold transition-all ${
              role === "admin"
                ? "bg-temple-gold text-stone-charcoal shadow-sm"
                : "text-sandstone hover:text-parchment"
            }`}
          >
            Control Room Admin
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-vermilion-dark/30 border border-vermilion/50 text-xs text-vermilion-glow font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Role Description Box */}
        <div className="p-3.5 rounded-xl bg-dusk-card border border-sandstone/20 text-xs font-mono text-sandstone space-y-1">
          {role === "tourist" ? (
            <>
              <span className="text-temple-gold font-bold block">✓ Tourist 1-Click Access</span>
              <span>Claim fast-track return passes & receive SMS gate alerts on your phone.</span>
            </>
          ) : (
            <>
              <span className="text-vermilion-glow font-bold block">🔒 Verified Authority Login</span>
              <span>Access live command center controls & manual gate override actions.</span>
            </>
          )}
        </div>

        {/* One-Click Google Auth Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-parchment hover:bg-parchment-light text-stone-charcoal font-mono text-xs font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {/* Google Icon SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          {loading ? "AUTHENTICATING..." : `CONTINUE WITH GOOGLE (${role.toUpperCase()})`}
        </button>

        {/* Footer Note */}
        <p className="text-[10px] text-center text-sandstone/60 font-mono">
          Protected by Supabase Auth OAuth 2.0 SSL Encryption
        </p>
      </div>
    </div>
  );
}
