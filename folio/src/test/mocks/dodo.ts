import { vi } from 'vitest';

export const mockDodo = {
  checkoutSessions: {
    create: vi.fn().mockResolvedValue({
      checkout_url: 'https://test.checkout.dodopayments.com/session/test',
      session_id: 'test-session-id',
    }),
  },
  subscriptions: {
    retrieve: vi.fn().mockResolvedValue({ id: 'sub_test', status: 'active' }),
    update: vi.fn().mockResolvedValue({}),
    changePlan: vi.fn().mockResolvedValue({}),
  },
  customers: {
    create: vi.fn().mockResolvedValue({ customer_id: 'cus_test', email: 'test@example.com' }),
    createPortalSession: vi.fn().mockResolvedValue({ url: 'https://portal.dodopayments.com/test' }),
  },
  webhooks: {
    unwrap: vi.fn(),
  },
};

vi.mock('@/lib/dodo', () => ({
  dodo: mockDodo,
}));
