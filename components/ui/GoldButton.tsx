"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-sans tracking-widest uppercase transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-champagne text-obsidian hover:bg-champagne-dark hover:shadow-lg hover:shadow-champagne/20 active:scale-[0.98]":
              variant === "primary",
            "border border-champagne text-champagne hover:bg-champagne hover:text-obsidian":
              variant === "outline",
            "text-champagne hover:text-champagne-dark underline underline-offset-4":
              variant === "ghost",
          },
          {
            "text-xs px-4 py-2": size === "sm",
            "text-xs px-6 py-3": size === "md",
            "text-sm px-8 py-4": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
GoldButton.displayName = "GoldButton";
export default GoldButton;
