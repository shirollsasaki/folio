'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, PerspectiveCamera, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useState, useCallback } from 'react'
import type { TemplateProps } from '@/types/template'
import type { ProfileData } from '@/types/profile'

const BUBBLE_COLORS = [
  '#E8956A', '#60A5FA', '#34D399', '#A78BFA',
  '#F472B6', '#FBBF24', '#4ADE80', '#F87171',
  '#38BDF8', '#FB923C', '#C084FC', '#2DD4BF',
]

interface BubbleState {
  pos: THREE.Vector3
  vel: THREE.Vector3
  home: THREE.Vector3
}

function buildInitialStates(count: number): BubbleState[] {
  return Array.from({ length: count }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    const r = 3.5 + (i % 3) * 0.8
    const home = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta) * 0.5
    )
    return { pos: home.clone(), vel: new THREE.Vector3(), home: home.clone() }
  })
}

interface BubbleProps {
  skill: string
  color: string
  stateRef: React.RefObject<BubbleState[]>
  index: number
  accent: string
}

function Bubble({ skill, color, stateRef, index, accent }: BubbleProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [active, setActive] = useState(false)

  useFrame(() => {
    const s = stateRef.current[index]
    if (s && meshRef.current) {
      meshRef.current.position.copy(s.pos)
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerDown={() => setActive((v) => !v)}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'auto' }}
    >
      <sphereGeometry args={[active ? 0.55 : 0.38, 20, 20]} />
      <meshStandardMaterial
        color={active ? '#ffffff' : color}
        emissive={color}
        emissiveIntensity={active ? 5 : 1.8}
        roughness={0.1}
        metalness={0.4}
        transparent
        opacity={0.9}
      />
      <Html center distanceFactor={10} zIndexRange={[active ? 200 : 100, active ? 300 : 200]}>
        <div
          style={{
            color: 'white',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            pointerEvents: 'none',
            userSelect: 'none',
            textAlign: 'center',
            transition: 'all 0.2s',
          }}
        >
          <div
            style={{
              fontSize: active ? '0.88rem' : '0.72rem',
              fontWeight: active ? 800 : 600,
              textShadow: `0 0 12px ${color}, 0 0 24px ${color}80`,
              whiteSpace: 'nowrap',
              color: active ? color : 'rgba(255,255,255,0.85)',
            }}
          >
            {skill}
          </div>
          {active && (
            <div
              style={{
                marginTop: 4,
                fontSize: '0.62rem',
                color: accent,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              ✦ active
            </div>
          )}
        </div>
      </Html>
    </mesh>
  )
}

interface PhysicsSceneProps {
  profile: ProfileData
  accent: string
  mouseNDC: React.RefObject<{ x: number; y: number }>
}

function PhysicsScene({ profile, accent, mouseNDC }: PhysicsSceneProps) {
  const { viewport } = useThree()
  const statesRef = useRef<BubbleState[]>(buildInitialStates(profile.skills.length))
  const tempVec = useRef(new THREE.Vector3())

  useFrame(() => {
    const s = statesRef.current
    const mouse = tempVec.current.set(
      mouseNDC.current.x * viewport.width * 0.5,
      mouseNDC.current.y * viewport.height * 0.5,
      0
    )

    for (let i = 0; i < s.length; i++) {
      const b = s[i]

      const spring = b.home.clone().sub(b.pos).multiplyScalar(0.055)
      b.vel.add(spring)

      const toMouse = b.pos.clone().sub(mouse)
      toMouse.z = 0
      const md = toMouse.length()
      if (md < 2.8 && md > 0.001) {
        b.vel.add(toMouse.normalize().multiplyScalar(((2.8 - md) / 2.8) * 0.22))
      }

      for (let j = i + 1; j < s.length; j++) {
        const diff = b.pos.clone().sub(s[j].pos)
        const d = diff.length()
        if (d < 1.0 && d > 0.001) {
          const push = diff.normalize().multiplyScalar((1.0 - d) * 0.07)
          b.vel.add(push)
          s[j].vel.sub(push)
        }
      }

      b.vel.multiplyScalar(0.87)
      b.pos.add(b.vel)
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 11]} fov={60} />
      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.25}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />
      <Stars radius={120} depth={60} count={4000} factor={4} saturation={0} fade speed={0.4} />
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 5]} color={accent} intensity={8} decay={2} />
      <pointLight position={[6, 6, 2]} color="white" intensity={1.5} decay={2} />
      <pointLight position={[-6, -6, 2]} color="#3B82F6" intensity={1} decay={2} />

      <Float speed={0.5} floatIntensity={0.2} position={[0, 0, -1]}>
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.5}
            transparent
            opacity={0.12}
            wireframe
          />
        </mesh>
      </Float>

      {profile.skills.map((skill, i) => (
        <Bubble
          key={skill}
          skill={skill}
          color={BUBBLE_COLORS[i % BUBBLE_COLORS.length]}
          stateRef={statesRef}
          index={i}
          accent={accent}
        />
      ))}

      <Html center position={[0, 0, 0]} zIndexRange={[0, 50]}>
        <div
          style={{
            textAlign: 'center',
            color: 'white',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              textShadow: `0 0 30px ${accent}`,
              lineHeight: 1.2,
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: '0.72rem', opacity: 0.45, marginTop: 6, maxWidth: '200px', lineHeight: 1.5 }}>
            {profile.headline.length > 60 ? profile.headline.slice(0, 60) + '…' : profile.headline}
          </div>
        </div>
      </Html>
    </>
  )
}

export default function PhysicsBubbles({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#E8956A'
  const mouseNDC = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseNDC.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseNDC.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }, [])

  const socialLinks = [
    profile.linkedin_url ? { label: 'LinkedIn', url: profile.linkedin_url } : null,
    profile.github_url ? { label: 'GitHub', url: profile.github_url } : null,
    profile.twitter_url ? { label: 'Twitter', url: profile.twitter_url } : null,
    profile.website_url ? { label: 'Website', url: profile.website_url } : null,
    ...profile.custom_links,
  ].filter((l): l is { label: string; url: string } => l !== null && Boolean(l.url))

  return (
    <div
      role="application"
      aria-label={`${profile.name} skills portfolio`}
      onMouseMove={handleMouseMove}
      style={{
        width: '100%',
        height: '100vh',
        background: 'radial-gradient(ellipse at center, #0a0a16 0%, #020205 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <PhysicsScene profile={profile} accent={accent} mouseNDC={mouseNDC} />
      </Canvas>

      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 22,
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
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.78rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = accent }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.18)',
          fontSize: '0.65rem',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        Move cursor to repel · Click to highlight
      </div>

      {profile.experience.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            zIndex: 20,
            maxWidth: '220px',
          }}
        >
          {profile.experience.map((exp) => (
            <div
              key={`${exp.title}-${exp.company}`}
              style={{
                marginBottom: 10,
                color: 'white',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>{exp.title}</div>
              <div style={{ fontSize: '0.68rem', opacity: 0.45, marginTop: 1 }}>{exp.company}</div>
              <div style={{ fontSize: '0.62rem', color: accent, opacity: 0.7, marginTop: 1 }}>{exp.dates}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
