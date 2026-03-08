'use client';

import type { TemplateProps } from '@/types/template';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function Layer({ z, color, text, scrollProgress }: { z: number; color: string; text: string; scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && meshRef.current.material) {
      meshRef.current.position.z = z + scrollProgress * (z * -2);
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material.opacity !== undefined) {
        material.opacity = 1 - Math.abs(scrollProgress - (z / 10)) * 2;
      }
    }
  });

  return (
    <group>
      <Box ref={meshRef} args={[8, 4, 0.1]} position={[0, 0, z]}>
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </Box>
      <Text position={[0, 0, z + 0.1]} fontSize={0.5} color="#FFFFFF" anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  );
}

export default function ScrollDepth({ profile, accentColor }: TemplateProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const accent = accentColor ?? '#FF6B6B';

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const layers = [
    { z: -2, color: accent, text: profile.name },
    { z: -4, color: '#3498DB', text: profile.headline },
    ...profile.experience.slice(0, 3).map((exp, idx) => ({
      z: -6 - idx * 2,
      color: `hsl(${idx * 60}, 70%, 60%)`,
      text: `${exp.company} - ${exp.title}`,
    })),
    { z: -14, color: '#2ECC71', text: 'Skills: ' + profile.skills.slice(0, 3).join(', ') },
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* Fixed 3D Canvas */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          {layers.map((layer, idx) => (
            <Layer key={idx} {...layer} scrollProgress={scrollProgress} />
          ))}
        </Canvas>
      </div>

      {/* Scrollable spacer */}
      <div style={{ position: 'relative', zIndex: 1, height: '500vh', pointerEvents: 'none' }}>
        <div
          style={{
            position: 'sticky',
            top: '50%',
            transform: 'translateY(-50%)',
            textAlign: 'center',
            color: '#FFFFFF',
            fontFamily: 'sans-serif',
            padding: '20px',
          }}
        >
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Scroll to dive deeper →</p>
        </div>
      </div>
    </div>
  );
}
