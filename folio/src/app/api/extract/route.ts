import { NextResponse } from 'next/server';
import { ExtractRequestSchema } from '@/types';
import { rateLimiters } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Get IP address for rate limiting (anonymous users)
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Rate limit: 10 extractions per minute per IP
    if (!rateLimiters.extract(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const body = await req.json() as unknown;
    const parsed = ExtractRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { linkedin_url } = parsed.data;

    const { linkedInExtractor } = await import('@/lib/linkedin');

    const profile = await linkedInExtractor.extract(linkedin_url);

    return NextResponse.json({ profile });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Extraction failed';
    console.error('[Extract API Error]:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
