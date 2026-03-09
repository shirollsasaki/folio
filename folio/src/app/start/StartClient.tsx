'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
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
      const res = await fetch('/folio/api/checkout', {
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
      productId: '',
      planType: null,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$12',
      period: '/month',
      features: ['3 websites', 'All 15 templates', 'Custom domain', 'AI bio cleanup'],
      action: () => handleCheckout(proPriceId, 'pro'),
      actionLabel: 'Start Pro →',
      productId: proPriceId,
      planType: 'pro' as const,
    },
    {
      id: 'agency',
      name: 'Agency',
      price: '$49',
      period: '/month',
      features: ['Unlimited websites', 'All 15 templates', 'Custom domains', 'White-label'],
      action: () => handleCheckout(agencyPriceId, 'agency'),
      actionLabel: 'Start Agency →',
      productId: agencyPriceId,
      planType: 'agency' as const,
    },
  ];

  return (
    <AppShell centered>
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <div className="text-center mb-xl">
          <h1 className="text-3xl font-medium mb-s">Choose your plan</h1>
          <p className="text-secondary">Start free or unlock more with Pro.</p>
        </div>

        <div className="grid-3" style={{ marginBottom: '32px' }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="card"
              style={{
                border: plan.id === 'pro' ? '2px solid var(--border-color)' : undefined,
                position: 'relative',
              }}
            >
              {plan.id === 'pro' && (
                <span 
                  className="tag tag-filled" 
                  style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}
                >
                  Popular
                </span>
              )}
              <div className="card-body" style={{ padding: '32px', textAlign: 'center' }}>
                <p className="text-secondary text-sm mb-xs">{plan.name}</p>
                <p className="text-3xl font-medium mb-m">
                  {plan.price}
                  <span className="text-secondary text-sm">{plan.period}</span>
                </p>
                <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: '24px' }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '8px' }}>
                      <span>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`btn ${plan.id === 'pro' ? 'btn-primary' : 'btn-secondary'} w-full`}
                  disabled={loading === plan.planType}
                  onClick={plan.action}
                >
                  {loading === plan.planType ? 'Loading...' : plan.actionLabel}
                </button>
              </div>
            </div>
          ))}
        </div>

        {currentPlan !== 'free' && (
          <p className="text-center text-secondary">
            You are on the <strong>{currentPlan}</strong> plan.
          </p>
        )}
      </div>
    </AppShell>
  );
}
