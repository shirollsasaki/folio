import Link from 'next/link';
import { Button } from '@/components/ui';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['1 website', '3 templates', 'Folio subdomain', 'LinkedIn extraction'],
    cta: 'Get started free',
    href: '/sign-up',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    features: ['3 websites', 'All 5 templates', 'Custom domain', 'Priority support', 'AI bio cleanup'],
    cta: 'Start Pro',
    href: '/sign-up',
    highlight: true,
  },
  {
    name: 'Agency',
    price: '$49',
    period: 'per month',
    features: ['Unlimited websites', 'All 5 templates', 'Custom domains', 'White-label', 'API access'],
    cta: 'Start Agency',
    href: '/sign-up',
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" style={{ padding: '80px 48px', backgroundColor: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', textAlign: 'center', marginBottom: '16px' }}>
          Simple, transparent pricing
        </h2>
        <p style={{ color: 'var(--cream-dim)', textAlign: 'center', marginBottom: '48px' }}>
          Start free. Upgrade when you need more.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{
              padding: '32px', borderRadius: '12px',
              backgroundColor: plan.highlight ? 'var(--bg3)' : 'var(--bg)',
              border: plan.highlight ? '1px solid var(--border-gold)' : '1px solid var(--border)',
            }}>
              <p style={{ color: 'var(--cream-dim)', fontSize: '0.85rem', marginBottom: '8px' }}>{plan.name}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', fontWeight: '700', color: plan.highlight ? 'var(--gold)' : 'var(--cream)' }}>{plan.price}</span>
                <span style={{ color: 'var(--cream-dim)', fontSize: '0.85rem' }}>/{plan.period}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ color: 'var(--cream-dim)', fontSize: '0.9rem', display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <div style={{ width: '100%' }}>
                <Link href={plan.href} style={{ display: 'block', width: '100%' }}>
                  <Button variant={plan.highlight ? 'primary' : 'secondary'} size="md">
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
