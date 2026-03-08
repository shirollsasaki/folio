'use client';

import type { TemplateProps } from '@/types/template';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Cylinder, OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface IslandProps {
  position: [number, number, number];
  color: string;
  title: string;
  content: string[];
  onClick: () => void;
}

function Island({ position, color, title, content, onClick }: IslandProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Island Base */}
      <Cylinder
        args={[1.5, 1.2, 0.5, 32]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={hovered ? '#FFD700' : color} roughness={0.7} />
      </Cylinder>
      
      {/* Grass Top */}
      <Cylinder args={[1.5, 1.5, 0.1, 32]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#2ECC71" />
      </Cylinder>

      {/* Title */}
      <Text position={[0, 1, 0]} fontSize={0.3} color="#FFFFFF" anchorX="center">
        {title}
      </Text>

      {/* Content items as small cubes */}
      {content.slice(0, 3).map((item, idx) => (
        <Box key={idx} args={[0.2, 0.2, 0.2]} position={[Math.cos(idx * 2) * 0.8, 0.4, Math.sin(idx * 2) * 0.8]}>
          <meshStandardMaterial color="#E74C3C" emissive="#E74C3C" emissiveIntensity={0.3} />
        </Box>
      ))}
    </group>
  );
}

export default function FloatingIslands({ profile, accentColor }: TemplateProps) {
  const [selectedIsland, setSelectedIsland] = useState<any>(null);
  const accent = accentColor ?? '#3498DB';

  const islands = [
    {
      id: 'about',
      position: [0, 2, 0] as [number, number, number],
      color: accent,
      title: 'About',
      content: [profile.headline, profile.location || ''],
    },
    {
      id: 'skills',
      position: [-4, 1, -2] as [number, number, number],
      color: '#9B59B6',
      title: 'Skills',
      content: profile.skills,
    },
    {
      id: 'experience',
      position: [4, 1.5, -2] as [number, number, number],
      color: '#E67E22',
      title: 'Experience',
      content: profile.experience.map((e) => e.company),
    },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#87CEEB', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 3, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, 5, -5]} intensity={0.5} color="#FFD700" />

        {/* Sky box effect */}
        <mesh scale={100}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#87CEEB" side={THREE.BackSide} />
        </mesh>

        {islands.map((island) => (
          <Island
            key={island.id}
            position={island.position}
            color={island.color}
            title={island.title}
            content={island.content}
            onClick={() => setSelectedIsland(island)}
          />
        ))}

        <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={4} maxDistance={15} />
      </Canvas>

      {/* Header */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          left: '24px',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
          zIndex: 10,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>{profile.name}</h1>
        <p style={{ fontSize: '1rem', margin: '4px 0', opacity: 0.9 }}>{profile.headline}</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Explore floating islands of my work</p>
      </div>

      {/* Selected Island Details */}
      {selectedIsland && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: `3px solid ${selectedIsland.color}`,
            borderRadius: '12px',
            color: '#333',
            fontFamily: 'sans-serif',
            maxWidth: '320px',
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setSelectedIsland(null)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              color: selectedIsland.color,
              fontSize: '1.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            ×
          </button>
          <h3 style={{ margin: 0, color: selectedIsland.color, fontSize: '1.4rem' }}>
            {selectedIsland.title}
          </h3>
          <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
            {selectedIsland.content.slice(0, 5).map((item: string, idx: number) => (
              <li key={idx} style={{ marginBottom: '6px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
