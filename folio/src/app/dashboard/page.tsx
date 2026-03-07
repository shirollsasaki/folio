import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-up');
  }

  const { getUser, getSitesByUser } = await import('@/lib/db');
  const [user, sites] = await Promise.all([
    getUser(userId),
    getSitesByUser(userId),
  ]);

  if (!user) {
    redirect('/sign-up');
  }

  return <DashboardClient user={user} initialSites={sites} />;
}
