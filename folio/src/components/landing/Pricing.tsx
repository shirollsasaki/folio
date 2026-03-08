import LumoButton from '@/components/lumo/LumoButton';

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "yourname.folio.site subdomain",
        "5 template options",
        "LinkedIn sync",
        "Basic customization",
        "Mobile responsive"
      ],
      cta: "Get Started",
      href: "/sign-up",
      variant: "secondary" as const
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      features: [
        "Custom domain (your.domain.com)",
        "All 15 premium templates",
        "Advanced customization",
        "Priority support",
        "Remove Folio branding"
      ],
      cta: "Start Free Trial",
      href: "/sign-up?plan=pro",
      variant: "primary" as const,
      popular: true
    }
  ];

  return (
    <section 
      className="py-24 px-8"
      style={{ backgroundColor: 'var(--lumo-bg-base)' }}
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <h2 
          className="font-serif text-3xl md:text-4xl text-center font-normal tracking-tight"
          style={{ color: 'var(--lumo-text)' }}
        >
          Simple, transparent pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className="p-8 rounded-lg border transition-all hover:shadow-lg relative"
              style={{ 
                backgroundColor: 'var(--lumo-bg-base)',
                borderColor: plan.popular ? 'var(--lumo-accent)' : 'var(--lumo-text-muted)' + '33',
                borderWidth: plan.popular ? '2px' : '1px'
              }}
            >
              {plan.popular && (
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-xs px-4 py-1 rounded-full"
                  style={{ 
                    backgroundColor: 'var(--lumo-accent)',
                    color: '#fff'
                  }}
                >
                  POPULAR
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 
                    className="font-serif text-2xl mb-2 font-normal"
                    style={{ color: 'var(--lumo-text)' }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span 
                      className="font-serif text-4xl font-normal"
                      style={{ color: 'var(--lumo-text)' }}
                    >
                      {plan.price}
                    </span>
                    <span 
                      className="font-mono text-sm"
                      style={{ color: 'var(--lumo-text-muted)' }}
                    >
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li 
                      key={i}
                      className="flex items-start gap-3 font-mono text-sm"
                      style={{ color: 'var(--lumo-text-muted)' }}
                    >
                      <span style={{ color: 'var(--lumo-accent)' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="w-full flex justify-center">
                  <LumoButton 
                    href={plan.href} 
                    variant={plan.variant}
                  >
                    {plan.cta}
                  </LumoButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
