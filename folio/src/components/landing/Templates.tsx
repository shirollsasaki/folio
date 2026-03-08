import { templates } from '@/lib/templates';
import LumoButton from '@/components/lumo/LumoButton';

export function Templates() {
  return (
    <section 
      className="py-24 px-8"
      style={{ backgroundColor: 'var(--lumo-bg-base)' }}
    >
      <style>{`
        .templates-deck {
          scrollbar-width: none;
        }
        .templates-deck::-webkit-scrollbar {
          display: none;
        }
        .template-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .template-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(230, 126, 34, 0.15);
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 
            className="font-serif text-3xl md:text-4xl font-normal tracking-tight"
            style={{ color: 'var(--lumo-text)' }}
          >
            Start with a template
          </h2>
          <p 
            className="font-mono text-sm"
            style={{ color: 'var(--lumo-text-muted)' }}
          >
            Professionally designed starting points. Customize every detail.
          </p>
        </div>

        <div
          className="templates-deck"
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '24px',
            paddingBottom: '24px',
          }}
        >
          {templates.map((entry) => (
            <div
              key={entry.meta.slug}
              className="template-card"
              style={{
                flexShrink: 0,
                width: '300px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(74, 44, 42, 0.1)',
                backgroundColor: 'var(--lumo-bg-base)',
                overflow: 'hidden',
                border: '1px solid var(--lumo-text-muted)33',
              }}
            >
              <div
                style={{
                  width: 300,
                  height: 200,
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <iframe
                  src={`/preview/${entry.meta.slug}`}
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
                  className="font-mono text-sm font-medium"
                  style={{ color: 'var(--lumo-text)', margin: 0 }}
                >
                  {entry.meta.name}
                </p>
                <span
                  className="font-mono text-[0.6rem] uppercase tracking-wider px-2 py-1 rounded border"
                  style={{
                    color: entry.meta.tag === 'dark' ? 'var(--lumo-accent)' : 'var(--lumo-text-muted)',
                    borderColor: entry.meta.tag === 'dark' ? 'var(--lumo-accent)' : 'var(--lumo-text-muted)' + '66',
                  }}
                >
                  {entry.meta.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <LumoButton href="/templates" variant="secondary">
            View All Templates
          </LumoButton>
        </div>
      </div>
    </section>
  );
}
