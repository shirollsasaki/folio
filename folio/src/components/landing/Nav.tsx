import Link from 'next/link';
import { Button } from '@/components/ui';

export function Nav() {
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 48px', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, backgroundColor: 'var(--bg)', zIndex: 50,
    }}>
      <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--gold)' }}>
        Folio
      </span>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="#pricing" style={{ color: 'var(--cream-dim)', fontSize: '0.9rem' }}>Pricing</Link>
        <Link href="/sign-in" style={{ color: 'var(--cream-dim)', fontSize: '0.9rem' }}>Sign in</Link>
        <Link href="/sign-up">
          <Button variant="primary" size="sm">Get started</Button>
        </Link>
      </div>
    </nav>
  );
}
