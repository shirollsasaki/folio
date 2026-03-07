export function Hero() {
  return (
    <div
      style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg)',
      }}
    >
      <div
        style={{
          maxWidth: '780px',
          textAlign: 'center',
          padding: '80px 24px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-mono)',
            color: 'var(--gold)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          Personal Website Builder
        </p>

        <h1
          style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontFamily: 'var(--font-playfair)',
            color: 'var(--cream)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '24px',
            margin: '0 0 24px',
          }}
        >
          Build Your Personal Website in Minutes
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--cream-dim)',
            fontFamily: 'var(--font-dm-sans)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}
        >
          Turn your profile into a stunning personal site. Pick a template, customize, and go live in minutes.
        </p>

        <a
          href="/folio/sign-up"
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--gold)',
            color: 'var(--bg)',
            padding: '16px 40px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '1rem',
            textDecoration: 'none',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          Get Started →
        </a>

        <p
          style={{
            marginTop: '16px',
            fontSize: '0.8rem',
            color: 'var(--cream-dim)',
          }}
        >
          No credit card required · Deploy in seconds
        </p>
      </div>
    </div>
  );
}
