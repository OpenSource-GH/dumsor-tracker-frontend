import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "large"; // Added variants so we can use the same component but with different styles
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const baseClassName =
      "flex bg-transparent py-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";
    let specificClassName = "";

    switch (variant) {
      case "large":
        specificClassName = "min-h-[60px] w-3/4 text-2xl placeholder:text-2xl";
        break;
      case "default":
      default:
        specificClassName =
          "h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:ring-ring";
        break;
    }

    return (
      <input
        type={type}
        className={cn(baseClassName, specificClassName, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
