'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';

// Initialize PostHog
if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  
  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host: 'https://us.posthog.com',
      loaded: (ph) => {
        // PostHog is loaded
        if (process.env.NODE_ENV === 'production') {
          ph.opt_in_capturing();
        }
      },
    });
  }
}

export function Analytics() {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && posthog) {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        pathname: pathname,
      });
    }
  }, [pathname]);

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
