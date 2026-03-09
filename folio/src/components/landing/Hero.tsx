'use client';

import { Keyboard, type KeyboardInteractionEvent } from '@/components/ui/keyboard';
import { useState, useEffect } from 'react';

const TYPING_MESSAGES = [
  'Your LinkedIn profile is a personal website',
  'Deploy it in under 10 minutes',
  'No code. No design. No hosting.',
  'Syncs automatically. Updates instantly.',
  'Your professional home on the web',
];

export function Hero() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentMessage = TYPING_MESSAGES[currentMessageIndex];
    
    if (isTyping) {
      if (displayedText.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
        }, 80); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause before erasing
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40); // Erasing speed (faster than typing)
        return () => clearTimeout(timeout);
      } else {
        // Finished erasing, move to next message
        setCurrentMessageIndex((prev) => (prev + 1) % TYPING_MESSAGES.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentMessageIndex]);

  const handleKeyEvent = (event: KeyboardInteractionEvent) => {
    // Optional: Add any keyboard interaction effects here
    console.log('Key event:', event.code, event.phase);
  };

  return (
    <section
      className="section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-primary)',
      }}
      aria-labelledby="hero-heading"
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-16)',
            maxWidth: 'var(--container-lg)',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Keyboard Component */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 'var(--space-8)',
            }}
            role="presentation"
            aria-hidden="true"
          >
            <Keyboard
              theme="classic"
              enableHaptics={false}
              enableSound={true}
              onKeyEvent={handleKeyEvent}
              className="keyboard-hero"
            />
          </div>

          {/* Typing Animation Display */}
          <div
            style={{
              minHeight: '4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-12)',
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            <p
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '-0.01em',
              }}
            >
              {displayedText}
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1.5rem',
                  backgroundColor: 'var(--accent-primary)',
                  marginLeft: '0.25rem',
                  animation: 'blink 1s step-end infinite',
                }}
                aria-hidden="true"
              />
            </p>
          </div>

          {/* Main Headline */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <h1
              id="hero-heading"
              className="heading-1"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Turn your LinkedIn into a personal website
            </h1>
            <p
              className="body-lg"
              style={{
                maxWidth: '42rem',
                margin: '0 auto',
                fontSize: 'var(--text-xl)',
              }}
            >
              Import your profile, customize your domain, deploy in minutes. No code required.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-6)',
            }}
          >
            <a
              href="/folio/sign-up"
              className="btn btn-primary btn-lg"
              aria-label="Get started with Folio"
            >
              Get Started
            </a>
            <a
              href="#templates"
              className="btn btn-secondary btn-lg"
              aria-label="View example websites"
            >
              See Example
            </a>
          </div>

          {/* Trust Signal */}
          <p
            className="body-sm"
            style={{
              color: 'var(--text-tertiary)',
              fontSize: 'var(--text-sm)',
            }}
          >
            Free to start. No credit card required.
          </p>
        </div>
      </div>

    </section>
  );
}
