import Link from 'next/link';

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              F
            </div>
            <span className="text-xl font-bold text-slate-900 hidden sm:block">Folio</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#templates" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Templates
            </Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              FAQ
            </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link 
              href="/sign-in" 
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors hidden sm:block"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up" 
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
