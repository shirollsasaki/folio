import type { TemplateProps } from '@/types/template';

export default function CreativeGrid({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#FF6B35';

  const socialLinks = [
    profile.linkedin_url ? { label: 'LinkedIn', url: profile.linkedin_url } : null,
    profile.twitter_url ? { label: 'Twitter', url: profile.twitter_url } : null,
    profile.github_url ? { label: 'GitHub', url: profile.github_url } : null,
    profile.instagram_url ? { label: 'Instagram', url: profile.instagram_url } : null,
    profile.youtube_url ? { label: 'YouTube', url: profile.youtube_url } : null,
    profile.website_url ? { label: 'Website', url: profile.website_url } : null,
    ...profile.custom_links,
  ].filter((l): l is { label: string; url: string } => l !== null && Boolean(l.url));

  return (
    <>
      <style>{`
        .masonry-grid {
          column-count: 1;
          column-gap: 24px;
        }
        @media (min-width: 640px) {
          .masonry-grid {
            column-count: 2;
          }
        }
        @media (min-width: 1024px) {
          .masonry-grid {
            column-count: 3;
          }
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 24px;
        }
      `}</style>

      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#FAFAFA',
        padding: '24px'
      }}>
        {/* Sticky header */}
        <div style={{ 
          position: 'sticky',
          top: 0,
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          zIndex: 10,
          borderLeft: `6px solid ${accent}`
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: '800', 
            margin: '0 0 12px 0',
            color: '#1A1A1A'
          }}>
            {profile.name}
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
            color: '#666666',
            margin: '0',
            fontWeight: '500'
          }}>
            {profile.headline}
          </p>
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Bio card */}
          <div className="masonry-item" style={{ 
            backgroundColor: accent,
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700',
              marginBottom: '16px'
            }}>
              About
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.7',
              margin: 0,
              opacity: 0.95
            }}>
              {profile.bio}
            </p>
          </div>

          {/* Experience cards */}
          {profile.experience.map((exp, idx) => (
            <div 
              key={idx}
              className="masonry-item"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '2px solid #F0F0F0'
              }}
            >
              <div style={{ 
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: accent,
                fontWeight: '700',
                marginBottom: '12px'
              }}>
                {exp.dates}
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700',
                marginBottom: '8px',
                color: '#1A1A1A'
              }}>
                {exp.title}
              </h3>
              <div style={{ 
                fontSize: '1.125rem',
                color: '#666666',
                fontWeight: '600'
              }}>
                {exp.company}
              </div>
            </div>
          ))}

          {/* Skills card */}
          {profile.skills.length > 0 && (
            <div className="masonry-item" style={{ 
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '700',
                marginBottom: '20px'
              }}>
                Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {profile.skills.map((skill, idx) => (
                  <span
                    key={skill}
                    style={{
                      backgroundColor: idx % 2 === 0 ? accent : '#333333',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Location card (if available) */}
          {profile.location && (
            <div className="masonry-item" style={{ 
              backgroundColor: '#F0F4FF',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: `2px solid ${accent}`
            }}>
              <div style={{ 
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: accent,
                fontWeight: '700',
                marginBottom: '8px'
              }}>
                Based in
              </div>
              <div style={{ 
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1A1A1A'
              }}>
                {profile.location}
              </div>
            </div>
          )}

          {/* Contact cards */}
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="masonry-item"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '2px solid #F0F0F0',
                textDecoration: 'none',
                display: 'block',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{ 
                fontSize: '0.875rem',
                color: '#999999',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Connect
              </div>
              <div style={{ 
                fontSize: '1.25rem',
                fontWeight: '700',
                color: accent
              }}>
                {link.label} →
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
