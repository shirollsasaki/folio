'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Keyboard, type KeyboardInteractionEvent } from '@/components/ui/keyboard';

type SectionKey = 'hero' | 'how' | 'features' | 'pricing' | 'faq';

const SECTION_TITLES: Record<SectionKey, string> = {
  hero: 'folio > _',
  how: 'folio > how it works',
  features: 'folio > features',
  pricing: 'folio > pricing',
  faq: 'folio > faq',
};

const SECTIONS: Record<SectionKey, string> = {
  hero: `> folio.exe — v2.0.1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Turn your LinkedIn into a personal website.

  Import your profile. Choose your domain.
  Deploy in minutes. No code required.

  Free to start. No credit card required.

  ┌──────────────────────────────────────┐
  │  press G to get started              │
  │  press H to see how it works         │
  └──────────────────────────────────────┘`,

  how: `> how_it_works
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  01  CONNECT LINKEDIN
      Import your profile data in one click.
      Work history, skills, and experience
      flow directly into your site.

  02  CHOOSE YOUR DOMAIN
      Use your custom domain or get a free
      folio.site subdomain. SSL included.

  03  DEPLOY
      Your site goes live instantly.
      Updates to your LinkedIn sync
      automatically.`,

  features: `> features --list
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [↻]  AUTO-SYNC
       Website updates when LinkedIn changes.
       Set it once, forget it.

  [⬡]  CUSTOM DOMAINS
       Bring your own or use ours.
       SSL configured automatically.

  [⚡]  FAST HOSTING
       Global CDN. Loads in milliseconds.

  [✦]  CLEAN TEMPLATES
       Minimal designs. Your work front
       and center.

  [↑]  SEO READY
       Meta tags, structured data, clean URLs.
       Built to rank.

  [○]  ZERO MAINTENANCE
       No CMS. No plugins. No server.`,

  pricing: `> pricing --compare
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FREE                     PRO
  ────────────────         ────────────────
  $0 / forever             $9 / month

  ✓ folio.site subdomain   ✓ Custom domain
  ✓ LinkedIn auto-sync     ✓ Priority sync
  ✓ SSL included           ✓ Analytics
  ✓ Community support      ✓ Email support

  ┌──────────────────────────────────────┐
  │  press G to get started free         │
  └──────────────────────────────────────┘`,

  faq: `> faq --all
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Q: How does the LinkedIn sync work?
     You connect your LinkedIn account once. We import your profile
     data and keep it synced. When you update LinkedIn, your site
     updates within minutes.

  Q: Can I use my own domain?
     Yes. Custom domains are available on the Pro plan. We handle
     SSL certificates and DNS configuration automatically.

  Q: Do I need to know how to code?
     No. The entire setup is point-and-click. You can be live in
     under 10 minutes without writing a single line of code.

  Q: What if I update my LinkedIn?
     Your Folio site syncs automatically. Changes appear within
     minutes. You never need to manually update your site.

  Q: Can I customize the design?
     You can choose from our minimal templates and adjust colors.
     We prioritize clean, professional layouts that work for
     everyone.

  Q: What happens to my data if I cancel?
     You keep full export access. Download your site as static
     HTML anytime. Your data is yours.

  Q: Is there a free tier?
     Yes. The free tier includes a folio.site subdomain, auto-sync,
     and SSL. Upgrade to Pro when you want a custom domain.`,
};

const NAV_KEY_MAP: Record<string, SectionKey | 'get-started' | 'sign-in'> = {
  KeyG: 'get-started',
  KeyH: 'how',
  KeyF: 'features',
  KeyP: 'pricing',
  KeyQ: 'faq',
  KeyS: 'sign-in',
  Escape: 'hero',
};

const SECTION_ORDER: SectionKey[] = ['hero', 'how', 'features', 'pricing', 'faq'];

function getCharDelay(char: string): number {
  if (char === '━') return 8;
  if ('┌│└┐┘─'.includes(char)) return 60;
  if (char >= '0' && char <= '9') return 20;
  if (char === ',' || char === ';') return 112;
  if (char === '.' || char === ':') return 182;
  if (char === '\n') return 232;
  return 32;
}

type Phase = 'splash' | 'terminal';

