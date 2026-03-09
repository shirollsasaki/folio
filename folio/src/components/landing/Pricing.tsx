export function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'folio.site subdomain',
        'Auto-sync from LinkedIn',
        'SSL certificate included',
        'Community support',
      ],
      cta: 'Start Free',
      href: '/folio/sign-up',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      features: [
        'Custom domain',
        'Priority sync',
        'Analytics dashboard',
        'Email support',
      ],
      cta: 'Start Free',
      href: '/folio/sign-up',
      highlighted: true,
    },
  ];

  return (
    <section
      id="pricing"
      className="section"
      style={{
        backgroundColor: 'var(--bg-secondary)',
      }}
      aria-labelledby="pricing-heading"
    >
      <div className="container">
        <div
          style={{
            maxWidth: 'var(--container-md)',
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
              id="pricing-heading"
              className="heading-2"
              style={{
                marginBottom: 'var(--space-4)',
              }}
            >
              Start free. Upgrade when ready.
            </h2>
          </div>

          {/* Pricing Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
                style={{
                  padding: 'var(--space-8)',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-xl)',
                  border: plan.highlighted
                    ? '2px solid var(--accent-primary)'
                    : '1px solid var(--border-light)',
                  transition: 'all var(--transition-base)',
                  position: 'relative',
                }}
              >
                {/* Plan Name */}
                <h3
                  className="heading-3"
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    marginBottom: 'var(--space-2)',
                    color: plan.highlighted ? 'var(--accent-primary)' : 'var(--text-primary)',
                  }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <span
                    style={{
                      fontSize: 'var(--text-5xl)',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-tertiary)',
                      marginLeft: 'var(--space-2)',
                    }}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* Features List */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    marginBottom: 'var(--space-8)',
                  }}
                >
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--accent-primary)',
                          fontSize: 'var(--text-lg)',
                        }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span
                        className="body-base"
                        style={{
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={plan.href}
                  className={plan.highlighted ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                  }}
                  aria-label={`${plan.cta} with ${plan.name} plan`}
                >
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
