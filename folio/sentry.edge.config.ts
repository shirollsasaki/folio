import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn && process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn,
    
    // Minimal tracing for edge runtime
    tracesSampleRate: 0.1,
    
    // Environment
    environment: process.env.NODE_ENV,
  });
}
