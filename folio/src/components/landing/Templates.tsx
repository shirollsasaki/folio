const templatePreviews = [
  { name: 'Ivory Editorial', tag: 'Light', free: true },
  { name: 'Noir Minimal', tag: 'Dark', free: true },
  { name: 'Forest Link', tag: 'Dark', free: true },
  { name: 'Violet Pro', tag: 'Dark', free: false },
  { name: 'Grid Bright', tag: 'Light', free: false },
];

export function Templates() {
  return (
    <section style={{ padding: '80px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', textAlign: 'center', marginBottom: '16px' }}>
          5 templates to choose from
        </h2>
        <p style={{ color: 'var(--cream-dim)', textAlign: 'center', marginBottom: '48px' }}>
          3 free templates. 2 premium templates for Pro and Agency plans.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {templatePreviews.map((t) => (
            <div key={t.name} style={{
              backgroundColor: 'var(--bg2)', borderRadius: '10px', overflow: 'hidden',
              border: '1px solid var(--border)',
            }}>
              <div style={{ height: '140px', backgroundColor: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--cream-dim)', fontSize: '0.8rem' }}>Preview</span>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>{t.name}</p>
                  {!t.free && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--gold)', border: '1px solid var(--border-gold)', padding: '2px 6px', borderRadius: '4px' }}>PRO</span>
                  )}
                </div>
                <p style={{ color: 'var(--cream-dim)', fontSize: '0.75rem', marginTop: '4px' }}>{t.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
