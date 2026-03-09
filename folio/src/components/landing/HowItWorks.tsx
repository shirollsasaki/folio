const steps = [
  {
    num: '01',
    title: 'Paste your LinkedIn URL',
    desc: 'We extract your profile data automatically — name, headline, experience, skills, and bio. No manual entry.',
    icon: '🔗',
  },
  {
    num: '02',
    title: 'Pick a template',
    desc: 'Choose from professionally designed templates. Each one is crafted to make your work shine.',
    icon: '🎨',
  },
  {
    num: '03',
    title: 'Deploy instantly',
    desc: 'Your personal website goes live on a custom URL in seconds. Share it on LinkedIn, email, anywhere.',
    icon: '🚀',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '120px 48px', backgroundColor: 'var(--bg3)' }}>
      <style>{`
        .hiw-card {
          padding: 40px 36px;
          background: var(--bg);
          border-radius: 24px;
          border: 1px solid var(--border);
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hiw-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.08);
        }
        .hiw-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .hiw-card:hover::before { opacity: 1; }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            How It Works
          </p>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--cream)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Three steps to your personal website
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {steps.map((step) => (
            <div key={step.num} className="hiw-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '3rem', fontWeight: 700, color: 'var(--border)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                  {step.num}
                </span>
                <span style={{ fontSize: '1.8rem' }}>{step.icon}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--cream-dim)', lineHeight: 1.65, fontSize: '0.95rem' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
