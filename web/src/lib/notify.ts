// Emails each new inspection request to Kerney through Resend (https://resend.com).
// Plain HTTP call, no SDK. Configure with:
//   RESEND_API_KEY   API key from resend.com
//   LEAD_NOTIFY_TO   one or more addresses, comma separated
//   LEAD_EMAIL_FROM  optional, e.g. "Red Clay Website <leads@redclaycrawlspace.com>".
//                    Until the domain is verified in Resend, the default
//                    onboarding@resend.dev sender can only email the Resend account owner.
export type Lead = {
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  message: string;
};

export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_TO);

const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
const digits = (phone: string) => phone.replace(/\D/g, "").replace(/^1/, "");

export async function emailLead(lead: Lead): Promise<void> {
  const to = (process.env.LEAD_NOTIFY_TO ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.LEAD_EMAIL_FROM || "Red Clay Website <onboarding@resend.dev>";
  const studio = "https://redclay.sanity.studio/structure/leads";

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "(not given)"],
    ["Address / ZIP", lead.address],
    ["Needs help with", lead.service || "(not chosen)"],
    ["Message", lead.message || "(none)"],
  ];

  const text = [
    `New inspection request from the website.`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    `Call: tel:+1${digits(lead.phone)}`,
    `All requests: ${studio}`,
  ].join("\n");

  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#1f1f1f;max-width:560px">
  <p style="margin:0 0 16px;font-size:20px;font-weight:bold">New inspection request</p>
  <table cellpadding="6" style="border-collapse:collapse;width:100%">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="color:#6b6f73;white-space:nowrap;vertical-align:top;border-bottom:1px solid #ddd5ca">${esc(k)}</td><td style="border-bottom:1px solid #ddd5ca">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("")}
  </table>
  <p style="margin:24px 0 8px">
    <a href="tel:+1${digits(lead.phone)}" style="display:inline-block;background:#9e3a2a;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:4px">Call ${esc(lead.name.split(" ")[0] || "them")} back</a>
  </p>
  <p style="margin:16px 0 0;font-size:14px;color:#6b6f73">All requests are also saved in the <a href="${studio}" style="color:#9e3a2a">website editor</a>.</p>
</div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: `New inspection request: ${lead.name}${lead.service ? ` (${lead.service})` : ""}`,
      text,
      html,
      // Hitting Reply in the inbox answers the homeowner directly.
      ...(lead.email ? { reply_to: lead.email } : {}),
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
