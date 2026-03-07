import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { NextResponse } from 'next/server';

interface ClerkUserCreatedEvent {
  type: 'user.created';
  data: {
    id: string;
    email_addresses: Array<{ email_address: string; id: string }>;
    primary_email_address_id: string;
    first_name: string | null;
    last_name: string | null;
  };
}

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing webhook secret' }, { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: ClerkUserCreatedEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkUserCreatedEvent;
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (evt.type !== 'user.created') {
    return NextResponse.json({ received: true });
  }

  const { id, email_addresses, primary_email_address_id } = evt.data;
  const primaryEmail = email_addresses.find(
    (e) => e.id === primary_email_address_id
  );

  if (!primaryEmail) {
    return NextResponse.json({ error: 'No primary email' }, { status: 400 });
  }

  const email = primaryEmail.email_address;

  try {
    const { upsertUser, updateUserDodoCustomer } = await import('@/lib/db');
    const { dodo } = await import('@/lib/dodo');

    await upsertUser({ id, email });

    const customer = await dodo.customers.create({
      email,
      name: [evt.data.first_name, evt.data.last_name].filter(Boolean).join(' ') || email,
    });

    await updateUserDodoCustomer(id, customer.customer_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Clerk webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
