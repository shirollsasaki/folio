const features = [
  {
    icon: '🔗',
    title: 'LinkedIn Sync',
    description: 'Import your profile in one click. Your experience, skills, and achievements automatically flow in.',
  },
  {
    icon: '🌐',
    title: 'Custom Domain',
    description: 'Use your own domain (yourname.com) or get a free subdomain. Make it truly yours.',
  },
  {
    icon: '🔄',
    title: 'Always Updated',
    description: 'Edit anytime, changes go live instantly. Your portfolio evolves with your career.',
  },
  {
    icon: '📱',
    title: 'Mobile Responsive',
    description: 'Looks perfect on every device. Your visitors get a great experience, guaranteed.',
  },
  {
    icon: '⚡',
    title: 'Fast Deployment',
    description: 'Live in under 10 seconds. No waiting, no complex setup. Just ship it.',
  },
  {
    icon: '✨',
    title: 'Pro Templates',
    description: 'Premium designs that stand out. Built by designers who care about details.',
  },
];

export function Features() {
  return (
    <section style={{ padding: '120px 48px', backgroundColor: 'var(--bg3)' }}>
      <style>{`
        .feat-card {
          background: var(--bg);
          border-radius: 20px;
          border: 1px solid var(--border);
          padding: 36px 32px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .feat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.08);
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Features
          </p>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--cream)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Everything you need, nothing you don&apos;t
          </h2>
          <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', fontSize: '1rem' }}>
            Powerful features that make portfolio building effortless.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {features.map((feature) => (
            <div key={feature.title} className="feat-card">
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>{feature.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                {feature.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', lineHeight: 1.65, fontSize: '0.92rem' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
