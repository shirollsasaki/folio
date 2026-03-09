'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import type { DbUser, DbSite } from '@/types';

interface DashboardClientProps {
  user: DbUser;
  initialSites: DbSite[];
}

export default function DashboardClient({ user, initialSites }: DashboardClientProps) {
  const [sites, setSites] = useState<DbSite[]>(initialSites);
  const [selectedSite, setSelectedSite] = useState<DbSite | null>(initialSites[0] ?? null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  async function handleDelete(siteId: string) {
    if (!confirm('Delete this site? This cannot be undone.')) return;
    setDeletingId(siteId);
    try {
      const res = await fetch(`/api/sites?id=${siteId}`, { method: 'DELETE' });
      if (res.ok) {
        setSites((prev) => prev.filter((s) => s.id !== siteId));
        if (selectedSite?.id === siteId) {
          setSelectedSite(sites.find(s => s.id !== siteId) ?? null);
        }
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

  return (
    <AppShell>
      {sites.length === 0 ? (
        <div className="app-main-centered">
          <div className="text-center" style={{ maxWidth: '400px' }}>
            <h2 className="text-2xl font-medium mb-s">No sites yet</h2>
            <p className="text-secondary mb-l">Build your first personal website in minutes.</p>
            <Link href="/build" className="btn btn-primary">Build my first site →</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="app-sidebar">
            <div className="sidebar-header">
              <div className="sidebar-title">My Sites</div>
              <Link href="/build" className="icon-btn" aria-label="Create new site">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </Link>
            </div>
            
            <div className="sidebar-list">
              {sites.map((site) => (
                <button 
                  type="button"
                  key={site.id}
                  className={`sidebar-item ${selectedSite?.id === site.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSite(site)}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <div className="sidebar-item-meta">
                    <span>{site.template_id}</span>
                  </div>
                  <div className="sidebar-item-title">{site.profile_data.name}</div>
                  <div className="sidebar-item-preview">{site.profile_data.headline}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="app-main">
            {selectedSite && (
              <>
                <div className="content-header">
                  <div style={{ flex: 1 }}>
                    <div className="content-meta">
                      <span className="tag">{planLabel[user.plan] ?? 'Free'} plan</span>
                      {user.subscription_status && user.subscription_status !== 'pending' && (
                        <span style={{ marginLeft: '8px', color: user.subscription_status === 'active' ? '#22c55e' : '#f59e0b' }}>
                          ● {user.subscription_status}
                        </span>
                      )}
                    </div>
                    <h1 className="content-title">{selectedSite.profile_data.name}</h1>
                  </div>
                  <div className="flex gap-s">
                    {user.plan === 'free' ? (
                      <Link href="/start" className="btn btn-secondary">Upgrade</Link>
                    ) : (
                      <button type="button" className="btn btn-secondary" disabled={portalLoading} onClick={handlePortal}>
                        {portalLoading ? '...' : 'Billing'}
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="content-body">
                  <div className="mb-l">
                    <h3 className="text-lg font-medium mb-s">Site Details</h3>
                    <p className="text-secondary mb-m">{selectedSite.profile_data.headline}</p>
                    
                    {selectedSite.profile_data.bio && (
                      <p className="mb-m" style={{ lineHeight: 1.6 }}>{selectedSite.profile_data.bio}</p>
                    )}
                    
                    {selectedSite.vercel_url && (
                      <div className="mb-m">
                        <p className="text-sm text-secondary mb-xs">Live URL</p>
                        <a href={selectedSite.vercel_url} target="_blank" rel="noopener noreferrer">
                          {selectedSite.vercel_url}
                        </a>
                      </div>
                    )}
                    
                    {selectedSite.profile_data.skills && selectedSite.profile_data.skills.length > 0 && (
                      <div className="mb-m">
                        <p className="text-sm text-secondary mb-xs">Skills</p>
                        <div className="flex gap-xs" style={{ flexWrap: 'wrap' }}>
                          {selectedSite.profile_data.skills.map((skill) => (
                            <span key={skill} className="tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
                    <h3 className="text-lg font-medium mb-m">Actions</h3>
                    <div className="flex gap-s">
                      {selectedSite.vercel_url && (
                        <a href={selectedSite.vercel_url} target="_blank" rel="noopener noreferrer">
                          <button type="button" className="btn btn-primary">View live site →</button>
                        </a>
                      )}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={deletingId === selectedSite.id}
                        onClick={() => handleDelete(selectedSite.id)}
                        style={{ color: '#ef4444' }}
                      >
                        {deletingId === selectedSite.id ? 'Deleting...' : 'Delete site'}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </AppShell>
  );
}
