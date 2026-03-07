import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(null),
    getAll: vi.fn().mockReturnValue([]),
  }),
  usePathname: () => '/',
  redirect: vi.fn(),
}));

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(() => new Headers()),
  cookies: vi.fn(() => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  })),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
process.env.DODO_PAYMENTS_API_KEY = 'test-dodo-api-key';
process.env.DODO_PAYMENTS_WEBHOOK_KEY = 'test-webhook-key';
process.env.DODO_PAYMENTS_ENVIRONMENT = 'test_mode';
process.env.CLERK_SECRET_KEY = 'sk_test_clerk_key';
process.env.PROXYCURL_API_KEY = 'test-proxycurl-key';
process.env.ANTHROPIC_API_KEY = 'test-anthropic-key';
process.env.VERCEL_API_TOKEN = 'test-vercel-token';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
