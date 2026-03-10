'use client';

import { useState, useEffect } from 'react';

type WaitlistStatus = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

const scrollToWaitlist = () => {
  document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });
};

export function WarmGreyLanding() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<WaitlistStatus>('idle');
  const [waitlistCount, setWaitlistCount] = useState<number>(1200);
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    fetch('/folio/api/waitlist/count')
      .then(res => res.json())
      .then((data: { count?: number }) => {
        if (data.count) setWaitlistCount(data.count);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/folio/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json() as { success?: boolean; message?: string; error?: string; position?: number; status?: 'new' | 'duplicate' };
      if (data.success) {
        if (data.status === 'duplicate') {
          setStatus('duplicate');
        } else {
          setStatus('success');
          if (data.position) {
            setPosition(data.position);
            setWaitlistCount(data.position);
          }
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="app-frame" style={{ minHeight: 'auto', height: 'auto' }}>
      <div className="app-tabs">
        <a href="/folio" className="app-tab active">Home</a>
        <a href="#how" className="app-tab" onClick={(e) => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }); }}>How It Works</a>
        <a href="#features" className="app-tab" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</a>
        <a href="#pricing" className="app-tab" onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}>Pricing</a>
      </div>
      
      <div className="app-body" style={{ display: 'block', overflow: 'visible' }}>
        <section className="hero-section">
          <div className="landing-hero">
            <div className="flex gap-xs justify-center mb-l">
              <span className="tag">AUTO-SYNC</span>
              <span className="tag">NO CODE</span>
            </div>
            
            <h1>Your LinkedIn,<br />deployed.</h1>
            
            <p>
              Turn your LinkedIn profile into a stunning personal website in minutes. 
              No coding required. Auto-syncs when you update LinkedIn.
            </p>
            
            <form
              id="waitlist-form"
              onSubmit={handleSubmit}
              className="form-waitlist"
            >
              <label htmlFor="waitlist-email" className="sr-only">Email address</label>
              <input
                id="waitlist-email"
                type="email"
                className="input input-large"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                required
                aria-label="Email address"
                style={{ maxWidth: '320px', flex: '1' }}
              />
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={status === 'loading' || status === 'success'}
                aria-label="Join waitlist"
              >
                {status === 'loading' ? (
                  <><span className="spinner" aria-hidden="true" />Joining...</>
                ) : status === 'success' ? '✓ You\'re in' : 'Join Waitlist →'}
              </button>
            </form>
            <div role="status" aria-live="polite">
              {status === 'success' && (
                <p className="hero-status">
                  {position ? `You're #${position.toLocaleString()} in line!` : "You're on the list!"} We'll reach out when we launch.
                </p>
              )}
              {status === 'duplicate' && (
                <p className="hero-status">
                  You're already on the list! We'll reach out when we launch.
                </p>
              )}
              {status === 'error' && (
                <p className="hero-status error">
                  Something went wrong. Please try again.
                </p>
              )}
              
              {status === 'idle' && (
                <p className="hero-counter">
                  {waitlistCount.toLocaleString()}+ people on the waitlist
                </p>
              )}
            </div>
          </div>

          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <div className="scroll-indicator-line" />
          </div>
        </section>

        <section id="how" className="section section-bordered">
          <div className="section-content">
            <div className="section-header">
              <span className="tag tag-filled">01</span>
              <h2 className="text-2xl">How It Works</h2>
            </div>
            
            <div className="grid-3">
              <div className="card">
                <div className="card-body">
                  <div className="step-circle">1</div>
                  <h3 className="text-lg font-medium mb-s">Connect LinkedIn</h3>
                  <p className="text-secondary">
                    Import your profile data in one click. Work history, skills, and experience flow directly into your site.
                  </p>
                </div>
              </div>
              
              <div className="card">
                <div className="card-body">
                  <div className="step-circle">2</div>
                  <h3 className="text-lg font-medium mb-s">Choose Your Template</h3>
                  <p className="text-secondary">
                    Pick from professionally designed templates. Light or dark, minimal or bold.
                  </p>
                </div>
              </div>
              
              <div className="card">
                <div className="card-body">
                  <div className="step-circle">3</div>
                  <h3 className="text-lg font-medium mb-s">Deploy Instantly</h3>
                  <p className="text-secondary">
                    Your site goes live on a global CDN. Updates to LinkedIn sync automatically. Zero maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section section-bordered section-tinted">
          <div className="section-content">
            <div className="section-header">
              <span className="tag tag-filled">02</span>
              <h2 className="text-2xl">Features</h2>
            </div>
            
            <div className="grid-3">
              {[
                { icon: '↻', title: 'Auto-Sync', desc: 'Website updates when LinkedIn changes. Set it once, forget it.' },
                { icon: '⬡', title: 'Custom Domains', desc: 'Bring your own or use ours. SSL configured automatically.' },
                { icon: '⚡', title: 'Global CDN', desc: 'Fast hosting worldwide. Loads in milliseconds.' },
                { icon: '✦', title: 'Clean Templates', desc: 'Minimal designs. Your work front and center.' },
                { icon: '↑', title: 'SEO Ready', desc: 'Meta tags, structured data, clean URLs. Built to rank.' },
                { icon: '○', title: 'Zero Maintenance', desc: 'No CMS. No plugins. No server management.' },
              ].map((feature) => (
                <div key={feature.title} className="card">
                  <div className="card-body">
                    <span className="feature-icon">{feature.icon}</span>
                    <h3 className="text-lg font-medium mb-xs">{feature.title}</h3>
                    <p className="text-secondary text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="section section-bordered">
          <div className="pricing-content">
            <div className="section-header">
              <span className="tag tag-filled">03</span>
              <h2 className="text-2xl">Pricing</h2>
            </div>
            
            <div className="card card-featured">
              <div className="card-body pricing-card-body">
                <span className="tag tag-filled pricing-badge">
                  Coming Soon
                </span>
                <p className="text-secondary text-sm mb-xs">Pro</p>
                <p className="text-3xl font-medium mb-m">$12<span className="text-secondary text-sm">/month</span></p>
                <ul className="pricing-list">
                  <li>Custom domain</li>
                  <li>All 15 templates</li>
                  <li>AI bio cleanup</li>
                  <li>LinkedIn auto-sync</li>
                  <li>Email support</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={scrollToWaitlist}
                >
                  Join Waitlist →
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-bordered section-centered">
          <h2 className="text-2xl mb-s">Ready to launch your site?</h2>
          <p className="text-secondary mb-l">Join thousands of professionals with their own personal website.</p>
          <button 
            type="button"
            className="btn btn-primary btn-large"
            onClick={scrollToWaitlist}
          >
            Join Waitlist →
          </button>
        </section>

        <footer className="landing-footer">
          <span className="font-semibold">folio</span>
          <span className="text-secondary text-sm">By After App Studios</span>
        </footer>
      </div>
    </div>
  );
}
