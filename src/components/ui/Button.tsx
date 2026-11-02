import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "bronze";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: "bg-ink text-canvas border-ink hover:bg-ink-hover",
  outline: "bg-transparent text-ink border-ink hover:bg-ink hover:text-canvas",
  bronze: "bg-bronze text-canvas border-bronze hover:bg-bronze-hover",
};

export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`label-caps border px-8 py-4 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}