import type { TemplateProps } from '@/types/template';

export default function SplitLayout({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#8B5CF6';

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
        .split-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        @media (max-width: 968px) {
          .split-container {
            grid-template-columns: 1fr;
          }
          .split-left {
            position: relative !important;
            min-height: 50vh !important;
          }
        }
      `}</style>

      <div className="split-container">
        {/* Left side - fixed */}
        <div 
          className="split-left"
          style={{ 
            backgroundColor: accent,
            color: '#FFFFFF',
            padding: '60px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'sticky',
            top: 0,
            height: '100vh'
          }}
        >
          <div style={{ maxWidth: '500px' }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: '700', 
              margin: '0 0 24px 0',
              lineHeight: 1.1
            }}>
              {profile.name}
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', 
              margin: '0 0 40px 0',
              opacity: 0.95,
              lineHeight: 1.4
            }}>
              {profile.headline}
            </p>
            <div style={{ 
              width: '60px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '40px'
            }} />
            <p style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.8',
              opacity: 0.9
            }}>
              {profile.bio}
            </p>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div style={{ marginTop: '60px' }}>
                <div style={{ 
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '20px',
                  opacity: 0.7
                }}>
                  Connect
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        fontSize: '1rem', 
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        opacity: 0.9,
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - scrollable */}
        <div style={{ 
          backgroundColor: '#FFFFFF',
          padding: '60px 40px',
          overflowY: 'auto'
        }}>
          <div style={{ maxWidth: '600px' }}>
            {/* Experience */}
            {profile.experience.length > 0 && (
              <section style={{ marginBottom: '80px' }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700',
                  marginBottom: '40px',
                  color: '#1A1A1A',
                  position: 'relative',
                  paddingBottom: '16px'
                }}>
                  Experience
                  <div style={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '60px',
                    height: '4px',
                    backgroundColor: accent
                  }} />
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  {profile.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div style={{ 
                        fontSize: '0.875rem',
                        color: accent,
                        fontWeight: '600',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {exp.dates}
                      </div>
                      <h3 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#1A1A1A'
                      }}>
                        {exp.title}
                      </h3>
                      <div style={{ 
                        fontSize: '1.125rem',
                        color: '#666666',
                        fontWeight: '500'
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
              <section style={{ marginBottom: '80px' }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700',
                  marginBottom: '40px',
                  color: '#1A1A1A',
                  position: 'relative',
                  paddingBottom: '16px'
                }}>
                  Skills
                  <div style={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '60px',
                    height: '4px',
                    backgroundColor: accent
                  }} />
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        backgroundColor: '#F5F5F5',
                        color: '#1A1A1A',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        border: `2px solid ${accent}20`
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Location */}
            {profile.location && (
              <section>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700',
                  marginBottom: '40px',
                  color: '#1A1A1A',
                  position: 'relative',
                  paddingBottom: '16px'
                }}>
                  Location
                  <div style={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '60px',
                    height: '4px',
                    backgroundColor: accent
                  }} />
                </h2>
                <div style={{ 
                  fontSize: '1.25rem',
                  color: '#666666',
                  fontWeight: '500'
                }}>
                  {profile.location}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
