export function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes hero-fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          max-width: 1200px;
          width: 100%;
          align-items: center;
        }
        .hero-left { animation: hero-fade-in 0.8s ease forwards; }
        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--gold);
          font-family: var(--font-dm-mono);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          background: rgba(232,149,106,0.08);
          border: 1px solid var(--border-gold);
          padding: 6px 14px;
          border-radius: 100px;
        }
        .hero-label-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--gold);
        }
        .hero-heading {
          font-family: var(--font-playfair);
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          line-height: 1.15;
          font-weight: 700;
          color: var(--cream);
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .hero-sub {
          font-family: var(--font-dm-sans);
          font-size: 1.1rem;
          color: var(--cream-dim);
          line-height: 1.65;
          margin-bottom: 2.5rem;
          max-width: 460px;
        }
        .hero-cta-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .hero-btn-primary {
          display: inline-block;
          background: var(--gold);
          color: #FFFFFF;
          padding: 15px 36px;
          border-radius: 100px;
          font-family: var(--font-dm-sans);
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.15s ease;
          box-shadow: 0 4px 20px rgba(232,149,106,0.35);
        }
        .hero-btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }
        .hero-trust { font-size: 0.82rem; color: var(--cream-dim); font-family: var(--font-dm-sans); }
        .hero-right { display: flex; justify-content: center; animation: hero-float 6s ease-in-out infinite; }
        .hero-browser {
          width: 520px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06);
          background: #FFFFFF;
        }
        .hero-browser-bar {
          background: #1a1a1a;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hero-browser-dots { display: flex; gap: 6px; }
        .hero-browser-dot { width: 12px; height: 12px; border-radius: 50%; }
        .hero-browser-url {
          flex: 1;
          background: rgba(255,255,255,0.08);
          border-radius: 6px;
          padding: 5px 12px;
          font-family: var(--font-dm-mono);
          font-size: 0.72rem;
          color: rgba(255,255,255,0.5);
          text-align: center;
        }
        .hero-portfolio-card {
          background: linear-gradient(135deg, #FFF8F5 0%, #FFF0E8 50%, #FFF5F0 100%);
          padding: 40px 36px;
        }
        .hero-avatar {
          width: 64px; height: 64px; border-radius: 50%;
          background: linear-gradient(135deg, var(--gold) 0%, #F4A97B 100%);
          margin-bottom: 20px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-playfair); font-size: 1.4rem; font-weight: 700; color: #FFFFFF;
        }
        .hero-portfolio-name {
          font-family: var(--font-playfair); font-size: 1.6rem; font-weight: 700;
          color: var(--cream); margin-bottom: 6px;
        }
        .hero-portfolio-headline {
          font-family: var(--font-dm-sans); font-size: 0.9rem;
          color: var(--cream-dim); margin-bottom: 24px;
        }
        .hero-portfolio-divider { height: 1px; background: var(--border); margin-bottom: 20px; }
        .hero-portfolio-skills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
        .hero-skill-tag {
          font-family: var(--font-dm-sans); font-size: 0.75rem; font-weight: 500;
          color: var(--gold); background: rgba(232,149,106,0.1);
          border: 1px solid var(--border-gold); padding: 4px 12px; border-radius: 100px;
        }
        .hero-portfolio-exp { display: flex; flex-direction: column; gap: 12px; }
        .hero-exp-item { display: flex; gap: 12px; align-items: flex-start; }
        .hero-exp-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--gold);
          margin-top: 5px; flex-shrink: 0;
        }
        .hero-exp-text {
          font-family: var(--font-dm-sans); font-size: 0.82rem;
          color: var(--cream-dim); line-height: 1.5;
        }
        .hero-exp-company { font-weight: 600; color: var(--cream); }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; gap: 3rem; }
          .hero-right { order: -1; }
          .hero-browser { width: 100%; max-width: 480px; }
        }
        @media (max-width: 640px) {
          .hero-browser { max-width: 340px; }
          .hero-portfolio-card { padding: 28px 24px; }
        }
      `}</style>

      <div className="hero-grid">
        <div className="hero-left">
          <div className="hero-label">
            <span className="hero-label-dot" />
            Folio · Personal Website Builder
          </div>
          <h1 className="hero-heading">
            Your LinkedIn profile,<br />
            turned into a stunning<br />
            personal website.
          </h1>
          <p className="hero-sub">
            Paste your LinkedIn URL. Pick a template. Go live in minutes.
            No design skills needed — just your story.
          </p>
          <div className="hero-cta-row">
            <a href="/folio/sign-up" className="hero-btn-primary">
              Get Started →
            </a>
            <span className="hero-trust">No credit card required · Deploy in seconds</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-browser">
            <div className="hero-browser-bar">
              <div className="hero-browser-dots">
                <div className="hero-browser-dot" style={{ background: '#FF5F57' }} />
                <div className="hero-browser-dot" style={{ background: '#FFBD2E' }} />
                <div className="hero-browser-dot" style={{ background: '#28C840' }} />
              </div>
              <div className="hero-browser-url">yourname.folio.app</div>
            </div>
            <div className="hero-portfolio-card">
              <div className="hero-avatar">A</div>
              <div className="hero-portfolio-name">Alex Chen</div>
              <div className="hero-portfolio-headline">Product Designer at Stripe · San Francisco</div>
              <div className="hero-portfolio-divider" />
              <div className="hero-portfolio-skills">
                <span className="hero-skill-tag">UX Design</span>
                <span className="hero-skill-tag">Figma</span>
                <span className="hero-skill-tag">React</span>
                <span className="hero-skill-tag">Design Systems</span>
              </div>
              <div className="hero-portfolio-exp">
                <div className="hero-exp-item">
                  <div className="hero-exp-dot" />
                  <div className="hero-exp-text">
                    <span className="hero-exp-company">Stripe</span> — Lead Product Designer<br />
                    2022 – Present · 3 yrs
                  </div>
                </div>
                <div className="hero-exp-item">
                  <div className="hero-exp-dot" />
                  <div className="hero-exp-text">
                    <span className="hero-exp-company">Airbnb</span> — Senior Designer<br />
                    2019 – 2022 · 3 yrs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
