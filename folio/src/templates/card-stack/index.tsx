import type { TemplateProps } from '@/types/template';

export default function CardStack({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#EF4444';

  const socialLinks = [
    profile.linkedin_url ? { label: 'LinkedIn', url: profile.linkedin_url } : null,
    profile.twitter_url ? { label: 'Twitter', url: profile.twitter_url } : null,
    profile.github_url ? { label: 'GitHub', url: profile.github_url } : null,
    profile.instagram_url ? { label: 'Instagram', url: profile.instagram_url } : null,
    profile.youtube_url ? { label: 'YouTube', url: profile.youtube_url } : null,
    profile.website_url ? { label: 'Website', url: profile.website_url } : null,
    ...profile.custom_links,
  ].filter((l): l is { label: string; url: string } => l !== null && Boolean(l.url));

  const cardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    padding: '48px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
    marginBottom: '24px',
    border: '1px solid #F0F0F0'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: `linear-gradient(135deg, ${accent}15, #F0F0F0)`,
      padding: '40px 24px'
    }}>
      <div style={{ 
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        {/* Hero Card */}
        <div style={{ 
          ...cardStyle,
          background: `linear-gradient(135deg, ${accent}, ${accent}CC)`,
          color: '#FFFFFF',
          transform: 'rotate(-2deg)',
          marginBottom: '40px'
        }}>
          <div style={{ 
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '24px',
            border: '4px solid rgba(255, 255, 255, 0.3)'
          }}>
            {profile.name.charAt(0)}
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
            fontWeight: '800', 
            margin: '0 0 16px 0',
            lineHeight: 1.1
          }}>
            {profile.name}
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', 
            margin: '0',
            opacity: 0.95,
            fontWeight: '500'
          }}>
            {profile.headline}
          </p>
        </div>

        {/* Bio Card */}
        <div style={{ 
          ...cardStyle,
          transform: 'rotate(1deg)'
        }}>
          <div style={{ 
            display: 'inline-block',
            backgroundColor: `${accent}15`,
            color: accent,
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '20px'
          }}>
            About
          </div>
          <p style={{ 
            fontSize: '1.25rem', 
            lineHeight: '1.8',
            color: '#333333',
            margin: 0
          }}>
            {profile.bio}
          </p>
        </div>

        {/* Experience Cards */}
        {profile.experience.map((exp, idx) => (
          <div 
            key={idx}
            style={{ 
              ...cardStyle,
              transform: `rotate(${idx % 2 === 0 ? '-1deg' : '1deg'})`
            }}
          >
            <div style={{ 
              fontSize: '0.875rem',
              color: accent,
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}>
              {exp.dates}
            </div>
            <h3 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700',
              marginBottom: '8px',
              color: '#1A1A1A'
            }}>
              {exp.title}
            </h3>
            <div style={{ 
              fontSize: '1.25rem',
              color: '#666666',
              fontWeight: '600'
            }}>
              {exp.company}
            </div>
          </div>
        ))}

        {/* Skills Card */}
        {profile.skills.length > 0 && (
          <div style={{ 
            ...cardStyle,
            transform: 'rotate(-1deg)'
          }}>
            <div style={{ 
              display: 'inline-block',
              backgroundColor: `${accent}15`,
              color: accent,
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '20px'
            }}>
              Skills
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {profile.skills.map((skill, idx) => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: idx % 3 === 0 ? accent : idx % 3 === 1 ? '#1A1A1A' : '#F5F5F5',
                    color: idx % 3 === 2 ? '#1A1A1A' : '#FFFFFF',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Location Card */}
        {profile.location && (
          <div style={{ 
            ...cardStyle,
            transform: 'rotate(1deg)',
            backgroundColor: `${accent}10`,
            border: `2px dashed ${accent}`
          }}>
            <div style={{ 
              fontSize: '0.875rem',
              color: accent,
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px'
            }}>
              Based in
            </div>
            <div style={{ 
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#1A1A1A'
            }}>
              {profile.location}
            </div>
          </div>
        )}

        {/* Contact Card */}
        {socialLinks.length > 0 && (
          <div style={{ 
            ...cardStyle,
            transform: 'rotate(-1deg)',
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF'
          }}>
            <div style={{ 
              display: 'inline-block',
              backgroundColor: accent,
              color: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '20px'
            }}>
              Connect
            </div>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
                    fontWeight: '600',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = accent}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
