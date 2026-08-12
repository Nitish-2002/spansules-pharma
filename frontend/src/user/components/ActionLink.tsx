import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Themed pill link. Colours come from the admin theme via CSS variables
 * (`.u-btn-primary` / `.u-btn-ghost` in globals.css).
 */
export default function ActionLink({
  href,
  label,
  variant = 'primary',
  withArrow = true,
  className = '',
}: {
  href: string;
  label: string;
  variant?: 'primary' | 'ghost';
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`u-btn ${variant === 'primary' ? 'u-btn-primary' : 'u-btn-ghost'} group ${className}`}
    >
      <span className="relative z-10">{label}</span>
      {withArrow && (
        <ArrowRight
          className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

/** Quieter text link with an underline that draws in on hover. */
export function TextLink({
  href,
  label,
  className = '',
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`u-underline group inline-flex items-center gap-2 text-sm font-semibold ${className}`}
      style={{ color: 'var(--primary-color)' }}
    >
      {label}
      <ArrowRight
        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
