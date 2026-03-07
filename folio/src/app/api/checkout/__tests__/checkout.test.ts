import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn().mockResolvedValue({ userId: 'user_test123' }),
}));

vi.mock('@/lib/db', () => ({
  getUser: vi.fn().mockResolvedValue({
    id: 'user_test123',
    email: 'test@example.com',
    dodo_customer_id: 'cus_test',
    subscription_id: null,
    subscription_status: 'active',
    plan: 'free',
    created_at: new Date().toISOString(),
  }),
}));

vi.mock('@/lib/billing', () => ({
  createCheckoutSession: vi.fn().mockResolvedValue({
    checkoutUrl: 'https://checkout.dodopayments.com/test',
    sessionId: 'sess_test',
  }),
}));

describe('POST /api/checkout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns checkout URL for authenticated user', async () => {
    const { auth } = await import('@clerk/nextjs/server');
    vi.mocked(auth).mockResolvedValueOnce({ userId: 'user_test123' } as Awaited<ReturnType<typeof auth>>);

    const { getUser } = await import('@/lib/db');
    vi.mocked(getUser).mockResolvedValueOnce({
      id: 'user_test123',
      email: 'test@example.com',
      dodo_customer_id: 'cus_test',
      subscription_id: null,
      subscription_status: 'active',
      plan: 'free',
      created_at: new Date().toISOString(),
    });

    const { createCheckoutSession } = await import('@/lib/billing');
    vi.mocked(createCheckoutSession).mockResolvedValueOnce({
      checkoutUrl: 'https://checkout.dodopayments.com/test',
      sessionId: 'sess_test',
    });

    const { POST } = await import('../route');
    const req = new Request('http://localhost/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ productId: 'prod_test', planType: 'pro' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.checkoutUrl).toBe('https://checkout.dodopayments.com/test');
  });

  it('returns 401 for unauthenticated user', async () => {
    const { auth } = await import('@clerk/nextjs/server');
    vi.mocked(auth).mockResolvedValueOnce({ userId: null } as Awaited<ReturnType<typeof auth>>);

    const { POST } = await import('../route');
    const req = new Request('http://localhost/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ productId: 'prod_test', planType: 'pro' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(req);
    expect(response.status).toBe(401);
  });

  it('returns 400 for invalid request body', async () => {
    const { auth } = await import('@clerk/nextjs/server');
    vi.mocked(auth).mockResolvedValueOnce({ userId: 'user_test123' } as Awaited<ReturnType<typeof auth>>);

    const { POST } = await import('../route');
    const req = new Request('http://localhost/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ invalid: 'data' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });
});
