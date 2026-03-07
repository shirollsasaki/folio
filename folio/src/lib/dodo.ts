import DodoPayments from 'dodopayments';

if (!process.env.DODO_PAYMENTS_API_KEY) {
  throw new Error('DODO_PAYMENTS_API_KEY environment variable is required');
}

export const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: (process.env.DODO_PAYMENTS_ENVIRONMENT ?? 'test_mode') as
    | 'test_mode'
    | 'live_mode',
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY,
});
