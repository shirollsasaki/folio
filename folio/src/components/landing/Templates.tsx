import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Templates() {
  const templates = [
    { 
      name: "Impact Report", 
      tag: "Dark", 
      color: "from-slate-900 via-slate-800 to-slate-900",
      accent: "text-white",
      description: "Clean stats-focused layout"
    },
    { 
      name: "Minimal Pro", 
      tag: "Light", 
      color: "from-white via-slate-50 to-slate-100",
      accent: "text-slate-900",
      description: "Simple & elegant design"
    },
    { 
      name: "Bold Statement", 
      tag: "Gradient", 
      color: "from-blue-600 via-purple-600 to-pink-600",
      accent: "text-white",
      description: "Stand out from the crowd"
    },
    { 
      name: "Tech Leader", 
      tag: "Dark", 
      color: "from-gray-900 via-blue-900 to-gray-900",
      accent: "text-blue-300",
      description: "Perfect for developers"
    },
    { 
      name: "Creative Soul", 
      tag: "Light", 
      color: "from-amber-50 via-orange-50 to-red-50",
      accent: "text-slate-900",
      description: "For designers & artists"
    },
    { 
      name: "Corporate Elite", 
      tag: "Dark", 
      color: "from-indigo-950 via-blue-950 to-slate-950",
      accent: "text-indigo-300",
      description: "Executive presence"
    },
  ];

  return (
    <section id="templates" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Template
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            15 professionally designed templates. From minimal to bold. Find your style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div 
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-all hover:shadow-2xl hover:scale-105 transform duration-300">
                {/* Template Preview */}
                <div className={`w-full h-full bg-gradient-to-br ${template.color} flex flex-col items-center justify-center p-8 relative`}>
                  {/* Mock Content */}
                  <div className="w-full space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full ${
                        template.tag === "Light" ? "bg-slate-300" : "bg-white/20"
                      }`}></div>
                      <div className="flex-1 space-y-2">
                        <div className={`h-3 rounded ${
                          template.tag === "Light" ? "bg-slate-300" : "bg-white/30"
                        } w-3/4`}></div>
                        <div className={`h-2 rounded ${
                          template.tag === "Light" ? "bg-slate-200" : "bg-white/20"
                        } w-1/2`}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`h-2 rounded ${
                        template.tag === "Light" ? "bg-slate-200" : "bg-white/20"
                      }`}></div>
                      <div className={`h-2 rounded ${
                        template.tag === "Light" ? "bg-slate-200" : "bg-white/20"
                      } w-5/6`}></div>
                      <div className={`h-2 rounded ${
                        template.tag === "Light" ? "bg-slate-200" : "bg-white/20"
                      } w-4/6`}></div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className={`aspect-square rounded ${
                        template.tag === "Light" ? "bg-slate-300" : "bg-white/20"
                      }`}></div>
                      <div className={`aspect-square rounded ${
                        template.tag === "Light" ? "bg-slate-300" : "bg-white/20"
                      }`}></div>
                      <div className={`aspect-square rounded ${
                        template.tag === "Light" ? "bg-slate-300" : "bg-white/20"
                      }`}></div>
                    </div>
                  </div>

                  {/* Template Name Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    template.tag === "Light" 
                      ? "from-white/90 via-white/40" 
                      : "from-black/90 via-black/40"
                  } to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8`}>
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-2 ${template.accent}`}>
                        {template.name}
                      </div>
                      <div className={`text-sm ${
                        template.tag === "Light" ? "text-slate-600" : "text-white/70"
                      }`}>
                        {template.description}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tag Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-xs font-semibold text-slate-700 rounded-full border border-slate-200 shadow-lg">
                    {template.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/templates" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all shadow-lg hover:shadow-xl group"
          >
            View All 15 Templates
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
