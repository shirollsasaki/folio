import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white py-32 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-12">
          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
              Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio Website
              </span>
              <br />
              in Minutes
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Turn your LinkedIn profile into a stunning personal website. No code, no design skills, no maintenance.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link 
              href="/sign-up" 
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transform"
            >
              <span className="flex items-center gap-2">
                Get Started Free
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link 
              href="#templates" 
              className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-slate-50 transition-all"
            >
              Browse Templates
            </Link>
          </div>

          {/* Trust Line */}
          <p className="text-sm text-slate-500 font-medium">
            No credit card required · Deploy in seconds · Always synced with LinkedIn
          </p>

          {/* Hero Mockup - Real Portfolio */}
          <div className="pt-16 max-w-6xl mx-auto">
            <div className="relative">
              {/* Browser Frame */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-blue-500/10 border border-slate-200 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                {/* Browser Chrome */}
                <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1.5 text-xs text-slate-500 font-mono">
                    yourname.com
                  </div>
                </div>
                
                {/* Actual Portfolio Screenshot */}
                <div className="relative aspect-[16/10] bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/portfolio-mockup.jpg"
                    alt="Beautiful portfolio website example"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
