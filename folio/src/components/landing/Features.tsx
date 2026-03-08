import { Linkedin, Globe, Zap, Smartphone, RefreshCw, Sparkles } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Linkedin className="w-7 h-7" />,
      title: "LinkedIn Sync",
      description: "Import your profile in one click. Your experience, skills, and achievements automatically flow in.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Custom Domain",
      description: "Use your own domain (yourname.com) or get a free subdomain. Make it truly yours.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <RefreshCw className="w-7 h-7" />,
      title: "Always Updated",
      description: "Edit anytime, changes go live instantly. Your portfolio evolves with your career.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: "Mobile Responsive",
      description: "Looks perfect on every device. Your visitors get a great experience, guaranteed.",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Fast Deployment",
      description: "Live in under 10 seconds. No waiting, no complex setup. Just ship it.",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Pro Templates",
      description: "Premium designs that stand out. Built by designers who care about details.",
      gradient: "from-indigo-500 to-blue-600"
    }
  ];

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Everything You Need,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nothing You Don't
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful features that make portfolio building effortless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 space-y-4"
            >
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white shadow-lg shadow-${feature.gradient.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
