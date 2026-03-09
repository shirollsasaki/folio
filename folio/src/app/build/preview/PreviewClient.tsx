'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { Button } from '@/components/ui';
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
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '24px' }}>🎉</div>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', marginBottom: '16px' }}>
          Your site is live!
        </h1>
        <p style={{ color: 'var(--cream-dim)', marginBottom: '32px' }}>
          Your personal website has been deployed successfully.
        </p>
        <a
          href={deployedUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--gold)', fontSize: '1rem', marginBottom: '32px', display: 'block', wordBreak: 'break-all' }}
        >
          {deployedUrl}
        </a>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="primary" size="md" onClick={() => router.push('/dashboard')}>
            Go to dashboard →
          </Button>
          <a href={deployedUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="md">View live site</Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', padding: '24px' }}>
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            style={{
              width: '32px', height: '4px', borderRadius: '2px',
              backgroundColor: 'var(--gold)',
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px 24px', borderBottom: '1px solid var(--border)' }}>
        <div>
          <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-dm-mono)', marginBottom: '4px' }}>
            Step 3 of 3
          </p>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem' }}>
            Preview your site
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{ color: 'var(--cream-dim)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            ← Change template
          </button>
          <Button
            variant="primary"
            size="md"
            disabled={deploying}
            onClick={handleDeploy}
          >
            {deploying ? 'Deploying...' : 'Deploy my site →'}
          </Button>
        </div>
      </div>

      {error && (
        <div style={{ margin: '16px 24px', padding: '12px 16px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', color: '#ef4444', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <div style={{ flex: 1, padding: '24px', backgroundColor: 'var(--bg2)' }}>
        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', height: 'calc(100vh - 200px)', backgroundColor: '#fff' }}>
          <iframe
            ref={iframeRef}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Site preview"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
