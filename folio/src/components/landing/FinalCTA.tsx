export function FinalCTA() {
  return (
    <section style={{ padding: '140px 48px', textAlign: 'center', backgroundColor: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .final-cta-btn:hover { background-color: var(--gold-light) !important; transform: translateY(-1px); }
        .final-cta-btn { transition: background-color 0.2s ease, transform 0.15s ease !important; }
        .final-cta-glow {
          position: absolute;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,149,106,0.12) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
      `}</style>

      <div className="final-cta-glow" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px' }}>
          Get Started Today
        </p>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '20px', color: '#FFFFFF', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          Your personal website is<br />
          <span style={{ color: 'var(--gold)' }}>3 minutes away</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(255,255,255,0.55)', marginBottom: '48px', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Join professionals who use Folio to stand out online.<br />
          No design skills needed. No credit card required.
        </p>
        <a href="/folio/sign-up" className="final-cta-btn" style={{ display: 'inline-block', backgroundColor: 'var(--gold)', color: '#FFFFFF', padding: '18px 48px', borderRadius: '100px', fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 32px rgba(232,149,106,0.4)' }}>
          Build my website →
        </a>
      </div>
    </section>
  );
}
