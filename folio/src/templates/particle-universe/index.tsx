'use client';

import type { TemplateProps } from '@/types/template';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere, OrbitControls } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

interface ParticleProps {
  position: THREE.Vector3;
  color: string;
  label: string;
  size: number;
  onClick: () => void;
}

function Particle({ position, color, label, size, onClick }: ParticleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.x = position.x + Math.sin(time + position.x) * 0.3;
      meshRef.current.position.y = position.y + Math.cos(time + position.y) * 0.3;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <Sphere
        ref={meshRef}
        args={[size, 16, 16]}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          transparent
          opacity={hovered ? 1 : 0.7}
        />
      </Sphere>
      {hovered && (
        <Text
          position={[position.x, position.y + size + 0.5, position.z]}
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
        >
          {label}
        </Text>
      )}
    </group>
  );
}

export default function ParticleUniverse({ profile, accentColor }: TemplateProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const accent = accentColor ?? '#FF00FF';

  const particles = useMemo(() => {
    return profile.skills.map((skill, idx) => {
      const angle = (idx / profile.skills.length) * Math.PI * 2;
      const radius = 5 + Math.random() * 3;
      const height = (Math.random() - 0.5) * 6;
      
      return {
        id: skill,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ),
        color: `hsl(${(idx / profile.skills.length) * 360}, 70%, 60%)`,
        label: skill,
        size: 0.3 + Math.random() * 0.3,
      };
    });
  }, [profile.skills]);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000000', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color={accent} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FFFF" />

        {/* Particle Field */}
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            position={particle.position}
            color={particle.color}
            label={particle.label}
            size={particle.size}
            onClick={() => setSelectedSkill(particle.label)}
          />
        ))}

        {/* Removed connection lines for build stability */}

        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {/* HUD */}
      <div
        style={{
          position: 'fixed',
          top: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 900,
            margin: 0,
            color: accent,
            textShadow: `0 0 30px ${accent}`,
          }}
        >
          {profile.name}
        </h1>
        <p style={{ fontSize: '1.2rem', margin: '8px 0', opacity: 0.8 }}>{profile.headline}</p>
        <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>
          Click skills • Drag to rotate • Each particle represents a skill
        </p>
      </div>

      {/* Selected Skill */}
      {selectedSkill && (
        <div
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '16px 32px',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: `2px solid ${accent}`,
            borderRadius: '12px',
            color: '#FFFFFF',
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setSelectedSkill(null)}
            style={{
              position: 'absolute',
              top: '4px',
              right: '8px',
              background: 'none',
              border: 'none',
              color: accent,
              fontSize: '1.4rem',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
          <strong style={{ color: accent }}>{selectedSkill}</strong>
        </div>
      )}
    </div>
  );
}
