import Link from 'next/link';
import { Button } from '@/components/ui';

export function FinalCTA() {
  return (
    <section style={{ padding: '100px 48px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '24px' }}>
        Your personal website is<br />
        <span style={{ color: 'var(--gold)' }}>3 minutes away</span>
      </h2>
      <p style={{ color: 'var(--cream-dim)', marginBottom: '40px', fontSize: '1.05rem' }}>
        Join thousands of professionals who use Folio to stand out online.
      </p>
      <Link href="/sign-up">
        <Button variant="primary" size="lg">Build my website for free →</Button>
      </Link>
    </section>
  );
}
