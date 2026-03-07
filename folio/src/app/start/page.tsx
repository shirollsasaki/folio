import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import StartClient from './StartClient';

export const dynamic = 'force-dynamic';

export default async function StartPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-up');
  }

  const { getUser } = await import('@/lib/db');
  const user = await getUser(userId);

  if (user?.plan === 'pro' || user?.plan === 'agency') {
    redirect('/build');
  }

  return (
    <StartClient
      currentPlan={user?.plan ?? 'free'}
      proPriceId={process.env.DODO_PRODUCT_PRO ?? ''}
      agencyPriceId={process.env.DODO_PRODUCT_AGENCY ?? ''}
    />
  );
}
