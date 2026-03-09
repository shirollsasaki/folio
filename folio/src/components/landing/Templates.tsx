import { templates } from '@/lib/templates';

export function Templates() {
  return (
    <section id="templates" style={{ padding: '120px 0', backgroundColor: 'var(--bg)' }}>
      <style>{`
        .templates-deck { scrollbar-width: none; }
        .templates-deck::-webkit-scrollbar { display: none; }
        .template-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }
        .template-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.12) !important;
        }
        .template-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(17,17,17,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
          border-radius: 24px 24px 0 0;
          pointer-events: none;
        }
        .template-card:hover .template-overlay { opacity: 1; }
        .template-overlay-text {
          font-family: var(--font-dm-sans);
          font-size: 0.9rem;
          font-weight: 600;
          color: #FFFFFF;
          background: var(--gold);
          padding: 10px 24px;
          border-radius: 100px;
        }
      `}</style>

      <div style={{ textAlign: 'center', padding: '0 48px', marginBottom: '64px' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
          Templates
        </p>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--cream)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 14px' }}>
          Start With a Template
        </h2>
        <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
          Professionally designed starting points. Customize every detail to make it yours.
        </p>
      </div>

      <div className="templates-deck" style={{ display: 'flex', overflowX: 'auto', gap: '24px', padding: '0 48px 32px' }}>
        {templates.map((entry) => (
          <div
            key={entry.meta.slug}
            className="template-card"
            style={{ flexShrink: 0, borderRadius: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.07)', backgroundColor: 'var(--bg)', overflow: 'hidden', border: '1px solid var(--border)', width: 300 }}
          >
            <div style={{ width: 300, height: 400, overflow: 'hidden', borderRadius: '24px 24px 0 0', position: 'relative', flexShrink: 0, backgroundColor: 'var(--bg3)' }}>
              <iframe
                src={`/folio/preview/${entry.meta.slug}`}
                title={entry.meta.name}
                style={{ border: 'none', width: 1200, height: 1600, transform: 'scale(0.25)', transformOrigin: 'top left', pointerEvents: 'none' }}
              />
              <div className="template-overlay">
                <span className="template-overlay-text">Preview →</span>
              </div>
            </div>
            <div style={{ padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--cream)', margin: 0 }}>
                {entry.meta.name}
              </p>
              <span style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.08em',
                color: entry.meta.tag === 'dark' ? 'var(--gold)' : 'var(--cream-dim)',
                border: `1px solid ${entry.meta.tag === 'dark' ? 'var(--border-gold)' : 'var(--border)'}`,
                padding: '3px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase',
              }}>
                {entry.meta.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
