import type { TemplateProps } from '@/types/template';

export default function BoldContrast({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#FF0055';

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
    <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#FFFFFF' }}>
      {/* Hero Section */}
      <div style={{ 
        backgroundColor: accent,
        padding: 'clamp(60px, 12vw, 120px) 24px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 7vw, 5rem)', 
          fontWeight: '900', 
          margin: '0 0 24px 0',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase'
        }}>
          {profile.name}
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.25rem, 3vw, 2rem)', 
          fontWeight: '700',
          margin: '0',
          letterSpacing: '0.02em'
        }}>
          {profile.headline}
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px' }}>
        {/* Bio */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ 
            borderLeft: `8px solid ${accent}`,
            paddingLeft: '24px',
            marginBottom: '24px'
          }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '900',
              margin: '0',
              textTransform: 'uppercase'
            }}>
              About
            </h2>
          </div>
          <p style={{ 
            fontSize: '1.25rem', 
            lineHeight: '1.8',
            color: '#CCCCCC'
          }}>
            {profile.bio}
          </p>
        </section>

        {/* Experience */}
        {profile.experience.length > 0 && (
          <section style={{ marginBottom: '80px' }}>
            <div style={{ 
              borderLeft: `8px solid ${accent}`,
              paddingLeft: '24px',
              marginBottom: '24px'
            }}>
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '900',
                margin: '0',
                textTransform: 'uppercase'
              }}>
                Work
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {profile.experience.map((exp, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    backgroundColor: '#111111',
                    padding: '32px',
                    borderLeft: `4px solid ${accent}`
                  }}
                >
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '8px', color: accent }}>
                    {exp.title}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>
                    {exp.company}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {exp.dates}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {profile.skills.length > 0 && (
          <section style={{ marginBottom: '80px' }}>
            <div style={{ 
              borderLeft: `8px solid ${accent}`,
              paddingLeft: '24px',
              marginBottom: '24px'
            }}>
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '900',
                margin: '0',
                textTransform: 'uppercase'
              }}>
                Skills
              </h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: accent,
                    color: '#000000',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        {socialLinks.length > 0 && (
          <section>
            <div style={{ 
              borderLeft: `8px solid ${accent}`,
              paddingLeft: '24px',
              marginBottom: '24px'
            }}>
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '900',
                margin: '0',
                textTransform: 'uppercase'
              }}>
                Connect
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700',
                    color: accent,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
