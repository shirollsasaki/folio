export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-light)',
        padding: 'var(--space-12) 0',
      }}
      role="contentinfo"
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-8)',
          }}
        >
          {/* Top Section */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 'var(--space-8)',
              flexWrap: 'wrap',
            }}
          >
            {/* Logo & Tagline */}
            <div style={{ maxWidth: '320px' }}>
              <a
                href="/folio"
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  letterSpacing: '-0.02em',
                  display: 'block',
                  marginBottom: 'var(--space-3)',
                }}
                aria-label="Folio homepage"
              >
                Folio
              </a>
              <p
                className="body-sm"
                style={{
                  color: 'var(--text-tertiary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Turn your LinkedIn into a personal website in minutes. No code required.
              </p>
            </div>

            {/* Navigation Links */}
            <nav
              style={{
                display: 'flex',
                gap: 'var(--space-12)',
                flexWrap: 'wrap',
              }}
              aria-label="Footer navigation"
            >
              <div>
                <h3
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Product
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}
                >
                  <li>
                    <a
                      href="#how-it-works"
                      className="footer-link"
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-tertiary)',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)',
                      }}
                    >
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features"
                      className="footer-link"
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-tertiary)',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)',
                      }}
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="footer-link"
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-tertiary)',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)',
                      }}
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Company
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}
                >
                  <li>
                    <a
                      href="/folio/about"
                      className="footer-link"
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-tertiary)',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)',
                      }}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/folio/privacy"
                      className="footer-link"
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-tertiary)',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)',
                      }}
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/folio/terms"
                      className="footer-link"
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-tertiary)',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)',
                      }}
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              paddingTop: 'var(--space-8)',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
            }}
          >
            <p
              className="body-sm"
              style={{
                color: 'var(--text-tertiary)',
                margin: 0,
              }}
            >
              © {new Date().getFullYear()} Folio. All rights reserved.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
              }}
            >
              <a
                href="https://twitter.com/folio"
                className="footer-link"
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-tertiary)',
                  textDecoration: 'none',
                  transition: 'color var(--transition-fast)',
                }}
                aria-label="Follow Folio on Twitter"
              >
                Twitter
              </a>
              <a
                href="https://github.com/folio"
                className="footer-link"
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-tertiary)',
                  textDecoration: 'none',
                  transition: 'color var(--transition-fast)',
                }}
                aria-label="Follow Folio on GitHub"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
