import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { CheckoutRequestSchema } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = CheckoutRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { productId } = parsed.data;

    const { getUser } = await import('@/lib/db');
    const { createCheckoutSession } = await import('@/lib/billing');

    const user = await getUser(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.dodo_customer_id) {
      return NextResponse.json(
        { error: 'Payment account not set up. Please try again.' },
        { status: 400 }
      );
    }

    const { checkoutUrl } = await createCheckoutSession(
      productId,
      user.dodo_customer_id,
      { clerk_user_id: userId },
      process.env.DODO_PAYMENTS_RETURN_URL
    );

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
