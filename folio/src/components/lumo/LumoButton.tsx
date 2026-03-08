import Link from 'next/link';

interface LumoButtonProps {
  href: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function LumoButton({ href, variant = 'primary', children }: LumoButtonProps) {
  const baseStyles = 'inline-block font-mono text-xs uppercase tracking-wider px-10 py-5 transition-all duration-300 ease-lumo relative overflow-hidden no-underline';
  
  const variantStyles = variant === 'primary'
    ? 'bg-lumo-accent text-white font-bold hover:bg-lumo-secondary hover:shadow-lumo-glow hover:-translate-y-0.5 hover:animate-pulse-glow'
    : 'bg-transparent border border-lumo-text/30 text-lumo-text hover:border-lumo-text hover:bg-lumo-accent/8 hover:-translate-y-0.5';

  return (
    <Link href={href} className={`${baseStyles} ${variantStyles}`}>
      {children}
    </Link>
  );
}
