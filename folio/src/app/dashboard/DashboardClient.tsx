'use client';
import { useState } from 'react';
import { Button } from '@/components/ui';
import type { DbUser, DbSite } from '@/types';

interface DashboardClientProps {
  user: DbUser;
  initialSites: DbSite[];
}

export default function DashboardClient({ user, initialSites }: DashboardClientProps) {
  const [sites, setSites] = useState<DbSite[]>(initialSites);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  async function handleDelete(siteId: string) {
    if (!confirm('Delete this site? This cannot be undone.')) return;
    setDeletingId(siteId);
    try {
      const res = await fetch(`/api/sites?id=${siteId}`, { method: 'DELETE' });
      if (res.ok) {
        setSites((prev) => prev.filter((s) => s.id !== siteId));
      }
    } finally {
      setDeletingId(null);
    }
  }

  async function handlePortal() {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/customer-portal', { method: 'POST' });
      const data = await res.json() as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setPortalLoading(false);
    }
  }

  const planLabel: Record<string, string> = {
    free: 'Free',
    pro: 'Pro',
    agency: 'Agency',
  };

  const statusColor: Record<string, string> = {
    active: '#22c55e',
    pending: '#f59e0b',
    on_hold: '#f59e0b',
    paused: '#f59e0b',
    cancelled: '#ef4444',
    expired: '#ef4444',
    failed: '#ef4444',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--cream)' }}>
      <header style={{ borderBottom: '1px solid var(--border)', padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--gold)' }}>Folio</span>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ color: 'var(--cream-dim)', fontSize: '0.85rem' }}>{user.email}</span>
          <a href="/sign-out" style={{ color: 'var(--cream-dim)', fontSize: '0.85rem' }}>Sign out</a>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', marginBottom: '8px' }}>Dashboard</h1>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ backgroundColor: 'var(--bg3)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--gold)', border: '1px solid var(--border-gold)' }}>
                {planLabel[user.plan] ?? 'Free'} plan
              </span>
              {user.subscription_status && user.subscription_status !== 'pending' && (
                <span style={{ fontSize: '0.8rem', color: statusColor[user.subscription_status] ?? 'var(--cream-dim)' }}>
                  ● {user.subscription_status}
                </span>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {user.plan === 'free' ? (
              <a href="/start">
                <Button variant="primary" size="sm">Upgrade plan</Button>
              </a>
            ) : (
              <Button variant="secondary" size="sm" isLoading={portalLoading} onClick={handlePortal}>
                Manage subscription
              </Button>
            )}
            <a href="/build">
              <Button variant="primary" size="sm">+ New site</Button>
            </a>
          </div>
        </div>

        {sites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', backgroundColor: 'var(--bg2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '12px' }}>No sites yet</p>
            <p style={{ color: 'var(--cream-dim)', marginBottom: '32px' }}>Build your first personal website in minutes.</p>
            <a href="/build">
              <Button variant="primary" size="md">Build my first site →</Button>
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {sites.map((site) => (
              <div
                key={site.id}
                style={{ backgroundColor: 'var(--bg2)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}
              >
                <div style={{ height: '120px', backgroundColor: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--cream-dim)', fontSize: '0.8rem' }}>{site.template_id}</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{ fontWeight: '600', marginBottom: '4px' }}>{site.profile_data.name}</p>
                  <p style={{ color: 'var(--cream-dim)', fontSize: '0.85rem', marginBottom: '16px' }}>{site.profile_data.headline}</p>
                  {site.vercel_url && (
                    <a
                      href={site.vercel_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--gold)', fontSize: '0.8rem', display: 'block', marginBottom: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {site.vercel_url}
                    </a>
                  )}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {site.vercel_url && (
                      <a href={site.vercel_url} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                        <Button variant="secondary" size="sm" style={{ width: '100%' }}>View site</Button>
                      </a>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      isLoading={deletingId === site.id}
                      onClick={() => handleDelete(site.id)}
                      style={{ color: '#ef4444' }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
