'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import type { ProfileData } from '@/types';

export default function BuildStep1() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleExtract(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedin_url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to extract profile. Please check the URL.');
        return;
      }

      const profile: ProfileData = data.profile;
      sessionStorage.setItem('folio_profile', JSON.stringify(profile));
      router.push('/build/template');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '48px' }}>
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            style={{
              width: '32px', height: '4px', borderRadius: '2px',
              backgroundColor: step === 1 ? 'var(--gold)' : 'var(--border)',
            }}
          />
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '560px' }}>
        <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-dm-mono)' }}>
          Step 1 of 3
        </p>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', marginBottom: '12px' }}>
          Paste your LinkedIn URL
        </h1>
        <p style={{ color: 'var(--cream-dim)', marginBottom: '40px', lineHeight: '1.6' }}>
          We&apos;ll extract your profile data automatically — name, headline, experience, skills, and bio.
        </p>

        <form onSubmit={handleExtract} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="linkedin-url" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--cream-dim)', marginBottom: '8px', fontFamily: 'var(--font-dm-mono)' }}>
              LinkedIn Profile URL
            </label>
            <input
              id="linkedin-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourname"
              required
              style={{
                width: '100%', padding: '12px 16px',
                backgroundColor: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: '8px', color: 'var(--cream)', fontSize: '1rem',
                outline: 'none', fontFamily: 'var(--font-dm-sans)',
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#ef4444', fontSize: '0.9rem', padding: '12px 16px', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.2)' }}>
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" size="lg" isLoading={loading}>
            {loading ? 'Extracting profile...' : 'Extract my profile →'}
          </Button>
        </form>

        <p style={{ marginTop: '24px', color: 'var(--cream-dim)', fontSize: '0.8rem', textAlign: 'center' }}>
          Make sure your LinkedIn profile is public before extracting.
        </p>
      </div>
    </div>
  );
}
