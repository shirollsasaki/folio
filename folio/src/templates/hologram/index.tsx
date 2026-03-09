'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useState, useEffect, useCallback } from 'react'
import type { TemplateProps } from '@/types/template'
import type { ProfileData } from '@/types/profile'

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

function useGlitch(text: string): string {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    const triggerGlitch = () => {
      let frame = 0
      const scramble = setInterval(() => {
        if (frame > 9) {
          clearInterval(scramble)
          setDisplay(text)
          return
        }
        setDisplay(
          text.split('').map((c) =>
            c === ' ' ? ' ' : frame < 6 && Math.random() > 0.55
              ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              : c
          ).join('')
        )
        frame++
      }, 55)
    }

    const interval = setInterval(triggerGlitch, 3800)
    triggerGlitch()
    return () => clearInterval(interval)
  }, [text])

  return display
}

function WireframeSphere({ accent }: { accent: string }) {
  const outerRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    outerRef.current.rotation.y = t * 0.22
    outerRef.current.rotation.x = Math.sin(t * 0.15) * 0.2
    innerRef.current.rotation.y = -t * 0.35
    innerRef.current.rotation.z = t * 0.18
    ringRef.current.rotation.z = t * 0.12
    const pulse = 1 + Math.sin(t * 2) * 0.04
    outerRef.current.scale.setScalar(pulse)
  })

  return (
    <group position={[0, 0.5, 0]}>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.6, 3]} />
        <meshStandardMaterial
          wireframe
          color={accent}
          emissive={accent}
          emissiveIntensity={1.8}
        />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.0, 2]} />
        <meshStandardMaterial
          wireframe
          color={accent}
          emissive={accent}
          emissiveIntensity={1.2}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={ringRef} rotation-x={Math.PI / 2}>
        <torusGeometry args={[2.0, 0.02, 6, 80]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} />
      </mesh>
      <mesh rotation-x={Math.PI / 4}>
        <torusGeometry args={[1.7, 0.015, 6, 80]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.5} transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function HologramScene({ profile, accent, mouse }: { profile: ProfileData; accent: string; mouse: React.RefObject<{ x: number; y: number }> }) {
  const sceneGroupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    const m = mouse.current
    sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.y, m.x * 0.18, 0.04)
    sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.x, -m.y * 0.12, 0.04)
  })

  const socialLinks = [
    profile.linkedin_url ? { label: 'LinkedIn', url: profile.linkedin_url } : null,
    profile.github_url ? { label: 'GitHub', url: profile.github_url } : null,
    profile.twitter_url ? { label: 'Twitter', url: profile.twitter_url } : null,
    profile.website_url ? { label: 'Website', url: profile.website_url } : null,
    ...profile.custom_links,
  ].filter((l): l is { label: string; url: string } => l !== null && Boolean(l.url))

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.5, 8]} fov={55} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.65}
      />
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 3, 3]} color={accent} intensity={10} decay={2} />
      <pointLight position={[-6, 2, -4]} color="#00ffff" intensity={3} decay={2} />
      <pointLight position={[6, -1, -4]} color="#8B5CF6" intensity={2} decay={2} />

      <Grid
        position={[0, -1.8, 0]}
        cellSize={0.6}
        cellThickness={0.4}
        cellColor={`${accent}60`}
        sectionSize={3}
        sectionThickness={0.8}
        sectionColor={`${accent}90`}
        fadeDistance={22}
        fadeStrength={1.5}
        infiniteGrid
      />

      <group ref={sceneGroupRef}>
        <WireframeSphere accent={accent} />

        <Html position={[-4.2, 1.2, 0]} distanceFactor={9} zIndexRange={[10, 50]}>
          <HoloPanelBio profile={profile} accent={accent} />
        </Html>

        <Html position={[4.2, 1.2, 0]} distanceFactor={9} zIndexRange={[10, 50]}>
          <HoloPanelSkills profile={profile} accent={accent} />
        </Html>

        <Html position={[0, -1.6, 2.5]} distanceFactor={9} zIndexRange={[10, 50]}>
          <HoloPanelExp profile={profile} accent={accent} />
        </Html>
      </group>

      <Html position={[0, -1.5, 4.5]} center distanceFactor={8} zIndexRange={[60, 100]}>
        <div style={{ display: 'flex', gap: 18, pointerEvents: 'all' }}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: accent,
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                border: `1px solid ${accent}55`,
                padding: '5px 14px',
                borderRadius: '4px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}22` }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </Html>
    </>
  )
}

