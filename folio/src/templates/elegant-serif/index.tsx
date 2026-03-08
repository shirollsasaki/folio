import type { TemplateProps } from '@/types/template';

export default function ElegantSerif({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#8B7355';

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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;900&family=Lora:wght@400;500;600&display=swap');
      `}</style>

      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#FAF9F6',
        color: '#2C2C2C'
      }}>
        {/* Decorative header */}
        <div style={{ 
          borderTop: `3px solid ${accent}`,
          borderBottom: `1px solid #E0E0E0`
        }}>
          <div style={{ 
            maxWidth: '700px', 
            margin: '0 auto', 
            padding: '60px 32px 40px',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: accent,
              marginBottom: '16px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Portfolio
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              fontWeight: '400', 
              margin: '0 0 20px 0',
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '-0.01em',
              lineHeight: 1.1
            }}>
              {profile.name}
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)', 
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              color: '#555555',
              margin: '0',
              lineHeight: 1.6
            }}>
              {profile.headline}
            </p>
          </div>
        </div>

        <div style={{ 
          maxWidth: '700px', 
          margin: '0 auto', 
          padding: '60px 32px' 
        }}>
          {/* Decorative divider */}
          <div style={{ 
            textAlign: 'center',
            margin: '0 0 60px 0'
          }}>
            <div style={{ 
              display: 'inline-block',
              width: '60px',
              height: '1px',
              backgroundColor: accent
            }} />
          </div>

          {/* Bio */}
          <div style={{ marginBottom: '60px' }}>
            <p style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.9',
              fontFamily: "'Lora', serif",
              color: '#333333',
              textAlign: 'justify',
              textIndent: '2em',
              margin: 0
            }}>
              {profile.bio}
            </p>
          </div>

          {/* Experience */}
          {profile.experience.length > 0 && (
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '500',
                marginBottom: '32px',
                fontFamily: "'Playfair Display', serif",
                textAlign: 'center',
                color: accent
              }}>
                Professional Experience
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {profile.experience.map((exp, idx) => (
                  <div 
                    key={idx}
                    style={{ 
                      borderBottom: idx < profile.experience.length - 1 ? '1px solid #E0E0E0' : 'none',
                      paddingBottom: '32px'
                    }}
                  >
                    <div style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '500',
                      marginBottom: '6px',
                      fontFamily: "'Playfair Display', serif"
                    }}>
                      {exp.title}
                    </div>
                    <div style={{ 
                      fontSize: '1rem',
                      fontFamily: "'Lora', serif",
                      fontStyle: 'italic',
                      color: '#666666',
                      marginBottom: '6px'
                    }}>
                      {exp.company}
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem',
                      color: '#888888',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      letterSpacing: '0.05em'
                    }}>
                      {exp.dates}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '500',
                marginBottom: '32px',
                fontFamily: "'Playfair Display', serif",
                textAlign: 'center',
                color: accent
              }}>
                Areas of Expertise
              </h2>
              <div style={{ 
                fontSize: '1.125rem',
                lineHeight: '2',
                fontFamily: "'Lora', serif",
                textAlign: 'center',
                color: '#555555'
              }}>
                {profile.skills.join(' • ')}
              </div>
            </div>
          )}

          {/* Contact */}
          {socialLinks.length > 0 && (
            <div>
              <div style={{ 
                textAlign: 'center',
                margin: '0 0 32px 0'
              }}>
                <div style={{ 
                  display: 'inline-block',
                  width: '60px',
                  height: '1px',
                  backgroundColor: accent
                }} />
              </div>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '500',
                marginBottom: '32px',
                fontFamily: "'Playfair Display', serif",
                textAlign: 'center',
                color: accent
              }}>
                Connect
              </h2>
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '1rem', 
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      letterSpacing: '0.05em',
                      color: accent,
                      textDecoration: 'none',
                      borderBottom: `1px solid ${accent}`,
                      paddingBottom: '2px'
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer ornament */}
        <div style={{ 
          borderTop: `1px solid #E0E0E0`,
          padding: '40px 32px',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '0.875rem',
            color: '#999999',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.1em'
          }}>
            {profile.name} • {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
}
