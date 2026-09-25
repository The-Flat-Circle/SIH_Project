"use client";

import React, { useEffect, useRef, useState } from "react";
import { Navigation, MapPin, Footprints, ExternalLink, RefreshCw, Compass, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

interface LiveNavigationMapProps {
  templeName: string;
  destLat: number;
  destLng: number;
  bestGateName: string;
  gateLat: number;
  gateLng: number;
}

export default function LiveNavigationMap({
  templeName,
  destLat,
  destLng,
  bestGateName,
  gateLat,
  gateLng,
}: LiveNavigationMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);

  const [mapMode, setMapMode] = useState<"vector" | "leaflet" | "radar">("vector");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number }>({
    lat: gateLat - 0.0018,
    lng: gateLng - 0.0015,
  });
  const [distanceMeters, setDistanceMeters] = useState<number>(180);
  const [gpsActive, setGpsActive] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Haversine formula to compute distance in meters
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  };

  // Real GPS Geolocation Watcher
  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPos({ lat: latitude, lng: longitude });
        setGpsActive(true);
        setIsSimulating(false);
        const dist = calculateDistance(latitude, longitude, gateLat, gateLng);
        setDistanceMeters(dist);
      },
      (err) => {
        console.warn("GPS unavailable, using simulated walking location:", err);
        setGpsActive(false);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [gateLat, gateLng]);

  // Simulated walking loop when GPS is static
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setUserPos((prev) => {
        const dLat = (gateLat - prev.lat) * 0.08;
        const dLng = (gateLng - prev.lng) * 0.08;
        const nextLat = prev.lat + dLat;
        const nextLng = prev.lng + dLng;

        const dist = calculateDistance(nextLat, nextLng, gateLat, gateLng);
        setDistanceMeters(dist);
        return { lat: nextLat, lng: nextLng };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating, gateLat, gateLng]);

  // Initialize Leaflet Map when mode is 'leaflet'
  useEffect(() => {
    if (mapMode !== "leaflet" || typeof window === "undefined" || !mapContainerRef.current) return;

    let L: any;

    const initMap = async () => {
      L = (await import("leaflet")).default;

      if (!mapInstanceRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [gateLat, gateLng],
          zoom: 17,
          zoomControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap',
          maxZoom: 19,
        }).addTo(map);

        // Gate Pin
        const gateIcon = L.divIcon({
          className: "custom-gate-pin",
          html: `<div style="background-color: #10B981; color: white; padding: 6px 10px; border-radius: 20px; font-weight: bold; font-size: 10px; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap;">
                  📍 ${bestGateName}
                </div>`,
          iconSize: [120, 30],
          iconAnchor: [60, 15],
        });
        L.marker([gateLat, gateLng], { icon: gateIcon }).addTo(map);

        // User Walking Marker
        const userIcon = L.divIcon({
          className: "custom-user-pin",
          html: `<div style="background-color: #FACC15; color: #020617; width: 28px; height: 28px; border-radius: 50%; border: 3px solid #020617; box-shadow: 0 0 12px #FACC15; display: flex; align-items: center; justify-content: center; font-size: 14px;">
                  🏃
                </div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        markerRef.current = L.marker([userPos.lat, userPos.lng], { icon: userIcon }).addTo(map);

        // Yellow Route Polyline
        polylineRef.current = L.polyline(
          [
            [userPos.lat, userPos.lng],
            [gateLat, gateLng],
          ],
          { color: "#EAB308", weight: 5, dashArray: "8, 8", opacity: 0.9 }
        ).addTo(map);

        mapInstanceRef.current = map;
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapMode, gateLat, gateLng]);

  // Update Leaflet User Marker Position
  useEffect(() => {
    if (mapMode === "leaflet" && markerRef.current && polylineRef.current) {
      markerRef.current.setLatLng([userPos.lat, userPos.lng]);
      polylineRef.current.setLatLngs([
        [userPos.lat, userPos.lng],
        [gateLat, gateLng],
      ]);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo([userPos.lat, userPos.lng]);
      }
    }
  }, [userPos, mapMode, gateLat, gateLng]);

  const openGoogleMapsApp = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${gateLat},${gateLng}&travelmode=walking`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-3">
      {/* MAP MODE SWITCHER TABS */}
      <div className="flex items-center justify-between gap-1 p-1 rounded-2xl bg-stone-100 border border-stone-200 text-[11px] font-bold shadow-2xs">
        <button
          onClick={() => setMapMode("vector")}
          className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mapMode === "vector" ? "bg-slate-900 text-yellow-400 shadow-xs" : "text-stone-600 hover:text-slate-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> Interactive Map
        </button>

        <button
          onClick={() => setMapMode("leaflet")}
          className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mapMode === "leaflet" ? "bg-slate-900 text-yellow-400 shadow-xs" : "text-stone-600 hover:text-slate-900"
          }`}
        >
          <Navigation className="w-3.5 h-3.5" /> OpenStreetMap
        </button>

        <button
          onClick={() => setMapMode("radar")}
          className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mapMode === "radar" ? "bg-slate-900 text-yellow-400 shadow-xs" : "text-stone-600 hover:text-slate-900"
          }`}
        >
          <Compass className="w-3.5 h-3.5" /> GPS Radar
        </button>
      </div>

      {/* MAP CONTAINER (100% RELIABLE) */}
      <div className="relative w-full h-72 rounded-3xl overflow-hidden border-2 border-amber-300/90 shadow-lg bg-[#EBF0EF]">
        
        {/* MODE 1: INTERACTIVE VECTOR STREET MAP (100% GUARANTEED TO SHOW ON EVERY PHONE) */}
        {mapMode === "vector" && (
          <div className="relative w-full h-full bg-[#EAF0EC] overflow-hidden select-none">
            {/* SVG Vector Street Map Background Layer */}
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              {/* Land & Buildings */}
              <rect width="400" height="300" fill="#EBF0EC" />
              
              {/* Temple Courtyard Polygon */}
              <rect x="130" y="70" width="140" height="130" rx="16" fill="#FDFBF7" stroke="#D1D5DB" strokeWidth="2" />
              <rect x="165" y="105" width="70" height="60" rx="8" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" opacity="0.6" />

              {/* Main Roads */}
              <path d="M 0 135 L 130 135 M 270 135 L 400 135" stroke="#FFFFFF" strokeWidth="22" strokeLinecap="round" />
              <path d="M 0 135 L 130 135 M 270 135 L 400 135" stroke="#D1D5DB" strokeWidth="24" strokeLinecap="round" opacity="0.3" />
              <path d="M 200 0 L 200 70 M 200 200 L 200 300" stroke="#FFFFFF" strokeWidth="20" />

              <path d="M 40 20 L 40 280" stroke="#FFFFFF" strokeWidth="16" />
              <path d="M 360 20 L 360 280" stroke="#FFFFFF" strokeWidth="16" />

              {/* Street Names */}
              <text x="320" y="220" fontSize="9" fontFamily="sans-serif" fontWeight="bold" fill="#9CA3AF" transform="rotate(-90 320 220)">Grand Road</text>
              <text x="215" y="45" fontSize="8" fontFamily="sans-serif" fontWeight="bold" fill="#9CA3AF">Mangalghat Rd</text>
              <text x="20" y="160" fontSize="8" fontFamily="sans-serif" fontWeight="bold" fill="#9CA3AF" transform="rotate(90 20 160)">Markandeswar Sahi Rd</text>
              <text x="80" y="125" fontSize="8" fontFamily="sans-serif" fontWeight="bold" fill="#9CA3AF">Gadanti Chowk</text>
              <text x="140" y="245" fontSize="8" fontFamily="sans-serif" fontWeight="bold" fill="#9CA3AF">Kapalamochana Mandira</text>

              {/* Animated Yellow Walking Route Line */}
              <path
                d="M 60 240 L 130 240 L 130 135 L 200 135 L 200 200"
                stroke="#FACC15"
                strokeWidth="5"
                strokeDasharray="8, 6"
                strokeLinecap="round"
                fill="none"
                className="animate-pulse"
              />

              {/* Overcrowded Gate A (Singhadwara) Pin */}
              <g transform="translate(125, 135)">
                <circle r="10" fill="#EF4444" opacity="0.2" className="animate-ping" />
                <circle r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                <text x="-35" y="-12" fontSize="8" fontWeight="bold" fill="#DC2626">Singhadwara (High Surge)</text>
              </g>

              {/* Recommended Gate B (Ashwadwara) Pin */}
              <g transform="translate(200, 200)">
                <circle r="12" fill="#10B981" opacity="0.3" className="animate-ping" />
                <rect x="-48" y="-22" width="96" height="18" rx="9" fill="#10B981" />
                <text x="0" y="-10" fontSize="8" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">📍 Ashwadwara Gate B</text>
              </g>

              {/* Temple Icon Badge in Center */}
              <g transform="translate(200, 135)">
                <circle r="18" fill="#FFFFFF" stroke="#EAB308" strokeWidth="2" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" />
                <text x="0" y="4" fontSize="14" textAnchor="middle">🛕</text>
                <rect x="-65" y="24" width="130" height="22" rx="6" fill="#FFFFFF" stroke="#E5E7EB" />
                <text x="0" y="34" fontSize="8" fontWeight="bold" fill="#1F2937" textAnchor="middle">{templeName}</text>
                <text x="0" y="43" fontSize="7" fill="#6B7280" textAnchor="middle">Optimal Walking Path</text>
              </g>

              {/* Pilgrim Live Walking Position Marker */}
              <g transform="translate(60, 240)">
                <circle r="14" fill="#FACC15" opacity="0.4" className="animate-ping" />
                <circle r="10" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
                <text x="0" y="4" fontSize="10" textAnchor="middle">🏃</text>
                <rect x="-24" y="-20" width="48" height="14" rx="7" fill="#0F172A" />
                <text x="0" y="-10" fontSize="7" fontWeight="bold" fill="#FACC15" textAnchor="middle">You (Walking)</text>
              </g>
            </svg>
          </div>
        )}

        {/* MODE 2: LEAFLET OPENSTREETMAP VIEW */}
        {mapMode === "leaflet" && (
          <div ref={mapContainerRef} className="w-full h-full z-0 bg-stone-100" />
        )}

        {/* MODE 3: GPS RADAR HUD VIEW */}
        {mapMode === "radar" && (
          <div className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-36 h-36 rounded-full border-2 border-amber-400/40 flex items-center justify-center animate-pulse">
              <div className="w-24 h-24 rounded-full border border-yellow-300/60 flex items-center justify-center">
                <Compass className="w-10 h-10 text-yellow-400 animate-spin" />
              </div>
              <span className="absolute top-2 text-[10px] font-mono text-emerald-400 font-bold">NORTH 18° E</span>
            </div>

            <div>
              <span className="text-xs font-mono text-stone-400 block uppercase">DISTANCE TO RECOMMENDED GATE</span>
              <h3 className="text-2xl font-serif font-bold text-amber-400">{distanceMeters} Meters Remaining</h3>
              <span className="text-[11px] font-mono text-emerald-400 block mt-0.5">Target: {bestGateName}</span>
            </div>
          </div>
        )}

        {/* TOP FLOATING STATUS BADGE */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-slate-950/90 text-yellow-400 text-[10px] font-mono font-bold tracking-wide backdrop-blur-md shadow-md flex items-center gap-1.5 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {gpsActive ? "REAL GPS ACTIVE" : "SIMULATED WALKING"}
          </span>

          <span className="px-3 py-1.5 rounded-full bg-white/95 text-slate-950 text-[10px] font-mono font-bold backdrop-blur-md shadow-md border border-stone-200">
            ETA: {Math.max(1, Math.round(distanceMeters / 70))} MINS
          </span>
        </div>

        {/* BOTTOM EXTERNAL MAP TRIGGER BAR */}
        <div className="absolute bottom-3 left-3 right-3 z-20 bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl text-white text-xs font-mono flex items-center justify-between shadow-xl border border-slate-800">
          <div className="flex items-center gap-2">
            <Footprints className="w-4 h-4 text-yellow-400 animate-bounce" />
            <div>
              <span className="text-[10px] text-stone-400 block uppercase">{templeName}</span>
              <span className="font-bold text-amber-400">{distanceMeters}m to {bestGateName.split(" ")[0]}</span>
            </div>
          </div>

          <button
            onClick={openGoogleMapsApp}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:brightness-105 transition-all pointer-events-auto shadow-md"
          >
            <ExternalLink className="w-3 h-3" /> Native App
          </button>
        </div>
      </div>

      {/* TURN-BY-TURN DIRECTION STEP CARD */}
      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-2xs space-y-1.5 text-xs font-mono">
        <div className="flex items-center gap-2 text-amber-800 font-bold">
          <Compass className="w-4 h-4 text-amber-600" />
          <span>SHORTEST PATH WALKING GUIDANCE:</span>
        </div>
        <div className="text-slate-900 font-bold">
          {distanceMeters > 30
            ? `Head North-East on Grand Temple Path towards ${bestGateName}. (${distanceMeters}m remaining)`
            : `You have arrived at ${bestGateName}! Priority Gate Entry Active ✓`}
        </div>
      </div>
    </div>
  );
}
