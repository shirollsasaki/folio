'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import type { PlanType } from '@/types';

interface StartClientProps {
  currentPlan: PlanType;
  proPriceId: string;
  agencyPriceId: string;
}

export default function StartClient({ currentPlan, proPriceId, agencyPriceId }: StartClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(productId: string, planType: 'pro' | 'agency') {
    setLoading(planType);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, planType }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      setLoading(null);
    }
  }

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['1 website', '3 free templates', 'Folio subdomain'],
      action: () => router.push('/build'),
      actionLabel: 'Continue free →',
      variant: 'secondary' as const,
      productId: '',
      planType: null,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$12',
      period: '/month',
      features: ['3 websites', 'All 5 templates', 'Custom domain', 'AI bio cleanup'],
      action: () => handleCheckout(proPriceId, 'pro'),
      actionLabel: 'Start Pro',
      variant: 'primary' as const,
      productId: proPriceId,
      planType: 'pro' as const,
    },
    {
      id: 'agency',
      name: 'Agency',
      price: '$49',
      period: '/month',
      features: ['Unlimited websites', 'All 5 templates', 'Custom domains', 'White-label'],
      action: () => handleCheckout(agencyPriceId, 'agency'),
      actionLabel: 'Start Agency',
      variant: 'secondary' as const,
      productId: agencyPriceId,
      planType: 'agency' as const,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '12px', textAlign: 'center' }}>
        Choose your plan
      </h1>
      <p style={{ color: 'var(--cream-dim)', marginBottom: '48px', textAlign: 'center' }}>
        Start free or unlock more with Pro.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', width: '100%', maxWidth: '900px' }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              padding: '32px',
              borderRadius: '12px',
              backgroundColor: plan.id === 'pro' ? 'var(--bg3)' : 'var(--bg2)',
              border: plan.id === 'pro' ? '1px solid var(--border-gold)' : '1px solid var(--border)',
            }}
          >
            <p style={{ color: 'var(--cream-dim)', fontSize: '0.85rem', marginBottom: '8px' }}>{plan.name}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
              <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.2rem', fontWeight: '700', color: plan.id === 'pro' ? 'var(--gold)' : 'var(--cream)' }}>
                {plan.price}
              </span>
              <span style={{ color: 'var(--cream-dim)', fontSize: '0.85rem' }}>{plan.period}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {plan.features.map((f) => (
                <li key={f} style={{ color: 'var(--cream-dim)', fontSize: '0.9rem', display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.variant}
              size="md"
              isLoading={loading === plan.planType}
              onClick={plan.action}
              style={{ width: '100%' }}
            >
              {plan.actionLabel}
            </Button>
          </div>
        ))}
      </div>

      {currentPlan !== 'free' && (
        <p style={{ marginTop: '32px', color: 'var(--cream-dim)', fontSize: '0.9rem' }}>
          You are on the <strong style={{ color: 'var(--gold)' }}>{currentPlan}</strong> plan.
        </p>
      )}
    </div>
  );
}
