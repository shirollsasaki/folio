import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { getSitesByUser } = await import('@/lib/db');
  const sites = await getSitesByUser(userId);
  return NextResponse.json({ sites });
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const siteId = searchParams.get('id');

  if (!siteId) {
    return NextResponse.json({ error: 'Missing site ID' }, { status: 400 });
  }

  const { supabaseAdmin } = await import('@/lib/supabase');

  const { data: site } = await supabaseAdmin
    .from('sites')
    .select('id')
    .eq('id', siteId)
    .eq('user_id', userId)
    .single();

  if (!site) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 });
  }

  const { deleteSite } = await import('@/lib/db');
  await deleteSite(siteId);

  return NextResponse.json({ success: true });
}
