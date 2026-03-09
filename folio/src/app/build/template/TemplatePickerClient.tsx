'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell, StepIndicator } from '@/components/AppShell';
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

  function handleSelect(slug: string) {
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
    <AppShell>
      <div className="app-main-scroll">
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
          <div className="text-center mb-xl">
            <StepIndicator currentStep={2} />
            <span className="tag mb-s" style={{ display: 'inline-block' }}>Step 2 of 3</span>
            <h1 className="text-2xl font-medium mb-s">Pick your template</h1>
            <p className="text-secondary">
              {userPlan === 'free' ? 'All templates require an active plan. Unlock to continue.' : 'All 15 templates available on your plan.'}
            </p>
          </div>

          <div className="template-grid mb-l">
            {templateMetas.map((meta) => {
              const locked = userPlan === 'free';
              const isSelected = selected === meta.slug;

              return (
                <button
                  type="button"
                  key={meta.slug}
                  onClick={() => handleSelect(meta.slug)}
                  disabled={locked}
                  className={`template-card ${isSelected ? 'selected' : ''}`}
                  style={{ opacity: locked ? 0.5 : 1, cursor: locked ? 'not-allowed' : 'pointer' }}
                >
                  <div className="template-preview" style={{ position: 'relative' }}>
                    <span className="text-secondary text-sm">
                      {meta.tag === 'light' ? '☀ Light' : '◑ Dark'}
                    </span>
                    {locked && (
                      <span className="tag tag-filled" style={{ position: 'absolute', top: '8px', right: '8px' }}>PRO</span>
                    )}
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'var(--text-main)', color: 'var(--bg-canvas)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</div>
                    )}
                  </div>
                  <div className="template-info">
                    <p className="template-name">{meta.name}</p>
                    <p className="template-tag">{meta.tag}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <button type="button" onClick={() => router.back()} className="btn btn-secondary">
              ← Back
            </button>
            <button
              type="button"
              className="btn btn-primary btn-large"
              disabled={!selected}
              onClick={handleContinue}
            >
              Preview my site →
            </button>
          </div>

          {userPlan === 'free' && (
            <div className="text-center mt-l">
              <p className="text-secondary mb-s">Unlock all templates to build and publish your site.</p>
              <button
                type="button"
                onClick={handleUnlock}
                disabled={checkoutLoading}
                className="btn btn-primary"
              >
                {checkoutLoading ? 'Redirecting...' : 'Unlock All Templates →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
