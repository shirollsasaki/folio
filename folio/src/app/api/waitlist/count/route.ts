export const dynamic = 'force-dynamic';

export async function GET() {
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  if (error) {
    return Response.json({ count: 1200 }); // fallback
  }

  // Add 1200 to actual count as base
  return Response.json({ count: (count ?? 0) + 1200 });
}
