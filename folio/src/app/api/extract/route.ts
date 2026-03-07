import { NextResponse } from 'next/server';
import { ExtractRequestSchema } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
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
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
