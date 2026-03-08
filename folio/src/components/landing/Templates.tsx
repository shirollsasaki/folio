import Link from 'next/link';

export function Templates() {
  const templates = [
    { name: "Minimal", tag: "Light", color: "from-slate-50 to-white" },
    { name: "Bold", tag: "Dark", color: "from-slate-900 to-slate-800" },
    { name: "Creative", tag: "Light", color: "from-blue-50 to-indigo-50" },
    { name: "Professional", tag: "Dark", color: "from-gray-800 to-gray-900" },
    { name: "Modern", tag: "Light", color: "from-emerald-50 to-teal-50" },
    { name: "Classic", tag: "Dark", color: "from-purple-900 to-indigo-900" },
  ];

  return (
    <section id="templates" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            15 Stunning Templates
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From minimal to bold. Dark to light. Find your style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div 
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 hover:border-blue-300 transition-all hover:shadow-xl">
                {/* Colored placeholder instead of iframe */}
                <div className={`w-full h-full bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                  <div className="text-center">
                    <div className={`text-6xl font-bold mb-2 ${
                      template.tag === "Dark" ? "text-white" : "text-slate-900"
                    }`}>
                      {template.name.charAt(0)}
                    </div>
                    <div className={`text-sm font-medium ${
                      template.tag === "Dark" ? "text-white/60" : "text-slate-500"
                    }`}>
                      {template.name}
                    </div>
                  </div>
                </div>
                
                {/* Tag badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-slate-700 rounded-full border border-slate-200">
                    {template.tag}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{template.name}</h3>
                <span className="text-sm text-slate-500">{template.tag}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/templates" 
            className="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            View All Templates
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
