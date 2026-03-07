import Link from 'next/link';
import { Button } from '@/components/ui';

export function Hero() {
  return (
    <section style={{ textAlign: 'center', padding: '120px 48px 80px', maxWidth: '900px', margin: '0 auto' }}>
      <p style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '24px' }}>
        Personal websites, simplified
      </p>
      <h1 style={{
        fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        fontWeight: '700', lineHeight: '1.1', marginBottom: '24px', color: 'var(--cream)',
      }}>
        Your LinkedIn profile,<br />
        <span style={{ color: 'var(--gold)' }}>turned into a website</span>
      </h1>
      <p style={{ fontSize: '1.15rem', color: 'var(--cream-dim)', lineHeight: '1.7', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
        Paste your LinkedIn URL. Pick a template. Deploy in seconds.
        No code, no design skills, no hosting headaches.
      </p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/sign-up">
          <Button variant="primary" size="lg">Build my website →</Button>
        </Link>
        <Link href="#how-it-works">
          <Button variant="ghost" size="lg">See how it works</Button>
        </Link>
      </div>
    </section>
  );
}
