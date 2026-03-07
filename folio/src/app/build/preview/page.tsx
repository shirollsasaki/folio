import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import PreviewClient from './PreviewClient';

export default async function PreviewPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-up');
  }

  return <PreviewClient />;
}
