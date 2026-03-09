export function Features() {
  const features = [
    {
      title: 'Auto-Sync',
      description:
        'Your website updates whenever your LinkedIn profile changes. Set it once, forget it.',
      icon: '🔄',
    },
    {
      title: 'Custom Domains',
      description:
        'Bring your own domain or use ours. SSL certificates configured automatically.',
      icon: '🌐',
    },
    {
      title: 'Fast Hosting',
      description:
        'Global CDN deployment. Your site loads in milliseconds, anywhere.',
      icon: '⚡',
    },
    {
      title: 'Clean Templates',
      description:
        'Minimal, professional designs that put your work front and center. No clutter.',
      icon: '✨',
    },
    {
      title: 'SEO Ready',
      description:
        'Proper meta tags, structured data, and clean URLs. Built to rank.',
      icon: '📈',
    },
    {
      title: 'Zero Maintenance',
      description:
        'No CMS to update. No plugins to manage. No server to monitor.',
      icon: '🎯',
    },
  ];

  return (
    <section
      id="features"
      className="section"
      style={{
        backgroundColor: 'var(--bg-primary)',
      }}
      aria-labelledby="features-heading"
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
              id="features-heading"
              className="heading-2"
              style={{
                marginBottom: 'var(--space-4)',
              }}
            >
              Features
            </h2>
          </div>

          {/* Features Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {features.map((feature) => (
              <article
                key={feature.title}
                className="feature-card"
                style={{
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  transition: 'all var(--transition-base)',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    fontSize: 'var(--text-4xl)',
                    marginBottom: 'var(--space-4)',
                  }}
                  role="img"
                  aria-label={`${feature.title} icon`}
                >
                  {feature.icon}
                </div>

                {/* Feature Title */}
                <h3
                  className="heading-3"
                  style={{
                    fontSize: 'var(--text-xl)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p
                  className="body-base"
                  style={{
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
