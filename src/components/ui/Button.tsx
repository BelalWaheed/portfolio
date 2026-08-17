import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] border border-emerald-400/30',
        secondary:
          'bg-zinc-900/80 backdrop-blur-md text-zinc-200 border border-white/10 shadow-xs hover:bg-zinc-800 hover:border-emerald-500/40 hover:text-emerald-400 hover:scale-[1.02] active:scale-[0.98]',
        outline:
          'bg-zinc-900/80 backdrop-blur-md text-zinc-200 border border-white/10 shadow-xs hover:bg-zinc-800 hover:border-emerald-500/40 hover:text-emerald-400 hover:scale-[1.02] active:scale-[0.98]',
        ghost:
          'hover:bg-emerald-500/10 hover:text-emerald-400 text-zinc-300',
        link:
          'text-emerald-400 underline-offset-4 hover:underline',
        gradient:
          'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] border border-emerald-300/30',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-3.5 text-xs rounded-lg',
        lg: 'h-11 px-6 text-sm rounded-xl',
        xl: 'h-12 px-8 text-base rounded-xl',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
