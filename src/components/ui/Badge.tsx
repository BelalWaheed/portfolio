import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors',
          {
            'bg-accent/10 text-accent border border-accent/20': variant === 'default',
            'bg-bg-element text-text-muted border border-border-default': variant === 'secondary',
            'border border-border-default text-text-muted hover:text-text-primary': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
