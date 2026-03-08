'use client';

import type { TemplateProps } from '@/types/template';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box as DreiBox, Sphere, Cylinder } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function Player({ position }: { position: THREE.Vector3 }) {
  return (
    <group position={position}>
      <Sphere args={[0.3, 16, 16]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
      </Sphere>
      <Cylinder args={[0.15, 0.15, 0.5, 16]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#4A90E2" />
      </Cylinder>
    </group>
  );
}

function Collectible({ position, label, onClick }: { position: [number, number, number]; label: string; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <DreiBox ref={meshRef} args={[0.4, 0.4, 0.4]} onClick={onClick}>
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.6} />
      </DreiBox>
      <Text position={[0, 0.6, 0]} fontSize={0.2} color="#FFFFFF" anchorX="center">
        {label}
      </Text>
    </group>
  );
}

export default function GameWorld({ profile, accentColor }: TemplateProps) {
  const [playerPos, setPlayerPos] = useState(new THREE.Vector3(0, 0, 5));
  const [collected, setCollected] = useState<string[]>([]);
  const [message, setMessage] = useState('Use WASD or Arrow Keys to move!');
  const accent = accentColor ?? '#4A90E2';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 0.3;
      setPlayerPos((prev) => {
        const newPos = prev.clone();
        if (e.key === 'w' || e.key === 'ArrowUp') newPos.z -= speed;
        if (e.key === 's' || e.key === 'ArrowDown') newPos.z += speed;
        if (e.key === 'a' || e.key === 'ArrowLeft') newPos.x -= speed;
        if (e.key === 'd' || e.key === 'ArrowRight') newPos.x += speed;
        
        // Bounds
        newPos.x = THREE.MathUtils.clamp(newPos.x, -8, 8);
        newPos.z = THREE.MathUtils.clamp(newPos.z, -8, 8);
        
        return newPos;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const collectibles = [
    ...profile.skills.slice(0, 8).map((skill, idx) => ({
      id: skill,
      position: [Math.cos(idx) * 4, 0.5, Math.sin(idx) * 4] as [number, number, number],
      label: skill,
    })),
  ];

  const handleCollect = (id: string) => {
    if (!collected.includes(id)) {
      setCollected([...collected, id]);
      setMessage(`Collected: ${id}!`);
      setTimeout(() => setMessage('Keep exploring!'), 2000);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a2e', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 8, 10], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} color={accent} />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>

        {/* Grid */}
        <gridHelper args={[20, 20, accent, '#34495e']} />

        {/* Player */}
        <Player position={playerPos} />

        {/* Collectibles */}
        {collectibles
          .filter((c) => !collected.includes(c.id))
          .map((c) => (
            <Collectible key={c.id} {...c} onClick={() => handleCollect(c.id)} />
          ))}

        {/* Border walls */}
        {[
          { pos: [0, 0.5, -8], args: [20, 1, 0.2] },
          { pos: [0, 0.5, 8], args: [20, 1, 0.2] },
          { pos: [-8, 0.5, 0], args: [0.2, 1, 20] },
          { pos: [8, 0.5, 0], args: [0.2, 1, 20] },
        ].map((wall, idx) => (
          <DreiBox key={idx} args={wall.args as [number, number, number]} position={wall.pos as [number, number, number]}>
            <meshStandardMaterial color="#7f8c8d" />
          </DreiBox>
        ))}
      </Canvas>

      {/* HUD */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          color: '#FFFFFF',
          fontFamily: 'monospace',
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: '2rem', margin: 0, color: accent }}>{profile.name}</h1>
        <p style={{ fontSize: '0.9rem', margin: '4px 0', opacity: 0.8 }}>{profile.headline}</p>
        <p style={{ fontSize: '0.8rem', margin: '12px 0 4px', opacity: 0.7 }}>
          Collected: {collected.length}/{collectibles.length}
        </p>
        <p style={{ fontSize: '0.85rem', color: '#FFD700', margin: 0 }}>{message}</p>
      </div>
    </div>
  );
}
