export function Features() {
  const features = [
    {
      title: "LinkedIn Sync",
      description: "Auto-updates from your profile"
    },
    {
      title: "Custom Domain",
      description: "Use your.domain.com"
    },
    {
      title: "Fast Deployment",
      description: "Live in seconds"
    },
    {
      title: "Mobile Responsive",
      description: "Works everywhere"
    },
    {
      title: "Always Updated",
      description: "Syncs with LinkedIn"
    },
    {
      title: "Pro Templates",
      description: "Premium designs"
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
          Everything you need
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-lg border transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: 'var(--lumo-bg-base)',
                borderColor: 'var(--lumo-text-muted)' + '33'
              }}
            >
              <h3 
                className="font-serif text-xl mb-3 font-normal"
                style={{ color: 'var(--lumo-text)' }}
              >
                {feature.title}
              </h3>
              <p 
                className="font-mono text-sm"
                style={{ color: 'var(--lumo-text-muted)' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
