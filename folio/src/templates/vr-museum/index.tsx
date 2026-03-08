'use client';

import type { TemplateProps } from '@/types/template';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box as DreiBox, Plane, Image, OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface ArtFrame {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  subtitle: string;
  color: string;
  description?: string;
}

function ArtFrame({ position, rotation, title, subtitle, color, onClick }: ArtFrame & { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <DreiBox args={[2, 1.5, 0.1]} position={[0, 0, -0.05]}>
        <meshStandardMaterial color="#2c3e50" />
      </DreiBox>
      
      {/* Inner Canvas */}
      <Plane
        args={[1.8, 1.3]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={hovered ? color : '#34495e'} emissive={color} emissiveIntensity={hovered ? 0.5 : 0.1} />
      </Plane>

      {/* Title Plate */}
      <DreiBox args={[1.8, 0.3, 0.05]} position={[0, -0.9, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </DreiBox>
      <Text position={[0, -0.9, 0.03]} fontSize={0.12} color="#FFD700" anchorX="center">
        {title}
      </Text>
      <Text position={[0, -1.05, 0.03]} fontSize={0.08} color="#CCCCCC" anchorX="center">
        {subtitle}
      </Text>
    </group>
  );
}

export default function VRMuseum({ profile, accentColor }: TemplateProps) {
  const [selectedArt, setSelectedArt] = useState<ArtFrame | null>(null);
  const accent = accentColor ?? '#E74C3C';

  const artworks: (ArtFrame & { description: string })[] = [
    {
      position: [0, 1.5, -4],
      rotation: [0, 0, 0],
      title: profile.name,
      subtitle: 'Self Portrait',
      color: accent,
      description: profile.headline,
    },
    ...profile.experience.slice(0, 3).map((exp, idx) => ({
      position: [
        (idx - 1) * 3,
        1.5,
        -4,
      ] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      title: exp.company,
      subtitle: exp.title,
      color: `hsl(${idx * 120}, 70%, 60%)`,
      description: `${exp.dates}\n\n${exp.title} at ${exp.company}`,
    })),
    ...profile.skills.slice(0, 4).map((skill, idx) => ({
      position: [
        Math.cos(idx * Math.PI / 2) * 4,
        1.5,
        Math.sin(idx * Math.PI / 2) * 4 - 2,
      ] as [number, number, number],
      rotation: [0, -idx * Math.PI / 2, 0] as [number, number, number],
      title: skill,
      subtitle: 'Skill',
      color: '#3498DB',
      description: `Expertise in ${skill}`,
    })),
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0a0a0a', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 1.5, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 3, 2]} intensity={1} color="#FFFFFF" />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={0.5} color={accent} />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Ceiling */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>

        {/* Walls */}
        <mesh position={[0, 2, -6]}>
          <planeGeometry args={[30, 4]} />
          <meshStandardMaterial color="#16213e" />
        </mesh>

        {/* Artworks */}
        {artworks.map((art, idx) => (
          <ArtFrame key={idx} {...art} onClick={() => setSelectedArt(art)} />
        ))}

        <OrbitControls
          target={[0, 1.5, -2]}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={12}
        />
      </Canvas>

      {/* Museum Label */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: '#FFFFFF',
          fontFamily: 'serif',
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 400, margin: 0, color: '#FFD700' }}>
          {profile.name} Museum
        </h1>
        <p style={{ fontSize: '1rem', margin: '8px 0', opacity: 0.8 }}>
          A virtual gallery of experience & expertise
        </p>
      </div>

      {/* Selected Art Details */}
      {selectedArt && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '20px 32px',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: `2px solid ${selectedArt.color}`,
            borderRadius: '8px',
            color: '#FFFFFF',
            fontFamily: 'serif',
            maxWidth: '500px',
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setSelectedArt(null)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '12px',
              background: 'none',
              border: 'none',
              color: selectedArt.color,
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
          <h3 style={{ margin: 0, color: selectedArt.color, fontSize: '1.4rem' }}>{selectedArt.title}</h3>
          <p style={{ margin: '6px 0', fontSize: '0.95rem', opacity: 0.7 }}>{selectedArt.subtitle}</p>
          <p style={{ whiteSpace: 'pre-wrap', marginTop: '12px', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {selectedArt.description}
          </p>
        </div>
      )}
    </div>
  );
}
