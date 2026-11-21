"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { submitLead, type LeadState } from "@/app/actions";
import { buttonClass } from "./ui";

/** Problem tiles and "Get a quote" links fire this to preselect a service and jump here. */
export const SELECT_SERVICE_EVENT = "redclay:select-service";
export const FORM_ID = "inspection";

export function selectService(service: string) {
  window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: service }));
}

const inputClass =
  "w-full rounded-[4px] border-[1.5px] border-line bg-white px-[14px] py-[13px] font-body text-[16px] text-ink-900 placeholder:text-ink-500 focus:border-clay-500 focus:outline-none aria-[invalid=true]:border-clay-500";

function Field({
  label,
  hint,
  error,
  className = "",
  children,
  id,
}: {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-[6px] ${className}`}>
      <label htmlFor={id} className="font-body text-[14px] font-semibold text-ink-700">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="font-body text-[14px] text-ink-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="font-body text-[14px] font-medium text-clay-500">
          {error}
        </p>
      )}
    </div>
  );
}

export function LeadForm({ services, phone, telHref }: { services: string[]; phone: string; telHref: string }) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  const [service, setService] = useState("");
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  // The form is replaced by the confirmation on success; move focus there so keyboard and
  // screen-reader users aren't dropped back at the top of the page.
  const doneRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (state.status === "success") doneRef.current?.focus();
  }, [state.status]);
  const errors = state.status === "error" ? state.fields ?? {} : {};
  const fid = (name: string) => `${uid}-${name}`;
  const errProps = (name: keyof typeof errors) =>
    errors[name] ? { "aria-invalid": true as const, "aria-describedby": `${fid(name)}-error` } : {};

  useEffect(() => {
    const onSelect = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (services.includes(value)) setService(value);
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      // Focus the first field once the scroll lands, without jumping the page.
      window.setTimeout(() => (document.getElementById(fid("name")) as HTMLInputElement | null)?.focus({ preventScroll: true }), 450);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);

  const card =
    "relative w-full overflow-hidden rounded-[8px] bg-white px-5 pb-6 pt-7 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-t-[5px] border-clay-500 lg:border-t-0 lg:p-9 lg:shadow-[0_24px_60px_rgba(0,0,0,0.35)]";

  if (state.status === "success") {
    return (
      <div ref={ref} id={FORM_ID} className={card} role="status">
        <span aria-hidden className="absolute inset-x-0 top-0 hidden h-[6px] bg-clay-500 lg:block" />
        <h2 ref={doneRef} tabIndex={-1} className="focus:outline-none font-slab text-[26px] font-bold leading-[1.15] text-ink-900 lg:text-[28px]">
          Thanks{state.name ? `, ${state.name.split(" ")[0]}` : ""}. We’ve got it.
        </h2>
        <p className="mt-3 font-body text-[16px] leading-[1.45] text-ink-500">
          We’ll call you back within one business day to set up your free inspection. Need us sooner? Call or text{" "}
          <a className="font-semibold text-clay-500 underline" href={telHref}>
            {phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} id={FORM_ID} className={card}>
      <span aria-hidden className="absolute inset-x-0 top-0 hidden h-[6px] bg-clay-500 lg:block" />
      <form action={action} noValidate className="flex flex-col gap-[14px] lg:gap-4" aria-labelledby={fid("title")}>
        <h2 id={fid("title")} className="font-slab text-[26px] font-bold leading-[1.15] text-ink-900 lg:text-[28px]">
          Get Your Free Crawlspace Inspection
        </h2>
        <p className="font-body text-[15px] leading-[1.45] text-ink-500 lg:text-[16px]">
          <span className="hidden lg:inline">Tell us what’s going on. </span>We’ll call you back within one business day.
        </p>

        <div className="flex flex-col gap-[14px] lg:flex-row lg:gap-3">
          <Field id={fid("name")} label="Name" error={errors.name} className="lg:flex-1">
            <input id={fid("name")} name="name" type="text" autoComplete="name" required placeholder="Your name" className={inputClass} {...errProps("name")} />
          </Field>
          <Field id={fid("phone")} label="Phone" error={errors.phone} className="lg:flex-1">
            <input id={fid("phone")} name="phone" type="tel" autoComplete="tel" required placeholder="(336) 555-0123" className={inputClass} {...errProps("phone")} />
          </Field>
        </div>
        <Field id={fid("email")} label="Email" error={errors.email}>
          <input id={fid("email")} name="email" type="email" autoComplete="email" placeholder="you@email.com" className={inputClass} {...errProps("email")} />
        </Field>
        <Field id={fid("address")} label="Property address or ZIP" hint="Where the work is. Just a ZIP is fine." error={errors.address}>
          <input id={fid("address")} name="address" type="text" autoComplete="street-address" required placeholder="Winston-Salem, NC 27101" className={inputClass} {...(errors.address ? errProps("address") : { "aria-describedby": `${fid("address")}-hint` })} />
        </Field>
        <Field id={fid("service")} label="What do you need help with?">
          <div className="relative">
            <select
              id={fid("service")}
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={`${inputClass} appearance-none pr-10 ${service ? "" : "text-ink-500"}`}
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s} value={s} className="text-ink-900">
                  {s}
                </option>
              ))}
            </select>
            <svg aria-hidden viewBox="0 0 20 20" width="20" height="20" className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-ink-700">
              <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Field>
        {/* The phone layout in Figma drops this field to keep the form short. */}
        <Field id={fid("message")} label="Tell us more (optional)" className="hidden lg:flex">
          <textarea id={fid("message")} name="message" rows={1} placeholder="Musty smell, standing water, soft floors…" className={`${inputClass} min-h-[49px] resize-y`} />
        </Field>

        {/* Spam trap: hidden from people and screen readers, bots fill it in. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={fid("company")}>Leave this empty</label>
          <input id={fid("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {state.status === "error" && (
          <p role="alert" className="rounded-[4px] bg-clay-100 px-[14px] py-3 font-body text-[15px] font-medium text-clay-600">
            {state.message}
          </p>
        )}

        <button type="submit" disabled={pending} className={buttonClass("primary", "w-full disabled:opacity-70")}>
          {pending ? "Sending…" : "Request My Free Inspection"}
        </button>
        <p className="text-center font-body text-[13px] text-ink-500">No obligation. We never share your info.</p>
      </form>
    </div>
  );
}
