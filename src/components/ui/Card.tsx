import type { ComponentProps } from "react";

type Tone = "default" | "alt";

interface CardProps extends ComponentProps<"div"> {
  tone?: Tone;
  padded?: boolean;
}

const tones: Record<Tone, string> = {
  default: "bg-canvas",
  alt: "bg-canvas-alt",
};

export default function Card({
  tone = "default",
  padded = true,
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={`border ${tones[tone]} ${padded ? "p-6" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}