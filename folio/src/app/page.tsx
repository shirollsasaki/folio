import CustomCursor from '@/components/lumo/CustomCursor';
import NoiseOverlay from '@/components/lumo/NoiseOverlay';
import BlurLayer from '@/components/lumo/BlurLayer';
import ParticleBackground from '@/components/lumo/ParticleBackground';
import LumoButton from '@/components/lumo/LumoButton';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--lumo-bg-base)' }}>
      {/* Background layers */}
      <ParticleBackground />
      <div className="fixed inset-0 z-[1] bg-transparent pointer-events-none" />
      <BlurLayer />
      <NoiseOverlay />

      {/* UI Layer */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-8 md:px-20 py-16 pointer-events-none">
        
        {/* Header */}
        <header className="flex justify-between items-center w-full border-b border-lumo-text-muted/20 pb-6 pointer-events-auto">
          <Link 
            href="/" 
            className="font-serif text-3xl md:text-4xl font-normal tracking-tight uppercase italic no-underline hover:text-lumo-accent transition-colors"
            style={{ color: 'var(--lumo-text)' }}
          >
            Folio
          </Link>
          <nav className="flex gap-8 md:gap-12">
            <Link 
              href="/templates" 
              className="font-mono text-[0.7rem] tracking-wider uppercase font-normal no-underline transition-all hover:text-lumo-accent hover:shadow-[0_0_8px_rgba(230,126,34,0.4)]"
              style={{ color: 'var(--lumo-text)' }}
            >
              Templates
            </Link>
            <Link 
              href="/sign-in" 
              className="font-mono text-[0.7rem] tracking-wider uppercase font-normal no-underline transition-all hover:text-lumo-accent hover:shadow-[0_0_8px_rgba(230,126,34,0.4)]"
              style={{ color: 'var(--lumo-text)' }}
            >
              Sign In
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <main className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full pointer-events-none">
          <h1 
            className="font-serif text-6xl md:text-[7rem] leading-[0.85] font-normal tracking-tight mb-8 uppercase opacity-0 animate-fade-in-slow"
            style={{ 
              color: 'var(--lumo-text)',
              animationDelay: '0.5s',
              animationFillMode: 'forwards'
            }}
          >
            Your Portfolio<br />In Minutes
          </h1>
          
          <p 
            className="font-mono text-xs md:text-[0.75rem] uppercase tracking-[0.2em] mb-12 opacity-0 animate-fade-in-slow"
            style={{ 
              color: 'var(--lumo-accent)',
              animationDelay: '1.2s',
              animationFillMode: 'forwards'
            }}
          >
            Turn LinkedIn into a stunning portfolio website
          </p>

          <div 
            className="flex flex-col md:flex-row gap-6 justify-center pointer-events-auto opacity-0 animate-fade-in-slow px-8 md:px-0"
            style={{
              animationDelay: '1.8s',
              animationFillMode: 'forwards'
            }}
          >
            <LumoButton href="/sign-up" variant="primary">
              Get Started
            </LumoButton>
            <LumoButton href="/templates" variant="secondary">
              View Templates
            </LumoButton>
          </div>
        </main>

        {/* Bottom coords */}
        <div 
          className="hidden md:block absolute bottom-16 left-20 font-mono text-[0.7rem] tracking-wide border-l pl-4 leading-relaxed"
          style={{ 
            color: 'var(--lumo-text-muted)',
            borderColor: 'var(--lumo-golden)'
          }}
        >
          <div 
            className="text-[0.6rem] tracking-[2px] mb-2 opacity-80"
            style={{ color: 'var(--lumo-accent)' }}
          >
            ||| || | |||
          </div>
          EST. 2025 / PREMIUM PORTFOLIOS
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 animate-bounce-scroll">
          <div 
            className="w-[15px] h-[15px] border-b-2 border-r-2 transform rotate-45"
            style={{ borderColor: 'var(--lumo-accent)' }}
          />
        </div>
      </div>

      {/* Custom cursor */}
      <CustomCursor />
    </div>
  );
}
