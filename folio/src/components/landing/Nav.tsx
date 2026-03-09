export function Nav() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-light)',
        backdropFilter: 'blur(12px)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4rem',
          }}
        >
          {/* Logo */}
          <a
            href="/folio"
            className="nav-logo"
            style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              transition: 'color var(--transition-fast)',
            }}
            aria-label="Folio homepage"
          >
            Folio
          </a>

          {/* Navigation Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-8)',
            }}
          >
            <a
              href="#how-it-works"
              className="nav-link"
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color var(--transition-fast)',
              }}
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="nav-link"
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color var(--transition-fast)',
              }}
            >
              Pricing
            </a>
            <a
              href="/folio/sign-in"
              className="btn btn-primary"
              style={{
                fontSize: 'var(--text-sm)',
                padding: 'var(--space-2) var(--space-4)',
              }}
              aria-label="Sign in to your account"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>

    </nav>
  );
}
