'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { AppShell, StepIndicator } from '@/components/AppShell';
import { getTemplateBySlug } from '@/lib/templates';
import type { ProfileData } from '@/types';

export default function PreviewClient() {
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [templateSlug, setTemplateSlug] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const profileStr = sessionStorage.getItem('folio_profile');
    const slug = sessionStorage.getItem('folio_template');

    if (!profileStr || !slug) {
      router.replace('/build');
      return;
    }

    try {
      const parsedProfile: ProfileData = JSON.parse(profileStr);
      setProfile(parsedProfile);
      setTemplateSlug(slug);

      const templateEntry = getTemplateBySlug(slug);
      if (templateEntry && iframeRef.current) {
        const html = renderToStaticMarkup(
          React.createElement(templateEntry.Component, { profile: parsedProfile })
        );
        const doc = iframeRef.current.contentDocument;
        if (doc) {
          doc.open();
          doc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box;margin:0;padding:0}img{max-width:100%;height:auto}</style></head><body>${html}</body></html>`);
          doc.close();
        }
      }
    } catch {
      router.replace('/build');
    }
  }, [router]);

  async function handleDeploy() {
    if (!profile || !templateSlug) return;

    setDeploying(true);
    setError(null);

    try {
      const res = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template_id: templateSlug,
          profile_data: profile,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Deploy failed. Please try again.');
        return;
      }

      setDeployedUrl(data.deploymentUrl);
      sessionStorage.removeItem('folio_profile');
      sessionStorage.removeItem('folio_template');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setDeploying(false);
    }
  }

  if (deployedUrl) {
    return (
      <AppShell centered>
        <div className="text-center" style={{ maxWidth: '500px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🎉</div>
          <h1 className="text-3xl font-medium mb-s">Your site is live!</h1>
          <p className="text-secondary mb-l">Your personal website has been deployed successfully.</p>
          <a
            href={deployedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-l"
            style={{ display: 'block', wordBreak: 'break-all' }}
          >
            {deployedUrl}
          </a>
          <div className="flex gap-m justify-center" style={{ flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary" onClick={() => router.push('/dashboard')}>
              Go to dashboard →
            </button>
            <a href={deployedUrl} target="_blank" rel="noopener noreferrer">
              <button type="button" className="btn btn-secondary">View live site</button>
            </a>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-col" style={{ height: '100%' }}>
        <div className="content-header">
          <div>
            <StepIndicator currentStep={3} />
            <span className="tag mb-xs" style={{ display: 'inline-block' }}>Step 3 of 3</span>
            <h1 className="text-xl font-medium">Preview your site</h1>
          </div>
          <div className="flex gap-s items-center">
            <button type="button" onClick={() => router.back()} className="btn btn-secondary">
              ← Change template
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={deploying}
              onClick={handleDeploy}
            >
              {deploying ? 'Deploying...' : 'Deploy my site →'}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ margin: '16px 24px', padding: '12px 16px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#ef4444' }}>
            {error}
          </div>
        )}

        <div style={{ flex: 1, padding: '24px', backgroundColor: 'var(--bg-tab-inactive-1)' }}>
          <div className="card" style={{ height: 'calc(100vh - 280px)', overflow: 'hidden' }}>
            <iframe
              ref={iframeRef}
              style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#fff' }}
              title="Site preview"
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
