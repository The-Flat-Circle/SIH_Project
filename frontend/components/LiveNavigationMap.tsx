"use client";

import React, { useEffect, useRef, useState } from "react";
import { Navigation, MapPin, Footprints, ExternalLink, RefreshCw, Compass } from "lucide-react";

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

  const [userPos, setUserPos] = useState<{ lat: number; lng: number }>({
    lat: destLat - 0.0018,
    lng: destLng - 0.0015,
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

  // Simulated walking loop when GPS is static / indoors
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

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let L: any;

    const initMap = async () => {
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      L = (await import("leaflet")).default;

      if (!mapInstanceRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [destLat, destLng],
          zoom: 17,
          zoomControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap',
          maxZoom: 19,
        }).addTo(map);

        // Custom Gate Pin Marker (Recommended Gate)
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
  }, [destLat, destLng, gateLat, gateLng]);

  // Update User Marker & Route Polyline Position
  useEffect(() => {
    if (markerRef.current && polylineRef.current) {
      markerRef.current.setLatLng([userPos.lat, userPos.lng]);
      polylineRef.current.setLatLngs([
        [userPos.lat, userPos.lng],
        [gateLat, gateLng],
      ]);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo([userPos.lat, userPos.lng]);
      }
    }
  }, [userPos, gateLat, gateLng]);

  const openGoogleMapsDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${gateLat},${gateLng}&travelmode=walking`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4">
      {/* MAP CONTAINER */}
      <div className="relative w-full h-72 rounded-3xl overflow-hidden border-2 border-amber-300 shadow-xl bg-stone-100">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Top Floating Info Badge */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-slate-900/90 text-yellow-400 text-[10px] font-mono font-bold tracking-wide backdrop-blur-md shadow-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {gpsActive ? "LIVE GPS ACTIVE" : "SIMULATED WALKING ROUTE"}
          </span>

          <span className="px-3 py-1.5 rounded-full bg-white/90 text-slate-900 text-[10px] font-mono font-bold backdrop-blur-md shadow-md">
            ETA: {Math.max(1, Math.round(distanceMeters / 70))} MINS
          </span>
        </div>

        {/* Bottom Distance Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-10 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl text-white text-xs font-mono flex items-center justify-between shadow-lg border border-slate-800">
          <div className="flex items-center gap-2">
            <Footprints className="w-4 h-4 text-yellow-400 animate-bounce" />
            <div>
              <span className="text-[10px] text-stone-400 block uppercase">WALKING DISTANCE</span>
              <span className="font-bold text-amber-400">{distanceMeters} meters away</span>
            </div>
          </div>

          <button
            onClick={openGoogleMapsDirections}
            className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-amber-300 transition-all pointer-events-auto"
          >
            <ExternalLink className="w-3 h-3" /> Google Maps
          </button>
        </div>
      </div>

      {/* TURN-BY-TURN DIRECTION STEP CARD */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-md space-y-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-amber-600 font-bold">
          <Compass className="w-4 h-4" />
          <span>TURN-BY-TURN GUIDANCE:</span>
        </div>
        <div className="text-slate-900 font-bold">
          {distanceMeters > 30
            ? `Walk ${distanceMeters}m straight on Grand Temple Corridor towards ${bestGateName}.`
            : `You have arrived at ${bestGateName}! Scan your QR Pass for priority entry.`}
        </div>
      </div>
    </div>
  );
}
