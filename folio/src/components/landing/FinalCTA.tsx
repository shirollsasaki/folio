import LumoButton from '@/components/lumo/LumoButton';

export function FinalCTA() {
  return (
    <section 
      className="py-32 px-8"
      style={{ backgroundColor: 'var(--lumo-bg-base)' }}
    >
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h2 
          className="font-serif text-4xl md:text-5xl font-normal tracking-tight"
          style={{ color: 'var(--lumo-text)' }}
        >
          Your portfolio is 3 minutes away
        </h2>
        
        <p 
          className="font-mono text-sm md:text-base"
          style={{ color: 'var(--lumo-text-muted)' }}
        >
          Join professionals using Folio
        </p>

        <div className="pt-4">
          <LumoButton href="/sign-up" variant="primary">
            Build my website
          </LumoButton>
        </div>
      </div>
    </section>
  );
}
