import React from "react";
import { Link } from "react-router-dom";
import "iconify-icon";
import testimonialsData from "../data/testimonials.json";
import statsData from "../data/stats.json";
import Counter from "../components/Counter";
import "../../public/css/testimonials.css";

// Default profile image fallback
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80";

export default function Testimonials() {
  // Stat items combining stats.json and rating metric
  const statsList = [
    {
      id: "clients",
      number: statsData.find((s) => s.id === "clients")?.number || "800+",
      label: "Happy Clients",
      icon: "ph:smiley-fill",
    },
    {
      id: "events",
      number: statsData.find((s) => s.id === "events")?.number || "1000+",
      label: "Events Completed",
      icon: "ph:calendar-check-fill",
    },
    {
      id: "experience",
      number: statsData.find((s) => s.id === "experience")?.number || "22+",
      label: "Years of Excellence",
      icon: "ph:crown-fill",
    },
    {
      id: "rating",
      number: "4.9/5",
      label: "Client Rating",
      icon: "ph:certificate-fill",
    },
  ];

  return (
    <main className="testimonials-page">
      {/* =====================================================
          HERO BANNER SECTION
      ====================================================== */}
      <section className="maharaj-testimonials-hero">
        <div className="testimonials-hero-overlay"></div>

        <div className="testimonials-hero-content">
          {/* Breadcrumb */}
          <div className="testimonials-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-arrow">›</span>
            <span>Client Reviews</span>
          </div>

          {/* Title */}
          <h1 className="left">
            Words That <span className="title-gold">Inspire Us</span>
          </h1>

          {/* Gold Decorative Line */}
          <div className="testimonials-title-line">
            <span></span>
          </div>

          {/* Subtitle */}
          <p className="right">
            We don't just plan events, we create experiences that stay in hearts
            forever. Hear what our clients have to say about us.
          </p>
        </div>
      </section>

      {/* =====================================================
          FLOATING STATS STRIP (FROM STATS.JSON)
      ====================================================== */}
      <div className="testimonials-stats-wrapper">
        <div className="testimonials-stats-bar">
          {statsList.map((stat) => (
            <div className="stat-bar-item" key={stat.id}>
              <div className="stat-badge-circle">
                <iconify-icon
                  icon={stat.icon}
                  width="22"
                  height="22"
                ></iconify-icon>
              </div>
              <div className="stat-info-text">
                <div className="stat-info-number">
                  <Counter value={stat.number} />
                </div>
                <div className="stat-info-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          SECTION: CLIENT REVIEWS (FROM TESTIMONIALS.JSON)
      ====================================================== */}
      <section className="testimonials-reviews-section">
        <div className="section-header-center">
          <div className="section-tag-gold">
            <span className="tag-line"></span>
            <span className="tag-text">CLIENT REVIEWS</span>
            <span className="tag-line"></span>
          </div>
          <h2>What Our Clients Say</h2>
          <div className="header-ornament-line">
            <span>◆</span>
          </div>
        </div>

        <div className="reviews-cards-grid">
          {testimonialsData.map((item, index) => (
            <div className="testimonial-card bottom" key={item.id}>
              <div className="card-quote-icon">“</div>

              <div className="card-top-row">
                <div className="client-avatar-wrapper">
                  <img
                    src={item.avatar || item.image || DEFAULT_AVATAR}
                    alt={item.author}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_AVATAR;
                    }}
                  />
                </div>

                <div className="client-rating-stars">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <iconify-icon
                      key={i}
                      icon="ph:star-fill"
                      width="16"
                      height="16"
                    ></iconify-icon>
                  ))}
                </div>
              </div>

              <p className="testimonial-quote-text">{item.quote}</p>

              <div className="card-author-divider"></div>

              <div className="client-author-info">
                <h4>{item.author}</h4>
                <span>{item.event}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          SECTION: EXPERIENCE IN THEIR OWN WORDS (VIDEO BANNER)
      ====================================================== */}
      <div className="testimonials-video-banner">
        <div className="video-thumb-frame bottom">
          <img
            src="/images/gallery/gallery_4.jpg"
            alt="Client Video Testimonial"
          />
          <div className="video-play-overlay">
            <iconify-icon
              icon="ph:play-circle-fill"
              width="58"
              height="58"
            ></iconify-icon>
          </div>
        </div>

        <div className="video-banner-content">
          <div className="section-tag-gold">
            <span className="tag-line"></span>
            <span className="tag-text">REAL STORIES, REAL MEMORIES</span>
          </div>

          <h3 className="left">Experience In Their Own Words</h3>

          <p className="right">
            Watch our clients share their experience of working with Maharaj The
            Event Organiser.
          </p>

          <button type="button" className="btn-gold-watch bottom">
            WATCH TESTIMONIALS{" "}
            <iconify-icon
              icon="ph:play-fill"
              width="14"
              height="14"
            ></iconify-icon>
          </button>
        </div>
      </div>
    </main>
  );
}
