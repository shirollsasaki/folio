export function Features() {
  return (
    <section id="features" className="section section-bordered section-tinted">
      <div className="section-content">
        <div className="section-header">
          <div className="section-badge">02</div>
          <h2 className="section-title">Features</h2>
        </div>

        <div className="features-grid-3">
          <div className="feature">
            <div className="feature-icon">↻</div>
            <h3>Auto-Sync</h3>
            <p>Website updates when LinkedIn changes. Set it once, forget it.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">⬡</div>
            <h3>Custom Domains</h3>
            <p>Bring your own or use ours. SSL configured automatically.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3>Global CDN</h3>
            <p>Fast hosting worldwide. Loads in milliseconds.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">✦</div>
            <h3>Clean Templates</h3>
            <p>Minimal designs. Your work front and center.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">↑</div>
            <h3>SEO Ready</h3>
            <p>Meta tags, structured data, clean URLs. Built to rank.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">○</div>
            <h3>Zero Maintenance</h3>
            <p>No CMS. No plugins. No server management.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
