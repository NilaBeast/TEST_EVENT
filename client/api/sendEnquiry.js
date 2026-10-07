import nodemailer from "nodemailer";

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendEnquiry({ fullName, email, phone, eventType, message }) {
  const name = (fullName || "").trim();
  const mail = (email || "").trim();
  const ph = (phone || "").trim();
  const evt = (eventType || "").trim();
  const msg = (message || "").trim();

  if (!name || !mail || !ph || !msg) {
    return { status: 400, body: { success: false, message: "Please fill Full Name, Email, Phone and Message." } };
  }

  if (!isValidEmail(mail)) {
    return { status: 400, body: { success: false, message: "Please enter a valid email address." } };
  }

  const {
    SMTP_HOST = "smtp.gmail.com",
    SMTP_PORT = "587",
    SMTP_SECURE = "false",
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    ENQUIRY_TO,
  } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    console.error("SMTP is not configured: missing SMTP_USER / SMTP_PASS");
    return {
      status: 500,
      body: { success: false, message: "Enquiry service is not configured. Please add SMTP_USER / SMTP_PASS in .env and restart." },
    };
  }

  const from = SMTP_FROM || SMTP_USER;
  const to = ENQUIRY_TO || "maharajeventorganiser@gmail.com";
  const port = Number(SMTP_PORT) || 587;
  const secure = String(SMTP_SECURE).toLowerCase() === "true";

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subject = `New Enquiry - ${evt || "Contact Form"} - ${name}`;

  const text = [
    "New Enquiry",
    "You have received a new enquiry from your website contact form.",
    "",
    `Name: ${name}`,
    `Email: ${mail}`,
    `Phone: ${ph}`,
    `Event Type: ${evt || "-"}`,
    "",
    "Message:",
    msg,
  ].join("\n");

  const html = `
  <div style="margin:0;padding:24px 12px;background-color:#FAF6F0;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #e8d9b8;border-radius:12px;overflow:hidden;">
      <div style="background-color:#2B0407;padding:30px 28px 24px;text-align:center;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:13px;letter-spacing:4px;color:#E2B957;margin:0 0 6px;">MAHARAJ&nbsp;&nbsp;&#9670;&nbsp;&nbsp;THE EVENT ORGANISER</div>
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:bold;color:#ffffff;margin:0;line-height:1.2;">New Enquiry</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.75);margin:8px 0 0;">Website Contact Form &mdash; Event Maharaj Galaxy Pvt. Ltd.</div>
        <div style="width:64px;height:2px;background-color:#C99832;margin:16px auto 0;"></div>
      </div>
      <div style="padding:26px 28px 8px;">
        <p style="margin:0 0 18px;font-size:13px;line-height:1.6;color:#6D5C56;">You have received a new enquiry from your website contact form. Details are below:</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #eee0c0;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#3B0B0C;background-color:#FFFCF5;border-bottom:1px solid #f0e3c2;width:150px;">Name</td>
            <td style="padding:12px 16px;font-size:14px;color:#2b2b2b;background-color:#ffffff;border-bottom:1px solid #f0e3c2;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#3B0B0C;background-color:#FFFCF5;border-bottom:1px solid #f0e3c2;width:150px;">Email</td>
            <td style="padding:12px 16px;font-size:14px;color:#2b2b2b;background-color:#ffffff;border-bottom:1px solid #f0e3c2;"><a href="mailto:${escapeHtml(mail)}" style="color:#8a6a1c;text-decoration:underline;">${escapeHtml(mail)}</a></td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#3B0B0C;background-color:#FFFCF5;border-bottom:1px solid #f0e3c2;width:150px;">Phone</td>
            <td style="padding:12px 16px;font-size:14px;color:#2b2b2b;background-color:#ffffff;border-bottom:1px solid #f0e3c2;"><a href="tel:${escapeHtml(ph.replace(/\s/g, ""))}" style="color:#2b2b2b;text-decoration:none;">${escapeHtml(ph)}</a></td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#3B0B0C;background-color:#FFFCF5;width:150px;">Event Type</td>
            <td style="padding:12px 16px;font-size:14px;color:#2b2b2b;background-color:#ffffff;"><span style="display:inline-block;padding:4px 12px;background-color:#2B0407;color:#E2B957;border:1px solid #C99832;border-radius:20px;font-size:12px;font-weight:bold;letter-spacing:0.5px;">${escapeHtml(evt || "-")}</span></td>
          </tr>
        </table>
        <div style="margin:20px 0 6px;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#3B0B0C;">Message</div>
        <div style="background-color:#FAF6F0;border:1px solid #eee0c0;border-left:3px solid #C99832;border-radius:0 8px 8px 8px;padding:16px 18px;font-size:14px;line-height:1.7;color:#3B0B0C;">${escapeHtml(msg).replace(/\n/g, "<br>")}</div>
        <div style="text-align:center;padding:22px 0 10px;">
          <a href="mailto:${escapeHtml(mail)}?subject=${encodeURIComponent("Re: " + subject)}" style="display:inline-block;padding:12px 30px;background-color:#2B0407;color:#FAF6F0;border:1px solid #C99832;border-radius:6px;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-decoration:none;">REPLY TO ENQUIRY</a>
        </div>
      </div>
      <div style="background-color:#2B0407;padding:20px 28px;text-align:center;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#E2B957;margin:0 0 4px;">Event Maharaj Galaxy Pvt. Ltd.</div>
        <div style="font-size:11px;line-height:1.6;color:rgba(255,255,255,0.7);margin:0;">Gr Fr 6, Amrita Nagar, Belghoria, Kolkata &ndash; 700056</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.45);margin:10px 0 0;">This is an automated notification. Please reply directly to the sender.</div>
      </div>
    </div>
  </div>
  `;

  try {
    await transporter.sendMail({ from, to, replyTo: mail, subject, text, html });
    return { status: 200, body: { success: true, message: "Enquiry sent successfully." } };
  } catch (err) {
    console.error("SMTP sendMail failed:", err);
    return { status: 500, body: { success: false, message: "Failed to send enquiry. Please try again later." } };
  }
}
