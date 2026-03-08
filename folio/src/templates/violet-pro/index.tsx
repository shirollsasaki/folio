import type { TemplateProps } from '@/types/template';

export default function VioletPro({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#6B21A8';
  const lightViolet = '#A855F7';
  const veryLightViolet = '#E9D5FF';

  const socialLinks = [
    profile.linkedin_url && { label: 'LinkedIn', url: profile.linkedin_url },
    profile.twitter_url && { label: 'Twitter / X', url: profile.twitter_url },
    profile.github_url && { label: 'GitHub', url: profile.github_url },
    profile.instagram_url && { label: 'Instagram', url: profile.instagram_url },
    profile.youtube_url && { label: 'YouTube', url: profile.youtube_url },
    profile.website_url && { label: 'Website', url: profile.website_url },
    ...profile.custom_links,
  ].filter(Boolean) as { label: string; url: string }[];

  const experienceCount = profile.experience.length;
  const skillsCount = profile.skills.length;
  const connectionsCount = socialLinks.length;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F9FAFB',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#1F2937',
      }}
    >
      <header
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, ${lightViolet} 100%)`,
          padding: '64px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '32px',
              flexWrap: 'wrap',
            }}
          >
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={profile.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              />
            )}

            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: '0 0 8px 0',
                  lineHeight: 1.1,
                }}
              >
                {profile.name}
              </h1>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: veryLightViolet,
                  margin: '0',
                  lineHeight: 1.4,
                }}
              >
                {profile.headline}
              </p>
              {profile.location && (
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.8)',
                    margin: '8px 0 0 0',
                  }}
                >
                  📍 {profile.location}
                </p>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '20px',
              marginTop: '32px',
            }}
          >
            {[
              { label: 'Experience', value: experienceCount },
              { label: 'Skills', value: skillsCount },
              { label: 'Connections', value: connectionsCount },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  padding: '20px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <p
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    margin: '0 0 4px 0',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: veryLightViolet,
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '48px 32px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          <div style={{ gridColumn: experienceCount > 0 ? 'span 2' : 'span 1' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                border: '1px solid #E5E7EB',
              }}
            >
              <h2
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: accent,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  margin: '0 0 16px 0',
                }}
              >
                About
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: '#4B5563',
                  margin: 0,
                }}
              >
                {profile.bio}
              </p>
            </div>

            {experienceCount > 0 && (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '32px',
                  marginTop: '24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #E5E7EB',
                }}
              >
                <h2
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: accent,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    margin: '0 0 24px 0',
                  }}
                >
                  Professional Experience
                </h2>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                  }}
                >
                  {profile.experience.map((exp, idx) => (
                    <div
                      key={`${exp.company}-${exp.title}-${idx}`}
                      style={{
                        borderLeft: `3px solid ${lightViolet}`,
                        paddingLeft: '20px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          color: '#111827',
                          margin: '0 0 4px 0',
                        }}
                      >
                        {exp.title}
                      </p>
                      <p
                        style={{
                          fontSize: '0.95rem',
                          color: accent,
                          margin: '0 0 4px 0',
                          fontWeight: 600,
                        }}
                      >
                        {exp.company}
                      </p>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: '#9CA3AF',
                          margin: 0,
                        }}
                      >
                        {exp.dates}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {skillsCount > 0 && (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '32px',
                  marginBottom: '24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #E5E7EB',
                }}
              >
                <h2
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: accent,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    margin: '0 0 16px 0',
                  }}
                >
                  Skills
                </h2>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        display: 'inline-block',
                        backgroundColor: veryLightViolet,
                        color: accent,
                        padding: '8px 16px',
                        borderRadius: '24px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        border: `1px solid ${lightViolet}40`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {connectionsCount > 0 && (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #E5E7EB',
                }}
              >
                <h2
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: accent,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    margin: '0 0 16px 0',
                  }}
                >
                  Connect
                </h2>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        backgroundColor: '#F9FAFB',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        border: '1px solid #E5E7EB',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = lightViolet;
                        e.currentTarget.style.backgroundColor = veryLightViolet + '40';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#E5E7EB';
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: '#374151',
                        }}
                      >
                        {link.label}
                      </span>
                      <span
                        style={{
                          fontSize: '1.2rem',
                          color: lightViolet,
                        }}
                      >
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer
        style={{
          backgroundColor: '#111827',
          padding: '32px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.85rem',
            color: '#9CA3AF',
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} {profile.name} · Powered by Folio
        </p>
      </footer>
    </div>
  );
}
