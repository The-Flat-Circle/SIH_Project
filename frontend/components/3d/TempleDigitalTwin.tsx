"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import * as THREE from "three";

export type SupportedSite = "puri" | "vaishnodevi" | "tirupati" | "varanasi" | "kedarnath" | "siddhivinayak";

interface TempleProps {
  densityLevel: "low" | "moderate" | "high" | "critical";
  selectedSite?: SupportedSite;
  onSelectSite?: (site: SupportedSite) => void;
}

const DESTINATIONS_LIST: { id: SupportedSite; name: string; hasTwin: boolean }[] = [
  { id: "puri", name: "Puri Shree Mandira", hasTwin: true },
  { id: "vaishnodevi", name: "Mata Vaishno Devi", hasTwin: true },
  { id: "tirupati", name: "Tirupati Balaji", hasTwin: false },
  { id: "varanasi", name: "Kashi Vishwanath", hasTwin: false },
  { id: "kedarnath", name: "Kedarnath Dham", hasTwin: false },
  { id: "siddhivinayak", name: "Siddhivinayak Mumbai", hasTwin: false },
];

// Detailed Kalinga Rekha Deula Architecture for Shree Jagannath Temple Puri
function DetailedPuriTempleStructure({ densityLevel }: { densityLevel: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const flagRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (flagRef.current) {
      flagRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.08;
    }
  });

  const getTempleAccentColor = () => {
    switch (densityLevel) {
      case "low":
        return "#10B981";
      case "moderate":
        return "#C9973E";
      case "high":
        return "#F97316";
      case "critical":
        return "#B23A2E";
      default:
        return "#C9973E";
    }
  };

  const accentColor = getTempleAccentColor();

  // Tiered Bhumi levels for the main Rekha Deula spire
  const spireTiers = [
    { y: 1.1, rBase: 1.35, rTop: 1.25, h: 0.28, color: "#1B2A44" },
    { y: 1.38, rBase: 1.25, rTop: 1.15, h: 0.26, color: "#223555" },
    { y: 1.64, rBase: 1.15, rTop: 1.05, h: 0.24, color: "#1E2F4C" },
    { y: 1.88, rBase: 1.05, rTop: 0.94, h: 0.22, color: "#293D61" },
    { y: 2.1, rBase: 0.94, rTop: 0.82, h: 0.2, color: "#1E2F4C" },
    { y: 2.3, rBase: 0.82, rTop: 0.7, h: 0.18, color: "#293D61" },
    { y: 2.48, rBase: 0.7, rTop: 0.58, h: 0.16, color: "#142035" },
    { y: 2.64, rBase: 0.58, rTop: 0.45, h: 0.14, color: "#19273E" },
  ];

  return (
    <group ref={groupRef} position={[0, -1.0, 0]}>
      {/* 1. OUTER MEGHANADA PACHERI FORTRESS WALL (Perimeter) */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[4.4, 0.16, 4.4]} />
        <meshStandardMaterial color="#191512" roughness={0.9} />
      </mesh>

      {/* Outer Wall Edges */}
      <lineSegments position={[0, 0.08, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.4, 0.16, 4.4)]} />
        <lineBasicMaterial color="#C9973E" opacity={0.35} transparent />
      </lineSegments>

      {/* 4 CARVED ARCHED GATEWAY PORTALS (Singhadwara, Ashwadwara, Vyaghradwara, Hastidwara) */}
      {/* Singhadwara (Lion Gate - East/Front) */}
      <mesh position={[0, 0.22, 2.18]}>
        <boxGeometry args={[0.7, 0.28, 0.12]} />
        <meshStandardMaterial color="#C9973E" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Lion Gate Pillar Statues */}
      <mesh position={[-0.4, 0.25, 2.2]}>
        <boxGeometry args={[0.12, 0.32, 0.12]} />
        <meshStandardMaterial color="#EAB308" metalness={0.8} />
      </mesh>
      <mesh position={[0.4, 0.25, 2.2]}>
        <boxGeometry args={[0.12, 0.32, 0.12]} />
        <meshStandardMaterial color="#EAB308" metalness={0.8} />
      </mesh>

      {/* ARUNA STAMBHA (Sun Pillar in front of Singhadwara) */}
      <mesh position={[0, 0.45, 2.6]}>
        <cylinderGeometry args={[0.04, 0.06, 0.7, 12]} />
        <meshStandardMaterial color="#C9973E" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.82, 2.6]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#EAB308" emissive="#C9973E" emissiveIntensity={0.6} />
      </mesh>

      {/* Ashwadwara (Horse Gate - South/Right) */}
      <mesh position={[2.18, 0.22, 0]}>
        <boxGeometry args={[0.12, 0.28, 0.7]} />
        <meshStandardMaterial color="#10B981" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Vyaghradwara (Tiger Gate - West/Back) */}
      <mesh position={[0, 0.22, -2.18]}>
        <boxGeometry args={[0.7, 0.28, 0.12]} />
        <meshStandardMaterial color="#293D61" roughness={0.4} />
      </mesh>

      {/* Hastidwara (Elephant Gate - North/Left) */}
      <mesh position={[-2.18, 0.22, 0]}>
        <boxGeometry args={[0.12, 0.28, 0.7]} />
        <meshStandardMaterial color="#293D61" roughness={0.4} />
      </mesh>

      {/* 2. INNER TEMPLE PLINTH (Kurma Bedha) */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[3.4, 0.28, 3.4]} />
        <meshStandardMaterial color="#211C18" roughness={0.8} />
      </mesh>
      <lineSegments position={[0, 0.3, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(3.4, 0.28, 3.4)]} />
        <lineBasicMaterial color="#C9973E" opacity={0.5} transparent />
      </lineSegments>

      {/* 3. FRONTAL HALLS (Jagamohana, Nata Mandap, Bhoga Mandap) */}
      {/* Bhoga Mandap (Frontmost Porch) */}
      <mesh position={[0, 0.6, 1.4]}>
        <cylinderGeometry args={[0.45, 0.65, 0.45, 4]} />
        <meshStandardMaterial color="#1E2F4C" roughness={0.4} />
      </mesh>

      {/* Nata Mandap (Dancing Hall) */}
      <mesh position={[0, 0.75, 0.85]}>
        <cylinderGeometry args={[0.65, 0.85, 0.55, 4]} />
        <meshStandardMaterial color="#243757" roughness={0.4} />
      </mesh>

      {/* Jagamohana (Assembly Hall - Pidha Deula Pyramidal Roof) */}
      <mesh position={[0, 0.95, 0.25]}>
        <cylinderGeometry args={[0.85, 1.15, 0.75, 4]} />
        <meshStandardMaterial color="#1B2A44" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.38, 0.25]}>
        <coneGeometry args={[0.75, 0.45, 4]} />
        <meshStandardMaterial color="#C9973E" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* 4. MAIN REKHA DEULA SHIKHARA SPIRE (Curvilinear Sanctorum Tower) */}
      <mesh position={[0, 0.7, -0.5]}>
        <boxGeometry args={[2.5, 0.55, 2.5]} />
        <meshStandardMaterial color="#16233B" roughness={0.4} />
      </mesh>

      {/* Tiered Bhumi Ribs scaling upwards */}
      {spireTiers.map((tier, i) => (
        <group key={i} position={[0, tier.y, -0.5]}>
          <mesh>
            <cylinderGeometry args={[tier.rTop, tier.rBase, tier.h, 4]} />
            <meshStandardMaterial color={tier.color} roughness={0.35} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.CylinderGeometry(tier.rTop, tier.rBase, tier.h, 4)]} />
            <lineBasicMaterial color="#C9973E" opacity={0.3} transparent />
          </lineSegments>
        </group>
      ))}

      {/* 5. CROWNING AMALAKA (Fluted Circular Stone Disc) */}
      <mesh position={[0, 2.78, -0.5]}>
        <cylinderGeometry args={[0.42, 0.48, 0.14, 16]} />
        <meshStandardMaterial color="#C9973E" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* 6. GOLDEN KALASA (Sacred Water Pot Pinnacle) */}
      <mesh position={[0, 2.92, -0.5]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#EAB308" emissive="#C9973E" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 7. NEELACHAKRA (Sacred Golden Blue Wheel of Lord Jagannath) */}
      <mesh position={[0, 3.12, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.035, 12, 24]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.9} metalness={0.9} />
      </mesh>

      {/* 8. PATITAPABANA BANA (Saffron Sacred Flowing Flag) */}
      <mesh position={[0, 3.25, -0.5]}>
        <cylinderGeometry args={[0.015, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#EAB308" metalness={0.8} />
      </mesh>
      <mesh ref={flagRef} position={[0.12, 3.32, -0.5]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.07, 0.32, 3]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.9} />
      </mesh>

      {/* Temple Pillar Lighting Accent */}
      <pointLight position={[0, 2.8, -0.5]} intensity={1.5} color="#F59E0B" distance={4} />
    </group>
  );
}

