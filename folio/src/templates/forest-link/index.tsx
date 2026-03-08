import type { TemplateProps } from '@/types/template';

export default function ForestLink({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#2D5016';
  const lightGreen = '#3A6B1F';
  const veryLightGreen = '#C8E6C9';

  const socialLinks = [
    profile.linkedin_url && { label: 'LinkedIn', url: profile.linkedin_url },
    profile.twitter_url && { label: 'Twitter / X', url: profile.twitter_url },
    profile.github_url && { label: 'GitHub', url: profile.github_url },
    profile.instagram_url && { label: 'Instagram', url: profile.instagram_url },
    profile.youtube_url && { label: 'YouTube', url: profile.youtube_url },
    profile.website_url && { label: 'Website', url: profile.website_url },
    ...profile.custom_links,
  ].filter(Boolean) as { label: string; url: string }[];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: accent,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(58, 107, 31, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(45, 80, 22, 0.3) 0%, transparent 50%)
        `,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#FFFFFF',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt={profile.name}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: `4px solid ${veryLightGreen}`,
              marginBottom: '24px',
            }}
          />
        )}

        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            margin: '0 0 12px 0',
            color: '#FFFFFF',
            lineHeight: 1.2,
          }}
        >
          {profile.name}
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: veryLightGreen,
            margin: '0 0 8px 0',
            lineHeight: 1.5,
          }}
        >
          {profile.headline}
        </p>

        {profile.location && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.7)',
              margin: '0 0 32px 0',
              fontStyle: 'italic',
            }}
          >
            📍 {profile.location}
          </p>
        )}

        {profile.bio && (
          <p
            style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.7,
              margin: '0 0 40px 0',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {profile.bio}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            marginBottom: '32px',
          }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: lightGreen,
                color: '#FFFFFF',
                padding: '16px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                border: `2px solid ${veryLightGreen}40`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4A7F28';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = lightGreen;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
              }}
            >
              {link.label} →
            </a>
          ))}
        </div>

        {profile.skills.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <p
              style={{
                fontSize: '0.75rem',
                color: veryLightGreen,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '12px',
                fontWeight: 600,
              }}
            >
              Skills
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center',
              }}
            >
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(200, 230, 201, 0.15)',
                    color: veryLightGreen,
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    border: `1px solid ${veryLightGreen}60`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.experience.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <p
              style={{
                fontSize: '0.75rem',
                color: veryLightGreen,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              Experience
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {profile.experience.map((exp, idx) => (
                <div
                  key={`${exp.company}-${exp.title}-${idx}`}
                  style={{
                    backgroundColor: 'rgba(58, 107, 31, 0.5)',
                    padding: '14px 18px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    border: `1px solid ${veryLightGreen}30`,
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: '0 0 4px 0',
                    }}
                  >
                    {exp.title}
                  </p>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: veryLightGreen,
                      margin: '0 0 2px 0',
                    }}
                  >
                    {exp.company}
                  </p>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.6)',
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

        <footer
          style={{
            marginTop: '48px',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          © {new Date().getFullYear()} {profile.name} · Built with Folio
        </footer>
      </div>
    </div>
  );
}
