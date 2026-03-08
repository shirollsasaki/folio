'use client';

import type { TemplateProps } from '@/types/template';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box as DreiBox } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function FloatingTerminal({ position, text, color }: { position: [number, number, number]; text: string; color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <DreiBox args={[2, 1.5, 0.1]}>
        <meshStandardMaterial color="#0a0a0a" />
      </DreiBox>
      <Text position={[0, 0, 0.06]} fontSize={0.12} color={color} anchorX="center" maxWidth={1.8} textAlign="left">
        {text}
      </Text>
      <DreiBox args={[2.1, 1.6, 0.05]} position={[0, 0, -0.03]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </DreiBox>
    </group>
  );
}

export default function Terminal3D({ profile, accentColor }: TemplateProps) {
  const [typedText, setTypedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const accent = accentColor ?? '#00FF00';

  const lines = [
    `$ whoami`,
    `> ${profile.name}`,
    `$ cat about.txt`,
    `> ${profile.headline}`,
    `$ ls skills/`,
    `> ${profile.skills.slice(0, 5).join(' • ')}`,
    `$ cat experience.log`,
    ...profile.experience.slice(0, 2).map((exp) => `> ${exp.company} - ${exp.title}`),
  ];

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const text = lines[currentLine];
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex < text.length) {
        setTypedText((prev) => prev + text[charIndex]);
        charIndex++;
      } else {
        setTypedText((prev) => prev + '\n');
        setCurrentLine((c) => c + 1);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentLine, lines]);

  const terminals = [
    { position: [-3, 2, -2] as [number, number, number], text: `${profile.name}\n\n${profile.headline}`, color: accent },
    { position: [3, 1, -3] as [number, number, number], text: `SKILLS:\n${profile.skills.slice(0, 4).join('\n')}`, color: '#00D9FF' },
    { position: [0, 3, -5] as [number, number, number], text: `EXPERIENCE:\n${profile.experience.slice(0, 2).map((e) => e.company).join('\n')}`, color: '#FF6B6B' },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000000', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color={accent} />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#FF6B6B" />

        {terminals.map((term, idx) => (
          <FloatingTerminal key={idx} {...term} />
        ))}

        {/* Grid floor */}
        <gridHelper args={[20, 20, accent, '#111111']} position={[0, -2, 0]} />
      </Canvas>

      {/* Main Terminal Overlay */}
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100%',
          padding: '24px',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          borderTop: `2px solid ${accent}`,
          color: accent,
          fontFamily: "'Courier New', monospace",
          fontSize: '0.95rem',
          zIndex: 10,
          maxHeight: '40vh',
          overflowY: 'auto',
          boxShadow: `0 -4px 20px ${accent}44`,
        }}
      >
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{typedText}_</pre>
      </div>

      {/* Top HUD */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: '#FFFFFF',
          fontFamily: 'monospace',
          zIndex: 10,
        }}
      >
        <p style={{ fontSize: '0.85rem', margin: 0, opacity: 0.7 }}>
          3D Terminal Environment • Drag to rotate
        </p>
      </div>
    </div>
  );
}
