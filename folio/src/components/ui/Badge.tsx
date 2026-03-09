import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

/**
 * Badge Component - Design System Compliant
 * - Semantic color variants
 * - Consistent sizing
 * - Accessible color contrast
 */
export function Badge({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: BadgeProps) {
  const baseClasses = cn(
    'inline-flex items-center',
    'font-body font-medium',
    'rounded-full',
    'transition-colors duration-150',
    className
  );

  const variantClasses = {
    primary: 'bg-[rgba(232,149,106,0.1)] text-[var(--color-primary)] border border-[var(--color-border-accent)]',
    secondary: 'bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border-default)]',
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    error: 'bg-red-50 text-red-700 border border-red-200',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size])}
      {...props}
    >
      {children}
    </span>
  );
}
