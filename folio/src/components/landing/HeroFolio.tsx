'use client';

export default function HeroFolio() {

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="mb-6 text-5xl font-bold tracking-tight text-gray-900 md:text-6xl"
              data-aos="fade-up"
            >
              Turn Your LinkedIn Profile Into a<br />
              Professional Website
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-xl text-gray-600"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                No design skills. No coding. Just your LinkedIn profile transformed into a beautiful site in minutes.
              </p>
              
              {/* CTA Buttons */}
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center" data-aos="fade-up" data-aos-delay={400}>
                <div>
                  <a
                    className="btn group mb-4 w-full bg-[#0077B5] px-8 py-4 text-white shadow-lg hover:bg-[#005582] sm:mb-0 sm:w-auto rounded-lg font-medium transition-all duration-200 hover:shadow-xl"
                    href="/start"
                  >
                    <span className="relative inline-flex items-center">
                      Get Started Free
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </a>
                </div>
                <div>
                  <a
                    className="btn w-full border-2 border-gray-300 px-8 py-4 text-gray-700 hover:border-[#0077B5] hover:text-[#0077B5] sm:ml-4 sm:w-auto rounded-lg font-medium transition-all duration-200"
                    href="#examples"
                  >
                    See Examples
                  </a>
                </div>
              </div>

              {/* Trust signals */}
              <div 
                className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500"
                data-aos="fade-up"
                data-aos-delay={600}
              >
                <div className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Live in 5 minutes
                </div>
                <div className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  10,000+ professionals trust Folio
                </div>
              </div>
            </div>
          </div>

          {/* LinkedIn → Website Transformation Visual */}
          <div className="relative" data-aos="fade-up" data-aos-delay={800}>
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
              {/* LinkedIn Profile Mockup */}
              <div className="group relative w-full max-w-sm overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl md:w-auto">
                <div className="bg-[#0077B5] px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="mb-2 h-4 w-32 rounded bg-white/80"></div>
                      <div className="h-3 w-24 rounded bg-white/60"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 p-6">
                  <div className="h-3 w-full rounded bg-gray-100"></div>
                  <div className="h-3 w-5/6 rounded bg-gray-100"></div>
                  <div className="h-3 w-4/6 rounded bg-gray-100"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/5">
                  <span className="text-sm font-medium text-gray-600 opacity-0 transition-opacity group-hover:opacity-100">
                    LinkedIn Profile
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 rotate-90 text-4xl text-[#0077B5] md:rotate-0">
                →
              </div>

              {/* Folio Website Mockup */}
              <div className="group relative w-full max-w-sm overflow-hidden rounded-xl border-2 border-[#0077B5] bg-white shadow-xl transition-all duration-300 hover:shadow-2xl md:w-auto">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
                  <div className="h-3 w-32 rounded bg-gray-200"></div>
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="mb-2 h-4 w-28 rounded bg-gray-200"></div>
                      <div className="h-3 w-20 rounded bg-gray-100"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 h-3 w-20 rounded bg-gray-200"></div>
                      <div className="h-2 w-full rounded bg-gray-100"></div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 h-3 w-24 rounded bg-gray-200"></div>
                      <div className="h-2 w-full rounded bg-gray-100"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-[#0077B5]/5">
                  <span className="text-sm font-medium text-[#0077B5] opacity-0 transition-opacity group-hover:opacity-100">
                    Your Professional Website
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
