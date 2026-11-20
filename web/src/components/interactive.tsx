"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FORM_ID, selectService } from "./LeadForm";
import { buttonClass, Wordmark } from "./ui";

/** Anchor to the form that also preselects a service. Works as a plain link without JS. */
export function QuoteLink({ service, className, children }: { service?: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={`#${FORM_ID}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        selectService(service ?? "");
      }}
    >
      {children}
    </a>
  );
}

export function ProblemTile({ title, detail, service }: { title: string; detail: string; service: string }) {
  return (
    <QuoteLink
      service={service}
      className="group flex flex-1 items-center justify-between gap-4 rounded-[6px] border-[1.5px] border-line bg-white px-5 py-[18px] transition-colors hover:border-clay-500 lg:px-6 lg:py-[22px]"
    >
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-slab text-[19px] font-semibold text-ink-900">{title}</span>
        <span className="font-body text-[15px] text-ink-500">{detail}</span>
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" aria-hidden src="/icons/arrow.svg" width={36} height={36} className="size-9 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </QuoteLink>
  );
}

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Our Work" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
];

export function Header({ phone, tel }: { phone: string; tel: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="relative z-40 border-b border-line bg-white">
      <div className="wrap flex items-center justify-between py-3 lg:py-[18px]">
        <a href="#top" aria-label="Red Clay Crawlspace Repair, home" className="lg:hidden">
          <Wordmark compact />
        </a>
        <a href="#top" aria-label="Red Clay Crawlspace Repair, home" className="hidden lg:block">
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-6 font-body text-[16px] font-semibold text-ink-900 xl:gap-9">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-clay-500">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={tel} className="flex items-center gap-2 font-cond text-[20px] font-bold tracking-[0.4px] text-ink-900 hover:text-clay-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden src="/icons/phone.svg" width={20} height={20} className="size-5" />
            {phone}
          </a>
          <QuoteLink className={buttonClass("primary")}>Free Inspection</QuoteLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={tel} aria-label={`Call ${phone}`} className="rounded-[4px] bg-clay-500 p-[11px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" aria-hidden src="/icons/phone-white.svg" width={20} height={20} className="size-5" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="rounded-[4px] border-[1.5px] border-line p-[10px]"
          >
            {open ? (
              <svg aria-hidden width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M5 5L17 17M17 5L5 17" stroke="#151312" strokeWidth="2.02" strokeLinecap="round" />
              </svg>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="" aria-hidden src="/icons/menu.svg" width={22} height={22} className="size-[22px]" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_12px_24px_rgba(0,0,0,0.12)] lg:hidden">
          <ul className="wrap flex flex-col py-2">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-line py-4 font-body text-[18px] font-semibold text-ink-900 last:border-0">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <QuoteLink className={buttonClass("primary", "w-full")}>
                <span onClick={() => setOpen(false)}>Schedule Free Inspection</span>
              </QuoteLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

/** Phones only: fixed Call / Free Inspection bar (Figma "Mobile Sticky CTA"). */
export function StickyCta({ tel }: { tel: string }) {
  return (
    <nav
      aria-label="Contact"
      className="fixed inset-x-0 bottom-0 z-50 flex gap-[10px] bg-white p-3 pb-[calc(12px+env(safe-area-inset-bottom))] drop-shadow-[0_-4px_10px_rgba(0,0,0,0.15)] lg:hidden"
    >
      <a href={tel} className={buttonClass("dark", "flex-1 px-3")}>
        Call Now
      </a>
      <QuoteLink className={buttonClass("primary", "flex-1 px-3")}>Free Inspection</QuoteLink>
    </nav>
  );
}
