'use client';

const testimonials = [
  {
    id: 1,
    quote:
      'I landed 3 job interviews within a week of sharing my Folio site. Recruiters told me it made me stand out from other candidates. Best career investment I\'ve made.',
    name: 'Sarah L.',
    title: 'Product Manager',
    context: 'Tech Startup, San Francisco',
    initials: 'SL',
    color: '#0077B5',
  },
  {
    id: 2,
    quote:
      'As a freelance consultant, I needed a professional presence fast. Folio delivered in 10 minutes. Clients take me more seriously now, and I close deals faster.',
    name: 'Michael T.',
    title: 'Marketing Consultant',
    context: 'Independent, Chicago',
    initials: 'MT',
    color: '#005582',
  },
  {
    id: 3,
    quote:
      'I tried Wix and Squarespace but gave up halfway. Too complicated. Folio was actually easy. My website was live before my coffee got cold.',
    name: 'Jessica P.',
    title: 'Executive Coach',
    context: 'Leadership Consulting, New York',
    initials: 'JP',
    color: '#00A0DC',
  },
];

export function Testimonials() {
  return (
    <section
      className="relative py-12 md:py-20"
      style={{ backgroundColor: '#F8F9FA' }}
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="pb-12 text-center md:pb-16">
          <h2
            id="testimonials-heading"
            className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl"
            data-aos="fade-up"
          >
            Trusted by Professionals Worldwide
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <article
              key={t.id}
              className="rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg"
              style={{
                borderLeft: '4px solid #0077B5',
              }}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Quote */}
              <blockquote className="mb-6">
                <p className="leading-relaxed text-gray-700" style={{ fontSize: '0.95rem' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: t.color }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.title}</div>
                  <div className="text-xs text-gray-400">{t.context}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
