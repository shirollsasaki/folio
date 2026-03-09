import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import type { SubscriptionStatus, PlanType } from '@/types';

export const dynamic = 'force-dynamic';

interface DodoCustomer {
  customer_id: string;
}

interface DodoEventData {
  customer: DodoCustomer;
  subscription_id: string | null;
  product_id?: string;
}

interface DodoEventPayload {
  type: string;
  data: DodoEventData;
}

function getStatusFromEventType(eventType: string): SubscriptionStatus {
  const map: Record<string, SubscriptionStatus> = {
    'subscription.active': 'active',
    'subscription.renewed': 'active',
    'subscription.on_hold': 'on_hold',
    'subscription.cancelled': 'cancelled',
    'subscription.expired': 'expired',
    'subscription.plan_changed': 'active',
    'payment.failed': 'failed',
  };
  return map[eventType] ?? 'pending';
}

function getPlanFromProductId(productId: string): PlanType {
  if (productId === process.env.DODO_PRODUCT_PRO) return 'pro';
  if (productId === process.env.DODO_PRODUCT_AGENCY) return 'agency';
  return 'free';
}

export async function POST(req: Request) {
  const WEBHOOK_KEY = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  if (!WEBHOOK_KEY) {
    return NextResponse.json({ error: 'Missing webhook key' }, { status: 500 });
  }

  try {
    const headerPayload = await headers();
    const webhookId = headerPayload.get('webhook-id');
    const webhookTimestamp = headerPayload.get('webhook-timestamp');
    const webhookSignature = headerPayload.get('webhook-signature');

    if (!webhookId || !webhookTimestamp || !webhookSignature) {
      return NextResponse.json({ error: 'Missing webhook headers' }, { status: 400 });
    }

    const body = await req.text();

    // @ts-expect-error - dodopayments webhook module resolved at runtime
    const { verifyWebhookPayload } = await import('@dodopayments/core/webhook');

    let payload: DodoEventPayload;
    try {
      payload = (await verifyWebhookPayload({
        webhookKey: WEBHOOK_KEY,
        headers: {
          'webhook-id': webhookId,
          'webhook-timestamp': webhookTimestamp,
          'webhook-signature': webhookSignature,
        },
        body,
      })) as DodoEventPayload;
    } catch {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const handledEvents = [
      'subscription.active',
      'subscription.renewed',
      'subscription.on_hold',
      'subscription.cancelled',
      'subscription.expired',
      'subscription.plan_changed',
      'payment.failed',
    ];

    if (!handledEvents.includes(payload.type)) {
      return NextResponse.json({ received: true });
    }

    const { updateUserPlan } = await import('@/lib/db');
    const { supabaseAdmin } = await import('@/lib/supabase');

    const { data } = payload;
    const customerId = data.customer.customer_id;
    const subscriptionId = data.subscription_id ?? '';

    const { data: userData, error } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('dodo_customer_id', customerId)
      .single();

    if (error || !userData) {
      console.error('User not found for customer:', customerId);
      return NextResponse.json({ received: true });
    }

    const status = getStatusFromEventType(payload.type);
    const plan = status === 'active' ? getPlanFromProductId(data.product_id ?? '') : 'free';

    await updateUserPlan(userData.id, plan, subscriptionId, status);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Dodo webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
