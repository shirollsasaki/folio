import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Folio — Your Personal Website in Minutes',
  description: 'Turn your LinkedIn profile into a stunning personal website. Pick a template, customize, and deploy in minutes.',
  openGraph: {
    title: 'Folio — Your Personal Website in Minutes',
    description: 'Turn your LinkedIn profile into a stunning personal website.',
    type: 'website',
  },
};

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
      <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
