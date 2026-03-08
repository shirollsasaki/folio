import Link from 'next/link';

export function Footer() {
  return (
    <footer 
      className="py-12 px-8 border-t"
      style={{ 
        backgroundColor: 'var(--lumo-bg-base)',
        borderColor: 'var(--lumo-text-muted)' + '33'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div 
            className="font-serif text-2xl font-normal tracking-tight uppercase italic"
            style={{ color: 'var(--lumo-text)' }}
          >
            Folio
          </div>

          <nav className="flex gap-8">
            <Link 
              href="/templates" 
              className="font-mono text-xs uppercase tracking-wider no-underline transition-colors hover:text-lumo-accent"
              style={{ color: 'var(--lumo-text-muted)' }}
            >
              Templates
            </Link>
            <Link 
              href="/sign-in" 
              className="font-mono text-xs uppercase tracking-wider no-underline transition-colors hover:text-lumo-accent"
              style={{ color: 'var(--lumo-text-muted)' }}
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up" 
              className="font-mono text-xs uppercase tracking-wider no-underline transition-colors hover:text-lumo-accent"
              style={{ color: 'var(--lumo-text-muted)' }}
            >
              Sign Up
            </Link>
          </nav>

          <p 
            className="font-mono text-xs"
            style={{ color: 'var(--lumo-text-muted)' }}
          >
            © {new Date().getFullYear()} Folio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
