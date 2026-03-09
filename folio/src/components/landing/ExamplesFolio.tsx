'use client';

/* ─── Inline Website Mockup Component ─── */
function WebsiteMockup({
  name,
  title,
  sections,
  accentColor = '#0077B5',
}: {
  name: string;
  title: string;
  sections: string[];
  accentColor?: string;
}) {
  return (
    <div className="h-full w-full bg-white">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-400" />
        <div className="h-2 w-2 rounded-full bg-yellow-400" />
        <div className="h-2 w-2 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 rounded bg-gray-200 px-2 py-0.5">
          <span className="text-[8px] text-gray-400">folio.cx/portfolio</span>
        </div>
      </div>

      {/* Site content */}
      <div className="p-4">
        {/* Header with photo + name */}
        <div className="mb-3 flex items-center gap-3">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: accentColor }}
          >
            {name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-gray-900">{name}</div>
            <div className="truncate text-[11px] text-gray-500">{title}</div>
          </div>
        </div>

        {/* Nav bar */}
        <div className="mb-3 flex gap-3 border-b border-gray-100 pb-2">
          {sections.map((s) => (
            <span key={s} className="text-[9px] font-medium text-gray-400">
              {s}
            </span>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-gray-100" />
          <div className="h-2 w-5/6 rounded bg-gray-100" />
          <div className="h-2 w-4/6 rounded bg-gray-100" />
        </div>

        {/* Feature blocks */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded bg-gray-50 p-2">
            <div className="mb-1 h-1.5 w-10 rounded bg-gray-200" />
            <div className="h-1.5 w-full rounded bg-gray-100" />
          </div>
          <div className="rounded bg-gray-50 p-2">
            <div className="mb-1 h-1.5 w-8 rounded bg-gray-200" />
            <div className="h-1.5 w-full rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Example Data ─── */
const exampleWebsites = [
  {
    id: 1,
    label: '💼 Job Seeker',
    title: 'Software Engineer',
    tagline: 'Landed interviews at Google and Stripe',
    url: 'johndoe.folio.cx',
    mockup: {
      name: 'John Smith',
      title: 'Software Engineer',
      sections: ['About', 'Projects', 'Skills', 'Contact'],
      accent: '#0077B5',
    },
  },
  {
    id: 2,
    label: '👔 Consultant',
    title: 'Marketing Strategy',
    tagline: 'Closes clients with a professional first impression',
    url: 'sarah.folio.cx',
    mockup: {
      name: 'Sarah Chen',
      title: 'Marketing Consultant',
      sections: ['About', 'Services', 'Clients', 'Contact'],
      accent: '#005582',
    },
  },
  {
    id: 3,
    label: '📊 Executive',
    title: 'VP of Operations',
    tagline: 'Built personal brand for board positions',
    url: 'mike.folio.cx',
    mockup: {
      name: 'Mike Reynolds',
      title: 'VP of Operations',
      sections: ['About', 'Experience', 'Board', 'Contact'],
      accent: '#0077B5',
    },
  },
  {
    id: 4,
    label: '🎨 Freelancer',
    title: 'Graphic Designer',
    tagline: 'Portfolio that wins projects',
    url: 'alex.folio.cx',
    mockup: {
      name: 'Alex Rivera',
      title: 'Graphic Designer',
      sections: ['Portfolio', 'About', 'Process', 'Hire Me'],
      accent: '#00A0DC',
    },
  },
  {
    id: 5,
    label: '💻 Product Manager',
    title: 'Tech PM at SaaS Startup',
    tagline: 'Stands out to recruiters',
    url: 'priya.folio.cx',
    mockup: {
      name: 'Priya Patel',
      title: 'Product Manager',
      sections: ['About', 'Projects', 'Writing', 'Contact'],
      accent: '#005582',
    },
  },
  {
    id: 6,
    label: '🏢 Business Consultant',
    title: 'Strategic Advisor',
    tagline: 'Trusted by Fortune 500 clients',
    url: 'james.folio.cx',
    mockup: {
      name: 'James Wright',
      title: 'Strategic Advisor',
      sections: ['About', 'Services', 'Results', 'Contact'],
      accent: '#0077B5',
    },
  },
];

/* ─── Examples Section ─── */
export default function ExamplesFolio() {
  return (
    <section id="examples" className="relative bg-[#F8F9FA] py-24">
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
              className="group cursor-pointer overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-[250ms] ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Screenshot mockup */}
              <div className="relative aspect-[4/3] overflow-hidden border-b border-[#E5E7EB] bg-[#F8F9FA]">
                <WebsiteMockup
                  name={example.mockup.name}
                  title={example.mockup.title}
                  sections={example.mockup.sections}
                  accentColor={example.mockup.accent}
                />
              </div>

              {/* Card meta */}
              <div className="p-4">
                <div className="mb-1 text-sm font-medium text-[#0077B5]">
                  {example.url}
                </div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs text-gray-400">{example.label}</span>
                </div>
                <h3 className="mb-1 font-semibold text-gray-900">
                  {example.title}
                </h3>
                <p className="text-sm text-gray-600">{example.tagline}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center" data-aos="fade-up">
          <a
            href="/start"
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
