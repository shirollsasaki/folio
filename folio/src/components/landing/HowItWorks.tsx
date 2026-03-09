export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Connect LinkedIn',
      description:
        'Import your profile data in one click. Work history, skills, and experience flow directly into your site.',
    },
    {
      number: '02',
      title: 'Choose Your Domain',
      description:
        'Use your custom domain or get a free folio.site subdomain. SSL included.',
    },
    {
      number: '03',
      title: 'Deploy',
      description:
        'Your site goes live instantly. Updates to your LinkedIn sync automatically.',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="section"
      style={{
        backgroundColor: 'var(--bg-secondary)',
      }}
      aria-labelledby="how-it-works-heading"
    >
      <div className="container">
        <div
          style={{
            maxWidth: 'var(--container-lg)',
            margin: '0 auto',
          }}
        >
          {/* Section Header */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 'var(--space-16)',
            }}
          >
            <h2
              id="how-it-works-heading"
              className="heading-2"
              style={{
                marginBottom: 'var(--space-4)',
              }}
            >
              How It Works
            </h2>
          </div>

          {/* Steps Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-12)',
            }}
          >
            {steps.map((step, index) => (
              <article
                key={step.number}
                className="step-card"
                style={{
                  padding: 'var(--space-8)',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-light)',
                  transition: 'all var(--transition-base)',
                }}
              >
                {/* Step Number */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'white',
                    borderRadius: 'var(--radius-lg)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 'var(--text-lg)',
                    marginBottom: 'var(--space-4)',
                  }}
                  aria-label={`Step ${index + 1}`}
                >
                  {step.number}
                </div>

                {/* Step Title */}
                <h3
                  className="heading-3"
                  style={{
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p
                  className="body-base"
                  style={{
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