// Low-Poly Stylized Mata Vaishno Devi Shrine Architecture
function VaishnoDeviStructure({ densityLevel }: { densityLevel: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  const getAccentColor = () => {
    switch (densityLevel) {
      case "low":
        return "#10B981";
      case "moderate":
        return "#EAB308";
      case "high":
        return "#F97316";
      case "critical":
        return "#EF4444";
      default:
        return "#EAB308";
    }
  };

  const accentColor = getAccentColor();

  return (
    <group ref={groupRef} position={[0, -0.9, 0]}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[2.0, 2.7, 0.5, 7]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[1.3, 1.8, 0.6, 6]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      <mesh position={[-0.35, 1.45, -0.25]}>
        <coneGeometry args={[0.8, 1.0, 5]} />
        <meshStandardMaterial color="#475569" roughness={0.7} />
      </mesh>
      <mesh position={[0.4, 1.55, 0.15]}>
        <coneGeometry args={[0.7, 1.1, 5]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>

      <mesh position={[0, 0.8, 1.0]}>
        <boxGeometry args={[1.5, 0.45, 0.7]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.8, 1.33]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.08, 16]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.5} metalness={0.7} />
      </mesh>

      <mesh position={[-0.12, 0.8, 1.22]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, 0.82, 1.22]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0.12, 0.8, 1.22]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={1.2} />
      </mesh>

      <mesh position={[0, 1.15, 1.0]}>
        <sphereGeometry args={[0.25, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#EAB308" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.35, 1.0]}>
        <coneGeometry args={[0.07, 0.25, 8]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// Generic Node Geometry Frame for Upcoming Destination Twins
function GenericShrineNode() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[3.0, 0.2, 3.0]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[1.0, 1.4, 1.2, 6]} />
        <meshStandardMaterial color="#334155" wireframe />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[0.7, 0.9, 6]} />
        <meshStandardMaterial color="#C9973E" wireframe />
      </mesh>
    </group>
  );
}

