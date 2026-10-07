import { sendEnquiry } from "./sendEnquiry.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed. Use POST." });
  }

  const body = req.body || {};
  const result = await sendEnquiry({
    fullName: body.fullName || body.name || "",
    email: body.email || "",
    phone: body.phone || "",
    eventType: body.eventType || body.event_type || "",
    message: body.message || "",
  });

  return res.status(result.status).json(result.body);
}
