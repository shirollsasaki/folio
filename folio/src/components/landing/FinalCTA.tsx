import Link from 'next/link';

export function FinalCTA() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-12 md:p-16 shadow-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your portfolio is 3 minutes away
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join professionals who use Folio to stand out
          </p>
          <Link 
            href="/sign-up"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-xl text-lg"
          >
            Build My Website
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
