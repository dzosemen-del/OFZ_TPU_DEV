import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the element animates in */
  delay?: number;
  variant?: "up" | "left" | "right" | "zoom";
  as?: ElementType;
  style?: CSSProperties;
  id?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  style,
  id,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      id={id}
      data-variant={variant}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
