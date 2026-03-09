'use client';

const exampleWebsites = [
  {
    id: 1,
    label: '💼 Job Seeker',
    title: 'Software Engineer',
    tagline: 'Landed interviews at Google and Stripe',
    url: 'johndoe.folio.cx',
    screenshot: 'https://placehold.co/600x400/0077B5/FFFFFF?text=Portfolio+Site',
  },
  {
    id: 2,
    label: '👔 Consultant',
    title: 'Marketing Strategy',
    tagline: 'Closes clients with a professional first impression',
    url: 'sarah.folio.cx',
    screenshot: 'https://placehold.co/600x400/005582/FFFFFF?text=Consultant+Site',
  },
  {
    id: 3,
    label: '📊 Executive',
    title: 'VP of Operations',
    tagline: 'Built personal brand for board positions',
    url: 'mike.folio.cx',
    screenshot: 'https://placehold.co/600x400/0077B5/FFFFFF?text=Executive+Site',
  },
  {
    id: 4,
    label: '🎨 Freelancer',
    title: 'Graphic Designer',
    tagline: 'Portfolio that wins projects',
    url: 'alex.folio.cx',
    screenshot: 'https://placehold.co/600x400/005582/FFFFFF?text=Designer+Portfolio',
  },
  {
    id: 5,
    label: '💻 Product Manager',
    title: 'Tech PM at SaaS Startup',
    tagline: 'Stands out to recruiters',
    url: 'priya.folio.cx',
    screenshot: 'https://placehold.co/600x400/0077B5/FFFFFF?text=PM+Portfolio',
  },
  {
    id: 6,
    label: '🏢 Business Consultant',
    title: 'Strategic Advisor',
    tagline: 'Trusted by Fortune 500 clients',
    url: 'james.folio.cx',
    screenshot: 'https://placehold.co/600x400/005582/FFFFFF?text=Consultant+Site',
  },
];

export default function ExamplesFolio() {

  return (
    <section id="examples" className="relative bg-gray-50 py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="pb-12 text-center md:pb-16">
          <h2
            className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl"
            data-aos="fade-up"
          >
            See What&apos;s Possible
          </h2>
          <p
            className="text-xl text-gray-600"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            Real websites created by professionals like you
          </p>
        </div>

        {/* Examples grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exampleWebsites.map((example, index) => (
            <div
              key={example.id}
              className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#0077B5] hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Screenshot */}
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src={example.screenshot}
                  alt={example.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Card content */}
              <div className="p-5">
                <div className="mb-2 text-sm font-medium text-gray-500">
                  {example.url}
                </div>
                <div className="mb-1 text-xs text-gray-400">
                  {example.label}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  {example.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {example.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center" data-aos="fade-up">
          <a
            href="#"
            className="inline-flex items-center rounded-lg border-2 border-[#0077B5] px-6 py-3 font-medium text-[#0077B5] transition-all hover:bg-[#0077B5] hover:text-white"
          >
            Browse All Templates
            <svg
              className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
