export function FinalCTA() {
  return (
    <section style={{ padding: '120px 48px', textAlign: 'center', backgroundColor: 'var(--bg)' }}>
      <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '24px', color: 'var(--cream)' }}>
        Your personal website is<br />
        <span style={{ color: 'var(--gold)' }}>3 minutes away</span>
      </h2>
      <p style={{ color: 'var(--cream-dim)', marginBottom: '40px', fontSize: '1.05rem' }}>
        Join thousands of professionals who use Folio to stand out online.
      </p>
      <a
        href="/folio/sign-up"
        style={{
          display: 'inline-block',
          backgroundColor: 'var(--gold)',
          color: '#FFFFFF',
          padding: '16px 40px',
          borderRadius: '100px',
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '1rem',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'background-color 0.2s ease',
        }}
      >
        Build my website →
      </a>
    </section>
  );
}
