import type { ComponentProps, ReactNode } from "react";

/* eslint-disable @next/next/no-img-element -- tiny decorative SVG layers, nothing for next/image to optimize */

/**
 * Red Clay shield (brand spec): black outline, white house + chimney, black foundation line,
 * clay red ONLY in the soil layers. Built from the Figma layers so it scales cleanly.
 * Base artboard is 200×230; pass a width and the height follows.
 */
export function LogoMark({ width = 48, className = "" }: { width?: number; className?: string }) {
  const layer = "absolute block max-w-none";
  return (
    <span
      aria-hidden
      className={`relative inline-block shrink-0 overflow-hidden ${className}`}
      style={{ width, height: (width * 230) / 200 }}
    >
      <img alt="" src="/logo/v0.svg" className={layer} style={{ inset: "0.87% 1%", width: "98%", height: "98.26%" }} />
      <img alt="" src="/logo/v1.svg" className={layer} style={{ left: "5.625%", top: "4.85%", width: "88.75%", height: "90.3%" }} />
      {/* Soil layers, clipped to the inner shield */}
      <span
        className="absolute overflow-hidden"
        style={{
          inset: "8.7% 10% 9.13% 10%",
          maskImage: "url(/logo/mask.svg)",
          WebkitMaskImage: "url(/logo/mask.svg)",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <img alt="" src="/logo/soil.svg" className={layer} style={{ left: "-12.5%", top: "-10.58%", width: "125%", height: "121.69%" }} />
      </span>
      <img alt="" src="/logo/v2.svg" className={layer} style={{ inset: "18.7% 62.5% 72.61% 33%", width: "4.5%", height: "8.69%" }} />
      <img alt="" src="/logo/v3.svg" className={layer} style={{ inset: "16.52% 26% 67.83% 26%", width: "48%", height: "15.65%" }} />
      <img alt="" src="/logo/v4.svg" className={layer} style={{ inset: "30.87% 33.5% 60% 33.5%", width: "33%", height: "9.13%" }} />
      <img alt="" src="/logo/v5.svg" className={layer} style={{ inset: "33.48% 46% 60% 46%", width: "8%", height: "6.52%" }} />
    </span>
  );
}

/** Shield + "RED CLAY / CRAWLSPACE REPAIR". `tone="light"` for dark backgrounds. */
export function Wordmark({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  return (
    <span className={`flex items-center ${compact ? "gap-[9.84px]" : "gap-3"} ${tone === "light" ? "text-white" : "text-ink-900"}`}>
      <LogoMark width={compact ? 39.36 : 48} />
      <span className="flex flex-col whitespace-nowrap">
        <span
          className={`font-slab font-extrabold leading-none ${compact ? "text-[22.14px] tracking-[0.22px]" : "text-[27px] tracking-[-0.27px]"}`}
        >
          RED CLAY
        </span>
        <span className={`font-mont font-bold ${compact ? "text-[8.61px] tracking-[1.38px]" : "text-[10.5px] tracking-[1.68px]"}`}>
          CRAWLSPACE REPAIR
        </span>
      </span>
    </span>
  );
}

type Variant = "primary" | "outline" | "dark" | "light";
const variants: Record<Variant, string> = {
  primary: "bg-clay-500 text-white hover:bg-clay-600",
  outline: "border-[1.5px] border-white text-white hover:bg-white/10",
  dark: "bg-ink-900 text-white hover:bg-black",
  light: "bg-white text-clay-500 hover:bg-clay-100",
};
export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `inline-flex min-h-11 items-center justify-center rounded-[4px] px-7 py-4 text-center font-cond text-[18px] font-bold uppercase leading-none tracking-[1.08px] transition-colors ${variants[variant]} ${extra}`;

export function ButtonLink({ variant, className, ...props }: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}

/** Short clay rule + uppercase condensed label above section headings. */
export function Eyebrow({ children, tone = "clay", rule = "clay" }: { children: ReactNode; tone?: "clay" | "light"; rule?: "clay" | "white" }) {
  return (
    <p className="flex items-center gap-[10px] lg:gap-3">
      <span aria-hidden className={`h-[3px] w-7 shrink-0 lg:w-9 ${rule === "white" ? "bg-white lg:bg-clay-500" : "bg-clay-500"}`} />
      <span
        className={`font-cond text-[14px] font-bold uppercase tracking-[1.96px] lg:text-[16px] lg:tracking-[2.24px] ${tone === "light" ? "text-clay-100" : "text-clay-500"}`}
      >
        {children}
      </span>
    </p>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
     
    <img alt="" aria-hidden src="/icons/check.svg" width={22} height={22} className={`size-[22px] shrink-0 ${className}`} />
  );
}

export function CheckItem({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <li className="flex items-center gap-[10px]">
      <CheckIcon />
      <span className={`font-body text-[17px] font-medium ${tone === "light" ? "text-white" : "text-ink-900"}`}>{children}</span>
    </li>
  );
}

/** Section heading: 32px on phones, 47px on desktop (Figma). */
export function H2({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <h2 id={id} className={`font-slab text-[32px] font-bold leading-[1.1] lg:text-[47px] lg:leading-[1.08] ${className}`}>
      {children}
    </h2>
  );
}
