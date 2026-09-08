import React from "react";
import { Link } from "react-router-dom";
import "iconify-icon";
import statsData from "../data/stats.json";
import Counter from "../components/Counter";
import "../../public/css/why-us.css";

export default function WhyUs() {
  // 6 Core Promises / Feature Cards
  const promiseList = [
    {
      id: 1,
      title: "Client - Centric Approach",
      description:
        "He Listens to client needs and work closely with them to bring their vision to Life.",
      icon: "ph:heart",
    },
    {
      id: 2,
      title: "Attention to Detail",
      description:
        "Maharaj Leaves no stone untured, ensuring that every detail is perfect.",
      icon: "ph:magnifying-glass",
    },
    {
      id: 3,
      title: "Creativity",
      description:
        "'Each event is a unique master piece, thanks to his innovative ideas and creative flair.",
      icon: "ph:palette",
    },
    {
      id: 4,
      title: "Reliability",
      description:
        "Clients can trust Maharaj to deliver his service on or before time and within budget.",
      icon: "ph:handshake",
    },
    {
      id: 5,
      title: "Health",
      description:
        "Maintain your health while enjoying the occasion.",
      icon: "ph:hand",
    },
    {
      id: 6,
      title: "On-time Delivery",
      description:
        "We value your time and ensure flawless execution within the committed timeline.",
      icon: "ph:shield-check",
    },
  ];

  // 6 Key Differentiators / Bullet Points
  const differencePoints = [
    "Personalized approach for every client and occasion",
    "Strong network of trusted vendors and partners",
    "Transparent communication and honest pricing",
    "Attention to every detail, big or small",
    "Passion for perfection and client satisfaction",
    "Creating memories that last a lifetime",
  ];

  return (
    <main className="why-us-page">
      {/* =====================================================
          HERO BANNER SECTION
      ====================================================== */}
      <section className="maharaj-whyus-hero">
        <div className="whyus-hero-overlay"></div>

        <div className="whyus-hero-content">
          {/* Breadcrumb */}
          <div className="whyus-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-arrow">›</span>
            <span>Why Us</span>
          </div>

          {/* Title */}
          <h1 className="left">
            Why Choose <span className="title-gold right">Maharaj?</span>
          </h1>

          {/* Gold Decorative Underline */}
          <div className="whyus-title-line">
            <span></span>
          </div>

          {/* Subtitle */}
          <p className="right">
            Because your celebration deserves more than just an event planner –
            it deserves a team that cares, creates and delivers memories for a
            lifetime.
          </p>
        </div>
      </section>

      {/* =====================================================
          SECTION 1: OUR PROMISE (6 FEATURE CARDS)
      ====================================================== */}
      <section className="whyus-promise-section">
        <div className="section-header-center">
          <div className="section-tag-gold">
            <span className="tag-line"></span>
            <span className="tag-text">OUR PROMISE</span>
            <span className="tag-line"></span>
          </div>
          <h2>More Than Events, We Create Experiences</h2>
          <div className="header-ornament-line">
            <span>◆</span>
          </div>
          <p className="bottom">
            At Maharaj, every detail matters. From the first conversation to the
            final farewell, we ensure a seamless journey filled with trust,
            creativity and perfection.
          </p>
        </div>

        <div className="promise-cards-grid bottom">
          {promiseList.map((item) => (
            <div className="promise-card" key={item.id}>
              <div className="promise-icon">
                <iconify-icon
                  icon={item.icon}
                  width="44"
                  height="44"
                ></iconify-icon>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          SECTION 2: THE MAHARAJ DIFFERENCE (COLLAGE & POINTS)
      ====================================================== */}
      <section className="whyus-difference-section">
        <div className="difference-container">
          {/* Left Collage Column */}
          <div className="collage-wrapper">
            <div className="collage-dots-pattern"></div>
            <div className="collage-dots-pattern-bottom"></div>

            <div className="collage-img-main">
              <img
                src="/images/gallery/gallery_1.jpg"
                alt="Maharaj Event Setup"
              />
            </div>

            <div className="collage-img-top-right">
              <img
                src="/images/gallery/gallery_2.jpg"
                alt="Candlelight Decor"
              />
            </div>

            <div className="collage-img-bottom-right">
              <img
                src="/images/gallery/gallery_3.jpg"
                alt="Fairy Lights Celebration"
              />
            </div>
          </div>

          {/* Right Content Column */}
          <div className="difference-content">
            <div className="section-tag-gold">
              <span>✦</span> THE MAHARAJ DIFFERENCE <span>✦</span>
            </div>
            <h2 className="bottom">
              What Sets Us <span className="title-gold">Apart</span>
            </h2>

            <ul className="difference-points-list">
              {differencePoints.map((point, index) => (
                <li className="difference-point-item left" key={index}>
                  <div className="point-check-badge">
                    <iconify-icon
                      icon="ph:check-bold"
                      width="14"
                      height="14"
                    ></iconify-icon>
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Link to="/contact-us" className="btn-maharaj-dark">
              LET'S PLAN YOUR DREAM EVENT{" "}
              <iconify-icon
                icon="ph:arrow-right-bold"
                width="15"
                height="15"
              ></iconify-icon>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 3: OUR JOURNEY, YOUR TRUST (5 STATS STRIP)
      ====================================================== */}
      <section className="whyus-journey-section">
        <div className="journey-container">
          <h2 className="journey-title">Our Journey, Your Trust</h2>

          <div className="journey-stats-strip">
            {statsData.map((stat) => (
              <div className="journey-stat-card" key={stat.id}>
                <div className="journey-icon">
                  <iconify-icon
                    icon={stat.icon}
                    width="32"
                    height="32"
                  ></iconify-icon>
                </div>
                <div className="journey-number">
                  <Counter value={stat.number} />
                </div>
                <div className="journey-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 4: FLOATING CALL TO ACTION CARD
      ====================================================== */}
      <div className="whyus-cta-floating-wrapper">
        <div className="cta-floating-box">
          <div className="cta-left-content">
            <div className="cta-icon-badge">
              <iconify-icon
                icon="ph:calendar-plus-fill"
                width="28"
                height="28"
              ></iconify-icon>
            </div>
            <div className="cta-text-group">
              <h3>
                Ready to Experience the{" "}
                <span className="title-gold left">Maharaj Difference?</span>
              </h3>
              <p className="right">Let us turn your vision into an unforgettable celebration.</p>
            </div>
          </div>

          <Link to="/contact-us" className="btn-gold-cta bottom">
            GET A FREE QUOTE{" "}
            <iconify-icon
              icon="ph:arrow-right-bold"
              width="14"
              height="14"
            ></iconify-icon>
          </Link>
        </div>
      </div>
    </main>
  );
}
