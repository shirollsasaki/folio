export function Dock() {
  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .dock-links { display: none !important; }
          .dock-container { gap: 0 !important; padding: 0.8rem 2rem !important; }
        }
      `}</style>
      <div className="dock-container" style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '3rem',
        backgroundColor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '0.9rem 2.5rem',
        borderRadius: '100px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
        zIndex: 200,
        whiteSpace: 'nowrap',
      }}>
        <div className="dock-links" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#templates" style={{
            fontFamily: 'var(--font-dm-sans)',
            color: 'var(--cream-dim)',
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}>
            Templates
          </a>
          <a href="#how-it-works" style={{
            fontFamily: 'var(--font-dm-sans)',
            color: 'var(--cream-dim)',
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}>
            How It Works
          </a>
          <a href="#pricing" style={{
            fontFamily: 'var(--font-dm-sans)',
            color: 'var(--cream-dim)',
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}>
            Pricing
          </a>
        </div>
        <a href="/folio/sign-up" style={{
          fontFamily: 'var(--font-dm-sans)',
          backgroundColor: 'var(--gold)',
          color: '#FFFFFF',
          borderRadius: '100px',
          padding: '10px 24px',
          fontSize: '0.9rem',
          fontWeight: 600,
          textDecoration: 'none',
          display: 'inline-block',
        }}>
          Get Started
        </a>
      </div>
    </>
  );
}
