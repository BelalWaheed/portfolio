import * as React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[140px] w-full studio-input px-4 py-3 text-sm text-text-primary transition-all duration-200 resize-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-status-error focus:ring-status-error/20',
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
