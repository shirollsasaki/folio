import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import BuildStep1 from './BuildStep1';

export default async function BuildPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-up');
  }

  return <BuildStep1 />;
}
