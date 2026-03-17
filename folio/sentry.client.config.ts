import * as Sentry from "@sentry/nextjs";

// Deferred Sentry initialization to avoid blocking page load
if (typeof window !== 'undefined') {
  const initSentry = () => {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    
    if (dsn && process.env.NODE_ENV === 'production') {
      Sentry.init({
        dsn,
        
        // Performance monitoring
        tracesSampleRate: 0.1, // 10% of transactions
        
        // Session replay for error debugging
        replaysSessionSampleRate: 0, // No session replay by default
        replaysOnErrorSampleRate: 1.0, // 100% on errors
        
        // Environment
        environment: process.env.NODE_ENV,
        
        // Integrations
        integrations: [
          Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ],
        
        // Filter out known noise
        ignoreErrors: [
          // Browser extensions
          'top.GLOBALS',
          // Random plugins/extensions
          'originalCreateNotification',
          'canvas.contentDocument',
          'MyApp_RemoveAllHighlights',
          // Facebook blocked errors
          'fb_xd_fragment',
        ],
      });
    }
  };

  // Defer initialization until browser is idle
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initSentry, { timeout: 2000 });
  } else {
    setTimeout(initSentry, 2000);
  }
}
