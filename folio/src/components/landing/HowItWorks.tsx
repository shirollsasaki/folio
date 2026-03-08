export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Paste your LinkedIn URL",
      description: "We extract your profile automatically",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      number: "2",
      title: "Choose a template",
      description: "15 professionally designed options",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
        </svg>
      )
    },
    {
      number: "3",
      title: "Go live instantly",
      description: "Your site deploys in seconds",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From LinkedIn to live portfolio in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative bg-white p-8 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all group"
            >
              {/* Step number badge */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                {step.number}
              </div>
              
              {/* Icon */}
              <div className="mt-4 mb-6 text-blue-600">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
