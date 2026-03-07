import type { TemplateProps } from '@/types/template';

export default function ImpactReport({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#0055FF';
  const initials = profile.name.charAt(0).toUpperCase();

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

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: '#FAFAFA',
        minHeight: '100vh',
        color: '#333',
      }}
    >
      <header
        style={{
          backgroundColor: '#0A1628',
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.name}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: accent,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
          )}
          <div>
            <h1
              style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#fff',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {profile.name}
            </h1>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.55)',
                margin: '4px 0 0',
              }}
            >
              {profile.headline}
            </p>
          </div>
        </div>
        {profile.location && (
          <p
            style={{
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.45)',
              fontStyle: 'italic',
              textAlign: 'right',
              margin: 0,
            }}
          >
            {profile.location}
          </p>
        )}
      </header>

      <div
        style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {[
          { value: experienceCount, label: 'Experience' },
          { value: skillsCount, label: 'Skills' },
          { value: socialLinks.length, label: 'Profiles' },
        ].map((stat, idx, arr) => (
          <div
            key={stat.label}
            style={{
              flex: '1 1 0',
              maxWidth: '200px',
              padding: '20px 24px',
              textAlign: 'center',
              borderRight: idx < arr.length - 1 ? '1px solid #E5E7EB' : 'none',
            }}
          >
            <span
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: accent,
                lineHeight: 1,
                display: 'block',
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginTop: '4px',
                display: 'block',
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <main
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '40px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
        }}
      >
        <div style={{ flex: '1 1 500px', minWidth: '0' }}>
          <div style={{ marginBottom: '36px' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: accent,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '12px',
                display: 'block',
              }}
            >
              About
            </span>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.75,
                color: '#444',
                margin: 0,
              }}
            >
              {profile.bio}
            </p>
          </div>

          {experienceCount > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: accent,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '12px',
                  display: 'block',
                }}
              >
                Experience
              </span>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {profile.experience.map((exp) => (
                  <li
                    key={`${exp.company}-${exp.title}`}
                    style={{
                      borderLeft: `3px solid ${accent}`,
                      paddingLeft: '16px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: '#111',
                        margin: 0,
                      }}
                    >
                      {exp.company}
                    </p>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#444',
                        margin: '2px 0',
                      }}
                    >
                      {exp.title}
                    </p>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: '#888',
                        margin: 0,
                      }}
                    >
                      {exp.dates}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ flex: '1 1 260px', minWidth: '0' }}>
          {skillsCount > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: accent,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '12px',
                  display: 'block',
                }}
              >
                Skills
              </span>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      display: 'inline-block',
                      border: `1px solid ${accent}`,
                      color: accent,
                      borderRadius: '20px',
                      padding: '4px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {socialLinks.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: accent,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '12px',
                  display: 'block',
                }}
              >
                Connect
              </span>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {socialLinks.map((link) => (
                  <li
                    key={link.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#333',
                      }}
                    >
                      {link.label}
                    </span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.8rem',
                        color: accent,
                        textDecoration: 'none',
                      }}
                    >
                      {link.url} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <footer
        style={{
          backgroundColor: '#0A1628',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.45)',
            margin: 0,
          }}
        >
          {profile.name} © 2026
        </p>
      </footer>
    </div>
  );
}