function HoloPanelBio({ profile, accent }: { profile: ProfileData; accent: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '260px',
        background: `rgba(0,0,0,0.82)`,
        border: `1px solid ${hovered ? accent : `${accent}45`}`,
        borderRadius: '4px',
        padding: '22px 24px',
        color: accent,
        fontFamily: 'monospace',
        textAlign: 'left',
        cursor: 'default',
        boxShadow: hovered ? `0 0 30px ${accent}30, inset 0 0 30px ${accent}08` : `0 0 15px ${accent}18`,
        transition: 'all 0.3s ease',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', marginBottom: 14, opacity: 0.6 }}>▸ ABOUT.EXE</div>
      <div style={{ fontSize: '0.82rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.8)' }}>
        {profile.bio.length > 160 ? profile.bio.slice(0, 160) + '…' : profile.bio}
      </div>
      {profile.location && (
        <div style={{ marginTop: 16, fontSize: '0.68rem', opacity: 0.5, letterSpacing: '0.08em' }}>
          LOC: {profile.location.toUpperCase()}
        </div>
      )}
    </button>
  )
}

function HoloPanelSkills({ profile, accent }: { profile: ProfileData; accent: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '240px',
        background: 'rgba(0,0,0,0.82)',
        border: `1px solid ${hovered ? accent : `${accent}45`}`,
        borderRadius: '4px',
        padding: '22px 24px',
        color: accent,
        fontFamily: 'monospace',
        textAlign: 'left',
        cursor: 'default',
        boxShadow: hovered ? `0 0 30px ${accent}30, inset 0 0 30px ${accent}08` : `0 0 15px ${accent}18`,
        transition: 'all 0.3s ease',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', marginBottom: 14, opacity: 0.6 }}>▸ SKILLS.LOG</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {profile.skills.map((skill, i) => (
          <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: `${60 + ((i * 23) % 38)}%`, height: '3px', background: `linear-gradient(90deg, ${accent}, transparent)`, borderRadius: '2px', opacity: 0.7 }} />
            <span style={{ fontSize: '0.72rem', opacity: 0.85 }}>{skill}</span>
          </div>
        ))}
      </div>
    </button>
  )
}

function HoloPanelExp({ profile, accent }: { profile: ProfileData; accent: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '480px',
        background: 'rgba(0,0,0,0.82)',
        border: `1px solid ${hovered ? accent : `${accent}45`}`,
        borderRadius: '4px',
        padding: '20px 26px',
        color: accent,
        fontFamily: 'monospace',
        textAlign: 'left',
        cursor: 'default',
        boxShadow: hovered ? `0 0 30px ${accent}30, inset 0 0 30px ${accent}08` : `0 0 15px ${accent}18`,
        transition: 'all 0.3s ease',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', marginBottom: 14, opacity: 0.6 }}>▸ CAREER.DB</div>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          {profile.experience.map((exp) => (
            <div key={`${exp.title}-${exp.company}`} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${accent}20` }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'white' }}>{exp.title}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: 2 }}>{exp.company}</div>
              <div style={{ fontSize: '0.63rem', color: accent, marginTop: 4, opacity: 0.75 }}>{exp.dates}</div>
            </div>
          ))}
        </div>
        {profile.projects && profile.projects.length > 0 && (
          <div style={{ flex: 1, borderLeft: `1px solid ${accent}20`, paddingLeft: 20 }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', marginBottom: 12, opacity: 0.6 }}>PROJECTS</div>
            {profile.projects.slice(0, 2).map((proj) => (
              <div key={proj.name} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'white' }}>{proj.name}</div>
                <div style={{ fontSize: '0.68rem', opacity: 0.55, marginTop: 3, lineHeight: 1.5 }}>
                  {proj.description.length > 70 ? proj.description.slice(0, 70) + '…' : proj.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </button>
  )
}

export default function Hologram({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#00E5FF'
  const glitchedName = useGlitch(profile.name)
  const mouseRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }, [])

  return (
    <div
      role="application"
      aria-label={`${profile.name} hologram portfolio`}
      onMouseMove={handleMouseMove}
      style={{ width: '100%', height: '100vh', background: '#000000', position: 'relative', overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,255,0.02) 3px, rgba(0,229,255,0.02) 4px)',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 20,
          pointerEvents: 'none',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: accent,
            textShadow: `0 0 30px ${accent}, 0 0 60px ${accent}80, 0 0 100px ${accent}40`,
            userSelect: 'none',
          }}
        >
          {glitchedName.toUpperCase()}
        </div>
        <div style={{ fontSize: '0.78rem', color: `${accent}90`, letterSpacing: '0.22em', marginTop: 6 }}>
          {profile.headline.toUpperCase().slice(0, 55)}
        </div>
      </div>

      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <HologramScene profile={profile} accent={accent} mouse={mouseRef} />
      </Canvas>

      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 24,
          fontFamily: 'monospace',
          fontSize: '0.6rem',
          color: `${accent}40`,
          letterSpacing: '0.12em',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        SYS:ONLINE · DRAG TO ROTATE
      </div>
    </div>
  )
}
