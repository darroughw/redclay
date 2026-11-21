import type { ComponentProps, ReactNode } from "react";

/**
 * Red Clay shield (brand spec): black outline, white house + chimney, black foundation line,
 * clay red ONLY in the soil layers. public/logo/shield.svg is the Figma "Logo/Mark" layers
 * combined into one file. Base artboard is 200×230; pass a width and the height follows.
 */
/** Pass `fluid` to size it with className (e.g. responsive widths) instead of a fixed width. */
export function LogoMark({ width = 48, className = "", fluid = false }: { width?: number; className?: string; fluid?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small SVG, nothing for next/image to optimize
    <img
      src="/logo/shield.svg"
      alt=""
      aria-hidden
      width={Math.round(width)}
      height={Math.round((width * 230) / 200)}
      className={`inline-block shrink-0 ${fluid ? "h-auto" : ""} ${className}`}
      style={fluid ? undefined : { width, height: (width * 230) / 200 }}
    />
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
        {/* Real space so the link's text reads "RED CLAY CRAWLSPACE REPAIR", not "CLAYCRAWLSPACE". */}{" "}
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
// Tailwind can't guarantee `hidden` beats `inline-flex` when both are on one element, so a
// button that starts hidden (e.g. "hidden lg:inline-flex") must not also get inline-flex.
export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `${/(^|\s)hidden(\s|$)/.test(extra) ? "" : "inline-flex"} min-h-11 items-center justify-center rounded-[4px] px-7 py-4 text-center font-cond text-[18px] font-bold uppercase leading-none tracking-[1.08px] transition-colors ${variants[variant]} ${extra}`;

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
    // eslint-disable-next-line @next/next/no-img-element -- 22px decorative SVG
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
