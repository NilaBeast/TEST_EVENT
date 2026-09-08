import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "iconify-icon";
import serviceDetailsData from "../data/serviceDetails.json";
import "../../public/css/service-details.css";

export default function ServiceDetails() {
  const { id } = useParams();

  // Find service by parameter or fallback to 'weddings'
  const serviceKey = (id && serviceDetailsData[id]) ? id : "weddings";
  const service = serviceDetailsData[serviceKey];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!service) {
    return (
      <main className="service-details-page text-center py-5">
        <div className="container">
          <h2>Service Not Found</h2>
          <Link to="/services" className="btn btn-warning mt-3">
            Back to Services
          </Link>
        </div>
      </main>
    );
  }

  const heroImg = service.heroImage || '/images/why-us_hero.png';

  return (
    <main className="service-details-page">
      {/* =====================================================
          1. HERO BANNER SECTION
      ====================================================== */}
      <section
        className="maharaj-servicedetails-hero"
        style={{ backgroundImage: `url("${heroImg}")` }}
      >
        <div className="servicedetails-hero-overlay"></div>

        <div className="servicedetails-hero-content">
          {/* Breadcrumb */}
          <div className="servicedetails-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-arrow">›</span>
            <Link to="/services">Services</Link>
            <span className="breadcrumb-arrow">›</span>
            <span>{service.title}</span>
          </div>

          {/* Small Subtitle / Tag */}
          <div className="servicedetails-hero-tag left">
            {service.subTitle || "Our Services"}
          </div>

          {/* Main Heading */}
          <h1 className="left">{service.title}</h1>

          {/* Decorative Divider */}
          <div className="servicedetails-title-line">
            <span></span>
          </div>

          {/* Description */}
          <p className="right">{service.heroDescription}</p>

          {/* 3 Feature Badges */}
          {service.heroFeatures && service.heroFeatures.length > 0 && (
            <div className="servicedetails-hero-features">
              {service.heroFeatures.map((feat, idx) => (
                <div className="hero-feature-badge" key={idx}>
                  <div className="feature-badge-icon">
                    <iconify-icon
                      icon={feat.icon}
                      width="24"
                      height="24"
                    ></iconify-icon>
                  </div>
                  <span className="feature-badge-text">{feat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          2. WHAT WE OFFER SECTION
      ====================================================== */}
      <section className="servicedetails-offer-section">
        <div className="container">
          <div className="offer-header-center">
            <div className="offer-badge">
              <span className="badge-diamond">◆</span>
              <span>{service.whatWeOffer.badge || "WHAT WE OFFER"}</span>
              <span className="badge-diamond">◆</span>
            </div>

            <h2>{service.whatWeOffer.title}</h2>

            <div className="offer-scroll-divider">
              <span></span>
              <i>◆</i>
              <span></span>
            </div>

            <p className="offer-intro-desc bottom">{service.whatWeOffer.description}</p>
          </div>

          {/* Grid of 8 Service Offering Cards */}
          <div className="offer-cards-grid">
            {service.whatWeOffer.cards.map((card) => (
              <article className="offer-card bottom" key={card.id}>
                <div className="offer-card-icon">
                  <iconify-icon
                    icon={card.icon}
                    width="26"
                    height="26"
                  ></iconify-icon>
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          3. DARK LUXURY CTA BANNER & GALLERY
      ====================================================== */}
      <section className="servicedetails-cta-section">
        <div className="container">
          <div className="servicedetails-cta-banner">
            <div className="cta-left-details">
              <h3 className="left">{service.ctaSection.title}</h3>
              <p className="right">{service.ctaSection.description}</p>

              <Link
                to={service.ctaSection.buttonLink || "/contact-us"}
                className="cta-btn-gold-action bottom"
              >
                <span>{service.ctaSection.buttonText || "GET A FREE QUOTE"}</span>
                <iconify-icon
                  icon="ph:arrow-right-bold"
                  width="14"
                  height="14"
                ></iconify-icon>
              </Link>
            </div>

            {/* Gallery Thumbnails */}
            <div className="cta-right-gallery">
              {service.ctaSection.gallery.map((imgSrc, i) => (
                <div className="gallery-thumb-card bottom" key={i}>
                  <img
                    src={imgSrc}
                    alt={`${service.title} Gallery ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. WHAT OUR CLIENTS SAY (TESTIMONIALS)
      ====================================================== */}
      {service?.testimonials?.list?.length > 0 && (
        <section className="servicedetails-testimonials-section">
          <div className="container">
            <div className="offer-header-center mb-4">
              <div className="offer-badge">
                <span className="badge-diamond">◆</span>
                <span>{service.testimonials.badge || "What Our Clients Say"}</span>
                <span className="badge-diamond">◆</span>
              </div>
              <div className="offer-scroll-divider mt-2">
                <span></span>
                <i>◆</i>
                <span></span>
              </div>
            </div>

            <div className="testimonials-cards-grid">
              {service.testimonials.list.map((item) => (
                <div className="testimonial-card-item" key={item.id}>
                  <div>
                    <div className="quote-icon-large">“</div>
                    <p className="testimonial-quote-text">{item.quote}</p>
                  </div>
                  <div className="testimonial-author-box">
                    <div className="testimonial-author-name">{item.author}</div>
                    <div className="testimonial-stars">
                      {Array.from({ length: item.stars || 5 }).map((_, s) => (
                        <iconify-icon
                          key={s}
                          icon="ph:star-fill"
                          width="15"
                          height="15"
                        ></iconify-icon>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
