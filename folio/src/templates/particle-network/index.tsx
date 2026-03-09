'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, PerspectiveCamera, Line } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { TemplateProps } from '@/types/template'
import type { ProfileData } from '@/types/profile'

const NODE_COLORS = ['#00FF88', '#00CCFF', '#FF6B6B', '#FFD93D', '#C77DFF', '#FF9A3C', '#4ECDC4', '#45B7D1']

interface NodeData {
  id: string
  label: string
  sublabel: string
  position: [number, number, number]
  color: string
  size: number
  type: 'center' | 'skill' | 'exp'
}

interface NetworkNodeProps {
  node: NodeData
  accent: string
  onClick: (id: string) => void
  isActive: boolean
}

function NetworkNode({ node, accent, onClick, isActive }: NetworkNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime
      meshRef.current.scale.setScalar(
        node.size * (1 + Math.sin(t * 2 + node.position[0]) * 0.06) * (isActive ? 1.4 : hovered ? 1.2 : 1)
      )
    }
  })

  const emissiveIntensity = isActive ? 3 : hovered ? 2 : 0.8

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick(node.id)
        }}
      >
        <sphereGeometry args={[node.size, 20, 20]} />
        <meshStandardMaterial
          color={node.type === 'center' ? accent : node.color}
          emissive={node.type === 'center' ? accent : node.color}
          emissiveIntensity={emissiveIntensity}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={isActive ? 1 : hovered ? 0.95 : 0.85}
        />
      </mesh>

      {(hovered || isActive) && (
        <Html center distanceFactor={8} zIndexRange={[50, 200]}>
          <div
            style={{
              background: 'rgba(5,5,15,0.95)',
              border: `1px solid ${node.color}`,
              borderRadius: '10px',
              padding: '10px 16px',
              color: 'white',
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: `0 0 20px ${node.color}60`,
              minWidth: '120px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 2 }}>{node.label}</div>
            {node.sublabel && (
              <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>{node.sublabel}</div>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}

interface ConnectionLineProps {
  from: [number, number, number]
  to: [number, number, number]
  color: string
  opacity: number
}

function ConnectionLine({ from, to, color, opacity }: ConnectionLineProps) {
  const points = useMemo(
    () => [new THREE.Vector3(...from), new THREE.Vector3(...to)],
    [from, to]
  )
  return (
    <Line points={points} color={color} transparent opacity={opacity} lineWidth={1} />
  )
}

interface BackgroundParticlesProps {
  count: number
  accent: string
}

function BackgroundParticles({ count, accent }: BackgroundParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!)

  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    return { positions: pos }
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={accent} size={0.03} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function buildNodes(profile: ProfileData): NodeData[] {
  const nodes: NodeData[] = [
    {
      id: 'center',
      label: profile.name,
      sublabel: profile.headline.slice(0, 40),
      position: [0, 0, 0],
      color: '#FFFFFF',
      size: 0.55,
      type: 'center',
    },
  ]

  profile.skills.slice(0, 8).forEach((skill, i) => {
    const angle = (i / Math.min(profile.skills.length, 8)) * Math.PI * 2
    const r = 3.2
    nodes.push({
      id: `skill-${i}`,
      label: skill,
      sublabel: '',
      position: [Math.cos(angle) * r, Math.sin(angle) * r * 0.6, Math.sin(angle * 1.3) * 1.2],
      color: NODE_COLORS[i % NODE_COLORS.length],
      size: 0.22,
      type: 'skill',
    })
  })

  profile.experience.slice(0, 4).forEach((exp, i) => {
    const angle = (i / Math.min(profile.experience.length, 4)) * Math.PI * 2 + Math.PI * 0.25
    const r = 5.5
    nodes.push({
      id: `exp-${i}`,
      label: exp.company,
      sublabel: `${exp.title} · ${exp.dates}`,
      position: [Math.cos(angle) * r, Math.sin(angle) * r * 0.5, Math.cos(angle * 0.7) * 1.5],
      color: '#60A5FA',
      size: 0.32,
      type: 'exp',
    })
  })

  return nodes
}

function NetworkScene({ profile, accent }: { profile: ProfileData; accent: string }) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)
  const groupRef = useRef<THREE.Group>(null!)

  const nodes = useMemo(() => buildNodes(profile), [profile])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.06
    }
  })

  const centerNode = nodes[0]
  const otherNodes = nodes.slice(1)

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={55} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enableZoom={false}
        autoRotate={activeNodeId === null}
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
      />

      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} color={accent} intensity={6} decay={2} />
      <pointLight position={[8, 6, 4]} color="white" intensity={0.6} decay={2} />

      <BackgroundParticles count={400} accent={accent} />

      <group ref={groupRef}>
        {otherNodes.map((node) => (
          <ConnectionLine
            key={`line-${node.id}`}
            from={centerNode.position}
            to={node.position}
            color={node.color}
            opacity={0.25}
          />
        ))}

        {nodes.map((node) => (
          <NetworkNode
            key={node.id}
            node={node}
            accent={accent}
            onClick={(id) => setActiveNodeId(activeNodeId === id ? null : id)}
            isActive={activeNodeId === node.id}
          />
        ))}
      </group>
    </>
  )
}

export default function ParticleNetwork({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#00FF88'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
      style={{
        width: '100%',
        height: '100vh',
        background: '#020209',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {mounted && (
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
          <NetworkScene profile={profile} accent={accent} />
        </Canvas>
      )}

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          top: 28,
          left: 32,
          zIndex: 20,
          pointerEvents: 'none',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ fontSize: '0.6rem', color: `${accent}70`, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
          Network View
        </div>
        <div style={{ fontSize: '1.4rem', fontWeight: 700, color: accent, letterSpacing: '-0.02em' }}>
          {profile.name}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
          {profile.skills.length} skills · {profile.experience.length} positions
        </div>
      </motion.div>

      <div
        style={{
          position: 'absolute',
          top: 28,
          right: 28,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          alignItems: 'flex-end',
          pointerEvents: 'none',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} />
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>Skills</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#60A5FA' }} />
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>Experience</span>
        </div>
      </div>

      {socialLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
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
                color: 'rgba(255,255,255,0.35)',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = accent }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </div>
  )
}
