'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
      const data = await res.json() as { success?: boolean; message?: string; error?: string; position?: number };
      if (data.success) {
        if (data.message?.includes('Already')) {
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
        <Link href="/" className="app-tab active">Home</Link>
        <Link href="#how" className="app-tab">How It Works</Link>
        <Link href="#features" className="app-tab">Features</Link>
        <Link href="#pricing" className="app-tab">Pricing</Link>
      </div>
      
      <div className="app-body" style={{ display: 'block', overflow: 'visible' }}>
        <section style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '80px 24px',
          position: 'relative'
        }}>
          <div className="landing-hero">
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
              <span className="tag">FREE</span>
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
              style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '8px' }}
            >
              <input
                type="email"
                className="input input-large"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                required
                style={{ maxWidth: '320px', flex: '1' }}
              />
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? '✓ You\'re in' : 'Join Waitlist →'}
              </button>
            </form>
            {status === 'success' && (
              <p style={{ marginTop: '12px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                {position ? `You're #${position.toLocaleString()} in line!` : "You're on the list!"} We'll reach out when we launch.
              </p>
            )}
            {status === 'duplicate' && (
              <p style={{ marginTop: '12px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                You're already on the list! We'll reach out when we launch.
              </p>
            )}
            {status === 'error' && (
              <p style={{ marginTop: '12px', color: '#cc0000', fontSize: '14px' }}>
                Something went wrong. Please try again.
              </p>
            )}
            
            {status === 'idle' && (
              <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                {waitlistCount.toLocaleString()}+ people on the waitlist
              </p>
            )}
          </div>

          <div style={{ 
            position: 'absolute', 
            bottom: '32px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            fontSize: '13px'
          }}>
            <span>Scroll to explore</span>
            <div style={{ 
              width: '1px', 
              height: '32px', 
              background: 'linear-gradient(to bottom, var(--text-secondary), transparent)' 
            }} />
          </div>
        </section>

        <section id="how" style={{ 
          padding: '80px 48px',
          borderTop: '1px solid var(--border-light)'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '48px' }}>
              <span className="tag tag-filled">01</span>
              <h2 className="text-2xl">How It Works</h2>
            </div>
            
            <div className="grid-3">
              <div className="card">
                <div className="card-body">
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '50%', 
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    fontSize: '20px'
                  }}>1</div>
                  <h3 className="text-lg font-medium mb-s">Connect LinkedIn</h3>
                  <p className="text-secondary">
                    Import your profile data in one click. Work history, skills, and experience flow directly into your site.
                  </p>
                </div>
              </div>
              
              <div className="card">
                <div className="card-body">
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '50%', 
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    fontSize: '20px'
                  }}>2</div>
                  <h3 className="text-lg font-medium mb-s">Choose Your Template</h3>
                  <p className="text-secondary">
                    Pick from professionally designed templates. Light or dark, minimal or bold.
                  </p>
                </div>
              </div>
              
              <div className="card">
                <div className="card-body">
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '50%', 
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    fontSize: '20px'
                  }}>3</div>
                  <h3 className="text-lg font-medium mb-s">Deploy Instantly</h3>
                  <p className="text-secondary">
                    Your site goes live on a global CDN. Updates to LinkedIn sync automatically. Zero maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" style={{ 
          padding: '80px 48px',
          borderTop: '1px solid var(--border-light)',
          backgroundColor: 'rgba(0,0,0,0.02)'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '48px' }}>
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
                    <span style={{ fontSize: '24px', display: 'block', marginBottom: '12px' }}>{feature.icon}</span>
                    <h3 className="text-lg font-medium mb-xs">{feature.title}</h3>
                    <p className="text-secondary text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" style={{ 
          padding: '80px 48px',
          borderTop: '1px solid var(--border-light)'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '48px', justifyContent: 'center' }}>
              <span className="tag tag-filled">03</span>
              <h2 className="text-2xl">Pricing</h2>
            </div>
            
            <div className="card" style={{ border: '2px solid var(--border-color)' }}>
              <div className="card-body" style={{ textAlign: 'center', padding: '40px 32px', position: 'relative' }}>
                <span className="tag tag-filled" style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
                  Coming Soon
                </span>
                <p className="text-secondary text-sm mb-xs">Pro</p>
                <p className="text-3xl font-medium mb-m">$12<span className="text-secondary text-sm">/month</span></p>
                <ul style={{ listStyle: 'none', textAlign: 'center', marginBottom: '32px' }}>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>Custom domain</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>All 15 templates</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>AI bio cleanup</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>LinkedIn auto-sync</li>
                  <li style={{ padding: '8px 0' }}>Email support</li>
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

        <section style={{ 
          padding: '80px 48px',
          borderTop: '1px solid var(--border-light)',
          textAlign: 'center'
        }}>
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

        <footer style={{ 
          padding: '32px 48px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontWeight: 600 }}>folio</span>
          <span className="text-secondary text-sm">By After App Studios</span>
        </footer>
      </div>
    </div>
  );
}
