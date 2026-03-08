import type { TemplateProps } from '@/types/template';

export default function MinimalDark({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#06B6D4';

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
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0A0A0A',
      color: '#E5E5E5'
    }}>
      {/* Subtle gradient overlay */}
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: `radial-gradient(ellipse at top, ${accent}15, transparent)`,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ 
        position: 'relative',
        zIndex: 1,
        maxWidth: '900px',
        margin: '0 auto',
        padding: '100px 32px'
      }}>
        {/* Hero */}
        <div style={{ 
          marginBottom: '120px',
          borderLeft: `2px solid ${accent}`,
          paddingLeft: '32px'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            fontWeight: '200', 
            margin: '0 0 20px 0',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            color: '#FFFFFF'
          }}>
            {profile.name}
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', 
            color: '#A0A0A0',
            fontWeight: '300',
            margin: '0',
            lineHeight: 1.5
          }}>
            {profile.headline}
          </p>
        </div>

        {/* Bio */}
        <section style={{ marginBottom: '100px' }}>
          <div style={{ 
            display: 'inline-block',
            width: '40px',
            height: '2px',
            backgroundColor: accent,
            marginBottom: '24px'
          }} />
          <p style={{ 
            fontSize: '1.375rem', 
            lineHeight: '1.9',
            color: '#C0C0C0',
            fontWeight: '300',
            maxWidth: '700px',
            margin: 0
          }}>
            {profile.bio}
          </p>
        </section>

        {/* Experience */}
        {profile.experience.length > 0 && (
          <section style={{ marginBottom: '100px' }}>
            <div style={{ 
              display: 'inline-block',
              width: '40px',
              height: '2px',
              backgroundColor: accent,
              marginBottom: '40px'
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {profile.experience.map((exp, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    paddingLeft: '24px',
                    borderLeft: '1px solid #1A1A1A'
                  }}
                >
                  <div style={{ 
                    fontSize: '0.875rem',
                    color: accent,
                    fontWeight: '500',
                    marginBottom: '8px',
                    letterSpacing: '0.05em'
                  }}>
                    {exp.dates}
                  </div>
                  <h3 style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: '300',
                    marginBottom: '6px',
                    color: '#FFFFFF'
                  }}>
                    {exp.title}
                  </h3>
                  <div style={{ 
                    fontSize: '1.125rem',
                    color: '#707070',
                    fontWeight: '300'
                  }}>
                    {exp.company}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {profile.skills.length > 0 && (
          <section style={{ marginBottom: '100px' }}>
            <div style={{ 
              display: 'inline-block',
              width: '40px',
              height: '2px',
              backgroundColor: accent,
              marginBottom: '32px'
            }} />
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '16px'
            }}>
              {profile.skills.map((skill) => (
                <div
                  key={skill}
                  style={{
                    color: '#A0A0A0',
                    padding: '16px',
                    fontSize: '1rem',
                    fontWeight: '300',
                    borderBottom: `1px solid #1A1A1A`,
                    transition: 'border-color 0.3s, color 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = accent;
                    e.currentTarget.style.color = accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1A1A1A';
                    e.currentTarget.style.color = '#A0A0A0';
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Location */}
        {profile.location && (
          <section style={{ marginBottom: '100px' }}>
            <div style={{ 
              display: 'inline-block',
              width: '40px',
              height: '2px',
              backgroundColor: accent,
              marginBottom: '24px'
            }} />
            <div style={{ 
              fontSize: '0.875rem',
              color: '#707070',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px'
            }}>
              Location
            </div>
            <div style={{ 
              fontSize: '1.5rem',
              color: '#C0C0C0',
              fontWeight: '300'
            }}>
              {profile.location}
            </div>
          </section>
        )}

        {/* Contact */}
        {socialLinks.length > 0 && (
          <section>
            <div style={{ 
              display: 'inline-block',
              width: '40px',
              height: '2px',
              backgroundColor: accent,
              marginBottom: '32px'
            }} />
            <div style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px'
            }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '300',
                    color: '#707070',
                    textDecoration: 'none',
                    paddingBottom: '4px',
                    borderBottom: '1px solid transparent',
                    transition: 'color 0.3s, border-color 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = accent;
                    e.currentTarget.style.borderColor = accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#707070';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <div style={{ 
        borderTop: '1px solid #1A1A1A',
        padding: '40px 32px',
        textAlign: 'center',
        marginTop: '100px'
      }}>
        <div style={{ 
          fontSize: '0.875rem',
          color: '#404040',
          fontWeight: '300',
          letterSpacing: '0.05em'
        }}>
          {profile.name} · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
