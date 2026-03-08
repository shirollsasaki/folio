import type { TemplateProps } from '@/types/template';

export default function GradientModern({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#6366F1';

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
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
        }
      `}</style>

      <div style={{ 
        minHeight: '100vh', 
        background: `linear-gradient(135deg, ${accent} 0%, #EC4899 100%)`,
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative blobs */}
        <div style={{ 
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />
        <div style={{ 
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />

        <div style={{ 
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px', 
          margin: '0 auto', 
          padding: '80px 24px' 
        }}>
          {/* Hero */}
          <div className="glass-card" style={{ padding: '48px', marginBottom: '32px', textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
              fontWeight: '700', 
              margin: '0 0 16px 0',
              letterSpacing: '-0.02em'
            }}>
              {profile.name}
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', 
              margin: '0',
              opacity: 0.95,
              fontWeight: '400'
            }}>
              {profile.headline}
            </p>
          </div>

          {/* Bio */}
          <div className="glass-card" style={{ padding: '40px', marginBottom: '32px' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              marginBottom: '16px',
              opacity: 0.9
            }}>
              About Me
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.8',
              opacity: 0.9,
              margin: 0
            }}>
              {profile.bio}
            </p>
          </div>

          {/* Two-column layout for experience and skills */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            marginBottom: '32px'
          }}>
            {/* Experience */}
            {profile.experience.length > 0 && (
              <div className="glass-card" style={{ padding: '40px' }}>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600',
                  marginBottom: '24px',
                  opacity: 0.9
                }}>
                  Experience
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {profile.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '4px' }}>
                        {exp.title}
                      </div>
                      <div style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '4px' }}>
                        {exp.company}
                      </div>
                      <div style={{ fontSize: '0.875rem', opacity: 0.6 }}>
                        {exp.dates}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {profile.skills.length > 0 && (
              <div className="glass-card" style={{ padding: '40px' }}>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600',
                  marginBottom: '24px',
                  opacity: 0.9
                }}>
                  Skills
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          {socialLinks.length > 0 && (
            <div className="glass-card" style={{ padding: '40px' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '24px',
                opacity: 0.9
              }}>
                Let's Connect
              </h2>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '500',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      opacity: 0.9
                    }}
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
