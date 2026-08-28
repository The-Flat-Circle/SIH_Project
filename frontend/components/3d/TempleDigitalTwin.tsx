"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import * as THREE from "three";

interface TempleProps {
  densityLevel: "low" | "moderate" | "high" | "critical";
  onSelectGate?: (gate: string) => void;
}

// Low-Poly Stylized Temple Gopuram Architecture (Procedural 3D Model)
function GopuramStructure({ densityLevel }: { densityLevel: string }) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const getTempleAccentColor = () => {
    switch (densityLevel) {
      case "low":
        return "#10B981"; // Emerald
      case "moderate":
        return "#C9973E"; // Temple Gold
      case "high":
        return "#F97316"; // Orange
      case "critical":
        return "#B23A2E"; // Vermilion
      default:
        return "#C9973E";
    }
  };

  const color = getTempleAccentColor();

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Outer Temple Enclosure Boundary (Meghnad Pacheri) */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4.2, 0.2, 4.2]} />
        <meshStandardMaterial color="#211C18" roughness={0.7} metalness={0.2} wireframe={false} />
      </mesh>
      <lineSegments position={[0, 0.1, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.2, 0.2, 4.2)]} />
        <lineBasicMaterial color="#C9B896" opacity={0.4} transparent />
      </lineSegments>

      {/* Main Temple Platform (Jagamohana Base) */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[3.2, 0.4, 3.2]} />
        <meshStandardMaterial color="#1B2A44" roughness={0.5} />
      </mesh>

      {/* Tier 1 - Lower Deula (Assembly Hall) */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[2.5, 0.6, 2.5]} />
        <meshStandardMaterial color="#293D61" roughness={0.4} />
      </mesh>
      {/* Tier Lines */}
      <lineSegments position={[0, 0.9, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.5, 0.6, 2.5)]} />
        <lineBasicMaterial color="#C9973E" opacity={0.8} />
      </lineSegments>

      {/* Tier 2 - Mid Shikhara Pyramid Layer 1 */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.9, 1.1, 0.6, 4]} />
        <meshStandardMaterial color="#142035" roughness={0.3} />
      </mesh>

      {/* Tier 3 - Mid Shikhara Pyramid Layer 2 */}
      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.65, 0.85, 0.5, 4]} />
        <meshStandardMaterial color="#19273E" roughness={0.3} />
      </mesh>

      {/* Tier 4 - Upper Curved Spire */}
      <mesh position={[0, 2.45, 0]}>
        <cylinderGeometry args={[0.35, 0.6, 0.4, 4]} />
        <meshStandardMaterial color="#211C18" roughness={0.2} />
      </mesh>

      {/* Amalaka (Ribbed Stone Disk) */}
      <mesh position={[0, 2.75, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.15, 12]} />
        <meshStandardMaterial color="#C9973E" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Kalasha (Golden Sacred Pinnacle Spire) */}
      <mesh position={[0, 3.0, 0]}>
        <coneGeometry args={[0.12, 0.35, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Sacred Flag (Neelachakra Flag Simulation) */}
      <mesh position={[0, 3.25, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.04, 0.25, 3]} />
        <meshStandardMaterial color="#B23A2E" emissive="#B23A2E" emissiveIntensity={0.8} />
      </mesh>

      {/* Gate A - Eastern Lion Gate (Singhadwara) */}
      <mesh position={[0, 0.3, 2.15]}>
        <boxGeometry args={[0.7, 0.45, 0.15]} />
        <meshStandardMaterial color={densityLevel === "high" || densityLevel === "critical" ? "#B23A2E" : "#C9973E"} />
      </mesh>

      {/* Gate B - Southern Gate (Ashwadwara) */}
      <mesh position={[2.15, 0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.7, 0.45, 0.15]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>

      {/* Gate C - Western Gate (Vyaghradwara) */}
      <mesh position={[0, 0.3, -2.15]}>
        <boxGeometry args={[0.7, 0.45, 0.15]} />
        <meshStandardMaterial color="#C9973E" />
      </mesh>

      {/* Gate D - Northern Gate (Hastidwara) */}
      <mesh position={[-2.15, 0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.7, 0.45, 0.15]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>
    </group>
  );
}

// Particle Point Cloud Assembly (Diya Light Particle Assembly)
function DiyaParticleShell({ densityLevel }: { densityLevel: string }) {
  const count = 1200;
  const pointsRef = useRef<THREE.Points>(null);

  // Generate initial particle coordinates (spherical dispersion -> assembly)
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.8 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) + 0.5;
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Initial scattered position for assembly animation
      initPos[i * 3] = x * (2.5 + Math.random() * 2);
      initPos[i * 3 + 1] = y * (2.5 + Math.random() * 2);
      initPos[i * 3 + 2] = z * (2.5 + Math.random() * 2);
    }
    return [pos, initPos];
  }, [count]);

  const targetColor = useMemo(() => {
    switch (densityLevel) {
      case "low":
        return new THREE.Color("#10B981");
      case "moderate":
        return new THREE.Color("#C9973E");
      case "high":
        return new THREE.Color("#F97316");
      case "critical":
        return new THREE.Color("#B23A2E");
      default:
        return new THREE.Color("#C9973E");
    }
  }, [densityLevel]);

  const currentColor = useRef(new THREE.Color("#C9973E"));

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Particle pulse & slow rotation
    pointsRef.current.rotation.y += delta * 0.08;

    // Interpolate color smoothly toward density target
    currentColor.current.lerp(targetColor, delta * 3.0);
    if (pointsRef.current.material instanceof THREE.PointsMaterial) {
      pointsRef.current.material.color = currentColor.current;
    }

    // Assembly easing animation on load
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;
    const time = state.clock.getElapsedTime();

    if (time < 3) {
      const progress = Math.min(time / 2.5, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      for (let i = 0; i < count; i++) {
        posAttr.setXYZ(
          i,
          THREE.MathUtils.lerp(initialPositions[i * 3], positions[i * 3], ease),
          THREE.MathUtils.lerp(initialPositions[i * 3 + 1], positions[i * 3 + 1], ease),
          THREE.MathUtils.lerp(initialPositions[i * 3 + 2], positions[i * 3 + 2], ease)
        );
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#C9973E"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Gate Hotspot Overlay Component
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
    CRITICAL: "bg-vermilion-dark/95 text-red-100 border-vermilion animate-pulse",
  };

  return (
    <Html position={position} center distanceFactor={8}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative cursor-pointer transition-all duration-300 group ${
          hovered ? "scale-110 z-20" : "scale-100"
        }`}
      >
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-mono shadow-lg backdrop-blur-md ${
            statusColors[status]
          } ${isRecommended ? "ring-2 ring-temple-gold ring-offset-1 ring-offset-stone-charcoal" : ""}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              status === "CRITICAL"
                ? "bg-vermilion animate-ping"
                : status === "HIGH"
                ? "bg-amber-400"
                : "bg-emerald-400"
            }`}
          />
          <span className="font-bold tracking-wider">{gateCode}:</span>
          <span>{count} PPL</span>

          {isRecommended && (
            <span className="ml-1 px-1 py-0.2 text-[9px] bg-temple-gold text-stone-charcoal font-bold rounded">
              REC
            </span>
          )}
        </div>

        {/* Detailed Tooltip on Hover */}
        {hovered && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-44 p-2.5 rounded-lg bg-stone-charcoal/95 border border-sandstone/30 text-parchment shadow-2xl z-30 pointer-events-none">
            <div className="text-xs font-bold text-temple-gold border-b border-sandstone/20 pb-1 mb-1 flex items-center justify-between">
              <span>{label}</span>
              <span className="text-[10px] font-mono text-sandstone/70">{capacityPct}% CAP</span>
            </div>
            <div className="text-[10px] font-mono space-y-0.5 text-sandstone">
              <div className="flex justify-between">
                <span>Density:</span>
                <span className="text-parchment font-bold">{status}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Wait:</span>
                <span className="text-parchment">{status === "CRITICAL" ? "45 mins" : "8 mins"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Html>
  );
}

export default function TempleDigitalTwin({ densityLevel, onSelectGate }: TempleProps) {
  const isCritical = densityLevel === "critical";

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] md:h-[580px] rounded-2xl overflow-hidden border border-sandstone/20 bg-gradient-to-b from-stone-charcoal via-dusk-indigo/40 to-stone-charcoal shadow-2xl">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [5.5, 4.0, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 8]} intensity={1.2} color="#F3E9D2" castShadow />
        <pointLight
          position={[0, 3.5, 0]}
          intensity={isCritical ? 3.0 : 1.5}
          color={isCritical ? "#B23A2E" : "#C9973E"}
        />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <GopuramStructure densityLevel={densityLevel} />
          <DiyaParticleShell densityLevel={densityLevel} />

          {/* Interactive Gate Hotspots */}
          <GateHotspotMarker
            position={[0, 0.2, 2.4]}
            label="Singhadwara (Lion Gate)"
            gateCode="GATE_A"
            count={densityLevel === "critical" ? 480 : densityLevel === "high" ? 340 : 120}
            capacityPct={densityLevel === "critical" ? 96 : densityLevel === "high" ? 82 : 45}
            status={densityLevel === "critical" ? "CRITICAL" : densityLevel === "high" ? "HIGH" : "NORMAL"}
          />

          <GateHotspotMarker
            position={[2.4, 0.2, 0]}
            label="Ashwadwara (Horse Gate)"
            gateCode="GATE_B"
            count={65}
            capacityPct={25}
            status="NORMAL"
            isRecommended={densityLevel === "high" || densityLevel === "critical"}
          />

          <GateHotspotMarker
            position={[0, 0.2, -2.4]}
            label="Vyaghradwara (Tiger Gate)"
            gateCode="GATE_C"
            count={140}
            capacityPct={52}
            status="NORMAL"
          />

          <GateHotspotMarker
            position={[-2.4, 0.2, 0]}
            label="Hastidwara (Elephant Gate)"
            gateCode="GATE_D"
            count={88}
            capacityPct={34}
            status="NORMAL"
          />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Digital Twin UI Overlay Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-charcoal/90 border border-sandstone/30 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono tracking-wider text-parchment font-semibold">
            DIGITAL_TWIN // PURI_SHREE_MANDIRA
          </span>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-stone-charcoal/90 border border-temple-gold/40 text-[11px] font-mono text-temple-gold backdrop-blur-md">
          R3F 3D POINT CLOUD SENSING
        </div>
      </div>

      {/* Bottom Controls / Legend */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-stone-charcoal/90 border border-sandstone/25 backdrop-blur-md">
        <div className="flex items-center gap-4 text-[11px] font-mono text-sandstone">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Low Zone
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-temple-gold" /> Moderate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-vermilion" /> Critical Hotspot
          </span>
        </div>
        <span className="text-[10px] font-mono text-sandstone/60">
          Rotate / Hover Gates to Inspect
        </span>
      </div>
    </div>
  );
}
