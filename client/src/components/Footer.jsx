import React from "react";
import { Link } from "react-router-dom";
import "../../public/css/footer.css";

const footerData = {
  brand: {
    title: "Event Maharaj Galaxy Pvt. Ltd.",
    // subtitle: "The Event Organiser",
    description:
      "Creating memorable experiences with perfection in every detail. From grand celebrations to intimate moments, we make every event unforgettable.",
    phone: "+91 9007194502",
    phone2: "+91 9007194238",
    phone3: "+91 7605870101",
    email: "maharajeventorganiser@gmail.com",
    address: ["70/1, Bihari Lal Ghosh Road,", "Kolkata - 700057"],

    address3: [
      "Gr-Fr-6, Swarnalata Plaza, Amrita Nagar,",
      "Belgharia, Kolkata - 700156",
    ],
  },

  quickLinks: [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about-us" },
    { label: "Why Us", path: "/why-us" },
    { label: "Services", path: "/services" },
    { label: "Gallery", path: "/gallery" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact Us", path: "/contact-us" },
  ],

  services: [
    { label: "Weddings", path: "/services/weddings" },
    { label: "Anniversaries", path: "/services/anniversaries" },
    { label: "Vintage Cars", path: "/services/vintage-cars" },
    { label: "Catering Services", path: "/services/catering-services" },
    { label: "Baby Showers", path: "/services/baby-showers" },
    { label: "Birthday Parties", path: "/services/birthday-parties" },
    { label: "House Warming", path: "/services/house-warming" },
    { label: "Kitty Parties", path: "/services/kitty-parties" },
    { label: "Office Events", path: "/services/office-events" },
    { label: "Office Conferences", path: "/services/office-conferences" },
    { label: "Tours", path: "/services/tours" },
  ],

  social: [
    {
      name: "Facebook",
      icon: "mdi:facebook",
      url: "#",
    },
    {
      name: "Instagram",
      icon: "mdi:instagram",
      url: "#",
    },
    {
      name: "WhatsApp",
      icon: "mdi:whatsapp",
      url: "#",
    },
    {
      name: "YouTube",
      icon: "mdi:youtube",
      url: "#",
    },
  ],

  policies: [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms & Conditions", path: "/terms-and-conditions" },
    { label: "Refund Policy", path: "/refund-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="maharaj-footer">
      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="container">
        <div className="maharaj-footer-main">
          {/* =================================================
              BRAND / CONTACT
          ================================================== */}

          <div className="footer-brand-column">
            <div className="footer-brand">
              <h2>{footerData.brand.title}</h2>

              <h3>{footerData.brand.subtitle}</h3>
            </div>

            {/* Decorative line */}

            <div className="footer-brand-decoration">
              <span></span>
              <i></i>
              <span></span>
            </div>

            <p className="footer-description">{footerData.brand.description}</p>

            {/* Contact */}

            <div className="footer-contact">
              <a
                href={`tel:${footerData.brand.phone.replace(/\s/g, "")}`}
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <iconify-icon
                    icon="mdi:phone"
                    width="18"
                    height="18"
                  ></iconify-icon>
                </span>

                <span>{footerData.brand.phone}</span>
              </a>
              <a
                href={`tel:${footerData.brand.phone2.replace(/\s/g, "")}`}
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <iconify-icon
                    icon="mdi:phone"
                    width="18"
                    height="18"
                  ></iconify-icon>
                </span>

                <span>{footerData.brand.phone2}</span>
              </a>

              <a
                href={`tel:${footerData.brand.phone3.replace(/\s/g, "")}`}
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <iconify-icon
                    icon="mdi:phone"
                    width="18"
                    height="18"
                  ></iconify-icon>
                </span>

                <span>{footerData.brand.phone3}</span>
              </a>

              <a
                href={`mailto:${footerData.brand.email}`}
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <iconify-icon
                    icon="mdi:email-outline"
                    width="18"
                    height="18"
                  ></iconify-icon>
                </span>

                <span>{footerData.brand.email}</span>
              </a>

              <div className="footer-contact-item footer-address">
                <span className="footer-contact-icon">
                  <iconify-icon
                    icon="mdi:map-marker"
                    width="19"
                    height="19"
                  ></iconify-icon>
                </span>

                <span>
                  {footerData.brand.address.map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < footerData.brand.address.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </div>

              {/* <div className="footer-contact-item footer-address">
                <span className="footer-contact-icon">
                  <iconify-icon
                    icon="mdi:map-marker"
                    width="19"
                    height="19"
                  ></iconify-icon>
                </span>

                <span>
                  {footerData.brand.address2.map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < footerData.brand.address2.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </div> */}

              <div className="footer-contact-item footer-address">
                <span className="footer-contact-icon">
                  <iconify-icon
                    icon="mdi:map-marker"
                    width="19"
                    height="19"
                  ></iconify-icon>
                </span>

                <span>
                  {footerData.brand.address3.map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < footerData.brand.address3.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================== */}

          <div className="footer-links-column">
            <h3 className="footer-column-title">Quick Links</h3>

            <div className="footer-title-line"></div>

            <ul className="footer-links-list">
              {footerData.quickLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path}>
                    <span className="footer-link-arrow">›</span>

                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              SERVICES
          ================================================== */}

          <div className="footer-links-column">
            <h3 className="footer-column-title">Our Services</h3>

            <div className="footer-title-line"></div>

            <ul className="footer-links-list">
              {footerData.services.map((item) => (
                <li key={item.label}>
                  <Link to={item.path}>
                    <span className="footer-link-arrow">›</span>

                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              SOCIAL + NEWSLETTER
          ================================================== */}

          {/* <div className="footer-connect-column">

            <h3 className="footer-column-title">
              Stay Connected
            </h3>

            <div className="footer-title-line"></div>

            <p className="footer-connect-text">
              Follow us on social media for
              <br />
              latest events, offers and inspirations.
            </p>



            <div className="footer-socials">

              {footerData.social.map((social) => (

                <a
                  key={social.name}
                  href={social.url}
                  className="footer-social-link"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <iconify-icon
                    icon={social.icon}
                    width="21"
                    height="21"
                  ></iconify-icon>

                </a>

              ))}

            </div>



            <div className="footer-newsletter">

              <h3 className="footer-column-title">
                Newsletter
              </h3>

              <div className="footer-title-line"></div>

              <p className="footer-newsletter-text">
                Subscribe to our newsletter and
                <br />
                never miss an update.
              </p>

              <form
                className="footer-newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >

                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  required
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                >
                  <iconify-icon
                    icon="mdi:send-outline"
                    width="20"
                    height="20"
                  ></iconify-icon>
                </button>

              </form>

            </div>

          </div> */}
        </div>

        {/* =====================================================
            GOLD DIVIDER
        ====================================================== */}

        <div className="footer-bottom-divider">
          <span></span>

          <div className="footer-divider-ornament">
            <i></i>
            <b></b>
            <i></i>
          </div>

          <span></span>
        </div>

        {/* =====================================================
            COPYRIGHT
        ====================================================== */}

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Maharaj The Event Organiser. All Rights
            Reserved.
          </p>

          <div className="footer-policies">
            {footerData.policies.map((item, index) => (
              <React.Fragment key={item.label}>
                <Link to={item.path}>{item.label}</Link>

                {index < footerData.policies.length - 1 && (
                  <span className="policy-separator"></span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
