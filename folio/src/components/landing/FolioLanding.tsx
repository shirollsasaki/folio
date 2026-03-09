'use client';

import { useEffect } from 'react';
import HeroFolio from './HeroFolio';
import ExamplesFolio from './ExamplesFolio';
import HowItWorksFolio from './HowItWorksFolio';
import FeaturesFolio from './FeaturesFolio';
import { Pricing } from './Pricing';
import { FAQ } from './FAQ';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';

export default function FolioLanding() {
  useEffect(() => {
    // Initialize AOS if needed
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-[#0077B5]">
                Folio
              </a>
            </div>

            {/* Navigation links (desktop) */}
            <div className="hidden items-center space-x-8 md:flex">
              <a href="#examples" className="text-gray-600 hover:text-[#0077B5] transition-colors">
                Examples
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-[#0077B5] transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-[#0077B5] transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-gray-600 hover:text-[#0077B5] transition-colors">
                FAQ
              </a>
            </div>

            {/* CTA buttons */}
            <div className="flex items-center space-x-4">
              <a
                href="/sign-in"
                className="text-gray-600 hover:text-[#0077B5] transition-colors"
              >
                Sign In
              </a>
              <a
                href="/start"
                className="rounded-lg bg-[#0077B5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#005582]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <HeroFolio />
        <ExamplesFolio />
        <div id="how-it-works">
          <HowItWorksFolio />
        </div>
        <FeaturesFolio />
        <div id="pricing">
          <Pricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
