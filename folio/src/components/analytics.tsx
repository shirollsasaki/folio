'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';

// PostHog initialization is deferred until after page is interactive
// This improves Time to Interactive (TTI) by not blocking the main thread

export function Analytics() {
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);

  // Defer PostHog initialization until after page is interactive
  useEffect(() => {
    const initPostHog = () => {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      
      if (posthogKey && !initialized) {
        posthog.init(posthogKey, {
          api_host: 'https://us.posthog.com',
          loaded: (ph) => {
            if (process.env.NODE_ENV === 'production') {
              ph.opt_in_capturing();
            }
            setInitialized(true);
          },
        });
      }
    };

    // Use requestIdleCallback to defer initialization until browser is idle
    // Falls back to setTimeout if requestIdleCallback is not available
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(initPostHog, { timeout: 2000 });
      } else {
        setTimeout(initPostHog, 2000);
      }
    }
  }, [initialized]);

  // Track page views (only after PostHog is initialized)
  useEffect(() => {
    if (typeof window !== 'undefined' && initialized && posthog) {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        pathname: pathname,
      });
    }
  }, [pathname, initialized]);

  return null;
}

// Event tracking helpers exported for use in components
export const captureEvent = (event: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture(event, properties);
  }
};

export const captureIdentify = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.identify(userId, properties);
  }
};
