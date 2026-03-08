import type { TemplateProps } from '@/types/template';

export default function MinimalPro({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#0066FF';

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
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#000000' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px' }}>
        {/* Hero */}
        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 6rem)', 
          fontWeight: '300', 
          margin: '0 0 16px 0',
          lineHeight: '1.1',
          letterSpacing: '-0.03em'
        }}>
          {profile.name}
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', 
          color: '#666666',
          fontWeight: '300',
          margin: '0 0 80px 0',
          lineHeight: '1.4'
        }}>
          {profile.headline}
        </p>

        {/* Bio */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            color: accent,
            fontWeight: '600',
            marginBottom: '24px'
          }}>
            About
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            lineHeight: '1.8',
            color: '#333333',
            fontWeight: '300'
          }}>
            {profile.bio}
          </p>
        </div>

        {/* Experience */}
        {profile.experience.length > 0 && (
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              color: accent,
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {profile.experience.map((exp, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '400', marginBottom: '4px' }}>
                    {exp.title}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#666666', marginBottom: '4px' }}>
                    {exp.company}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#999999' }}>
                    {exp.dates}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {profile.skills.length > 0 && (
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              color: accent,
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              Skills
            </h2>
            <div style={{ fontSize: '1.125rem', lineHeight: '2', color: '#333333' }}>
              {profile.skills.join(' · ')}
            </div>
          </div>
        )}

        {/* Contact */}
        {socialLinks.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              color: accent,
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              Connect
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
                    color: '#000000',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = accent}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
