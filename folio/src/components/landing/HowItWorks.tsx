const steps = [
  {
    num: '01',
    title: 'Paste your LinkedIn URL',
    desc: 'We extract your profile data automatically — name, headline, experience, skills, and bio.',
  },
  {
    num: '02',
    title: 'Pick a template',
    desc: 'Choose from 5 professionally designed templates. Free users get 3, Pro users get all 5.',
  },
  {
    num: '03',
    title: 'Deploy instantly',
    desc: 'Your personal website goes live on a custom URL in seconds. Share it anywhere.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '80px 48px', backgroundColor: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', textAlign: 'center', marginBottom: '64px' }}>
          Three steps to your personal website
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {steps.map((step) => (
            <div key={step.num} style={{ padding: '32px', backgroundColor: 'var(--bg3)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--gold)', fontSize: '0.8rem', marginBottom: '16px' }}>{step.num}</p>
              <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.2rem', marginBottom: '12px' }}>{step.title}</h3>
              <p style={{ color: 'var(--cream-dim)', lineHeight: '1.6', fontSize: '0.95rem' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
