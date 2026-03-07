import { dodo } from './dodo';

export async function createCheckoutSession(
  productId: string,
  customerId: string,
  metadata: Record<string, string>,
  returnUrl?: string
): Promise<{ checkoutUrl: string; sessionId: string }> {
  const session = await dodo.checkoutSessions.create({
    product_cart: [{ product_id: productId, quantity: 1 }],
    customer: { customer_id: customerId },
    return_url: returnUrl ?? (process.env.DODO_PAYMENTS_RETURN_URL || 'http://localhost:3000/build'),
    metadata,
  });

  return {
    checkoutUrl: session.checkout_url || '',
    sessionId: session.session_id,
  };
}

export async function getSubscription(subscriptionId: string) {
  return dodo.subscriptions.retrieve(subscriptionId);
}

export async function cancelSubscription(subscriptionId: string): Promise<void> {
  await dodo.subscriptions.update(subscriptionId, {
    cancel_at_next_billing_date: true,
  });
}

export async function getCustomerPortalUrl(customerId: string, returnUrl?: string): Promise<string> {
  const session = await dodo.customers.customerPortal.create(customerId, {
    send_email: false,
  });
  return session.link;
}

export async function changePlan(
  subscriptionId: string,
  newProductId: string
): Promise<void> {
  await dodo.subscriptions.changePlan(subscriptionId, {
    product_id: newProductId,
    quantity: 1,
    proration_billing_mode: 'prorated_immediately',
  });
}
