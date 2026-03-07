import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg)', padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
      <span style={{ fontFamily: 'var(--font-playfair)', color: 'var(--gold)', fontWeight: '700' }}>Folio</span>
      <p style={{ color: 'var(--cream-dim)', fontSize: '0.85rem' }}>© 2026 Folio. All rights reserved.</p>
      <div style={{ display: 'flex', gap: '24px' }}>
        <Link href="/sign-in" style={{ color: 'var(--cream-dim)', fontSize: '0.85rem', textDecoration: 'none' }}>Sign in</Link>
        <Link href="/sign-up" style={{ color: 'var(--cream-dim)', fontSize: '0.85rem', textDecoration: 'none' }}>Sign up</Link>
      </div>
    </footer>
  );
}
