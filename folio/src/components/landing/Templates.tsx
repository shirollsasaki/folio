import { templates } from '@/lib/templates';

export function Templates() {
  return (
    <section id="templates" style={{ padding: '100px 0', backgroundColor: 'var(--bg)' }}>
      <style>{`
        .templates-deck {
          scrollbar-width: none;
        }
        .templates-deck::-webkit-scrollbar {
          display: none;
        }
        .template-card {
          transition: transform 0.3s ease;
        }
        .template-card:hover {
          transform: translateY(-8px);
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
        className="templates-deck"
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '24px',
          padding: '0 48px 24px',
        }}
      >
        {templates.map((entry) => (
          <div
            key={entry.meta.slug}
            className="template-card"
            style={{
              flexShrink: 0,
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              backgroundColor: 'var(--bg)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                width: 300,
                height: 200,
                overflow: 'hidden',
                borderRadius: '24px 24px 0 0',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <iframe
                src={`/folio/preview/${entry.meta.slug}`}
                title={entry.meta.name}
                style={{
                  border: 'none',
                  width: 1200,
                  height: 800,
                  transform: 'scale(0.25)',
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                }}
              />
            </div>

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
                {entry.meta.name}
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  color: entry.meta.tag === 'dark' ? 'var(--gold)' : 'var(--cream-dim)',
                  border: `1px solid ${entry.meta.tag === 'dark' ? 'var(--gold)' : 'var(--cream-dim)'}`,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                }}
              >
                {entry.meta.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
