import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { templates } from '@/lib/templates';
import TemplatePickerClient from './TemplatePickerClient';
import type { TemplateMeta } from '@/types';

export const dynamic = 'force-dynamic';

export default async function TemplatePage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-up');
  }

  const { getUser } = await import('@/lib/db');
  const user = await getUser(userId);
  const plan = user?.plan ?? 'free';

  const templateMetas: TemplateMeta[] = templates.map((t) => t.meta);

  return <TemplatePickerClient templateMetas={templateMetas} userPlan={plan} />;
}
