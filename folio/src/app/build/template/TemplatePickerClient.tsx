'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import type { TemplateMeta, PlanType } from '@/types';

interface TemplatePickerClientProps {
  templateMetas: TemplateMeta[];
  userPlan: PlanType;
}

export default function TemplatePickerClient({ templateMetas, userPlan }: TemplatePickerClientProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  async function handleUnlock() {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/folio/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: 'pdt_0NZwpK8C6q5489M5CBvHT', planType: 'pro' }),
      });
      const data = await res.json() as { checkoutUrl?: string; error?: string };
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      setCheckoutLoading(false);
    }
  }

  useEffect(() => {
    const profile = sessionStorage.getItem('folio_profile');
    if (!profile) {
      router.replace('/build');
    } else {
      setHasProfile(true);
    }
  }, [router]);

  function handleSelect(slug: string, isPremium: boolean) {
    if (userPlan === 'free') return;
    setSelected(slug);
  }

  function handleContinue() {
    if (!selected) return;
    sessionStorage.setItem('folio_template', selected);
    router.push('/build/preview');
  }

  if (!hasProfile) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--cream)', padding: '48px 24px' }}>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '48px' }}>
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            style={{
              width: '32px', height: '4px', borderRadius: '2px',
              backgroundColor: step <= 2 ? 'var(--gold)' : 'var(--border)',
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-dm-mono)', textAlign: 'center' }}>
          Step 2 of 3
        </p>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', marginBottom: '12px', textAlign: 'center' }}>
          Pick your template
        </h1>
        <p style={{ color: 'var(--cream-dim)', marginBottom: '40px', textAlign: 'center' }}>
          {userPlan === 'free' ? 'All templates require an active plan. Unlock to continue.' : 'All 5 templates available on your plan.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', marginBottom: '40px' }}>
           {templateMetas.map((meta) => {
             const locked = userPlan === 'free';
            const isSelected = selected === meta.slug;

            return (
              <button
                type="button"
                key={meta.slug}
                onClick={() => handleSelect(meta.slug, meta.isPremium)}
                disabled={locked}
                style={{
                  backgroundColor: 'var(--bg2)', borderRadius: '10px', overflow: 'hidden',
                  border: isSelected ? '2px solid var(--gold)' : '1px solid var(--border)',
                  cursor: locked ? 'not-allowed' : 'pointer',
                  opacity: locked ? 0.5 : 1,
                  textAlign: 'left', padding: 0,
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{ height: '120px', backgroundColor: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ color: 'var(--cream-dim)', fontSize: '0.75rem' }}>
                    {meta.tag === 'light' ? '☀ Light' : '◑ Dark'}
                  </span>
                  {locked && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'var(--bg)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', color: 'var(--gold)', border: '1px solid var(--border-gold)' }}>
                      PRO
                    </div>
                  )}
                  {isSelected && (
                    <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'var(--gold)', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--bg)' }}>
                      ✓
                    </div>
                  )}
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--cream)' }}>{meta.name}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{ color: 'var(--cream-dim)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            ← Back
          </button>
          <Button
            variant="primary"
            size="lg"
            disabled={!selected}
            onClick={handleContinue}
          >
            Preview my site →
          </Button>
        </div>

        {userPlan === 'free' && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <p style={{ color: 'var(--cream-dim)', fontSize: '0.85rem', marginBottom: '12px' }}>
              Unlock all templates to build and publish your site.
            </p>
            <button
              type="button"
              onClick={handleUnlock}
              disabled={checkoutLoading}
              style={{
                backgroundColor: 'var(--gold)', color: 'var(--bg)',
                border: 'none', borderRadius: '8px', padding: '12px 28px',
                fontSize: '0.95rem', fontWeight: '600', cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-dm-sans)', opacity: checkoutLoading ? 0.7 : 1,
              }}
            >
              {checkoutLoading ? 'Redirecting...' : 'Unlock All Templates →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
