import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

function enquiryDevApi() {
  return {
    name: "enquiry-dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api/enquiry")) return next();
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: false, message: "Method not allowed. Use POST." }));
          return;
        }
        try {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const raw = Buffer.concat(chunks).toString("utf8");
          const body = raw ? JSON.parse(raw) : {};
          const { sendEnquiry } = await import("./api/sendEnquiry.js");
          const result = await sendEnquiry({
            fullName: body.fullName || body.name || "",
            email: body.email || "",
            phone: body.phone || "",
            eventType: body.eventType || body.event_type || "",
            message: body.message || "",
          });
          res.statusCode = result.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result.body));
        } catch (err) {
          console.error("Dev /api/enquiry error:", err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: false, message: "Failed to send enquiry. Please try again later." }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), enquiryDevApi()],
  server: { port: 5173 },
});
