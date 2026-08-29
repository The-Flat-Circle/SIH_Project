"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Menu, X, ShieldCheck, User, LogOut, LayoutDashboard } from "lucide-react";
import AuthModal from "./AuthModal";
import { supabase, signOut } from "@/lib/supabaseClient";

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);

  // Check Auth State on Client Side
  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== "undefined") {
        const adminUser = sessionStorage.getItem("yatra_admin_user");
        const touristUser = sessionStorage.getItem("yatra_tourist_user");

        if (adminUser) {
          setLoggedInUser(adminUser);
          setIsAdminUser(true);
          return;
        } else if (touristUser) {
          setLoggedInUser(touristUser);
          setIsAdminUser(false);
          return;
        }
      }

      // Check Supabase Active Session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const email = session.user.email.toLowerCase();
        setLoggedInUser(email);
        const authorizedAdmins = [
          "2405872@kiit.ac.in",
          "2405915@kiit.ac.in",
          "24051439@kiit.ac.in",
          "2405780@kiit.ac.in",
          "24051454@kiit.ac.in",
          "2405785@kiit.ac.in",
        ];
        setIsAdminUser(authorizedAdmins.includes(email));
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("yatra_admin_user");
      sessionStorage.removeItem("yatra_tourist_user");
      sessionStorage.removeItem("login_target_role");
    }
    try {
      await signOut();
    } catch (e) {
      console.error(e);
    }
    setLoggedInUser(null);
    setIsAdminUser(false);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    } else {
      router.push("/login");
    }
  };

  const navLinks = [
    { label: "Overview", href: "#problem" },
    { label: "Pipeline", href: "#pipeline" },
    { label: "Rerouting", href: "#dual-solution" },
    { label: "Dashboards", href: "#dashboards" },
    { label: "Impact", href: "#impact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-charcoal/80 backdrop-blur-md border-b border-sandstone/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Clean Logo & Emblem Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-temple-gold/20 border border-temple-gold/40 flex items-center justify-center text-temple-gold font-serif font-bold text-xl group-hover:border-temple-gold transition-all shadow-temple-glow">
                Y
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg font-semibold tracking-wider text-parchment group-hover:text-temple-gold transition-colors">
                    YATRA_FLOW
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-temple-gold/15 text-temple-gold border border-temple-gold/30 font-bold whitespace-nowrap">
                    SIH 2026
                  </span>
                </div>
                <span className="text-[10px] font-mono text-sandstone/70 tracking-widest uppercase">
                  Puri Destination Engine
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-mono tracking-wider text-sandstone hover:text-temple-gold uppercase transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Header Buttons & Auth State */}
            <div className="hidden md:flex items-center gap-3">
              {loggedInUser ? (
                <div className="flex items-center gap-2">
                  {/* User Email Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dusk-card/90 border border-sandstone/30 text-xs font-mono">
                    <User className="w-3.5 h-3.5 text-temple-gold" />
                    <span className="text-sandstone">{isAdminUser ? "ADMIN:" : "USER:"}</span>
                    <span className="text-parchment font-bold max-w-[150px] truncate">{loggedInUser}</span>
                  </div>

                  {/* Admin Dashboard Link if Admin */}
                  {isAdminUser && (
                    <Link
                      href="/admin"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold hover:bg-amber-500/30 transition-all"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      Dashboard
                    </Link>
                  )}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/70 hover:bg-red-900 border border-red-500/40 text-red-200 text-xs font-mono font-bold transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-400" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dusk-card/90 hover:bg-stone-charcoal border border-sandstone/30 text-xs font-mono text-parchment hover:text-temple-gold transition-all shadow-sm"
                >
                  <User className="w-3.5 h-3.5 text-temple-gold" />
                  <span>Sign In / Admin Login</span>
                </Link>
              )}

              <button
                onClick={() => setAuthModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-temple-gold text-stone-charcoal font-mono text-xs font-bold hover:bg-temple-light transition-all shadow-temple-glow"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>LIVE DEMO</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-sandstone hover:text-parchment focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-charcoal border-b border-sandstone/20 px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-mono text-sandstone hover:text-temple-gold py-1 uppercase"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              {loggedInUser ? (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-sandstone px-2">
                    Logged in as <span className="text-parchment font-bold">{loggedInUser}</span>
                  </div>
                  {isAdminUser && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-xs font-mono text-amber-300 font-bold block"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-center py-2.5 rounded-xl bg-red-950/70 border border-red-500/40 text-xs font-mono text-red-200 font-bold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-dusk-card border border-sandstone/30 text-xs font-mono text-parchment"
                >
                  Sign In / Admin Login
                </Link>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen(true);
                }}
                className="w-full text-center py-2.5 rounded-xl bg-temple-gold text-stone-charcoal font-mono text-xs font-bold"
              >
                LIVE DEMO
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Live Demo Simulation Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
