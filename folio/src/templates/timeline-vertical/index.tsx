import type { TemplateProps } from '@/types/template';

export default function TimelineVertical({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#10B981';

  const socialLinks = [
    profile.linkedin_url ? { label: 'LinkedIn', url: profile.linkedin_url } : null,
    profile.twitter_url ? { label: 'Twitter', url: profile.twitter_url } : null,
    profile.github_url ? { label: 'GitHub', url: profile.github_url } : null,
    profile.instagram_url ? { label: 'Instagram', url: profile.instagram_url } : null,
    profile.youtube_url ? { label: 'YouTube', url: profile.youtube_url } : null,
    profile.website_url ? { label: 'Website', url: profile.website_url } : null,
    ...profile.custom_links,
  ].filter((l): l is { label: string; url: string } => l !== null && Boolean(l.url));

  const timelineItems = [
    { type: 'bio', content: profile.bio },
    ...profile.experience.map(exp => ({ type: 'experience', content: exp })),
    profile.skills.length > 0 ? { type: 'skills', content: profile.skills } : null,
    socialLinks.length > 0 ? { type: 'contact', content: socialLinks } : null,
  ].filter(Boolean);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0F172A',
      color: '#E2E8F0',
      padding: '40px 24px'
    }}>
      {/* Header */}
      <div style={{ 
        maxWidth: '800px',
        margin: '0 auto 80px',
        textAlign: 'center'
      }}>
        <div style={{ 
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent}, #3B82F6)`,
          margin: '0 auto 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: '700',
          color: '#FFFFFF'
        }}>
          {profile.name.charAt(0)}
        </div>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
          fontWeight: '700', 
          margin: '0 0 16px 0',
          background: `linear-gradient(135deg, ${accent}, #3B82F6)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {profile.name}
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', 
          color: '#94A3B8',
          margin: '0'
        }}>
          {profile.headline}
        </p>
      </div>

      {/* Timeline */}
      <div style={{ 
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        paddingLeft: '60px'
      }}>
        {/* Timeline line */}
        <div style={{ 
          position: 'absolute',
          left: '29px',
          top: '0',
          bottom: '0',
          width: '2px',
          background: `linear-gradient(180deg, ${accent}, transparent)`,
          opacity: 0.3
        }} />

        {timelineItems.map((item: any, idx: number) => (
          <div 
            key={idx}
            style={{ 
              position: 'relative',
              marginBottom: '60px',
              paddingBottom: '60px',
              borderBottom: idx < timelineItems.length - 1 ? '1px solid rgba(148, 163, 184, 0.1)' : 'none'
            }}
          >
            {/* Timeline dot */}
            <div style={{ 
              position: 'absolute',
              left: '-60px',
              top: '0',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: accent,
              border: '4px solid #0F172A',
              boxShadow: `0 0 0 4px ${accent}40`
            }} />

            {/* Bio */}
            {item.type === 'bio' && (
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: accent
                }}>
                  About Me
                </h2>
                <p style={{ 
                  fontSize: '1.125rem', 
                  lineHeight: '1.8',
                  color: '#CBD5E1',
                  margin: 0
                }}>
                  {item.content}
                </p>
              </div>
            )}

            {/* Experience */}
            {item.type === 'experience' && (
              <div>
                <div style={{ 
                  fontSize: '0.875rem',
                  color: accent,
                  fontWeight: '600',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {item.content.dates}
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#F1F5F9'
                }}>
                  {item.content.title}
                </h3>
                <div style={{ 
                  fontSize: '1.125rem',
                  color: '#94A3B8',
                  fontWeight: '500'
                }}>
                  {item.content.company}
                </div>
              </div>
            )}

            {/* Skills */}
            {item.type === 'skills' && (
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: accent
                }}>
                  Skills & Expertise
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {item.content.map((skill: string) => (
                    <span
                      key={skill}
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        color: accent,
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        border: `1px solid ${accent}40`
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            {item.type === 'contact' && (
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: accent
                }}>
                  Let's Connect
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {item.content.map((link: any) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        fontSize: '1.125rem', 
                        color: '#94A3B8',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 0',
                        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = accent}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                    >
                      <span style={{ 
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: accent
                      }} />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
