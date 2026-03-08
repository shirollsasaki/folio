import type { TemplateProps } from '@/types/template';

export default function NeoBrutalist({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#FFDD00';

  const socialLinks = [
    profile.linkedin_url ? { label: 'LinkedIn', url: profile.linkedin_url } : null,
    profile.twitter_url ? { label: 'Twitter', url: profile.twitter_url } : null,
    profile.github_url ? { label: 'GitHub', url: profile.github_url } : null,
    profile.instagram_url ? { label: 'Instagram', url: profile.instagram_url } : null,
    profile.youtube_url ? { label: 'YouTube', url: profile.youtube_url } : null,
    profile.website_url ? { label: 'Website', url: profile.website_url } : null,
    ...profile.custom_links,
  ].filter((l): l is { label: string; url: string } => l !== null && Boolean(l.url));

  const brutalistBox = {
    border: '4px solid #000000',
    boxShadow: '8px 8px 0 #000000',
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F5F5F5',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ 
          ...brutalistBox,
          backgroundColor: accent,
          padding: '48px',
          marginBottom: '32px',
          transform: 'rotate(-1deg)'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 7vw, 5rem)', 
            fontWeight: '900', 
            margin: '0 0 16px 0',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 0.9
          }}>
            {profile.name}
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', 
            fontWeight: '700',
            margin: '0',
            textTransform: 'uppercase'
          }}>
            {profile.headline}
          </p>
        </div>

        {/* Asymmetric grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Bio - spans 8 columns */}
          <div style={{ 
            ...brutalistBox,
            gridColumn: 'span 12',
            backgroundColor: '#FFFFFF',
            padding: '40px',
            transform: 'rotate(0.5deg)'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '900',
              marginBottom: '16px',
              textTransform: 'uppercase',
              borderBottom: '4px solid #000000',
              paddingBottom: '8px',
              display: 'inline-block'
            }}>
              Bio
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.7',
              fontWeight: '500'
            }}>
              {profile.bio}
            </p>
          </div>

          {/* Experience */}
          {profile.experience.length > 0 && (
            <div style={{ 
              ...brutalistBox,
              gridColumn: 'span 12',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              padding: '40px',
              transform: 'rotate(-0.5deg)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '900',
                marginBottom: '24px',
                textTransform: 'uppercase',
                color: accent
              }}>
                Work History
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {profile.experience.map((exp, idx) => (
                  <div 
                    key={idx}
                    style={{ 
                      borderLeft: `6px solid ${accent}`,
                      paddingLeft: '20px'
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px', textTransform: 'uppercase' }}>
                      {exp.title}
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '4px', color: accent }}>
                      {exp.company}
                    </div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.7, fontWeight: '600', textTransform: 'uppercase' }}>
                      {exp.dates}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div style={{ 
              ...brutalistBox,
              gridColumn: 'span 7',
              backgroundColor: '#FF6B6B',
              padding: '40px',
              transform: 'rotate(1deg)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '900',
                marginBottom: '24px',
                textTransform: 'uppercase'
              }}>
                Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      padding: '10px 20px',
                      fontSize: '1rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      border: '3px solid #000000'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact */}
          {socialLinks.length > 0 && (
            <div style={{ 
              ...brutalistBox,
              gridColumn: 'span 5',
              backgroundColor: accent,
              padding: '40px',
              transform: 'rotate(-1deg)'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '900',
                marginBottom: '24px',
                textTransform: 'uppercase'
              }}>
                Links
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '800',
                      color: '#000000',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      borderBottom: '3px solid #000000',
                      paddingBottom: '4px',
                      display: 'inline-block'
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
