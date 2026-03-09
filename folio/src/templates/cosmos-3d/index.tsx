'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, Html, OrbitControls, PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import type { TemplateProps } from '@/types/template'
import type { ProfileData, Experience } from '@/types/profile'

function getOrbitPosition(index: number, total: number): [number, number, number] {
  const angle = (index / Math.max(total, 1)) * Math.PI * 2
  const radius = 3.8
  const y = Math.sin(index * 1.4) * 2
  return [Math.cos(angle) * radius, y, Math.sin(angle) * radius]
}

const SKILL_COLORS = [
  '#E8956A', '#60A5FA', '#34D399', '#A78BFA',
  '#F472B6', '#FBBF24', '#4ADE80', '#F87171',
]

// --- Central glowing star ---
function CentralStar({ name, headline, accent }: { name: string; headline: string; accent: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08
  })

  return (
    <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.15}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <MeshDistortMaterial
          color={accent}
          distort={0.38}
          speed={2.5}
          emissive={accent}
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      <Html center position={[0, 2.8, 0]} zIndexRange={[0, 100]}>
        <div
          style={{
            textAlign: 'center',
            color: 'white',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            userSelect: 'none',
            pointerEvents: 'none',
            width: '320px',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 6,
              textShadow: `0 0 30px ${accent}, 0 0 60px ${accent}80`,
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: '0.85rem', opacity: 0.65, fontWeight: 400, lineHeight: 1.4 }}>
            {headline}
          </div>
        </div>
      </Html>
    </Float>
  )
}

// --- Orbiting skill node ---
interface SkillSphereProps {
  skill: string
  position: [number, number, number]
  color: string
  orbitSpeed: number
}

function SkillSphere({ skill, position, color, orbitSpeed }: SkillSphereProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * orbitSpeed
  })

  return (
    <group ref={groupRef}>
      <mesh
        position={position}
        scale={hovered ? 1.7 : 1}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <sphereGeometry args={[0.28, 20, 20]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : color}
          emissive={color}
          emissiveIntensity={hovered ? 4 : 1.2}
          roughness={0.1}
          metalness={0.9}
        />
        {hovered && (
          <Html center distanceFactor={9} zIndexRange={[100, 200]}>
            <div
              style={{
                background: 'rgba(0,0,0,0.92)',
                border: `1px solid ${color}`,
                color: 'white',
                padding: '6px 14px',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                fontSize: '13px',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 600,
                boxShadow: `0 0 16px ${color}80`,
                pointerEvents: 'none',
              }}
            >
              {skill}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  )
}

// --- Floating experience card ---
interface ExpCardProps {
  exp: Experience
  position: [number, number, number]
  accent: string
}

function ExperienceCard({ exp, position, accent }: ExpCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Html position={position} distanceFactor={10} center zIndexRange={[50, 150]}>
      <button
        type="button"
        style={{
          background: hovered ? 'rgba(18,18,28,0.97)' : 'rgba(10,10,20,0.88)',
          border: `1px solid ${hovered ? accent : 'rgba(255,255,255,0.12)'}`,
          borderRadius: '14px',
          padding: '16px 20px',
          color: 'white',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          width: '195px',
          transition: 'all 0.25s ease',
          cursor: 'default',
          backdropFilter: 'blur(12px)',
          boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.6), 0 0 20px ${accent}30` : '0 4px 20px rgba(0,0,0,0.4)',
          transform: hovered ? 'scale(1.06) translateY(-3px)' : 'scale(1)',
          textAlign: 'left',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ fontSize: '0.65rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6, fontWeight: 700 }}>
          {exp.dates}
        </div>
        <div style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: 3, lineHeight: 1.3 }}>
          {exp.title}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#9CA3AF', fontWeight: 500 }}>
          {exp.company}
        </div>
      </button>
    </Html>
  )
}

// --- Inner 3D scene (must live inside Canvas) ---
const EXP_POSITIONS: [number, number, number][] = [
  [-5, 2, -2.5],
  [4.5, -1.5, -3],
  [-4, -2.5, -1.5],
  [5, 2.5, -4],
  [-5.5, 1, -4],
]

function CosmosScene({ profile, accent }: { profile: ProfileData; accent: string }) {
  return (
    <>
      <fog attach="fog" args={['#000000', 9, 40]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} color={accent} intensity={12} decay={2} />
      <pointLight position={[12, 8, 8]} color="white" intensity={0.8} decay={2} />
      <pointLight position={[-12, -8, -8]} color="#3B82F6" intensity={0.4} decay={2} />

      <Stars radius={160} depth={90} count={6000} factor={4} saturation={0} fade speed={0.4} />

      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={58} />
      <OrbitControls
        enableDamping
        dampingFactor={0.04}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />

      <CentralStar name={profile.name} headline={profile.headline} accent={accent} />

      {profile.skills.map((skill, i) => (
        <SkillSphere
          key={skill}
          skill={skill}
          position={getOrbitPosition(i, profile.skills.length)}
          color={SKILL_COLORS[i % SKILL_COLORS.length]}
          orbitSpeed={0.07 + i * 0.015}
        />
      ))}

      {profile.experience.slice(0, 5).map((exp, i) => (
        <ExperienceCard
          key={`${exp.company}-${i}`}
          exp={exp}
          position={EXP_POSITIONS[i] ?? [0, 4, -3]}
          accent={accent}
        />
      ))}
    </>
  )
}

// --- Main exported template ---
export default function CosmosTemplate({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#E8956A'

  const socialLinks = [
    profile.linkedin_url ? { label: 'LinkedIn', url: profile.linkedin_url } : null,
    profile.github_url ? { label: 'GitHub', url: profile.github_url } : null,
    profile.twitter_url ? { label: 'Twitter', url: profile.twitter_url } : null,
    profile.website_url ? { label: 'Website', url: profile.website_url } : null,
    ...profile.custom_links,
  ].filter((l): l is { label: string; url: string } => l !== null && Boolean(l.url))

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#000000', position: 'relative', overflow: 'hidden' }}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <CosmosScene profile={profile} accent={accent} />
      </Canvas>

      {/* Social links overlay */}
      {socialLinks.length > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 24,
            zIndex: 20,
          }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.8rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = accent }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Location badge */}
      {profile.location && (
        <div
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.75rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            letterSpacing: '0.05em',
            zIndex: 20,
          }}
        >
          📍 {profile.location}
        </div>
      )}
    </div>
  )
}
