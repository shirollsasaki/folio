const stats = [
  { value: '15+', label: 'Templates' },
  { value: '<10s', label: 'Deploy Time' },
  { value: '100%', label: 'Always Synced' },
  { value: '0', label: 'Code Required' },
];

export function Stats() {
  return (
    <section style={{ backgroundColor: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '56px 48px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--gold)', marginBottom: '6px', letterSpacing: '-0.02em' }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem', color: 'var(--cream-dim)', fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
