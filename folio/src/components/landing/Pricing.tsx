const features = [
  'All templates',
  'Custom domain',
  'LinkedIn extraction',
  'AI bio cleanup',
  'Priority support',
];

export function Pricing() {
  return (
    <section
      id="pricing"
      style={{ padding: '80px 48px', backgroundColor: 'var(--bg2)' }}
    >
      <style>{`
        .pricing-cta:hover {
          background-color: var(--gold-light) !important;
        }
      `}</style>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '16px',
            color: 'var(--cream)',
          }}
        >
          Simple, transparent pricing
        </h2>
        <p
          style={{
            color: 'var(--cream-dim)',
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Everything you need to build your personal brand online.
        </p>

        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--border-gold)',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            padding: '48px',
          }}
        >
          <p
            style={{
              color: 'var(--cream-dim)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
            }}
          >
            Pro
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '4px',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '3.5rem',
                fontWeight: '700',
                color: 'var(--gold)',
                lineHeight: 1,
              }}
            >
              $12
            </span>
            <span style={{ color: 'var(--cream-dim)', fontSize: '0.85rem' }}>
              /per month
            </span>
          </div>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 32px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {features.map((f) => (
              <li
                key={f}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  color: 'var(--cream)',
                  fontSize: '0.95rem',
                }}
              >
                <span style={{ color: 'var(--gold)', fontWeight: '700' }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href="/folio/sign-up"
            className="pricing-cta"
            style={{
              display: 'block',
              textAlign: 'center',
              backgroundColor: 'var(--gold)',
              color: '#FFFFFF',
              borderRadius: '100px',
              padding: '14px 32px',
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: '600',
              fontSize: '0.95rem',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
            }}
          >
            Get started
          </a>

          <p
            style={{
              color: 'var(--cream-dim)',
              fontSize: '0.8rem',
              textAlign: 'center',
              marginTop: '16px',
            }}
          >
            Cancel anytime · No contracts
          </p>
        </div>
      </div>
    </section>
  );
}
