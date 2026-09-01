import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
  {
    variants: {
      variant: {
        primary: "bg-ink-950 text-cream-50 hover:bg-ink-800 shadow-card",
        emerald: "bg-emerald-600 text-cream-50 hover:bg-emerald-700 shadow-card",
        outline: "border border-ink-900/15 bg-transparent text-ink-900 hover:bg-ink-900/5",
        ghost: "bg-transparent text-ink-900 hover:bg-ink-900/5",
        gold: "bg-gold-500 text-ink-950 hover:bg-gold-600",
      },
      size: {
        sm: "h-8 px-3.5 text-xs",
        md: "h-10 px-5",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";
