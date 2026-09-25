"use client";

import React, { useEffect, useRef, useState } from "react";
import { Navigation, MapPin, Footprints, ExternalLink, RefreshCw, Compass, Layers, ShieldCheck } from "lucide-react";

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

  const [mapMode, setMapMode] = useState<"google" | "leaflet" | "radar">("google");
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

  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${gateLat},${gateLng}&z=17&output=embed`;

  return (
    <div className="space-y-3">
      {/* MODE SWITCHER TABS */}
      <div className="flex items-center justify-between gap-1 p-1 rounded-2xl bg-white border border-stone-200 text-xs font-bold shadow-xs">
        <button
          onClick={() => setMapMode("google")}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mapMode === "google" ? "bg-slate-900 text-yellow-400 shadow-xs" : "text-stone-500 hover:text-slate-800"
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> Google Maps
        </button>

        <button
          onClick={() => setMapMode("leaflet")}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mapMode === "leaflet" ? "bg-slate-900 text-yellow-400 shadow-xs" : "text-stone-500 hover:text-slate-800"
          }`}
        >
          <Navigation className="w-3.5 h-3.5" /> OpenStreetMap
        </button>

        <button
          onClick={() => setMapMode("radar")}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mapMode === "radar" ? "bg-slate-900 text-yellow-400 shadow-xs" : "text-stone-500 hover:text-slate-800"
          }`}
        >
          <Compass className="w-3.5 h-3.5" /> GPS Radar
        </button>
      </div>

      {/* MAP DISPLAY CONTAINER */}
      <div className="relative w-full h-80 rounded-3xl overflow-hidden border-2 border-amber-300/90 shadow-xl bg-stone-900">
        
        {/* MODE 1: GOOGLE MAPS EMBED VIEW */}
        {mapMode === "google" && (
          <iframe
            title="Google Maps Live Navigation"
            src={googleMapsEmbedUrl}
            className="w-full h-full border-0 filter brightness-95"
            loading="lazy"
          />
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
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-amber-700 font-bold">
          <Compass className="w-4 h-4" />
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
