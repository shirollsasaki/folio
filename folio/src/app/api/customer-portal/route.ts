import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { getUser } = await import('@/lib/db');
  const { getCustomerPortalUrl } = await import('@/lib/billing');

  const user = await getUser(userId);
  if (!user?.dodo_customer_id) {
    return NextResponse.json({ error: 'No billing account found' }, { status: 400 });
  }

  const url = await getCustomerPortalUrl(
    user.dodo_customer_id,
    `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
  );

  return NextResponse.json({ url });
}
