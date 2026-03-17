export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-zinc-400 mb-8">
          <strong>Effective Date:</strong> March 11, 2026<br />
          <strong>Last Updated:</strong> March 11, 2026
        </p>

        <div className="prose prose-invert prose-zinc max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">Overview</h2>
            <p className="text-zinc-300 leading-relaxed">
              Folio (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;Company&rdquo;) operates the website and services at folio.site. 
              This Privacy Policy describes how we collect, use, and handle your personal data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">1. Information We Collect</h2>
            
            <h3 className="text-xl font-medium mb-3 text-zinc-200">1.1 Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 mb-4">
              <li><strong>LinkedIn Profile Data:</strong> When you authorize Folio to access your LinkedIn profile, we collect your name, headline, summary, work experience, education, and publicly available profile information.</li>
              <li><strong>Account Information:</strong> Email address, password, preferences, billing information.</li>
              <li><strong>Website Content:</strong> Text, images, and other content you add to your Folio website.</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 text-zinc-200">1.2 Automatically Collected</h3>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, device type, IP address.</li>
              <li><strong>Cookies:</strong> For authentication, preferences, and analytics.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">2. How We Use Your Data</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              <li>To build and maintain your personal website</li>
              <li>To authenticate your account and secure your data</li>
              <li>To communicate with you about your account and service updates</li>
              <li>To analyze usage patterns and improve Folio</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">3. Data Sharing</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              <li><strong>Service Providers:</strong> Vercel (hosting), Supabase (database), Proxycurl (LinkedIn API)</li>
              <li><strong>Payment Processors:</strong> Dodo (payments, if applicable)</li>
              <li><strong>Analytics:</strong> PostHog (usage analytics)</li>
              <li><strong>Legal Requirement:</strong> We may disclose data if required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">4. Data Retention</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              <li><strong>Active Accounts:</strong> Retained as long as your account is active</li>
              <li><strong>Deleted Accounts:</strong> We delete your data within 30 days of account deletion, except where required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">5. Your Rights</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              <li><strong>Access:</strong> Request a copy of your data</li>
              <li><strong>Deletion:</strong> Request we delete your account and data</li>
              <li><strong>Portability:</strong> Export your website content</li>
            </ul>
            <p className="text-zinc-300 mt-4">
              To exercise these rights, email{" "}
              <a href="mailto:support@folio.site" className="text-orange-400 hover:text-orange-300 underline">
                support@folio.site
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">6. Security</h2>
            <p className="text-zinc-300 leading-relaxed">
              We use industry-standard encryption and security practices. However, no system is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">7. Third-Party Links</h2>
            <p className="text-zinc-300 leading-relaxed">
              Folio websites may link to external sites. We are not responsible for their privacy practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">8. Contact</h2>
            <p className="text-zinc-300 leading-relaxed">
              Questions about this policy? Email{" "}
              <a href="mailto:support@folio.site" className="text-orange-400 hover:text-orange-300 underline">
                support@folio.site
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">9. Changes to Policy</h2>
            <p className="text-zinc-300 leading-relaxed">
              We may update this policy. Significant changes will be announced on our website.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <a 
            href="/folio" 
            className="text-orange-400 hover:text-orange-300 underline"
          >
            ← Back to Folio
          </a>
        </div>
      </div>
    </div>
  );
}
