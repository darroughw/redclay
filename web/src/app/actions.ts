"use server";

import { sanityWriter } from "@/lib/sanity";

export type LeadState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | { status: "error"; message: string; fields?: Partial<Record<LeadField, string>> };

type LeadField = "name" | "phone" | "email" | "address" | "service" | "message";

const clip = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Spam trap: real people never see this field.
  if (clip(formData.get("company"), 200)) return { status: "success", name: "" };

  const lead = {
    name: clip(formData.get("name"), 120),
    phone: clip(formData.get("phone"), 40),
    email: clip(formData.get("email"), 200),
    address: clip(formData.get("address"), 200),
    service: clip(formData.get("service"), 120),
    message: clip(formData.get("message"), 2000),
  };

  const fields: Partial<Record<LeadField, string>> = {};
  if (!lead.name) fields.name = "Please enter your name.";
  if (lead.phone.replace(/\D/g, "").length < 10) fields.phone = "Please enter a 10-digit phone number.";
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) fields.email = "That email doesn’t look right.";
  if (!lead.address) fields.address = "Please enter your address or ZIP.";
  if (Object.keys(fields).length) {
    return { status: "error", message: "Please fix the highlighted fields.", fields };
  }

  if (!sanityWriter) {
    // Never tell a homeowner we got their request when it went nowhere.
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] Sanity write token not set; lead not stored:", lead);
      return { status: "success", name: lead.name };
    }
    console.error("[lead] SANITY_WRITE_TOKEN missing; lead dropped");
    return { status: "error", message: "Sorry, the form isn’t working right now. Please call or text us instead." };
  }

  try {
    await sanityWriter.create({ _type: "lead", ...lead, status: "new", submittedAt: new Date().toISOString() });
  } catch (err) {
    console.error("[lead] save failed", err);
    return { status: "error", message: "Sorry, something went wrong sending that. Please call or text us instead." };
  }
  return { status: "success", name: lead.name };
}
