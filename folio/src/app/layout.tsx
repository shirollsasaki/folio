import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@/components/analytics';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/folio/sign-in"
      signUpUrl="/folio/sign-up"
      signInFallbackRedirectUrl="/folio/dashboard"
      signUpFallbackRedirectUrl="/folio/build"
    >
      <Analytics />
      {children}
    </ClerkProvider>
  );
}
