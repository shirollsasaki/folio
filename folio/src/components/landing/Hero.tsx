import LumoButton from '@/components/lumo/LumoButton';
import Link from 'next/link';

export function Hero() {
  return (
    <section 
      className="relative z-10 flex flex-col justify-between min-h-screen px-8 py-32"
      style={{ backgroundColor: 'var(--lumo-bg-base)' }}
    >
      {/* Header */}
      <header className="flex justify-between items-center w-full max-w-6xl mx-auto border-b pb-6"
        style={{ borderColor: 'var(--lumo-text-muted)' + '33' }}>
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
            className="font-mono text-[0.7rem] tracking-wider uppercase font-normal no-underline transition-all"
            style={{ color: 'var(--lumo-text)' }}
          >
            Templates
          </Link>
          <Link 
            href="/sign-in" 
            className="font-mono text-[0.7rem] tracking-wider uppercase font-normal no-underline transition-all"
            style={{ color: 'var(--lumo-text)' }}
          >
            Sign In
          </Link>
        </nav>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex items-center justify-center text-center w-full max-w-6xl mx-auto">
        <div className="space-y-8">
          <h1 
            className="font-serif text-4xl md:text-6xl leading-[0.85] font-normal tracking-tight uppercase opacity-0 animate-fade-in-slow"
            style={{ 
              color: 'var(--lumo-text)',
              animationDelay: '0.5s',
              animationFillMode: 'forwards'
            }}
          >
            Your Portfolio<br />In Minutes
          </h1>
          
          <p 
            className="font-mono text-xs md:text-[0.75rem] uppercase tracking-[0.2em] opacity-0 animate-fade-in-slow"
            style={{ 
              color: 'var(--lumo-accent)',
              animationDelay: '1.2s',
              animationFillMode: 'forwards'
            }}
          >
            Turn LinkedIn into a stunning portfolio website
          </p>

          <div 
            className="flex flex-col md:flex-row gap-6 justify-center opacity-0 animate-fade-in-slow"
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
        </div>
      </main>

      {/* Scroll indicator */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center opacity-70 animate-bounce-scroll">
          <div 
            className="w-[15px] h-[15px] border-b-2 border-r-2 transform rotate-45"
            style={{ borderColor: 'var(--lumo-accent)' }}
          />
        </div>
      </div>
    </section>
  );
}
