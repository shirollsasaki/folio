'use client';

import type { TemplateProps } from '@/types/template';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere, Box as DreiBox } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function BouncingSkill({ position, skill, color }: { position: THREE.Vector3; skill: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocity = useRef(new THREE.Vector3((Math.random() - 0.5) * 0.1, Math.random() * 0.1, (Math.random() - 0.5) * 0.1));
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      // Apply velocity
      meshRef.current.position.add(velocity.current);

      // Bounce off walls
      const bounds = 5;
      if (Math.abs(meshRef.current.position.x) > bounds) velocity.current.x *= -0.9;
      if (Math.abs(meshRef.current.position.y) > bounds) velocity.current.y *= -0.9;
      if (Math.abs(meshRef.current.position.z) > bounds) velocity.current.z *= -0.9;

      // Gravity
      velocity.current.y -= 0.001;

      // Ground bounce
      if (meshRef.current.position.y < -4) {
        meshRef.current.position.y = -4;
        velocity.current.y = Math.abs(velocity.current.y) * 0.8;
      }

      // Rotation
      meshRef.current.rotation.x += velocity.current.x;
      meshRef.current.rotation.y += velocity.current.y;
    }
  });

  return (
    <group>
      <Sphere
        ref={meshRef}
        args={[0.4, 16, 16]}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </Sphere>
      {hovered && meshRef.current && (
        <Text
          position={[meshRef.current.position.x, meshRef.current.position.y + 0.8, meshRef.current.position.z]}
          fontSize={0.2}
          color="#FFFFFF"
          anchorX="center"
        >
          {skill}
        </Text>
      )}
    </group>
  );
}

export default function PhysicsPlayground({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#E74C3C';

  const skills = profile.skills.slice(0, 15).map((skill, idx) => ({
    skill,
    position: new THREE.Vector3((Math.random() - 0.5) * 8, Math.random() * 5, (Math.random() - 0.5) * 8),
    color: `hsl(${(idx / profile.skills.length) * 360}, 75%, 60%)`,
  }));

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a2e', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color={accent} />
        <pointLight position={[-10, -5, -10]} intensity={0.5} color="#00D9FF" />

        {/* Ground */}
        <DreiBox args={[20, 0.5, 20]} position={[0, -4.25, 0]}>
          <meshStandardMaterial color="#0F3460" />
        </DreiBox>

        {/* Walls */}
        <DreiBox args={[20, 10, 0.5]} position={[0, 0, -5]}>
          <meshStandardMaterial color="#0F3460" transparent opacity={0.3} />
        </DreiBox>
        <DreiBox args={[20, 10, 0.5]} position={[0, 0, 5]}>
          <meshStandardMaterial color="#0F3460" transparent opacity={0.3} />
        </DreiBox>
        <DreiBox args={[0.5, 10, 20]} position={[-5, 0, 0]}>
          <meshStandardMaterial color="#0F3460" transparent opacity={0.3} />
        </DreiBox>
        <DreiBox args={[0.5, 10, 20]} position={[5, 0, 0]}>
          <meshStandardMaterial color="#0F3460" transparent opacity={0.3} />
        </DreiBox>

        {/* Bouncing Skills */}
        {skills.map((s, idx) => (
          <BouncingSkill key={idx} position={s.position} skill={s.skill} color={s.color} />
        ))}
      </Canvas>

      {/* HUD */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          left: '24px',
          color: '#FFFFFF',
          fontFamily: 'monospace',
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, color: accent }}>{profile.name}</h1>
        <p style={{ fontSize: '1rem', margin: '8px 0', opacity: 0.8 }}>{profile.headline}</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Skills bouncing with physics • Hover to reveal</p>
      </div>
    </div>
  );
}
