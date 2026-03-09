'use client';

const features = [
  {
    icon: '🔄',
    title: 'Always Up-to-Date',
    description: 'Your website automatically syncs when you update LinkedIn. Set it once, forget it. No manual updates, no stale information.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Your site loads instantly on any device. No slow page builders, no clunky themes. Just a fast, professional website that impresses visitors.',
  },
  {
    icon: '📱',
    title: 'Mobile-Perfect',
    description: 'Looks great on phones, tablets, and desktops. Your site adapts to any screen size automatically. No extra work required.',
  },
  {
    icon: '🔒',
    title: 'Privacy Focused',
    description: 'Your data stays yours. We don\'t sell your information, track visitors, or spam your contacts. Just a professional website you control.',
  },
  {
    icon: '🔍',
    title: 'SEO-Ready',
    description: 'Get found on Google when people search your name. Every Folio site is optimized for search engines so employers and clients can discover you.',
  },
  {
    icon: '💼',
    title: 'Custom Domain (Pro)',
    description: 'Use your own domain (yourname.com) to maximize credibility. Perfect for consultants, freelancers, and executives building a personal brand.',
  },
];

export default function FeaturesFolio() {

  return (
    <section className="relative bg-gray-50 py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="pb-12 text-center md:pb-16">
          <h2
            className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl"
            data-aos="fade-up"
          >
            Everything You Need, Nothing You Don&apos;t
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Icon */}
              <div className="mb-4 text-4xl">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
