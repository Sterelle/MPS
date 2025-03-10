import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
        secondary: "bg-secondary text-gray-900 hover:bg-secondary-dark focus-visible:ring-secondary",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-400",
        ghost: "bg-transparent hover:bg-gray-100 focus-visible:ring-gray-400",
        link: "bg-transparent underline-offset-4 hover:underline text-primary hover:bg-transparent",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-11 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button; 