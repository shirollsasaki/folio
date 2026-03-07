import type { TemplateProps } from '@/types/template';

export default function BrutalistGrid({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#00A651';
  const mono = "'Courier New', Courier, monospace";

  const socialLinks = [
    profile.linkedin_url ? { label: 'LinkedIn', url: profile.linkedin_url } : null,
    profile.twitter_url ? { label: 'Twitter / X', url: profile.twitter_url } : null,
    profile.github_url ? { label: 'GitHub', url: profile.github_url } : null,
    profile.instagram_url ? { label: 'Instagram', url: profile.instagram_url } : null,
    profile.youtube_url ? { label: 'YouTube', url: profile.youtube_url } : null,
    profile.website_url ? { label: 'Website', url: profile.website_url } : null,
    ...profile.custom_links,
  ].filter((l): l is { label: string; url: string } => l !== null && Boolean(l.url));

  const hasExperience = profile.experience.length > 0;
  const hasSkills = profile.skills.length > 0;
  const hasLinks = socialLinks.length > 0;

  const navLinks: string[] = ['BIO'];
  if (hasExperience) navLinks.push('WORK');
  if (hasSkills) navLinks.push('SKILLS');
  if (hasLinks) navLinks.push('CONTACT');

  return (
    <>
      <style>{`
        .brutalist-bg {
          background-image: radial-gradient(#AAAAAA 1px, transparent 1px);
          background-size: 24px 24px;
          cursor: crosshair;
        }
        .brutalist-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 640px) {
          .brutalist-grid {
            grid-template-columns: 1fr !important;
          }
          .brutalist-nav-links {
            display: none;
          }
        }
      `}</style>

      <div
        className="brutalist-bg"
        style={{
          minHeight: '100vh',
          fontFamily: mono,
          color: '#000000',
        }}
      >
        <nav
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '2px solid #000000',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: mono }}>
            {profile.name}
          </span>
          <div className="brutalist-nav-links" style={{ display: 'flex', gap: '0', fontFamily: mono }}>
            {navLinks.map((link, idx) => (
              <span key={link} style={{ color: '#000000', fontSize: '0.875rem', fontWeight: 'bold' }}>
                {idx > 0 && <span style={{ margin: '0 6px', color: '#555555' }}>·</span>}
                {link}
              </span>
            ))}
          </div>
        </nav>

        <div
          style={{
            backgroundColor: accent,
            color: '#FFFFFF',
            border: '2px solid #000000',
            padding: '40px 40px',
            borderLeft: 'none',
            borderRight: 'none',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              margin: '0 0 8px 0',
              fontFamily: mono,
              lineHeight: 1.1,
            }}
          >
            {profile.name}
          </h1>
          <p
            style={{
              fontSize: '1rem',
              margin: '0 0 12px 0',
              fontFamily: mono,
              opacity: 0.9,
            }}
          >
            {profile.headline}
          </p>
          {profile.location && (
            <p
              style={{
                fontSize: '0.875rem',
                margin: 0,
                fontStyle: 'italic',
                opacity: 0.75,
                fontFamily: mono,
              }}
            >
              {profile.location}
            </p>
          )}
        </div>

        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '24px',
          }}
        >
          <div className="brutalist-grid">
            <div style={{ border: '2px solid #000000', backgroundColor: '#FFFFFF' }}>
              <div
                style={{
                  backgroundColor: accent,
                  color: '#FFFFFF',
                  padding: '8px 12px',
                  fontWeight: 'bold',
                  fontFamily: mono,
                  fontSize: '0.875rem',
                }}
              >
                [ BIO.TXT ]
              </div>
              <div style={{ padding: '16px' }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    color: '#000000',
                    fontFamily: mono,
                  }}
                >
                  {profile.bio}
                </p>
              </div>
            </div>

            {hasExperience && (
              <div style={{ border: '2px solid #000000', backgroundColor: '#FFFFFF' }}>
                <div
                  style={{
                    backgroundColor: accent,
                    color: '#FFFFFF',
                    padding: '8px 12px',
                    fontWeight: 'bold',
                    fontFamily: mono,
                    fontSize: '0.875rem',
                  }}
                >
                  [ WORK.LOG ]
                </div>
                <div style={{ padding: '16px' }}>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {profile.experience.map((exp) => (
                      <li key={`${exp.company}-${exp.title}`} style={{ fontFamily: mono }}>
                        <span style={{ fontSize: '0.8rem', color: '#555555' }}>[{exp.dates}]</span>
                        <span style={{ fontSize: '0.875rem', color: '#000000', display: 'block', marginTop: '2px' }}>
                          → {exp.company}: {exp.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {hasSkills && (
              <div style={{ border: '2px solid #000000', backgroundColor: '#FFFFFF' }}>
                <div
                  style={{
                    backgroundColor: accent,
                    color: '#FFFFFF',
                    padding: '8px 12px',
                    fontWeight: 'bold',
                    fontFamily: mono,
                    fontSize: '0.875rem',
                  }}
                >
                  [ SKILLS.SH ]
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          display: 'inline-block',
                          border: `2px solid ${accent}`,
                          color: '#000000',
                          padding: '3px 10px',
                          fontSize: '0.8rem',
                          fontFamily: mono,
                          fontWeight: 'bold',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {hasLinks && (
              <div style={{ border: '2px solid #000000', backgroundColor: '#FFFFFF' }}>
                <div
                  style={{
                    backgroundColor: accent,
                    color: '#FFFFFF',
                    padding: '8px 12px',
                    fontWeight: 'bold',
                    fontFamily: mono,
                    fontSize: '0.875rem',
                  }}
                >
                  [ CONNECT.EXE ]
                </div>
                <div style={{ padding: '16px' }}>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {socialLinks.map((link) => (
                      <li key={link.label} style={{ fontFamily: mono }}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '0.875rem',
                            color: '#000000',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span style={{ color: accent, fontWeight: 'bold' }}>→</span>
                          <span style={{ fontWeight: 'bold' }}>{link.label}</span>
                          <span style={{ color: '#555555', fontSize: '0.75rem', wordBreak: 'break-all' }}>{link.url}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer
          style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            padding: '16px 24px',
            fontFamily: mono,
            fontSize: '0.875rem',
          }}
        >
          {profile.name} © 2026 · Built with Folio
        </footer>
      </div>
    </>
  );
}
