'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, OrbitControls, PerspectiveCamera, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TemplateProps } from '@/types/template'
import type { ProfileData, Experience } from '@/types/profile'

const PANEL_COLORS = {
  hero: '#1A1A2E',
  bio: '#16213E',
  exp: '#0F3460',
  skills: '#0D1B2A',
  connect: '#1B1B2F',
}

interface HeroPanelProps {
  name: string
  headline: string
  location: string
  accent: string
}

function HeroPanel({ name, headline, location, accent }: HeroPanelProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.04
      groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.02
    }
  })

  return (
    <Float speed={1} floatIntensity={0.4} rotationIntensity={0.1}>
      <group
        ref={groupRef}
        position={[-2.2, 1.2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.04 : 1}
      >
        <RoundedBox args={[3.8, 2.4, 0.15]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color={PANEL_COLORS.hero}
            emissive={accent}
            emissiveIntensity={hovered ? 0.15 : 0.06}
            roughness={0.3}
            metalness={0.6}
          />
        </RoundedBox>
        <Html center distanceFactor={7} zIndexRange={[10, 50]}>
          <div
            style={{
              width: '340px',
              padding: '28px 32px',
              color: 'white',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 10 }}>
              {name}
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.65, marginBottom: 8, fontWeight: 400, lineHeight: 1.5 }}>
              {headline}
            </div>
            {location && (
              <div style={{ fontSize: '0.8rem', opacity: 0.45, letterSpacing: '0.04em' }}>
                📍 {location}
              </div>
            )}
          </div>
        </Html>
      </group>
    </Float>
  )
}

interface BioPanelProps {
  bio: string
  accent: string
}

function BioPanel({ bio, accent }: BioPanelProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Float speed={1.4} floatIntensity={0.5} rotationIntensity={0.08}>
      <group
        position={[2.2, 1.2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.04 : 1}
      >
        <RoundedBox args={[3.2, 2.4, 0.15]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color={PANEL_COLORS.bio}
            emissive={accent}
            emissiveIntensity={hovered ? 0.18 : 0.05}
            roughness={0.25}
            metalness={0.7}
          />
        </RoundedBox>
        <Html center distanceFactor={7} zIndexRange={[10, 50]}>
          <div
            style={{
              width: '280px',
              padding: '24px 28px',
              color: 'white',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '0.65rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12, fontWeight: 700 }}>
              About
            </div>
            <div style={{ fontSize: '0.88rem', lineHeight: 1.75, opacity: 0.8 }}>
              {bio.length > 180 ? bio.slice(0, 180) + '…' : bio}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  )
}

interface ExpPanelProps {
  experience: Experience[]
  accent: string
}

function ExperiencePanel({ experience, accent }: ExpPanelProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Float speed={0.9} floatIntensity={0.45} rotationIntensity={0.12}>
      <group
        position={[-1.5, -1.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.04 : 1}
      >
        <RoundedBox args={[4.8, 2.2, 0.15]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color={PANEL_COLORS.exp}
            emissive={accent}
            emissiveIntensity={hovered ? 0.14 : 0.05}
            roughness={0.2}
            metalness={0.8}
          />
        </RoundedBox>
        <Html center distanceFactor={7} zIndexRange={[10, 50]}>
          <div
            style={{
              width: '430px',
              padding: '22px 28px',
              color: 'white',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '0.65rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 14, fontWeight: 700 }}>
              Experience
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {experience.slice(0, 3).map((exp, i) => (
                <div key={`${exp.company}-${i}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{exp.title}</span>
                    <span style={{ fontSize: '0.78rem', opacity: 0.6, marginLeft: 8 }}>@ {exp.company}</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', opacity: 0.45, flexShrink: 0, marginLeft: 12 }}>{exp.dates}</span>
                </div>
              ))}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  )
}

interface SkillsPanelProps {
  skills: string[]
  accent: string
}

function SkillsPanel({ skills, accent }: SkillsPanelProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Float speed={1.1} floatIntensity={0.55} rotationIntensity={0.09}>
      <group
        position={[2.8, -1.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.04 : 1}
      >
        <RoundedBox args={[2.8, 2.2, 0.15]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color={PANEL_COLORS.skills}
            emissive={accent}
            emissiveIntensity={hovered ? 0.2 : 0.07}
            roughness={0.15}
            metalness={0.85}
          />
        </RoundedBox>
        <Html center distanceFactor={7} zIndexRange={[10, 50]}>
          <div
            style={{
              width: '240px',
              padding: '22px 24px',
              color: 'white',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '0.65rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12, fontWeight: 700 }}>
              Skills
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.slice(0, 10).map((skill) => (
                <span
                  key={skill}
                  style={{
                    background: `${accent}20`,
                    border: `1px solid ${accent}50`,
                    color: accent,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  )
}

function Scene({ profile, accent }: { profile: ProfileData; accent: string }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={55} />
      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
      />

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="white" intensity={2} decay={2} />
      <pointLight position={[-5, -5, 5]} color={accent} intensity={3} decay={2} />
      <pointLight position={[0, 0, 8]} color={accent} intensity={1.5} decay={3} />

      <HeroPanel name={profile.name} headline={profile.headline} location={profile.location} accent={accent} />
      <BioPanel bio={profile.bio} accent={accent} />
      {profile.experience.length > 0 && <ExperiencePanel experience={profile.experience} accent={accent} />}
      {profile.skills.length > 0 && <SkillsPanel skills={profile.skills} accent={accent} />}
    </>
  )
}

export default function FloatingBento3D({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#6366F1'

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
        background: 'radial-gradient(ellipse at center, #0d0d1a 0%, #050508 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <Scene profile={profile} accent={accent} />
      </Canvas>

      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 28,
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <div style={{ fontSize: '0.65rem', color: `${accent}80`, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
          Drag to explore · Scroll to tilt
        </div>
      </div>

      {socialLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 28,
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
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.78rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = accent }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
            >
              {link.label} ↗
            </a>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        <motion.div
          key="hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: 64,
            right: 28,
            color: 'rgba(255,255,255,0.2)',
            fontSize: '0.7rem',
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          Hover panels to explore
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
