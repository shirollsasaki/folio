export function FinalCTA() {
  return (
    <section
      className="section"
      style={{
        backgroundColor: 'var(--bg-secondary)',
      }}
      aria-labelledby="final-cta-heading"
    >
      <div className="container">
        <div
          style={{
            maxWidth: 'var(--container-md)',
            margin: '0 auto',
            textAlign: 'center',
            padding: 'var(--space-16) var(--space-6)',
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--border-light)',
          }}
        >
          {/* Headline */}
          <h2
            id="final-cta-heading"
            className="heading-2"
            style={{
              marginBottom: 'var(--space-6)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            Your professional home should be online
          </h2>

          {/* Subheadline */}
          <p
            className="body-lg"
            style={{
              maxWidth: '36rem',
              margin: '0 auto',
              marginBottom: 'var(--space-8)',
              fontSize: 'var(--text-xl)',
            }}
          >
            Turn your LinkedIn into a website in the time it takes to make coffee.
          </p>

          {/* CTA Button */}
          <a
            href="/folio/sign-up"
            className="btn btn-primary btn-lg"
            aria-label="Get started with Folio for free"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </section>
  );
}
