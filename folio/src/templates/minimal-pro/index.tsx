'use client';

import { useState } from 'react';
import type { TemplateProps } from '@/types/template';

export default function MinimalPro({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#0066FF';
  const [activeSection, setActiveSection] = useState<'about' | 'experience' | 'skills' | 'connect'>('about');

  const socialLinks = [
    profile.linkedin_url ? { label: 'LinkedIn', url: profile.linkedin_url } : null,
    profile.twitter_url ? { label: 'Twitter', url: profile.twitter_url } : null,
    profile.github_url ? { label: 'GitHub', url: profile.github_url } : null,
    profile.instagram_url ? { label: 'Instagram', url: profile.instagram_url } : null,
    profile.youtube_url ? { label: 'YouTube', url: profile.youtube_url } : null,
    profile.website_url ? { label: 'Website', url: profile.website_url } : null,
    ...profile.custom_links,
  ].filter((l): l is { label: string; url: string } => l !== null && Boolean(l.url));

  const sections = [
    { id: 'about' as const, label: 'About' },
    ...(profile.experience.length > 0 ? [{ id: 'experience' as const, label: 'Experience' }] : []),
    ...(profile.skills.length > 0 ? [{ id: 'skills' as const, label: 'Skills' }] : []),
    ...(socialLinks.length > 0 ? [{ id: 'connect' as const, label: 'Connect' }] : []),
  ];

  const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
      <style>{`
        @keyframes mp-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mp-slide-in {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .mp-root {
          min-height: 100vh;
          background: #FFFFFF;
          color: #0A0A0A;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .mp-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          min-height: 100vh;
        }

        .mp-sidebar {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          padding: 56px 40px;
          border-right: 1px solid #F0F0F0;
          display: flex;
          flex-direction: column;
          gap: 40px;
          background: #FAFAFA;
        }

        .mp-avatar {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          flex-shrink: 0;
        }

        .mp-name {
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.2;
          color: #0A0A0A;
          margin: 0 0 6px;
        }

        .mp-headline {
          font-size: 0.85rem;
          color: #888;
          line-height: 1.5;
          margin: 0;
          font-weight: 400;
        }

        .mp-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mp-nav-btn {
          display: block;
          width: 100%;
          text-align: left;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          background: transparent;
          color: #888;
          letter-spacing: -0.01em;
        }

        .mp-nav-btn.active {
          background: #FFFFFF;
          color: #0A0A0A;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }

        .mp-nav-btn:not(.active):hover {
          background: #F0F0F0;
          color: #444;
        }

        .mp-location {
          font-size: 0.8rem;
          color: #AAA;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .mp-main {
          padding: 56px 64px;
          animation: mp-fade-up 0.5s ease;
        }

        .mp-section-heading {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 700;
          margin: 0 0 32px;
          padding-bottom: 12px;
          border-bottom: 1px solid #F0F0F0;
        }

        .mp-bio {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #333;
          font-weight: 300;
          max-width: 620px;
          margin: 0;
        }

        .mp-exp-item {
          display: flex;
          gap: 24px;
          padding: 24px 0;
          border-bottom: 1px solid #F7F7F7;
          animation: mp-slide-in 0.3s ease;
        }

        .mp-exp-item:last-child { border-bottom: none; }

        .mp-exp-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 8px;
          flex-shrink: 0;
        }

        .mp-exp-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0A0A0A;
          letter-spacing: -0.02em;
          margin: 0 0 4px;
        }

        .mp-exp-company {
          font-size: 0.925rem;
          color: #666;
          margin: 0 0 4px;
        }

        .mp-exp-dates {
          font-size: 0.8rem;
          color: #AAA;
          margin: 0;
          font-variant-numeric: tabular-nums;
        }

        .mp-exp-desc {
          font-size: 0.875rem;
          color: #666;
          line-height: 1.65;
          margin: 10px 0 0;
        }

        .mp-skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .mp-skill-tag {
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid #E8E8E8;
          color: #333;
          letter-spacing: -0.01em;
          transition: all 0.15s ease;
          cursor: default;
          background: #fff;
        }

        .mp-skill-tag:hover {
          border-color: currentColor;
          transform: translateY(-1px);
        }

        .mp-connect-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .mp-connect-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid #F0F0F0;
          font-size: 1.05rem;
          color: #0A0A0A;
          text-decoration: none;
          font-weight: 400;
          transition: all 0.15s ease;
          letter-spacing: -0.01em;
        }

        .mp-connect-link:last-child { border-bottom: none; }

        .mp-connect-link:hover {
          padding-left: 8px;
        }

        .mp-connect-arrow {
          font-size: 0.9rem;
          color: #CCC;
          transition: all 0.15s ease;
        }

        .mp-connect-link:hover .mp-connect-arrow {
          color: currentColor;
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .mp-layout { grid-template-columns: 1fr; }
          .mp-sidebar { position: relative; height: auto; padding: 40px 24px; }
          .mp-main { padding: 32px 24px; }
        }
      `}</style>

      <div className="mp-root">
        <div className="mp-layout">
          <aside className="mp-sidebar">
            <div>
              <div
                className="mp-avatar"
                style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}CC 100%)` }}
              >
                {initials}
              </div>
            </div>

            <div>
              <h1 className="mp-name">{profile.name}</h1>
              <p className="mp-headline">{profile.headline}</p>
              {profile.location && (
                <p className="mp-location" style={{ marginTop: '10px' }}>
                  <span>📍</span> {profile.location}
                </p>
              )}
            </div>

            <nav className="mp-nav" aria-label="Sections">
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`mp-nav-btn${activeSection === s.id ? ' active' : ''}`}
                  style={{ color: activeSection === s.id ? accent : undefined }}
                  onClick={() => setActiveSection(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </nav>

            <div style={{ marginTop: 'auto' }}>
              <div style={{ fontSize: '0.75rem', color: '#CCC', letterSpacing: '0.05em' }}>
                Built with Folio
              </div>
            </div>
          </aside>

          <main className="mp-main">
            {activeSection === 'about' && (
              <div>
                <p className="mp-section-heading" style={{ color: accent }}>About</p>
                <p className="mp-bio">{profile.bio}</p>
              </div>
            )}

            {activeSection === 'experience' && profile.experience.length > 0 && (
              <div>
                <p className="mp-section-heading" style={{ color: accent }}>Experience</p>
                <div>
                  {profile.experience.map((exp) => (
                    <div key={`${exp.title}-${exp.company}`} className="mp-exp-item">
                      <div className="mp-exp-dot" style={{ background: accent }} />
                      <div>
                        <p className="mp-exp-title">{exp.title}</p>
                        <p className="mp-exp-company">{exp.company}</p>
                        <p className="mp-exp-dates">{exp.dates}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'skills' && profile.skills.length > 0 && (
              <div>
                <p className="mp-section-heading" style={{ color: accent }}>Skills</p>
                <div className="mp-skills-grid">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="mp-skill-tag"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'connect' && socialLinks.length > 0 && (
              <div>
                <p className="mp-section-heading" style={{ color: accent }}>Connect</p>
                <div className="mp-connect-list">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mp-connect-link"
                      onMouseEnter={(e) => { e.currentTarget.style.color = accent; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#0A0A0A'; }}
                    >
                      {link.label}
                      <span className="mp-connect-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
