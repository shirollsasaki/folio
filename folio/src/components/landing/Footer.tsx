import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link 
              href="/" 
              className="font-playfair text-2xl font-bold text-slate-900 inline-block mb-4"
            >
              Folio
            </Link>
            <p className="text-sm text-slate-600">
              Turn your LinkedIn into a stunning portfolio website in minutes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sign-in" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-600">
            © 2026 Folio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
