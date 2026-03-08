import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export function FinalCTA() {
  const benefits = [
    "Live in under 10 seconds",
    "No credit card required",
    "Cancel anytime"
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 md:py-32 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS00IDB2Mmgydi0yaC0yem0tNCAyaDJ2LTJoLTJ2MnptOCAwaDJ2LTJoLTJ2MnptLTggNGgydi0yaC0ydjJ6bTAgNGgydi0yaC0ydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="relative max-w-5xl mx-auto px-6 md:px-8 text-center space-y-12">
        {/* Headline */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Ready to Build Your
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Professional Portfolio?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who've upgraded their online presence
          </p>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-white/90">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-green-400" />
              </div>
              <span className="text-sm md:text-base font-medium">
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link 
            href="/sign-up" 
            className="group px-10 py-5 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform text-lg"
          >
            <span className="flex items-center gap-3">
              Start Building Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link 
            href="#pricing" 
            className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/30 transition-all text-lg"
          >
            View Pricing
          </Link>
        </div>

        {/* Trust Line */}
        <p className="text-blue-200 text-sm">
          Free plan available · No credit card required
        </p>
      </div>
    </section>
  );
}
