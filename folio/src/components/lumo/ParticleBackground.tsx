'use client';

export default function ParticleBackground() {
  // Simplified gradient background instead of Three.js particles
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        background: 'radial-gradient(ellipse at 30% 40%, rgba(230, 126, 34, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(255, 127, 80, 0.06) 0%, transparent 50%), var(--lumo-bg-base)',
      }}
    />
  );
}
