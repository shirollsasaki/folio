import type { TemplateProps } from '@/types/template';

const SCANLINE_CSS = `
  @keyframes crt-scan {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
  }
  .crt-lines {
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.12) 2px,
      rgba(0,0,0,0.12) 4px
    );
    pointer-events: none;
  }
  @media (max-width: 600px) {
    .terminal-window {
      margin-bottom: 12px !important;
    }
  }
`;

interface WindowProps {
  title: string;
  children: React.ReactNode;
  accent: string;
}

function TerminalWindow({ title, children, accent }: WindowProps) {
  return (
    <div
      style={{
        border: `1px solid ${accent}`,
        marginBottom: '20px',
        boxShadow: `0 0 12px rgba(0,0,0,0.6), 0 0 4px ${accent}44`,
      }}
      className="terminal-window"
    >
      <div
        style={{
          backgroundColor: '#000080',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${accent}`,
        }}
      >
        <span
          style={{
            color: '#FFFFFF',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </span>
        <span
          style={{
            color: '#FFFF00',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            cursor: 'default',
            userSelect: 'none',
          }}
        >
          [ × ]
        </span>
      </div>

      <div
        style={{
          backgroundColor: '#0A0035',
          padding: '16px',
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: '0.88rem',
          color: '#FFFFFF',
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface LineProps {
  children: React.ReactNode;
  color?: string;
  dimmed?: boolean;
}

function Line({ children, color, dimmed }: LineProps) {
  return (
    <div
      style={{
        color: dimmed ? 'rgba(255,255,255,0.55)' : color ?? '#FFFFFF',
        margin: '2px 0',
        wordBreak: 'break-word',
      }}
    >
      {children}
    </div>
  );
}

function Prompt({ cmd }: { cmd: string }) {
  return (
    <Line>
      <span style={{ color: '#00FFFF' }}>$</span>{' '}
      <span style={{ color: '#FFFFFF' }}>{cmd}</span>
    </Line>
  );
}

function Output({ children }: { children: React.ReactNode }) {
  return (
    <Line dimmed={false}>
      <span style={{ color: 'rgba(255,255,255,0.55)' }}>&gt; </span>
      {children}
    </Line>
  );
}

export default function TerminalHacker({ profile, accentColor }: TemplateProps) {
  const accent = accentColor ?? '#FFFF00';

  const socialLinks = [
    profile.linkedin_url && { label: 'LinkedIn', url: profile.linkedin_url },
    profile.twitter_url && { label: 'Twitter', url: profile.twitter_url },
    profile.github_url && { label: 'GitHub', url: profile.github_url },
    profile.instagram_url && { label: 'Instagram', url: profile.instagram_url },
    profile.youtube_url && { label: 'YouTube', url: profile.youtube_url },
    profile.website_url && { label: 'Website', url: profile.website_url },
    ...profile.custom_links,
  ].filter(Boolean) as { label: string; url: string }[];

  const hasSocialLinks = socialLinks.length > 0;

  return (
    <>
      <style>{SCANLINE_CSS}</style>
      <div
        style={{
          backgroundColor: '#0000AA',
          minHeight: '100vh',
          position: 'relative',
          fontFamily: "'Courier New', Courier, monospace",
        }}
      >
        <div
          className="crt-lines"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '900px',
            margin: '0 auto',
            padding: '32px 16px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '28px',
              color: accent,
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.8,
            }}
          >
            ██████╗ ██████╗ ██╗      ██████╗{' '}
            <span style={{ color: '#00FFFF' }}>FOLIO OS v1.0</span>
            {' '}██████╗
          </div>

          <TerminalWindow title="[terminal@folio ~]$" accent={accent}>
            <Prompt cmd="whoami" />
            <Output>{profile.name}</Output>
            <div style={{ marginTop: '8px' }}>
              <Prompt cmd="cat headline.txt" />
              <Output>{profile.headline}</Output>
            </div>
            {profile.location && (
              <div style={{ marginTop: '8px' }}>
                <Prompt cmd="cat location.txt" />
                <Output>{profile.location}</Output>
              </div>
            )}
          </TerminalWindow>

          <TerminalWindow title="[about.txt]" accent={accent}>
            <Prompt cmd="cat bio.txt" />
            <div
              style={{
                color: 'rgba(255,255,255,0.85)',
                marginTop: '6px',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {profile.bio}
            </div>
          </TerminalWindow>

          {profile.skills.length > 0 && (
            <TerminalWindow title="[ls ./skills/]" accent={accent}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '4px',
                }}
              >
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      color: '#00FFFF',
                      padding: '2px 0',
                      fontSize: '0.85rem',
                      minWidth: '160px',
                    }}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>./</span>
                    {skill}
                  </span>
                ))}
              </div>
            </TerminalWindow>
          )}

          {profile.experience.length > 0 && (
            <TerminalWindow title="[syslog --jobs]" accent={accent}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {profile.experience.map((exp, idx) => (
                  <div key={`${exp.company}-${exp.title}-${idx}`}>
                    <Line>
                      <span style={{ color: 'rgba(255,255,255,0.45)' }}>[{exp.dates}]</span>{' '}
                      <span style={{ color: accent }}>HIRED:</span>{' '}
                      <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{exp.title}</span>
                      <span style={{ color: 'rgba(255,255,255,0.55)' }}> @ </span>
                      <span style={{ color: '#00FFFF' }}>{exp.company}</span>
                    </Line>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          )}

          {hasSocialLinks && (
            <TerminalWindow title="[connect.sh]" accent={accent}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {socialLinks.map((link) => (
                  <Line key={link.label}>
                    <span style={{ color: '#00FFFF' }}>$</span>{' '}
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>ssh -link</span>{' '}
                    <span style={{ color: accent }}>{link.label}</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}> -{'>'} </span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#00FFFF',
                        textDecoration: 'underline',
                        textDecorationColor: 'rgba(0,255,255,0.4)',
                        wordBreak: 'break-all',
                      }}
                    >
                      {link.url}
                    </a>
                  </Line>
                ))}
              </div>
            </TerminalWindow>
          )}

          <div
            style={{
              textAlign: 'center',
              marginTop: '24px',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
            }}
          >
            <span style={{ color: accent }}>■</span> SESSION ACTIVE —{' '}
            {profile.name.toUpperCase()} © 2026{' '}
            <span style={{ color: accent }}>■</span>
          </div>
        </div>
      </div>
    </>
  );
}
