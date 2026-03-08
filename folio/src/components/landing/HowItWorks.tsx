import { Linkedin, Palette, Rocket } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Linkedin className="w-8 h-8" />,
      title: "Connect LinkedIn",
      description: "Import your profile data in one click. Your experience, skills, and achievements automatically flow in."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Pick Your Style",
      description: "Choose from 15 professionally designed templates. From minimal to bold, light to dark - find your vibe."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Deploy & Share",
      description: "Your portfolio goes live in seconds. Get a custom domain or use ours. Share your new site anywhere."
    }
  ];

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Three simple steps to your professional portfolio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 z-0"></div>
              )}
              
              <div className="relative bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all space-y-6 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold rounded-full flex items-center justify-center shadow-lg text-lg">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-blue-600">
                  {step.icon}
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
