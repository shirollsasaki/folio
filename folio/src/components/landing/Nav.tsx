export function Nav() {
  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
        }
      `}</style>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 48px',
          height: '64px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--bg)',
          borderBottom: '1px solid rgba(240,234,216,0.1)',
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--cream)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          FOLIO
        </a>

        <div
          className="nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <a
            href="#templates"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              color: 'var(--cream-dim)',
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            Templates
          </a>
          <a
            href="#pricing"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              color: 'var(--cream-dim)',
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            Pricing
          </a>
          <a
            href="/sign-in"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              color: 'var(--cream-dim)',
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            Sign In
          </a>
          <a
            href="/folio/sign-up"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              backgroundColor: 'var(--gold)',
              color: 'var(--bg)',
              borderRadius: '20px',
              padding: '8px 20px',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Get Started
          </a>
        </div>
      </nav>
    </>
  );
}
