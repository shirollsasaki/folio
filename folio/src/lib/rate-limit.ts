/**
 * Simple in-memory rate limiter using sliding window
 * For production, consider Redis-based rate limiting
 */

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RequestLog {
  timestamps: number[];
}

const requestLogs = new Map<string, RequestLog>();

export function rateLimit(identifier: string, config: RateLimitConfig): boolean {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  const log = requestLogs.get(identifier) || { timestamps: [] };
  
  // Remove timestamps outside the window
  log.timestamps = log.timestamps.filter((ts) => ts > windowStart);

  // Check if limit exceeded
  if (log.timestamps.length >= config.maxRequests) {
    return false; // Rate limit exceeded
  }

  // Add current request
  log.timestamps.push(now);
  requestLogs.set(identifier, log);

  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    cleanupOldLogs(windowStart);
  }

  return true; // Request allowed
}

function cleanupOldLogs(cutoff: number): void {
  for (const [key, log] of requestLogs.entries()) {
    log.timestamps = log.timestamps.filter((ts) => ts > cutoff);
    if (log.timestamps.length === 0) {
      requestLogs.delete(key);
    }
  }
}

/**
 * Pre-configured rate limiters for different operations
 */
export const rateLimiters = {
  // LinkedIn extraction: 10 requests per minute per user
  extract: (userId: string) => rateLimit(`extract:${userId}`, { windowMs: 60_000, maxRequests: 10 }),
  
  // Site deployment: 5 deploys per hour per user
  deploy: (userId: string) => rateLimit(`deploy:${userId}`, { windowMs: 60_60_000, maxRequests: 5 }),
  
  // Checkout: 3 requests per 5 minutes per user (prevent abuse)
  checkout: (userId: string) => rateLimit(`checkout:${userId}`, { windowMs: 5 * 60_000, maxRequests: 3 }),
};
