'use client';

import type { TemplateProps } from '@/types/template';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function ShaderBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      float dist = length(uv);
      float angle = atan(uv.y, uv.x);
      
      float pattern = sin(dist * 10.0 - uTime) * cos(angle * 8.0 + uTime * 0.5);
      vec3 color1 = vec3(0.2, 0.5, 1.0);
      vec3 color2 = vec3(1.0, 0.3, 0.8);
      vec3 finalColor = mix(color1, color2, pattern * 0.5 + 0.5);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
      />
    </mesh>
  );
}

export default function ShaderArt({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#00D9FF';

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Shader Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ShaderBackground />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '40px',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          backdropFilter: 'blur(2px)',
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 900,
            margin: 0,
            textShadow: '0 0 40px rgba(0,217,255,0.8)',
          }}
        >
          {profile.name}
        </h1>
        <p style={{ fontSize: '1.5rem', margin: '16px 0', opacity: 0.9, maxWidth: '600px' }}>
          {profile.headline}
        </p>

        {/* Skills Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
            maxWidth: '800px',
            marginTop: '40px',
          }}
        >
          {profile.skills.slice(0, 12).map((skill) => (
            <div
              key={skill}
              style={{
                padding: '12px 20px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: `2px solid ${accent}`,
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 600,
                boxShadow: `0 0 20px rgba(0,217,255,0.3)`,
              }}
            >
              {skill}
            </div>
          ))}
        </div>

        {/* Experience */}
        <div style={{ marginTop: '60px', maxWidth: '700px' }}>
          {profile.experience.slice(0, 3).map((exp, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '24px',
                padding: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                border: `1px solid ${accent}`,
                borderRadius: '12px',
                textAlign: 'left',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: accent }}>{exp.company}</h3>
              <p style={{ margin: '6px 0 4px', fontSize: '1rem' }}>{exp.title}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>{exp.dates}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
