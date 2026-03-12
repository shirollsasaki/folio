import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, DM_Mono, JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@/components/analytics';
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://afterapp.fun'),
  title: 'Folio — Your Personal Website in Minutes',
  description: 'Turn your LinkedIn profile into a stunning personal website. Pick a template, customize, and deploy in minutes.',
  openGraph: {
    title: 'Folio — Your Personal Website in Minutes',
    description: 'Turn your LinkedIn profile into a stunning personal website.',
    type: 'website',
    images: [{ url: '/folio/og-image.png', width: 1200, height: 630, alt: 'Folio — Your LinkedIn, deployed.' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/folio/og-image.png'],
  },
  alternates: {
    canonical: 'https://afterapp.fun/folio',
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
      <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} ${jetbrainsMono.variable}`}>
        <body className="antialiased">
          <Analytics />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
