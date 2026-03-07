type TemplatePreview = 'impact' | 'terminal' | 'brutalist';

interface TemplateItem {
  name: string;
  tag: 'Light' | 'Dark';
  preview: TemplatePreview;
}

const templates: TemplateItem[] = [
  { name: 'Impact Report', tag: 'Light', preview: 'impact' },
  { name: 'Terminal Hacker', tag: 'Dark', preview: 'terminal' },
  { name: 'Brutalist Grid', tag: 'Light', preview: 'brutalist' },
];

function MockPreview({ preview }: { preview: TemplatePreview }) {
  if (preview === 'impact') {
    return (
      <div
        style={{
          height: '170px',
          backgroundColor: 'var(--cream)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '32px',
            backgroundColor: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '9px',
              backgroundColor: 'var(--gold)',
              borderRadius: '2px',
            }}
          />
          <div style={{ flex: 1 }} />
          <div
            style={{
              width: '28px',
              height: '6px',
              backgroundColor: 'var(--bg3)',
              borderRadius: '2px',
            }}
          />
          <div
            style={{
              width: '28px',
              height: '6px',
              backgroundColor: 'var(--bg3)',
              borderRadius: '2px',
            }}
          />
          <div
            style={{
              width: '28px',
              height: '6px',
              backgroundColor: 'var(--bg3)',
              borderRadius: '2px',
            }}
          />
        </div>
        <div style={{ padding: '14px' }}>
          <div
            style={{
              width: '55%',
              height: '12px',
              backgroundColor: 'var(--bg)',
              borderRadius: '2px',
              marginBottom: '8px',
            }}
          />
          <div
            style={{
              width: '80%',
              height: '7px',
              backgroundColor: 'var(--bg3)',
              borderRadius: '2px',
              marginBottom: '5px',
            }}
          />
          <div
            style={{
              width: '65%',
              height: '7px',
              backgroundColor: 'var(--bg3)',
              borderRadius: '2px',
              marginBottom: '14px',
            }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <div
              style={{
                width: '52px',
                height: '18px',
                backgroundColor: 'var(--bg)',
                borderRadius: '4px',
              }}
            />
            <div
              style={{
                width: '40px',
                height: '18px',
                backgroundColor: 'var(--bg3)',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (preview === 'terminal') {
    return (
      <div
        style={{
          height: '170px',
          backgroundColor: 'var(--bg)',
          overflow: 'hidden',
          position: 'relative',
          padding: '14px',
          fontFamily: 'var(--font-dm-mono)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '5px',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg3)',
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg3)',
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--gold)',
            }}
          />
        </div>
        <div style={{ fontSize: '0.58rem', color: 'var(--gold)', lineHeight: '2' }}>
          <div>$ whoami</div>
          <div>naman_shiroha</div>
          <div style={{ color: 'var(--cream-dim)' }}>$ cat portfolio.json</div>
          <div>{`{ "status": "online" }`}</div>
          <div style={{ color: 'var(--cream-dim)' }}>▌</div>
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
            pointerEvents: 'none',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        height: '170px',
        backgroundColor: 'var(--cream)',
        overflow: 'hidden',
        position: 'relative',
        backgroundImage:
          'radial-gradient(circle, var(--cream-dim) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
    >
      <div style={{ padding: '14px' }}>
        <div
          style={{
            fontSize: '1.1rem',
            fontFamily: 'var(--font-playfair)',
            color: 'var(--bg)',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          PORTFOLIO
        </div>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
          <div
            style={{ width: '48px', height: '4px', backgroundColor: 'var(--bg)' }}
          />
          <div
            style={{ width: '28px', height: '4px', backgroundColor: 'var(--gold)' }}
          />
        </div>
        <div
          style={{
            width: '70%',
            height: '6px',
            backgroundColor: 'var(--bg3)',
            borderRadius: '1px',
            marginBottom: '5px',
          }}
        />
        <div
          style={{
            width: '50%',
            height: '6px',
            backgroundColor: 'var(--bg3)',
            borderRadius: '1px',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40px',
          backgroundColor: 'var(--bg)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'var(--gold)',
          }}
        />
        <div
          style={{
            width: '32px',
            height: '6px',
            backgroundColor: 'var(--cream-dim)',
            borderRadius: '1px',
          }}
        />
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: TemplateItem }) {
  return (
    <div
      style={{
        width: '280px',
        flexShrink: 0,
        backgroundColor: 'var(--bg2)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <MockPreview preview={template.preview} />
      <div
        style={{
          padding: '16px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--cream)',
            margin: 0,
          }}
        >
          {template.name}
        </p>
        <span
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.08em',
            color: template.tag === 'Dark' ? 'var(--gold)' : 'var(--cream-dim)',
            border: `1px solid ${template.tag === 'Dark' ? 'var(--gold)' : 'var(--cream-dim)'}`,
            padding: '3px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase',
          }}
        >
          {template.tag}
        </span>
      </div>
    </div>
  );
}

const row1Cards = [...templates, ...templates];
const row2Cards = [...templates, ...templates];

export function Templates() {
  return (
    <section style={{ padding: '100px 0', backgroundColor: 'var(--bg)' }}>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .templates-scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        style={{
          textAlign: 'center',
          padding: '0 48px',
          marginBottom: '56px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            color: 'var(--cream)',
            fontWeight: 700,
            marginBottom: '12px',
            margin: '0 0 12px',
          }}
        >
          Start With a Template
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans)',
            color: 'var(--cream-dim)',
            fontSize: '1rem',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Professionally designed starting points. Customize every detail to make it yours.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div
          className="templates-scroll-track"
          style={{
            display: 'flex',
            width: 'max-content',
            gap: '20px',
            animation: 'scroll-left 30s linear infinite',
            paddingLeft: '20px',
          }}
        >
          {row1Cards.map((t, i) => (
            <TemplateCard key={`r1-${t.name}-${i}`} template={t} />
          ))}
        </div>

        <div
          className="templates-scroll-track"
          style={{
            display: 'flex',
            width: 'max-content',
            gap: '20px',
            animation: 'scroll-right 30s linear infinite',
            paddingLeft: '20px',
          }}
        >
          {row2Cards.map((t, i) => (
            <TemplateCard key={`r2-${t.name}-${i}`} template={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
