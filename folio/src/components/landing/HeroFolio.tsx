'use client';

export default function HeroFolio() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="py-24">
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
              <div
                className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <div>
                  <a
                    className="btn group mb-4 w-full rounded-lg bg-[#0077B5] px-8 py-4 font-medium text-white shadow-lg transition-all duration-200 hover:bg-[#005582] hover:shadow-xl sm:mb-0 sm:w-auto"
                    href="/start"
                  >
                    <span className="relative inline-flex items-center">
                      Get Started Free
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </a>
                </div>
                <div>
                  <a
                    className="btn w-full rounded-lg border-2 border-gray-300 px-8 py-4 font-medium text-gray-700 transition-all duration-200 hover:border-[#0077B5] hover:text-[#0077B5] sm:ml-4 sm:w-auto"
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
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Live in 5 minutes
                </div>
                <div className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  10,000+ professionals trust Folio
                </div>
              </div>
            </div>
          </div>

          {/* ─── LinkedIn → Website Transformation Visual ─── */}
          <div className="relative" data-aos="fade-up" data-aos-delay={800}>
            {/* Labels */}
            <div className="mb-6 flex flex-col items-center justify-center gap-4 md:mb-8 md:flex-row md:gap-[280px]">
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Your LinkedIn Profile
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#0077B5]">
                Your Folio Website
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
              {/* ── LinkedIn Profile Mockup (Left) ── */}
              <div className="w-full max-w-md overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg md:min-w-[300px]">
                {/* LinkedIn header */}
                <div className="bg-[#0077B5] px-6 py-5">
                  <div className="flex items-center gap-4">
                    {/* Profile photo */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-3 border-white bg-gray-300">
                      <svg className="h-10 w-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">Alex Morgan</div>
                      <div className="text-sm text-white/80">Product Designer at TechCorp</div>
                      <div className="mt-1 text-xs text-white/60">San Francisco, CA · 500+ connections</div>
                    </div>
                  </div>
                </div>

                {/* LinkedIn body */}
                <div className="space-y-4 p-6">
                  {/* About */}
                  <div>
                    <div className="mb-2 text-sm font-semibold text-gray-800">About</div>
                    <div className="space-y-1.5">
                      <div className="h-2.5 w-full rounded bg-gray-100" />
                      <div className="h-2.5 w-11/12 rounded bg-gray-100" />
                      <div className="h-2.5 w-9/12 rounded bg-gray-100" />
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <div className="mb-2 text-sm font-semibold text-gray-800">Experience</div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded bg-gray-200" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-2.5 w-3/4 rounded bg-gray-200" />
                        <div className="h-2 w-1/2 rounded bg-gray-100" />
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="mb-2 text-sm font-semibold text-gray-800">Skills</div>
                    <div className="flex flex-wrap gap-2">
                      <div className="rounded-full bg-[#E8F4FD] px-3 py-1 text-[10px] font-medium text-[#0077B5]">Product Design</div>
                      <div className="rounded-full bg-[#E8F4FD] px-3 py-1 text-[10px] font-medium text-[#0077B5]">UX Research</div>
                      <div className="rounded-full bg-[#E8F4FD] px-3 py-1 text-[10px] font-medium text-[#0077B5]">Figma</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Arrow ── */}
              <div className="flex flex-shrink-0 flex-col items-center gap-2">
                <div className="animate-pulse-arrow text-5xl font-light text-[#0077B5] md:text-6xl rotate-90 md:rotate-0">
                  →
                </div>
              </div>

              {/* ── Folio Website Mockup (Right) ── */}
              <div className="w-full max-w-md overflow-hidden rounded-2xl border-2 border-[#0077B5] bg-white shadow-xl md:min-w-[300px]">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-gray-400 border border-gray-200">
                    alexmorgan.folio.cx
                  </div>
                </div>

                {/* Website content */}
                <div className="p-6">
                  {/* Navigation */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="text-sm font-bold text-[#0077B5]">Alex Morgan</div>
                    <div className="flex gap-3 text-[10px] font-medium text-gray-400">
                      <span>About</span>
                      <span>Projects</span>
                      <span>Contact</span>
                    </div>
                  </div>

                  {/* Hero area */}
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0077B5] to-[#00A0DC] text-xl font-bold text-white">
                      A
                    </div>
                    <div>
                      <div className="text-base font-bold text-gray-900">Alex Morgan</div>
                      <div className="text-sm text-gray-500">Product Designer at TechCorp</div>
                    </div>
                  </div>

                  {/* About */}
                  <div className="mb-5 rounded-lg bg-[#F8F9FA] p-4">
                    <div className="mb-2 text-xs font-semibold text-gray-700">About</div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-full rounded bg-gray-200" />
                      <div className="h-2 w-5/6 rounded bg-gray-200" />
                      <div className="h-2 w-4/6 rounded bg-gray-200" />
                    </div>
                  </div>

                  {/* Projects grid */}
                  <div>
                    <div className="mb-2 text-xs font-semibold text-gray-700">Projects</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-[#F8F9FA] p-3">
                        <div className="mb-1.5 h-2 w-16 rounded bg-gray-200" />
                        <div className="h-1.5 w-full rounded bg-gray-100" />
                      </div>
                      <div className="rounded-lg bg-[#F8F9FA] p-3">
                        <div className="mb-1.5 h-2 w-12 rounded bg-gray-200" />
                        <div className="h-1.5 w-full rounded bg-gray-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for pulsing arrow animation */}
      <style jsx>{`
        @keyframes pulse-arrow {
          0%, 100% {
            opacity: 0.7;
            transform: translateX(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translateX(6px) rotate(0deg);
          }
        }
        @media (max-width: 767px) {
          @keyframes pulse-arrow {
            0%, 100% {
              opacity: 0.7;
              transform: translateY(0) rotate(90deg);
            }
            50% {
              opacity: 1;
              transform: translateY(4px) rotate(90deg);
            }
          }
        }
        .animate-pulse-arrow {
          animation: pulse-arrow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