// Particle Shell Assembly
function ParticleShell({ densityLevel }: { densityLevel: string }) {
  const count = 1200;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.6 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + 0.4;
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return [pos];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#C9973E" transparent opacity={0.75} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// Gate Hotspot Overlay Marker
function GateHotspotMarker({
  position,
  label,
  gateCode,
  count,
  capacityPct,
  status,
  isRecommended = false,
}: {
  position: [number, number, number];
  label: string;
  gateCode: string;
  count: number;
  capacityPct: number;
  status: "NORMAL" | "HIGH" | "CRITICAL";
  isRecommended?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const statusColors = {
    NORMAL: "bg-emerald-950/90 text-emerald-300 border-emerald-500/60",
    HIGH: "bg-amber-950/90 text-amber-300 border-amber-500/60",
    CRITICAL: "bg-red-950/95 text-red-100 border-red-500 animate-pulse",
  };

  return (
    <Html position={position} center distanceFactor={7.5}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative cursor-pointer transition-all duration-300 group ${hovered ? "scale-110 z-20" : "scale-100"}`}
      >
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[9px] font-mono shadow-lg backdrop-blur-md ${
            statusColors[status]
          } ${isRecommended ? "ring-2 ring-temple-gold ring-offset-1 ring-offset-stone-charcoal" : ""}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              status === "CRITICAL" ? "bg-red-500 animate-ping" : status === "HIGH" ? "bg-amber-400" : "bg-emerald-400"
            }`}
          />
          <span className="font-bold tracking-wider">{gateCode}:</span>
          <span>{count} PPL</span>

          {isRecommended && (
            <span className="ml-1 px-1 py-0.2 text-[8px] bg-temple-gold text-stone-charcoal font-bold rounded">
              REC
            </span>
          )}
        </div>

        {hovered && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-44 p-2 rounded-lg bg-stone-charcoal/95 border border-sandstone/30 text-parchment shadow-2xl z-30 pointer-events-none">
            <div className="text-[11px] font-bold text-temple-gold border-b border-sandstone/20 pb-1 mb-1 flex items-center justify-between">
              <span>{label}</span>
              <span className="text-[9px] font-mono text-sandstone/70">{capacityPct}% CAP</span>
            </div>
            <div className="text-[9px] font-mono space-y-0.5 text-sandstone">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-parchment font-bold">{status}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Wait:</span>
                <span className="text-parchment">{status === "CRITICAL" ? "55 mins" : "10 mins"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Html>
  );
}

export default function TempleDigitalTwin({
  densityLevel,
  selectedSite = "puri",
  onSelectSite,
}: TempleProps) {
  const [site, setSite] = useState<SupportedSite>(selectedSite);

  const activeSite = onSelectSite ? selectedSite : site;
  const currentDest = DESTINATIONS_LIST.find((d) => d.id === activeSite) || DESTINATIONS_LIST[0];

  const handleToggle = (newSite: SupportedSite) => {
    setSite(newSite);
    if (onSelectSite) onSelectSite(newSite);
  };

  const densityBadgeConfig = {
    low: { label: "LOW LOAD (15-25%)", color: "bg-emerald-950/90 text-emerald-400 border-emerald-500/50" },
    moderate: { label: "MODERATE (50-65%)", color: "bg-temple-gold/20 text-temple-gold border-temple-gold/50" },
    high: { label: "HIGH SURGE (80-88%)", color: "bg-amber-950/90 text-amber-400 border-amber-500/50" },
    critical: { label: "CRITICAL OVERLOAD (94%+)", color: "bg-red-950/90 text-red-400 border-red-500 animate-pulse" },
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[410px] md:h-[440px] rounded-2xl overflow-hidden border border-sandstone/25 bg-gradient-to-b from-stone-charcoal via-dusk-indigo/40 to-stone-charcoal shadow-2xl">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [5.2, 3.8, 6.2], fov: 42 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[12, 18, 10]} intensity={1.5} color="#F3E9D2" castShadow />
        <pointLight position={[0, 3.8, 0]} intensity={2.0} color="#C9973E" />
        <pointLight position={[0, 1.2, 2.5]} intensity={1.2} color="#EAB308" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          {activeSite === "puri" && <DetailedPuriTempleStructure densityLevel={densityLevel} />}
          {activeSite === "vaishnodevi" && <VaishnoDeviStructure densityLevel={densityLevel} />}
          {!currentDest.hasTwin && <GenericShrineNode />}

          <ParticleShell densityLevel={densityLevel} />

          {/* Dynamic Hotspots */}
          {activeSite === "puri" && (
            <>
              <GateHotspotMarker position={[0, 0.3, 2.4]} label="Singhadwara (Lion Gate)" gateCode="GATE_A" count={340} capacityPct={82} status="HIGH" />
              <GateHotspotMarker position={[2.3, 0.3, 0]} label="Ashwadwara (Horse Gate)" gateCode="GATE_B" count={65} capacityPct={25} status="NORMAL" isRecommended />
              <GateHotspotMarker position={[0, 0.3, -2.4]} label="Vyaghradwara (Tiger Gate)" gateCode="GATE_C" count={140} capacityPct={52} status="NORMAL" />
              <GateHotspotMarker position={[-2.3, 0.3, 0]} label="Hastidwara (Elephant Gate)" gateCode="GATE_D" count={88} capacityPct={34} status="NORMAL" />
            </>
          )}

          {activeSite === "vaishnodevi" && (
            <>
              <GateHotspotMarker position={[0, 0.6, 1.5]} label="Bhawan Holy Sanctum Gate" gateCode="BHAWAN" count={460} capacityPct={96} status="CRITICAL" />
              <GateHotspotMarker position={[1.5, 0.35, 0.4]} label="Ardhkuwari Cave Gate" gateCode="ARDHKUWARI" count={320} capacityPct={68} status="HIGH" />
              <GateHotspotMarker position={[-1.5, 0.4, -0.4]} label="Bhairon Temple Ropeway" gateCode="BHAIRON" count={90} capacityPct={22} status="NORMAL" isRecommended />
              <GateHotspotMarker position={[0, 0.1, -1.8]} label="Banganga Entry Gate" gateCode="BANGANGA" count={140} capacityPct={35} status="NORMAL" />
            </>
          )}

          {!currentDest.hasTwin && (
            <GateHotspotMarker position={[0, 0.5, 1.5]} label={`${currentDest.name} Main Gate`} gateCode="NODE_01" count={210} capacityPct={60} status="HIGH" />
          )}
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2.1} autoRotate autoRotateSpeed={0.8} />
      </Canvas>

      {/* Clean Header Bar */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-20 pointer-events-auto">
        <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono backdrop-blur-md font-bold ${densityBadgeConfig[densityLevel].color}`}>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
            <span>{densityBadgeConfig[densityLevel].label}</span>
          </div>
        </div>

        {/* Dropdown Selector for 6 Pilgrimage Destinations */}
        <select
          value={activeSite}
          onChange={(e) => handleToggle(e.target.value as SupportedSite)}
          className="px-2.5 py-1 rounded-xl bg-stone-charcoal/90 border border-sandstone/30 text-temple-gold text-[10px] font-mono font-bold focus:outline-none backdrop-blur-md cursor-pointer"
        >
          {DESTINATIONS_LIST.map((d) => (
            <option key={d.id} value={d.id} className="bg-slate-950 text-sandstone">
              {d.name} {d.hasTwin ? "★ 3D Twin" : "(Telemetry Active)"}
            </option>
          ))}
        </select>
      </div>

      {/* Bottom Legend */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-stone-charcoal/90 border border-sandstone/25 backdrop-blur-md">
        <div className="flex items-center gap-3 text-[10px] font-mono text-sandstone">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-temple-gold" /> Moderate</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical</span>
        </div>
        <span className="text-[9px] font-mono text-sandstone/60">
          {currentDest.name} • {currentDest.hasTwin ? "Active 3D Twin" : "Upcoming Twin Node"}
        </span>
      </div>
    </div>
  );
}
