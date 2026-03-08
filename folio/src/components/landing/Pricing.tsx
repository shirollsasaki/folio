import Link from 'next/link';

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      description: "Perfect for getting started",
      features: [
        "Folio subdomain",
        "5 templates",
        "LinkedIn import",
        "Basic analytics"
      ],
      cta: "Start Free",
      ctaLink: "/sign-up",
      popular: false
    },
    {
      name: "Pro",
      price: "$12",
      period: "/mo",
      description: "For professionals who want more",
      features: [
        "Custom domain",
        "All 15 templates",
        "AI bio cleanup",
        "Priority support"
      ],
      cta: "Go Pro",
      ctaLink: "/sign-up?plan=pro",
      popular: true
    }
  ];

  return (
    <section id="pricing" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            Simple Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl border-2 p-8 ${
                plan.popular 
                  ? 'border-blue-600 shadow-xl shadow-blue-600/10' 
                  : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-xl text-slate-500 ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-slate-600">
                  {plan.description}
                </p>
              </div>

              <Link 
                href={plan.ctaLink}
                className={`block w-full py-3 text-center font-medium rounded-lg transition-colors mb-6 ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Cancel anytime · No contracts
        </p>
      </div>
    </section>
  );
}
