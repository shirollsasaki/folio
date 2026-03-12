import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn && process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn,
    
    // Performance monitoring
    tracesSampleRate: 0.1, // 10% of transactions
    
    // Environment
    environment: process.env.NODE_ENV,
    
    // Filter sensitive data
    beforeSend(event) {
      // Remove sensitive headers/cookies
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers;
      }
      return event;
    },
  });
}
