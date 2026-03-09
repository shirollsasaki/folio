'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, Stars, Html, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'
import type { TemplateProps } from '@/types/template'
import type { ProfileData } from '@/types/profile'

const SKILL_COLORS = [
  '#E8956A', '#60A5FA', '#34D399', '#A78BFA',
  '#F472B6', '#FBBF24', '#4ADE80', '#F87171',
]

const PARTICLE_POOL: { x: number; y: number; z: number; speed: number }[] = Array.from({ length: 80 }, (_, i) => ({
  x: (((i * 7.3) % 20) - 10),
  y: (((i * 3.7) % 8) - 4),
  z: -(((i * 4.9) % 28)),
  speed: 0.3 + (i % 5) * 0.1,
}))

function Particle({ x, y, z, speed }: { x: number; y: number; z: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    ref.current.position.y = y + Math.sin(state.clock.elapsedTime * speed + x) * 0.4
  })
  return (
    <mesh ref={ref} position={[x, y, z]}>
      <sphereGeometry args={[0.035, 5, 5]} />
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={3} />
    </mesh>
  )
}

function JourneyScene({ profile, accent }: { profile: ProfileData; accent: string }) {
  const scroll = useScroll()
  const worldRef = useRef<THREE.Group>(null!)

  const heroDivRef = useRef<HTMLDivElement>(null)
  const aboutDivRef = useRef<HTMLDivElement>(null)
  const skillsDivRef = useRef<HTMLDivElement>(null)
  const expDivRef = useRef<HTMLDivElement>(null)
  const contactDivRef = useRef<HTMLDivElement>(null)

  const socialLinks = [
    profile.linkedin_url ? { label: 'LinkedIn', url: profile.linkedin_url } : null,
    profile.github_url ? { label: 'GitHub', url: profile.github_url } : null,
    profile.twitter_url ? { label: 'Twitter', url: profile.twitter_url } : null,
    profile.website_url ? { label: 'Website', url: profile.website_url } : null,
    ...profile.custom_links,
  ].filter((l): l is { label: string; url: string } => l !== null && Boolean(l.url))

  useFrame(() => {
    worldRef.current.position.z = scroll.offset * 24

    const fade = (ref: React.RefObject<HTMLDivElement | null>, start: number, peak: number, end: number) => {
      if (!ref.current) return
      const t = scroll.offset
      let o = 0
      if (t >= start && t < peak) o = (t - start) / (peak - start)
      else if (t >= peak && t < end) o = 1 - (t - peak) / (end - peak)
      ref.current.style.opacity = String(Math.max(0, Math.min(1, o)))
    }

    fade(heroDivRef, 0, 0.05, 0.22)
    fade(aboutDivRef, 0.18, 0.25, 0.42)
    fade(skillsDivRef, 0.38, 0.45, 0.62)
    fade(expDivRef, 0.58, 0.65, 0.82)
    fade(contactDivRef, 0.78, 0.85, 1.01)
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={65} />
      <Stars radius={180} depth={100} count={7000} factor={4} saturation={0} fade speed={0.3} />
      <ambientLight intensity={0.12} />
      <pointLight position={[0, 2, 6]} color={accent} intensity={8} decay={2} />
      <pointLight position={[0, -2, -10]} color="#3B82F6" intensity={3} decay={2} />

      {PARTICLE_POOL.map((p) => (
        <Particle key={`${p.x.toFixed(1)}-${p.z.toFixed(1)}`} x={p.x} y={p.y} z={p.z} speed={p.speed} />
      ))}

      <group ref={worldRef}>

        {/* Section 1: Hero — z=0 */}
        <Float speed={0.6} floatIntensity={0.3} position={[0, 0, -0.5]}>
          <mesh>
            <sphereGeometry args={[1.1, 40, 40]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.7} transparent opacity={0.18} roughness={0.1} />
          </mesh>
        </Float>
        <Html center position={[0, 0, 0]} zIndexRange={[0, 100]}>
          <div
            ref={heroDivRef}
            style={{
              textAlign: 'center',
              color: 'white',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              width: '620px',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '4.2rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 18, textShadow: `0 0 80px ${accent}, 0 0 30px ${accent}60` }}>
              {profile.name}
            </div>
            <div style={{ fontSize: '1.15rem', opacity: 0.65, fontWeight: 400, lineHeight: 1.6, marginBottom: 28 }}>
              {profile.headline}
            </div>
            {profile.location && (
              <div style={{ fontSize: '0.82rem', opacity: 0.38, letterSpacing: '0.1em' }}>
                📍 {profile.location}
              </div>
            )}
            <div style={{ marginTop: 36, fontSize: '0.72rem', opacity: 0.3, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              ↓  scroll to explore
            </div>
          </div>
        </Html>

        {/* Section 2: About — z=-6 */}
        <Html center position={[0, 0, -6]} zIndexRange={[0, 100]}>
          <div
            ref={aboutDivRef}
            style={{
              color: 'white',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              width: '540px',
              background: 'rgba(8, 8, 18, 0.75)',
              backdropFilter: 'blur(24px)',
              border: `1px solid ${accent}28`,
              borderRadius: '22px',
              padding: '42px 48px',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '0.62rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 22, fontWeight: 700 }}>About</div>
            <div style={{ fontSize: '1.1rem', lineHeight: 1.85, opacity: 0.82 }}>{profile.bio}</div>
            {profile.education && profile.education.length > 0 && (
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid rgba(255,255,255,0.07)` }}>
                {profile.education.map((edu) => (
                  <div key={`${edu.school}-${edu.degree}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{edu.degree}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: 2 }}>{edu.school}</div>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: accent, opacity: 0.7 }}>{edu.dates}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Html>

        {/* Section 3: Skills — z=-12 */}
        <Html center position={[0, 0, -12]} zIndexRange={[0, 100]}>
          <div
            ref={skillsDivRef}
            style={{
              color: 'white',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              width: '580px',
              textAlign: 'center',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '0.62rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 32, fontWeight: 700 }}>
              Skills & Tech
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {profile.skills.map((skill, i) => (
                <span
                  key={skill}
                  style={{
                    background: `${SKILL_COLORS[i % SKILL_COLORS.length]}18`,
                    border: `1px solid ${SKILL_COLORS[i % SKILL_COLORS.length]}55`,
                    color: SKILL_COLORS[i % SKILL_COLORS.length],
                    padding: '9px 20px',
                    borderRadius: '30px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Html>

        {/* Skill constellation dots */}
        {profile.skills.map((skill, i) => {
          const angle = (i / profile.skills.length) * Math.PI * 2
          const r = 2.2 + (i % 3) * 0.6
          return (
            <Float key={`dot-${skill}`} speed={0.7 + i * 0.08} floatIntensity={0.25}>
              <mesh position={[Math.cos(angle) * r, ((i % 3) - 1) * 1.5, -11.8 + Math.sin(angle) * 0.4]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshStandardMaterial color={SKILL_COLORS[i % SKILL_COLORS.length]} emissive={SKILL_COLORS[i % SKILL_COLORS.length]} emissiveIntensity={4} />
              </mesh>
            </Float>
          )
        })}

        {/* Section 4: Experience + Projects — z=-18 */}
        <Html center position={[0, 0, -18]} zIndexRange={[0, 100]}>
          <div
            ref={expDivRef}
            style={{
              color: 'white',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              width: '600px',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontSize: '0.62rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24, fontWeight: 700, textAlign: 'center' }}>
              Experience
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {profile.experience.map((exp) => (
                <div
                  key={`${exp.title}-${exp.company}`}
                  style={{
                    background: 'rgba(8,8,18,0.78)',
                    backdropFilter: 'blur(18px)',
                    border: `1px solid ${accent}22`,
                    borderRadius: '16px',
                    padding: '18px 26px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 700 }}>{exp.title}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: 3 }}>{exp.company}</div>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: accent, opacity: 0.75 }}>{exp.dates}</div>
                </div>
              ))}
            </div>

            {profile.projects && profile.projects.length > 0 && (
              <>
                <div style={{ fontSize: '0.62rem', color: accent, textTransform: 'uppercase', letterSpacing: '0.2em', margin: '28px 0 16px', fontWeight: 700, textAlign: 'center' }}>
                  Projects
                </div>
                <div style={{ display: 'flex', gap: 14 }}>
                  {profile.projects.slice(0, 2).map((project) => (
                    <div
                      key={project.name}
                      style={{
                        flex: 1,
                        background: 'rgba(8,8,18,0.78)',
                        backdropFilter: 'blur(18px)',
                        border: `1px solid ${accent}22`,
                        borderRadius: '16px',
                        padding: '20px 22px',
                      }}
                    >
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 7 }}>{project.name}</div>
                      <div style={{ fontSize: '0.78rem', opacity: 0.58, lineHeight: 1.55 }}>{project.description}</div>
                      {project.tags && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 12 }}>
                          {project.tags.map((tag) => (
                            <span key={tag} style={{ fontSize: '0.63rem', color: accent, border: `1px solid ${accent}45`, padding: '2px 9px', borderRadius: '12px' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Html>

        {/* Section 5: Contact — z=-24 */}
        <Html center position={[0, 0, -24]} zIndexRange={[0, 100]}>
          <div
            ref={contactDivRef}
            style={{
              textAlign: 'center',
              color: 'white',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              width: '500px',
              userSelect: 'none',
            }}
          >
            <div style={{ fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14, textShadow: `0 0 50px ${accent}` }}>
              Let&apos;s connect
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.5, marginBottom: 44, lineHeight: 1.65 }}>
              {profile.headline}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', pointerEvents: 'all' }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: accent,
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: `1px solid ${accent}55`,
                    padding: '10px 26px',
                    borderRadius: '30px',
                    letterSpacing: '0.04em',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = accent
                    e.currentTarget.style.color = '#000'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = accent
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </Html>

      </group>
    </>
  )
}

export default function ScrollJourney({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#E8956A'

  return (
    <div style={{ width: '100%', height: '100vh', background: '#000005', position: 'relative', overflow: 'hidden' }}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <ScrollControls pages={5} damping={0.25}>
          <JourneyScene profile={profile} accent={accent} />
        </ScrollControls>
      </Canvas>

      <div
        style={{
          position: 'absolute',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 30,
          pointerEvents: 'none',
        }}
      >
        {['Hero', 'About', 'Skills', 'Work', 'Connect'].map((label) => (
          <div
            key={label}
            title={label}
            style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }}
          />
        ))}
      </div>
    </div>
  )
}
