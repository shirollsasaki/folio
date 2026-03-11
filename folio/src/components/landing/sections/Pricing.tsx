import Link from 'next/link';

export function Pricing() {
  return (
    <section id="pricing" className="section section-bordered">
      <div className="section-content">
        <div className="section-header">
          <div className="section-badge">03</div>
          <h2 className="section-title">Pricing</h2>
        </div>

        <div className="pricing-card">
          <div className="pricing-badge">Coming Soon</div>
          <p className="pricing-tier">Pro</p>
          <p className="pricing-price">
            $12<span>/month</span>
          </p>
          <ul className="pricing-features">
            <li>Custom domain</li>
            <li>All 15 templates</li>
            <li>AI bio cleanup</li>
            <li>LinkedIn auto-sync</li>
            <li>Email support</li>
          </ul>
          <Link href="/folio/build" className="btn btn-primary btn-lg">
            Join Waitlist →
          </Link>
        </div>
      </div>
    </section>
  );
}
