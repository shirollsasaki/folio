export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: string; name?: string };
    const { email, name } = body;

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from('waitlist')
      .insert({ email: email.toLowerCase().trim(), name: name ?? null });

    if (error) {
      if (error.code === '23505') {
        return Response.json({ success: true, status: 'duplicate', message: 'Already on the list!' });
      }
      console.error('[waitlist] Supabase error:', error.code, error.message, error.details);
      return Response.json({ error: 'Something went wrong', detail: error.message }, { status: 500 });
    }

    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    const position = (count ?? 0) + 1200;

    return Response.json({ success: true, status: 'new', message: "You're on the list!", position });
  } catch {
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