export function TerminalLanding() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('splash');
  const [splashFading, setSplashFading] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionKey>('hero');
  const [typedIndex, setTypedIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const sectionText = SECTIONS[currentSection];

  const startTyping = useCallback((text: string) => {
    setTypedIndex(0);
    setIsTyping(true);

    let idx = 0;
    const type = () => {
      if (idx >= text.length) {
        setIsTyping(false);
        return;
      }
      idx++;
      setTypedIndex(idx);
      const delay = getCharDelay(text[idx - 1]);
      typingRef.current = setTimeout(type, delay);
    };

    typingRef.current = setTimeout(type, 100);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashFading(true);
      setTimeout(() => {
        setPhase('terminal');
        const hash = window.location.hash.slice(1) as SectionKey;
        const initial = SECTION_ORDER.includes(hash) ? hash : 'hero';
        setCurrentSection(initial);
        document.title = SECTION_TITLES[initial];
        startTyping(SECTIONS[initial]);
      }, 600);
    }, 2200);

    return () => {
      clearTimeout(timer);
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [startTyping]);

  const transitionToSection = useCallback((section: SectionKey) => {
    if (typingRef.current) {
      clearTimeout(typingRef.current);
      typingRef.current = null;
    }

    if (section === currentSection && !isTyping) return;

    setIsFading(true);

    setTimeout(() => {
      setCurrentSection(section);
      setIsFading(false);

      window.history.replaceState(null, '', `#${section}`);
      document.title = SECTION_TITLES[section];

      setTimeout(() => {
        startTyping(SECTIONS[section]);
      }, 50);
    }, 330);
  }, [currentSection, isTyping, startTyping]);

  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash.slice(1) as SectionKey;
      if (SECTION_ORDER.includes(hash)) {
        transitionToSection(hash);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [transitionToSection]);

  const handleKeyEvent = useCallback((event: KeyboardInteractionEvent) => {
    if (event.phase !== 'down') return;
    if (phase === 'splash') return;

    const action = NAV_KEY_MAP[event.code];
    if (!action) return;

    if (action === 'get-started') {
      router.push('/sign-up');
      return;
    }
    if (action === 'sign-in') {
      router.push('/sign-in');
      return;
    }

    transitionToSection(action);
  }, [router, transitionToSection, phase]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyM' && !e.repeat) {
        setSoundEnabled(prev => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  });

  const renderedText = sectionText.slice(0, typedIndex);
  const ghostText = sectionText.slice(typedIndex);

  if (phase === 'splash') {
    return (
      <div className="terminal-page">
        <div
          className={`terminal-splash ${splashFading ? 'terminal-splash--fading' : ''}`}
        >
          <span className="terminal-splash-text">Folio</span>
          <span className="terminal-splash-sub">your linkedin, deployed.</span>
        </div>
        <div className="terminal-keyboard-zone">
          <div className="terminal-keyboard-inner">
            <Keyboard
              theme="dolch"
              enableHaptics={false}
              enableSound={soundEnabled}
              onKeyEvent={handleKeyEvent}
              className="keyboard-terminal"
            />
          </div>
          <div className="terminal-mobile-tabs" style={{ display: 'none' }}>
            {SECTION_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                className="terminal-mobile-tab"
                onClick={() => {}}
              >
                {key === 'how' ? 'How' : key === 'faq' ? 'FAQ' : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-page">
      <nav className="terminal-nav">
        <button
          type="button"
          className="terminal-nav-logo"
          onClick={() => transitionToSection('hero')}
          style={{ cursor: 'pointer', background: 'none', border: 'none', font: 'inherit' }}
        >
          folio
        </button>
        <div className="terminal-nav-links">
          {(['how', 'features', 'pricing', 'faq'] as SectionKey[]).map((key) => (
            <button
              key={key}
              type="button"
              className="terminal-nav-link"
              onClick={() => transitionToSection(key)}
            >
              {key === 'how' ? 'How It Works' : key === 'faq' ? 'FAQ' : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
          <button
            type="button"
            className="terminal-nav-link"
            onClick={() => router.push('/sign-in')}
          >
            Sign In
          </button>
        </div>
      </nav>

      <div className="terminal-display">
        <div
          ref={contentRef}
          className={`terminal-content ${isFading ? 'terminal-fade-out' : 'terminal-fade-in'}`}
          style={{ paddingTop: '3.5rem' }}
        >
          <pre className="terminal-line">
            <span className="terminal-typed">{renderedText}</span>
            <span className={`terminal-cursor ${isTyping ? 'terminal-cursor--typing' : ''}`} />
            <span className="terminal-ghost">{ghostText}</span>
          </pre>
          {!isTyping && (
            <pre className="terminal-line" style={{ marginTop: '0.5rem' }}>
              <span className="terminal-typed terminal-accent">{'\n> '}</span>
              <span className="terminal-cursor" />
            </pre>
          )}
        </div>
        <div className="terminal-scanlines" />
        <div className="terminal-vignette" />
      </div>

      <div className="terminal-keyboard-zone">
        <div className="terminal-hints">
          <span><kbd>[G]</kbd> start</span>
          <span><kbd>[H]</kbd> how it works</span>
          <span><kbd>[F]</kbd> features</span>
          <span><kbd>[P]</kbd> pricing</span>
          <span><kbd>[Q]</kbd> faq</span>
          <span><kbd>[S]</kbd> sign in</span>
        </div>
        <div className="terminal-keyboard-inner">
          <Keyboard
            theme="dolch"
            enableHaptics={false}
            enableSound={soundEnabled}
            onKeyEvent={handleKeyEvent}
            className="keyboard-terminal"
          />
        </div>
        <div className="terminal-mobile-tabs" style={{ display: 'none' }}>
          {SECTION_ORDER.map((key) => (
            <button
              key={key}
              type="button"
              className={`terminal-mobile-tab ${currentSection === key ? 'terminal-mobile-tab--active' : ''}`}
              onClick={() => transitionToSection(key)}
            >
              {key === 'how' ? 'How' : key === 'faq' ? 'FAQ' : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
