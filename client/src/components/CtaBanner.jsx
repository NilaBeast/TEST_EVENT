import React from "react";
import "../../public/css/cta.css";

export default function CtaBanner({
  subtitle = "LET'S CREATE YOUR",
  title = "Next Unforgettable Event",
  description = "Share your requirements and let us plan the perfect event for you.",
  phone = "+91 90071 94502",
  phoneRaw = "+919007194502",
  email = "maharajeventorganiser@gmail.com",
  className = "",
}) {
  return (
    <section className={`maharaj-cta-section ${className}`.trim()}>
      <div className="container">
        <div className="cta-banner">
          <div className="cta-left-content">
            <div className="cta-icon-wrapper">
              <svg
                width="58"
                height="58"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E2B957"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cta-icon-svg"
              >
                <path d="M16 2v4M8 2v4" />
                <path d="M3 10h18" />
                <path d="M19 6H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h9" />
                <path d="M7 14.5l2.5 2.5 3.5-3.5" />
                <circle cx="18" cy="18" r="4" />
                <path d="M18 16.5v1.5l1 1" />
              </svg>
            </div>
            <div className="cta-text">
              <span className="cta-subtitle">{subtitle}</span>
              <h3 className="cta-title left">{title}</h3>
              <p className="cta-desc right">{description}</p>
            </div>
          </div>
          <div className="cta-separator"></div>
          <div className="cta-buttons">
            <a href={`tel:${phoneRaw}`} className="cta-btn cta-btn-gold left">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="me-2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {phone}
            </a>
            <a href={`mailto:${email}`} className="cta-btn cta-btn-dark right">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="me-2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
