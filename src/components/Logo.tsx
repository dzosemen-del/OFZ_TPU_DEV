import tpuLogoDark from "@/assets/tpu_logo_full.png";
import tpuLogoWhite from "@/assets/tpu_logo_white.png";
import tpuMark from "@/assets/tpu_mark.png";
import { cn } from "@/utils/cn";

type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  withText?: boolean;
};

/**
 * Official mark: the 3D isometric green-and-black cube of Tomsk Polytechnic University.
 */


/**
 * Official TPU logo (full horizontal block): isometric cube mark + "ТОМСКИЙ ПОЛИТЕХНИЧЕСКИЙ УНИВЕРСИТЕТ"
 * Uses the official raster asset from TPU brand identity (with optimized light/dark versions).
 */
export function Logo({ className, tone = "dark", size = "sm", withText = true }: LogoProps) {
  const isLight = tone === "light";
  const src = isLight ? tpuLogoWhite : tpuLogoDark;

  if (!withText) {
    return (
      <a
        href="#top"
        className={cn("group inline-flex items-center", className)}
        aria-label="Томский политехнический университет — на главную"
      >
        <LogoMark
          className={cn(
            "transition-transform duration-500 group-hover:scale-105",
            size === "sm" && "h-9 md:h-10",
            size === "md" && "h-11 md:h-12",
            size === "lg" && "h-16 md:h-20",
          )}
        />
      </a>
    );
  }

  return (
    <a
      href="#top"
      className={cn("group inline-flex items-center", className)}
      aria-label="Томский политехнический университет — на главную"
    >
      <img
        src={src}
        alt="Томский политехнический университет"
        draggable={false}
        className={cn(
          "w-auto select-none object-contain transition-transform duration-500 group-hover:scale-[1.02]",
          size === "sm" && "h-9 md:h-10",
          size === "md" && "h-11 md:h-12",
          size === "lg" && "h-14 md:h-20",
        )}
      />
    </a>
  );
}
