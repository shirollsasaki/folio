import { getTemplateBySlug } from '@/lib/templates';
import { createMockProfile } from '@/test/mocks/profile';

export const dynamic = 'force-dynamic';

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getTemplateBySlug(slug);

  if (!entry) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
        Template not found: {slug}
      </div>
    );
  }

  const { Component } = entry;
  const profile = createMockProfile();

  return <Component profile={profile} />;
}
