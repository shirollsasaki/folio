'use client';

const steps = [
  {
    number: 1,
    icon: '🔗',
    title: 'Connect LinkedIn',
    description: 'Link your LinkedIn profile and we\'ll import your work history, skills, and experience automatically. No manual data entry required.',
  },
  {
    number: 2,
    icon: '✨',
    title: 'Choose Your Style',
    description: 'Pick from professional templates designed for your industry. Every design is mobile-optimized and makes you look credible.',
  },
  {
    number: 3,
    icon: '🚀',
    title: 'Publish',
    description: 'Get your personal URL (yourname.folio.cx) and share it with employers, clients, or your network. Your site is live and ready.',
  },
];

export default function HowItWorksFolio() {

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="pb-12 text-center md:pb-16">
          <h2
            className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl"
            data-aos="fade-up"
          >
            Get Your Website Live in 3 Simple Steps
          </h2>
          <p
            className="text-xl text-gray-600"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            Start collaborating with your professional brand in minutes
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative rounded-xl border border-gray-200 bg-white p-8 text-center shadow-md transition-all duration-300 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Number badge */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0077B5] text-xl font-bold text-white">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-4 text-5xl">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600">
                {step.description}
              </p>

              {/* Connector arrow (desktop only, not on last item) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-3xl text-[#0077B5] md:block">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay={600}>
          <a
            href="/start"
            className="inline-flex items-center rounded-lg bg-[#0077B5] px-8 py-4 font-medium text-white shadow-lg transition-all hover:bg-[#005582] hover:shadow-xl"
          >
            Get Started Free
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <p className="mt-4 text-sm text-gray-500">
            That&apos;s it. Your website is live and synced with LinkedIn.
          </p>
        </div>
      </div>
    </section>
  );
}
