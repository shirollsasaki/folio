import Link from 'next/link';

export function Hero() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Your Portfolio Website<br />in Minutes
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Turn your LinkedIn profile into a stunning personal website. No code, no design skills, no maintenance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link 
              href="/sign-up" 
              className="px-8 py-3.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Get Started Free
            </Link>
            <Link 
              href="#templates" 
              className="px-8 py-3.5 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
            >
              See Templates
            </Link>
          </div>

          <p className="text-sm text-slate-500">
            No credit card required · Deploy in seconds
          </p>

          {/* Hero mockup placeholder */}
          <div className="pt-12 max-w-5xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl border border-slate-200 shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="inline-block p-4 bg-white rounded-lg shadow-lg mb-4">
                  <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-slate-500 font-medium">Portfolio Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
