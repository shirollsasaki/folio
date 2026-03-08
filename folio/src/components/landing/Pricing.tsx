import Link from 'next/link';
import { Check, Zap } from 'lucide-react';

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1 Portfolio",
        "3 Templates",
        "folio.app subdomain",
        "LinkedIn sync",
        "Mobile responsive"
      ],
      cta: "Start Free",
      href: "/sign-up",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "/month",
      description: "For professionals who want more",
      features: [
        "Unlimited portfolios",
        "All 15 premium templates",
        "Custom domain",
        "Priority support",
        "Advanced analytics",
        "Remove Folio branding"
      ],
      cta: "Go Pro",
      href: "/sign-up?plan=pro",
      popular: true
    }
  ];

  return (
    <section id="pricing" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Simple,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl border-2 p-8 md:p-10 space-y-8 transition-all hover:shadow-2xl ${
                plan.popular 
                  ? 'border-blue-500 shadow-xl shadow-blue-500/10' 
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-lg text-slate-600">
                    {plan.period}
                  </span>
                </div>
                <p className="text-slate-600">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-slate-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link 
                href={plan.href}
                className={`block w-full text-center px-8 py-4 font-semibold rounded-xl transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transform'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border-2 border-slate-200 hover:border-slate-300'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Testimonial / Use Case */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-10 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                JD
              </div>
              <div className="space-y-2">
                <p className="text-slate-700 text-lg italic leading-relaxed">
                  "I went from LinkedIn profile to live portfolio in under 5 minutes. The templates are gorgeous and my site looks more professional than anything I could've built myself. Best $9/month I spend."
                </p>
                <div className="text-sm text-slate-600 font-medium">
                  — Jordan Davis, Product Designer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
