export function Nav() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 48px',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <a href="/folio" style={{
        fontFamily: 'var(--font-playfair)',
        fontSize: '1.3rem',
        fontWeight: 700,
        color: 'var(--cream)',
        textDecoration: 'none',
        letterSpacing: '-0.01em',
      }}>
        Folio
      </a>
      <a href="/folio/sign-in" style={{
        fontFamily: 'var(--font-dm-sans)',
        color: 'var(--cream-dim)',
        fontSize: '0.9rem',
        textDecoration: 'none',
      }}>
        Sign In
      </a>
    </nav>
  );
}
