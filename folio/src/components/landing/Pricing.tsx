const freeFeatures = [
  '1 template',
  'Folio subdomain',
  'LinkedIn extraction',
  'Folio branding',
];

const proFeatures = [
  'All templates',
  'Custom domain',
  'LinkedIn extraction',
  'AI bio cleanup',
  'No Folio branding',
  'Priority support',
];

export function Pricing() {
  return (
    <section id="pricing" style={{ padding: '120px 48px', backgroundColor: 'var(--bg2)' }}>
      <style>{`
        .pricing-cta-pro:hover { background-color: var(--gold-light) !important; }
        .pricing-cta-free:hover { background-color: var(--bg3) !important; }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Pricing
          </p>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--cream)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Simple, transparent pricing
          </h2>
          <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '1rem' }}>
            Start free. Upgrade when you&apos;re ready.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '24px', padding: '48px 40px' }}>
            <p style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--cream-dim)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Free</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '3.5rem', fontWeight: 700, color: 'var(--cream)', lineHeight: 1 }}>$0</span>
            </div>
            <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.85rem', marginBottom: '32px' }}>Forever free</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {freeFeatures.map((f) => (
                <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--cream)', fontSize: '0.95rem', fontFamily: 'var(--font-dm-sans)' }}>
                  <span style={{ color: 'var(--cream-dim)', fontWeight: 700 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="/folio/sign-up" className="pricing-cta-free" style={{ display: 'block', textAlign: 'center', backgroundColor: 'var(--bg3)', color: 'var(--cream)', borderRadius: '100px', padding: '14px 32px', fontFamily: 'var(--font-dm-sans)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', transition: 'background-color 0.2s ease' }}>
              Get started free
            </a>
          </div>

          <div style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border-gold)', borderRadius: '24px', padding: '48px 40px', boxShadow: '0 0 48px rgba(232,149,106,0.12)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#FFFFFF', fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: '100px', whiteSpace: 'nowrap' }}>
              Most Popular
            </div>
            <p style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--gold)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Pro</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '3.5rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>$12</span>
              <span style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.85rem' }}>/month</span>
            </div>
            <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.85rem', marginBottom: '32px' }}>Cancel anytime · No contracts</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {proFeatures.map((f) => (
                <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--cream)', fontSize: '0.95rem', fontFamily: 'var(--font-dm-sans)' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="/folio/sign-up" className="pricing-cta-pro" style={{ display: 'block', textAlign: 'center', backgroundColor: 'var(--gold)', color: '#FFFFFF', borderRadius: '100px', padding: '14px 32px', fontFamily: 'var(--font-dm-sans)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', transition: 'background-color 0.2s ease' }}>
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
