'use client';

import type { TemplateProps } from '@/types/template';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere, Stars, OrbitControls } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  color: string;
  size: number;
  label: string;
  description: string;
  onClick: () => void;
}

function Planet({ position, color, size, label, description, onClick }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[size, 32, 32]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>
      {hovered && (
        <Text position={[0, size + 0.8, 0]} fontSize={0.4} color="#FFFFFF" anchorX="center">
          {label}
        </Text>
      )}
    </group>
  );
}

function SpaceJourney3D({ profile, accent, onPlanetClick }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScroll(scrollPercent);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.z = scroll * 30 - 15;
    }
  });

  const experiences = profile.experience.map((exp: any, idx: number) => ({
    id: `exp-${idx}`,
    position: [Math.sin(idx) * 5, idx * 3, idx * -5] as [number, number, number],
    color: accent,
    size: 0.8 + idx * 0.1,
    label: exp.company,
    description: `${exp.title}\n${exp.dates}`,
  }));

  return (
    <group ref={groupRef}>
      {experiences.map((exp: any) => (
        <Planet key={exp.id} {...exp} onClick={() => onPlanetClick(exp)} />
      ))}
    </group>
  );
}

export default function SpaceJourneyTemplate({ profile, accentColor }: TemplateProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<any>(null);
  const accent = accentColor ?? '#00D9FF';

  return (
    <div style={{ position: 'relative' }}>
      {/* Fixed Canvas Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
      >
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <SpaceJourney3D profile={profile} accent={accent} onPlanetClick={setSelectedPlanet} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Scrollable Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: `${profile.experience.length * 100}vh`,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '40px',
            color: '#FFFFFF',
            fontFamily: 'monospace',
            textAlign: 'center',
            pointerEvents: 'auto',
          }}
        >
          <h1
            style={{
              fontSize: '4rem',
              fontWeight: 900,
              margin: 0,
              color: accent,
              textShadow: `0 0 20px ${accent}`,
            }}
          >
            {profile.name}
          </h1>
          <p style={{ fontSize: '1.4rem', margin: '16px 0', opacity: 0.9 }}>{profile.headline}</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Scroll to travel through my journey →</p>
        </div>
      </div>

      {/* Selected Planet Details */}
      {selectedPlanet && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '20px 32px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: `2px solid ${accent}`,
            borderRadius: '8px',
            color: '#FFFFFF',
            fontFamily: 'monospace',
            zIndex: 100,
            maxWidth: '500px',
          }}
        >
          <button
            onClick={() => setSelectedPlanet(null)}
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
          <h3 style={{ margin: 0, color: accent, fontSize: '1.2rem' }}>{selectedPlanet.label}</h3>
          <p style={{ whiteSpace: 'pre-wrap', marginTop: '12px', fontSize: '0.9rem' }}>
            {selectedPlanet.description}
          </p>
        </div>
      )}
    </div>
  );
}
