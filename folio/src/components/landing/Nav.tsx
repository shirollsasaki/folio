"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="font-playfair text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors"
          >
            Folio
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="#templates" 
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Templates
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/sign-in" 
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up" 
              className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
