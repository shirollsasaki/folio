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
        @keyframes hero-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes hero-morph {
          0% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
          100% { border-radius: 50% 50% 40% 60% / 50% 50% 50% 50%; }
        }
        @keyframes hero-spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes hero-eq {
          0%, 100% { height: 6px; }
          50% { height: 14px; }
        }
        @keyframes hero-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1400px;
          width: 100%;
          align-items: center;
        }

        .hero-header-meta {
          font-size: 0.85rem;
          color: var(--cream-dim);
          font-family: var(--font-dm-sans);
          margin-bottom: 2rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .hero-transcript {
          font-size: 2.25rem;
          line-height: 1.3;
          font-weight: 500;
          font-family: var(--font-dm-sans);
          color: var(--cream-dim);
          margin-bottom: 3rem;
          max-width: 600px;
          position: relative;
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
          mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
        }

        .hero-highlight {
          color: var(--cream);
        }

        .hero-trust {
          margin-top: 16px;
          font-size: 0.8rem;
          color: var(--cream-dim);
          font-family: var(--font-dm-sans);
        }

        .hero-orb-column {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-orb-container {
          width: 500px;
          height: 500px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: hero-breathe 8s ease infinite;
        }

        .hero-orb-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,240,245,0.8) 0%, transparent 70%);
          z-index: -1;
        }

        .hero-orb-base {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
          background: radial-gradient(circle at 30% 30%, #FFF5F0 0%, #FFE4E1 40%, #FFEBCD 100%);
          box-shadow:
            inset 10px 10px 40px rgba(255,255,255,0.8),
            inset -10px -10px 40px rgba(255,218,185,0.4),
            20px 20px 60px rgba(255,228,225,0.4);
          animation: hero-morph 12s ease alternate infinite;
          filter: blur(1px);
        }

        .hero-orb-vein {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,160,122,0.3);
          transform: rotate(45deg);
          clip-path: ellipse(60% 80% at 50% 50%);
          animation: hero-spin-slow linear infinite;
        }

        .hero-status-pill {
          margin-top: 3rem;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--cream-dim);
          font-family: var(--font-dm-sans);
          opacity: 0;
          animation: hero-fade-in 1s 1s forwards;
        }

        .hero-equalizer {
          display: flex;
          gap: 3px;
          height: 16px;
          align-items: center;
        }

        .hero-bar {
          width: 3px;
          background-color: var(--cream-dim);
          border-radius: 4px;
          animation: hero-eq 1.2s ease infinite;
        }

        .hero-bar:nth-child(1) {
          animation-delay: 0s;
          height: 6px;
        }

        .hero-bar:nth-child(2) {
          animation-delay: 0.1s;
          height: 12px;
        }

        .hero-bar:nth-child(3) {
          animation-delay: 0.2s;
          height: 8px;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-orb-container {
            width: 300px;
            height: 300px;
          }
          .hero-orb-base {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>

      <div className="hero-grid">
        <div>
          <p className="hero-header-meta">FOLIO · PERSONAL WEBSITE</p>
          <div className="hero-transcript">
            <span className="hero-highlight">Build Your Personal Website in Minutes.</span>
            {' '}Turn your profile into a stunning personal site. Pick a template, customize,
            <span style={{ color: 'var(--cream-dim)' }}> and go live in minutes.</span>
          </div>
          <a
            href="/folio/sign-up"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--gold)',
              color: '#FFFFFF',
              padding: '16px 40px',
              borderRadius: '100px',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            Get Started →
          </a>
          <p className="hero-trust">No credit card required · Deploy in seconds</p>
        </div>

        <div className="hero-orb-column">
          <div className="hero-orb-container">
            <div className="hero-orb-glow" />
            <div className="hero-orb-base" />
            <div
              className="hero-orb-vein"
              style={{ width: '380px', height: '380px', animationDuration: '25s' }}
            />
            <div
              className="hero-orb-vein"
              style={{
                width: '360px',
                height: '360px',
                animationDuration: '20s',
                borderColor: 'rgba(255,255,255,0.6)',
              }}
            />
          </div>
          <div className="hero-status-pill">
            <span>Building portfolios</span>
            <div className="hero-equalizer">
              <div className="hero-bar" />
              <div className="hero-bar" />
              <div className="hero-bar" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
