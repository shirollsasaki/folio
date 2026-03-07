import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { DeployRequestSchema } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = DeployRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { template_id, profile_data } = parsed.data;

    const { getTemplateBySlug } = await import('@/lib/templates');
    const { getUser, createSite, updateSite } = await import('@/lib/db');
    const { deployToVercel, renderTemplate } = await import('@/lib/vercel');

    const templateEntry = getTemplateBySlug(template_id);
    if (!templateEntry) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    const user = await getUser(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (templateEntry.meta.isPremium && user.plan === 'free') {
      return NextResponse.json(
        { error: 'Premium template requires a paid plan' },
        { status: 403 }
      );
    }

    const htmlContent = await renderTemplate(
      templateEntry.Component,
      profile_data,
      `${profile_data.name} — Personal Website`
    );

    const site = await createSite({
      user_id: userId,
      template_id,
      profile_data,
      vercel_project_id: null,
      vercel_url: null,
      custom_domain: null,
    });

    const projectName = `folio-${site.id.slice(0, 8)}`;
    const { projectId, deploymentUrl } = await deployToVercel(projectName, htmlContent);

    const updatedSite = await updateSite(site.id, {
      vercel_project_id: projectId,
      vercel_url: deploymentUrl,
    });

    return NextResponse.json({
      site: updatedSite,
      deploymentUrl,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Deploy failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
