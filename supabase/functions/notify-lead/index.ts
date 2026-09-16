// @ts-nocheck
// Reason: this file runs on Supabase's Deno Edge Runtime, not Node.js.
// The Deno namespace and https://esm.sh/* imports are Deno-specific and
// don't resolve in the local TypeScript environment. ts-nocheck prevents
// false-positive lint errors without affecting runtime behavior.

// Supabase Edge Function: notify-lead
// Triggered by a Database Webhook when a new row is inserted into the `leads` table.
// Sends an email notification to contact@khanmeditour.com via Resend.
//
// Reason: keeps the business owner instantly informed when a new lead arrives,
// without polling the database or building a separate dashboard.

import { Resend } from "https://esm.sh/resend@4.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") || "contact@khanmeditour.com";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "onboarding@resend.dev";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://zvtpopydmhsltfwyubsz.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const STORAGE_BUCKET = "medical-reports";

interface LeadRecord {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  country: string | null;
  treatment: string | null;
  message: string | null;
  source: string | null;
  doctor_slug: string | null;
  hospital_slug: string | null;
  estimated_total: number | null;
  has_reports: boolean;
  preferred_contact_method: string | null;
  medical_reports: string[] | null;
  created_at: string;
  user_agent: string | null;
  browser_language: string | null;
  screen_resolution: string | null;
  timezone: string | null;
  referrer: string | null;
  ip_address: string | null;
  ip_country: string | null;
  ip_city: string | null;
}

/**
 * Generate a signed download URL for a file in Supabase Storage.
 * Reason: the medical-reports bucket is private, so we need signed URLs
 * to allow downloading files directly from the email without logging
 * into the Supabase dashboard.
 */
async function createSignedUrl(filePath: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/storage/v1/object/sign/${STORAGE_BUCKET}/${filePath}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expiresIn: 1209600 }), // 14 days
      }
    );

    const data = await response.json();
    // Reason: Supabase Storage API returns signedURL as a full URL
    // (e.g. "https://...supabase.co/storage/v1/object/sign/medical-reports/32/...?token=...")
    // so we use it directly rather than reconstructing it.
    if (data.signedURL) {
      return data.signedURL;
    }
    return null;
  } catch (err) {
    console.error("Error creating signed URL:", err);
    return null;
  }
}

/**
 * Get the file name from a storage path.
 * Example: "19/1692345678-abc123.pdf" -> "abc123.pdf"
 */
function getFileName(filePath: string): string {
  const parts = filePath.split("/");
  return parts[parts.length - 1] || filePath;
}

/**
 * Get the file icon based on extension.
 */
function getFileIcon(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "📄";
  if (["jpg", "jpeg", "png"].includes(ext || "")) return "🖼️";
  return "📎";
}

