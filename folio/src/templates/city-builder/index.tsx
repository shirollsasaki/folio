'use client';

import type { TemplateProps } from '@/types/template';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

interface BuildingProps {
  position: [number, number, number];
  height: number;
  color: string;
  label: string;
  onClick: () => void;
}

function Building({ position, height, color, label, onClick }: BuildingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[1, height, 1]}
        position={[0, height / 2, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? '#FFD700' : color}
          emissive={hovered ? '#FFD700' : color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </Box>
      <Text
        position={[0, height + 0.5, 0]}
        fontSize={0.3}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

export default function CityBuilder({ profile, accentColor }: TemplateProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const accent = accentColor ?? '#00FFFF';

  // Map experience to buildings (taller = more recent/important)
  const buildings = [
    ...profile.experience.map((exp, idx) => ({
      id: `exp-${idx}`,
      position: [idx * 2 - profile.experience.length, 0, -2] as [number, number, number],
      height: 3 + (profile.experience.length - idx) * 0.5,
      color: accent,
      label: exp.company,
      details: `${exp.title}\n${exp.dates}`,
    })),
    ...profile.skills.slice(0, 8).map((skill, idx) => ({
      id: `skill-${idx}`,
      position: [idx * 1.5 - 3, 0, 2] as [number, number, number],
      height: 1 + Math.random() * 2,
      color: '#FF6B6B',
      label: skill,
      details: skill,
    })),
  ];

  const selected = buildings.find((b) => b.id === selectedBuilding);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0a0a1a', overflow: 'hidden' }}>
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 8, 12], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#FF6B6B" />
        
        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        {/* Grid */}
        <gridHelper args={[50, 50, '#333366', '#222244']} />

        {/* Buildings */}
        {buildings.map((building) => (
          <Building
            key={building.id}
            position={building.position}
            height={building.height}
            color={building.color}
            label={building.label}
            onClick={() => setSelectedBuilding(building.id)}
          />
        ))}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>

      {/* HUD Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '24px',
          color: '#FFFFFF',
          fontFamily: 'monospace',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, color: accent }}>
          {profile.name}
        </h1>
        <p style={{ fontSize: '1rem', margin: '8px 0 0', opacity: 0.8 }}>{profile.headline}</p>
        <p style={{ fontSize: '0.8rem', margin: '4px 0 0', opacity: 0.5 }}>
          Click buildings to explore • Drag to rotate • Scroll to zoom
        </p>
      </div>

      {/* Selected Building Details */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              padding: '20px',
              backgroundColor: 'rgba(10, 10, 26, 0.9)',
              border: `2px solid ${accent}`,
              borderRadius: '8px',
              color: '#FFFFFF',
              fontFamily: 'monospace',
              maxWidth: '300px',
              zIndex: 10,
              pointerEvents: 'auto',
            }}
          >
            <button
              onClick={() => setSelectedBuilding(null)}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'none',
                border: 'none',
                color: accent,
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
            <h3 style={{ margin: 0, color: accent }}>{selected.label}</h3>
            <p style={{ whiteSpace: 'pre-wrap', marginTop: '12px', fontSize: '0.9rem' }}>
              {selected.details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
