import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg)', padding: '56px 48px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', alignItems: 'flex-start' }}>
        <div>
          <a href="/folio" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--cream)', fontWeight: 700, fontSize: '1.2rem', textDecoration: 'none', display: 'block', marginBottom: '10px' }}>
            Folio
          </a>
          <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '280px' }}>
            Turn your LinkedIn profile into a stunning personal website in minutes.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '64px' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: 'var(--cream-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>Product</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#templates" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.875rem', textDecoration: 'none' }}>Templates</a>
              <a href="#pricing" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.875rem', textDecoration: 'none' }}>Pricing</a>
              <a href="#how-it-works" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.875rem', textDecoration: 'none' }}>How It Works</a>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: 'var(--cream-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>Account</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/folio/sign-in" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.875rem', textDecoration: 'none' }}>Sign In</Link>
              <Link href="/folio/sign-up" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.875rem', textDecoration: 'none' }}>Sign Up</Link>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: 'var(--cream-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>Legal</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="/folio/privacy" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.875rem', textDecoration: 'none' }}>Privacy</a>
              <a href="/folio/terms" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.875rem', textDecoration: 'none' }}>Terms</a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '40px auto 0', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '0.8rem' }}>
          © 2026 Folio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
