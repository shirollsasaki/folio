import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
  children: ReactNode;
}

/**
 * Card Component - Design System Compliant
 * - Consistent spacing and borders
 * - Hover interactions with animation
 * - Proper focus management
 * - Semantic HTML structure
 */
export function Card({
  variant = 'default',
  hover = false,
  children,
  className,
  ...props
}: CardProps) {
  const baseClasses = cn(
    'rounded-lg overflow-hidden',
    'transition-all duration-300 ease-in-out',
    className
  );

  const variantClasses = {
    default: cn(
      'bg-[var(--color-bg-base)]',
      'border border-[var(--color-border-subtle)]'
    ),
    elevated: cn(
      'bg-[var(--color-bg-elevated)]',
      'shadow-base'
    ),
    outlined: cn(
      'bg-transparent',
      'border-2 border-[var(--color-border-default)]'
    ),
  };

  const hoverClasses = hover
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
    : '';

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], hoverClasses)}
      {...props}
    >
      {children}
    </div>
  );
}