Deno.serve(async (req: Request) => {
  // Reason: Database Webhooks send a POST with the record in the body.
  // The payload shape is { type: "INSERT", table: "leads", record: {...}, schema: "public" }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload = await req.json();
    const lead: LeadRecord = payload.record || payload;

    // Reason: format the lead details into a readable HTML email
    const formattedTotal =
      lead.estimated_total !== null && lead.estimated_total !== undefined
        ? `$${Number(lead.estimated_total).toLocaleString()}`
        : "Not specified";

    const sourceLabel = lead.source
      ? lead.source.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Website";

    // Reason: generate signed download URLs for each uploaded medical report
    // so the business owner can view/download them directly from the email.
    let reportsHtml = "";
    if (lead.has_reports === false) {
      reportsHtml = "<p>Patient does not have reports yet</p>";
    } else if (lead.medical_reports && lead.medical_reports.length > 0) {
      const fileLinks: string[] = [];
      for (const filePath of lead.medical_reports) {
        const signedUrl = await createSignedUrl(filePath);
        const fileName = getFileName(filePath);
        const icon = getFileIcon(fileName);
        if (signedUrl) {
          fileLinks.push(
            `<a href="${signedUrl}" style="display: inline-block; margin: 4px 0; padding: 8px 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; text-decoration: none; color: #2563eb; font-size: 13px;">${icon} ${fileName} (Download)</a><br/>`
          );
        } else {
          fileLinks.push(
            `<span style="display: inline-block; margin: 4px 0; padding: 8px 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; color: #dc2626; font-size: 13px;">${icon} ${fileName} (URL expired — view in Supabase)</span><br/>`
          );
        }
      }
      reportsHtml = `
        <p style="margin: 0 0 8px; font-weight: 600; color: #374151; font-size: 14px;">${lead.medical_reports.length} file(s) uploaded:</p>
        <div style="margin-top: 4px;">${fileLinks.join("")}</div>
      `;
    } else {
      reportsHtml = "<p>Reports not uploaded (patient may send via WhatsApp/email)</p>";
    }

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
          <h1 style="margin: 0; font-size: 20px; color: #15803d;">New Lead Received!</h1>
          <p style="margin: 4px 0 0; color: #166534; font-size: 14px;">A new inquiry has been submitted on khanmeditour.com</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; font-weight: 600; color: #374151; width: 140px;">Name:</td><td style="padding: 8px 0; color: #111827;">${lead.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone / WhatsApp:</td><td style="padding: 8px 0;"><a href="tel:${lead.phone}" style="color: #2563eb;">${lead.phone}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td><td style="padding: 8px 0;">${lead.email ? `<a href="mailto:${lead.email}" style="color: #2563eb;">${lead.email}</a>` : "Not provided"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Country:</td><td style="padding: 8px 0; color: #111827;">${lead.country || "Not specified"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Treatment:</td><td style="padding: 8px 0; color: #111827;">${lead.treatment || "Not specified"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Source:</td><td style="padding: 8px 0; color: #111827;">${sourceLabel}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Estimated Total:</td><td style="padding: 8px 0; color: #111827;">${formattedTotal}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Preferred Contact:</td><td style="padding: 8px 0; color: #111827;">${lead.preferred_contact_method || "WhatsApp"}</td></tr>
          ${lead.doctor_slug ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Doctor:</td><td style="padding: 8px 0; color: #111827;">${lead.doctor_slug}</td></tr>` : ""}
          ${lead.hospital_slug ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Hospital:</td><td style="padding: 8px 0; color: #111827;">${lead.hospital_slug}</td></tr>` : ""}
        </table>

        <!-- Medical Reports section with download links -->
        <div style="margin-top: 20px; padding: 16px; background: #f9fafb; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-weight: 600; color: #374151; font-size: 14px;">Medical Reports:</p>
          ${reportsHtml}
        </div>

        ${lead.message ? `
        <div style="margin-top: 20px; padding: 16px; background: #f9fafb; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-weight: 600; color: #374151; font-size: 14px;">Message from patient:</p>
          <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.5;">${lead.message}</p>
        </div>` : ""}

        <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 13px; color: #6b7280;">
            Submitted: ${new Date(lead.created_at).toLocaleString("en-US", { timeZone: "UTC" })} UTC<br/>
            Lead ID: ${lead.id}<br/>
            Download links expire in 14 days.
          </p>
        </div>

        <!-- Client device and location info -->
        ${(lead.ip_address || lead.user_agent || lead.ip_country || lead.screen_resolution) ? `
        <div style="margin-top: 20px; padding: 16px; background: #fffbeb; border-radius: 8px; border: 1px solid #fef3c7;">
          <p style="margin: 0 0 8px; font-weight: 600; color: #92400e; font-size: 14px;">Client Info:</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #78350f;">
            ${lead.ip_address ? `<tr><td style="padding: 4px 0; font-weight: 600; width: 120px;">IP Address:</td><td style="padding: 4px 0;">${lead.ip_address}</td></tr>` : ""}
            ${lead.ip_country ? `<tr><td style="padding: 4px 0; font-weight: 600;">Location:</td><td style="padding: 4px 0;">${[lead.ip_city, lead.ip_country].filter(Boolean).join(", ")}</td></tr>` : ""}
            ${lead.user_agent ? `<tr><td style="padding: 4px 0; font-weight: 600;">Device/Browser:</td><td style="padding: 4px 0;">${lead.user_agent}</td></tr>` : ""}
            ${lead.screen_resolution ? `<tr><td style="padding: 4px 0; font-weight: 600;">Screen:</td><td style="padding: 4px 0;">${lead.screen_resolution}</td></tr>` : ""}
            ${lead.browser_language ? `<tr><td style="padding: 4px 0; font-weight: 600;">Language:</td><td style="padding: 4px 0;">${lead.browser_language}</td></tr>` : ""}
            ${lead.timezone ? `<tr><td style="padding: 4px 0; font-weight: 600;">Timezone:</td><td style="padding: 4px 0;">${lead.timezone}</td></tr>` : ""}
            ${lead.referrer ? `<tr><td style="padding: 4px 0; font-weight: 600;">Referrer:</td><td style="padding: 4px 0;">${lead.referrer}</td></tr>` : ""}
          </table>
        </div>` : ""}

        <div style="margin-top: 20px; display: flex; gap: 12px;">
          <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}" style="display: inline-block; padding: 10px 20px; background: #22c55e; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Contact on WhatsApp</a>
          ${lead.email ? `<a href="mailto:${lead.email}" style="display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Reply by Email</a>` : ""}
        </div>
      </div>
    `;

    const resend = new Resend(RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New Lead: ${lead.name} — ${lead.treatment || "General Inquiry"}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
