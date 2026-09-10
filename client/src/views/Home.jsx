import React from "react";
import { Link } from "react-router-dom";
import "iconify-icon";
import heroImages from "../data/heroImages";
import servicesData from "../data/services.json";
import galleryData from "../data/gallery.json";
import statsData from "../data/stats.json";
import testimonialsData from "../data/testimonials.json";
import Counter from "../components/Counter";
import CtaBanner from "../components/CtaBanner";
import "../../public/css/home.css";

// =====================================================
// SERVICE ICON (Renders icon from the `icon` field in services.json)
// Supports both Iconify names (e.g. "mdi:crown-outline")
// and uploaded logo URLs (e.g. "/uploads/crown.png") for the future admin panel.
// =====================================================

function ServiceIcon({ icon, id, name, size = 28 }) {
  const iconKey = (icon || name || "").trim();

  // Admin-uploaded logo (URL / data URI) — render as an image
  if (
    iconKey.startsWith("/") ||
    iconKey.startsWith("http") ||
    iconKey.startsWith("data:") ||
    iconKey.startsWith("blob:")
  ) {
    return (
      <img
        src={iconKey}
        alt={name || id || "service icon"}
        width={size}
        height={size}
        style={{ objectFit: "contain", display: "block" }}
      />
    );
  }

  // Iconify name (e.g. "mdi:crown-outline") — render via iconify-icon web component
  if (iconKey) {
    return (
      <iconify-icon
        icon={iconKey}
        width={size}
        height={size}
        style={{ display: "inline-flex", color: "inherit" }}
      />
    );
  }

  // Fallback: generic circle
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export default function Home() {
  // Extended datasets for seamless infinite rightward scrolling
  const extendedGalleryData = React.useMemo(
    () => [...galleryData, ...galleryData, ...galleryData],
    [],
  );

  const isTestimonialsSlider = testimonialsData.length > 3;
  const hasTestimonialDots = testimonialsData.length > 1;

  const extendedTestimonialsData = React.useMemo(
    () =>
      isTestimonialsSlider
        ? [...testimonialsData, ...testimonialsData, ...testimonialsData]
        : testimonialsData,
    [isTestimonialsSlider],
  );

  // Testimonials Slider State & Handlers
  const testimonialScrollRef = React.useRef(null);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = React.useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = React.useState(false);
  const testimonialIndexRef = React.useRef(0);
  const isTestimonialDraggingRef = React.useRef(false);
  const testimonialStartXRef = React.useRef(0);
  const testimonialScrollLeftRef = React.useRef(0);

  const getTestimonialCardStep = React.useCallback((container, card) => {
    const gap = parseFloat(window.getComputedStyle(container).columnGap) || 0;
    return card.offsetWidth + gap;
  }, []);

  const checkScrollPosition = React.useCallback(() => {
    if (!testimonialScrollRef.current) return;
    const container = testimonialScrollRef.current;
    const card = container.querySelector(".testimonial-card-wrapper");
    if (!card) return;

    const cardWidth = getTestimonialCardStep(container, card);
    const scrollLeft = container.scrollLeft;
    const rawIndex = Math.round(scrollLeft / cardWidth);
    const normalizedIndex = rawIndex % testimonialsData.length;

    setActiveTestimonialIndex(normalizedIndex);
    if (!isTestimonialDraggingRef.current) {
      testimonialIndexRef.current = rawIndex;
    }
  }, [getTestimonialCardStep]);

  React.useEffect(() => {
    if (!isTestimonialsSlider) return;
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [checkScrollPosition, isTestimonialsSlider]);

  const scrollToTestimonialIndex = (index) => {
    if (!testimonialScrollRef.current) return;
    const container = testimonialScrollRef.current;
    const card = container.querySelector(".testimonial-card-wrapper");
    if (!card) return;
    const cardWidth = getTestimonialCardStep(container, card);

    testimonialIndexRef.current = index;
    setActiveTestimonialIndex(index % testimonialsData.length);
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  // Testimonials Auto-Scroll Effect (ALWAYS SCROLLS RIGHT)
  React.useEffect(() => {
    if (!isTestimonialsSlider || isTestimonialHovered) return;

    const timer = setInterval(() => {
      if (!testimonialScrollRef.current) return;
      const container = testimonialScrollRef.current;
      const card = container.querySelector(".testimonial-card-wrapper");
      if (!card) return;

      const cardWidth = getTestimonialCardStep(container, card);
      const totalOriginal = testimonialsData.length;
      const nextIndex = testimonialIndexRef.current + 1;

      // Always scroll right smoothly to nextIndex
      container.scrollTo({ left: nextIndex * cardWidth, behavior: "smooth" });
      testimonialIndexRef.current = nextIndex;
      setActiveTestimonialIndex(nextIndex % totalOriginal);

      // Instant seamless reset when completing a full cycle (moving forward to set 2)
      if (nextIndex >= totalOriginal) {
        setTimeout(() => {
          if (!testimonialScrollRef.current) return;
          const resetIndex = nextIndex % totalOriginal;
          container.style.scrollBehavior = "auto";
          container.scrollLeft = resetIndex * cardWidth;
          void container.offsetHeight;
          container.style.scrollBehavior = "smooth";
          testimonialIndexRef.current = resetIndex;
        }, 500);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [getTestimonialCardStep, isTestimonialHovered, isTestimonialsSlider]);

  const handleTestimonialMouseDown = (e) => {
    isTestimonialDraggingRef.current = true;
    if (testimonialScrollRef.current) {
      testimonialScrollRef.current.classList.add("dragging");
      testimonialStartXRef.current =
        e.pageX - testimonialScrollRef.current.offsetLeft;
      testimonialScrollLeftRef.current =
        testimonialScrollRef.current.scrollLeft;
    }
  };

  const handleTestimonialMouseLeaveOrUp = () => {
    if (!isTestimonialDraggingRef.current) return;
    isTestimonialDraggingRef.current = false;
    if (testimonialScrollRef.current) {
      testimonialScrollRef.current.classList.remove("dragging");
      const card = testimonialScrollRef.current.querySelector(
        ".testimonial-card-wrapper",
      );
      if (card) {
        const cardWidth = getTestimonialCardStep(
          testimonialScrollRef.current,
          card,
        );
        const currentScroll = testimonialScrollRef.current.scrollLeft;
        testimonialIndexRef.current = Math.round(currentScroll / cardWidth);
      }
    }
  };

  const handleTestimonialMouseMove = (e) => {
    if (!isTestimonialDraggingRef.current || !testimonialScrollRef.current)
      return;
    e.preventDefault();
    const x = e.pageX - testimonialScrollRef.current.offsetLeft;
    const walk = (x - testimonialStartXRef.current) * 1.5;
    testimonialScrollRef.current.scrollLeft =
      testimonialScrollLeftRef.current - walk;
  };

  // Gallery Slider State & Handlers
  const galleryScrollRef = React.useRef(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = React.useState(0);
  const [isGalleryHovered, setIsGalleryHovered] = React.useState(false);
  const galleryIndexRef = React.useRef(0);
  const isGalleryDraggingRef = React.useRef(false);
  const galleryStartXRef = React.useRef(0);
  const galleryScrollLeftRef = React.useRef(0);

  const checkGalleryScrollPosition = React.useCallback(() => {
    if (!galleryScrollRef.current) return;
    const container = galleryScrollRef.current;
    const card = container.querySelector(".gallery-card-wrapper");
    if (!card) return;

    const cardWidth = card.offsetWidth + 20;
    const scrollLeft = container.scrollLeft;
    const rawIndex = Math.round(scrollLeft / cardWidth);
    const normalizedIndex = rawIndex % galleryData.length;

    setActiveGalleryIndex(normalizedIndex);
    if (!isGalleryDraggingRef.current) {
      galleryIndexRef.current = rawIndex;
    }
  }, []);

  React.useEffect(() => {
    checkGalleryScrollPosition();
    window.addEventListener("resize", checkGalleryScrollPosition);
    return () =>
      window.removeEventListener("resize", checkGalleryScrollPosition);
  }, [checkGalleryScrollPosition]);

  const scrollToGalleryIndex = (index) => {
    if (!galleryScrollRef.current) return;
    const container = galleryScrollRef.current;
    const card = container.querySelector(".gallery-card-wrapper");
    if (!card) return;
    const cardWidth = card.offsetWidth + 20;

    galleryIndexRef.current = index;
    setActiveGalleryIndex(index % galleryData.length);
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  // Gallery Auto-Scroll Effect (ALWAYS SCROLLS RIGHT)
  React.useEffect(() => {
    if (isGalleryHovered) return;

    const timer = setInterval(() => {
      if (!galleryScrollRef.current) return;
      const container = galleryScrollRef.current;
      const card = container.querySelector(".gallery-card-wrapper");
      if (!card) return;

      const cardWidth = card.offsetWidth + 20;
      const totalOriginal = galleryData.length;
      const nextIndex = galleryIndexRef.current + 1;

      // Always scroll right smoothly to nextIndex
      container.scrollTo({ left: nextIndex * cardWidth, behavior: "smooth" });
      galleryIndexRef.current = nextIndex;
      setActiveGalleryIndex(nextIndex % totalOriginal);

      // Instant seamless reset when completing a full cycle (moving forward to set 2)
      if (nextIndex >= totalOriginal) {
        setTimeout(() => {
          if (!galleryScrollRef.current) return;
          const resetIndex = nextIndex % totalOriginal;
          container.style.scrollBehavior = "auto";
          container.scrollLeft = resetIndex * cardWidth;
          void container.offsetHeight;
          container.style.scrollBehavior = "smooth";
          galleryIndexRef.current = resetIndex;
        }, 500);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [isGalleryHovered]);

  const handleGalleryMouseDown = (e) => {
    isGalleryDraggingRef.current = true;
    if (galleryScrollRef.current) {
      galleryScrollRef.current.classList.add("dragging");
      galleryStartXRef.current = e.pageX - galleryScrollRef.current.offsetLeft;
      galleryScrollLeftRef.current = galleryScrollRef.current.scrollLeft;
    }
  };

  const handleGalleryMouseLeaveOrUp = () => {
    if (!isGalleryDraggingRef.current) return;
    isGalleryDraggingRef.current = false;
    if (galleryScrollRef.current) {
      galleryScrollRef.current.classList.remove("dragging");
      const card = galleryScrollRef.current.querySelector(
        ".gallery-card-wrapper",
      );
      if (card) {
        const cardWidth = card.offsetWidth + 20;
        const currentScroll = galleryScrollRef.current.scrollLeft;
        galleryIndexRef.current = Math.round(currentScroll / cardWidth);
      }
    }
  };

  const handleGalleryMouseMove = (e) => {
    if (!isGalleryDraggingRef.current || !galleryScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - galleryScrollRef.current.offsetLeft;
    const walk = (x - galleryStartXRef.current) * 1.5;
    galleryScrollRef.current.scrollLeft = galleryScrollLeftRef.current - walk;
  };

  return (
    <main className="home-page">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="maharaj-hero">
        {/* ================= BACKGROUND CAROUSEL ================= */}
        <div
          id="maharajHeroCarousel"
          className="carousel slide carousel-fade maharaj-hero-carousel"
          data-bs-ride="carousel"
          data-bs-interval="5000"
          data-bs-pause="false"
          data-bs-wrap="true"
        >
          <div className="carousel-inner">
            {heroImages.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="maharaj-hero-image"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= DARK GRADIENT ================= */}
        <div className="maharaj-hero-overlay"></div>

        {/* ================= HERO CONTENT ================= */}
        <div className="maharaj-hero-content">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-7 col-xl-6">
                <div className="maharaj-content-inner">
                  {/* Brand Name - Stacked */}
                  <div className="maharaj-hero-brand-stack left">
                    <span className="brand-name-maharaj">Maharaj</span>
                    <span className="brand-name-organiser">The Event Organiser</span>
                    <span className="brand-name-company">Event Maharaj Galaxy Pvt. Ltd.</span>
                  </div>

                  {/* Heading */}
                  <h1 className="maharaj-hero-title">
                    <span className="title-white right">
                      Experience The Pleasure of
                    </span>
                    <span className="title-gold left">
                      Delicious Food &amp;
                      <br />
                      Royal Hospitality
                    </span>
                  </h1>
                  {/* Since */}
                  <div className="maharaj-since bottom">
                    <span className="since-flourish">―◆</span>
                    <span className="since-text">SINCE 2002</span>
                    <span className="since-flourish">◆―</span>
                  </div>

                  {/* Description */}
                  <p className="maharaj-hero-description bottom">
                    Maharaj The Event Organiser creates memorable experiences
                    with perfection in every detail.
                  </p>

                  {/* Buttons */}
                  <div className="maharaj-hero-buttons bottom">
                    <Link
                      to="/services"
                      className="maharaj-btn maharaj-btn-primary"
                    >
                      <span>OUR SERVICES</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        className="ms-1"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </Link>

                    <Link
                      to="/contact-us"
                      className="maharaj-btn maharaj-btn-outline"
                    >
                      <span>CONTACT US</span>
                      <span className="btn-arrow">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= BOTTOM FEATURES ================= */}
            <div className="maharaj-hero-bottom-features">
              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L4 7v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V7l-8-5z" />
                    <circle cx="12" cy="11" r="2.5" />
                  </svg>
                </div>
                <div className="hero-feature-text">
                  <span className="f-title">Client Centric</span>
                  <span className="f-sub">Approach</span>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3.5C6 2.67 6.67 2 7.5 2h9c.83 0 1.5.67 1.5 1.5V22H6V3.5z" />
                    <line x1="9" y1="8" x2="15" y2="8" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="9" y1="16" x2="15" y2="16" />
                  </svg>
                </div>
                <div className="hero-feature-text">
                  <span className="f-title">Attention</span>
                  <span className="f-sub">to Detail</span>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3.5" />
                    <line x1="12" y1="2.5" x2="12" y2="5.5" />
                    <line x1="12" y1="18.5" x2="12" y2="21.5" />
                    <line x1="2.5" y1="12" x2="5.5" y2="12" />
                    <line x1="18.5" y1="12" x2="21.5" y2="12" />
                    <line x1="5.28" y1="5.28" x2="7.4" y2="7.4" />
                    <line x1="16.6" y1="16.6" x2="18.72" y2="18.72" />
                    <line x1="5.28" y1="18.72" x2="7.4" y2="16.6" />
                    <line x1="16.6" y1="7.4" x2="18.72" y2="5.28" />
                  </svg>
                </div>
                <div className="hero-feature-text">
                  <span className="f-title">Creative</span>
                  <span className="f-sub">&amp; Unique</span>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 15" />
                    <line x1="12" y1="3" x2="12" y2="4.5" />
                    <line x1="12" y1="19.5" x2="12" y2="21" />
                    <line x1="3" y1="12" x2="4.5" y2="12" />
                    <line x1="19.5" y1="12" x2="21" y2="12" />
                  </svg>
                </div>
                <div className="hero-feature-text">
                  <span className="f-title">Reliable</span>
                  <span className="f-sub">&amp; On-time</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SCROLL INDICATOR ================= */}
        <div className="maharaj-scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* =====================================================
          SERVICES WE OFFER SECTION
      ====================================================== */}
      <section className="maharaj-services-section">
        <div className="container">
          {/* Section Header */}
          <div className="text-center section-header">
            <div className="section-subtitle-wrapper">
              <span className="ornate-line"></span>
              <span className="section-subtitle">SERVICES WE OFFER</span>
              <span className="ornate-line"></span>
            </div>
            <h2 className="section-title">Crafting Perfect Events</h2>
            <p className="section-description">
              From intimate gatherings to grand celebrations,
              <br className="d-none d-md-inline" />
              we handle everything with perfection.
            </p>
          </div>

          {/* Dynamic Service Categories */}
          {servicesData.map((category) => (
            <div className="services-group" key={category.id}>
              <div className="category-header-wrapper">
                <span className="ornate-divider-line left-line"></span>
                <div className="category-badge">
                  <div className="category-badge-circle">
                    <ServiceIcon
                      icon={category.icon}
                      id={category.id}
                      size={15}
                    />
                  </div>
                  <h3 className="category-badge-title">{category.title}</h3>
                </div>
                <span className="ornate-divider-line right-line"></span>
              </div>

              <div className={`services-grid services-grid-5`}>
                {category.cards.map((card) => (
                  <div className="service-card bottom" key={card.id}>
                    <div className="card-icon">
                      <ServiceIcon icon={card.icon} id={card.id} size={28} />
                    </div>
                    <h4 className="card-title">{card.title}</h4>
                    <p className="card-desc">{card.description}</p>
                    <Link to={card.link} className="card-link">
                      <span>Explore</span>
                      <span className="card-link-arrow">→</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          WELCOME / ABOUT US SECTION
      ====================================================== */}
      <section className="maharaj-about-section">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Image Frame */}
            <div className="col-12 col-lg-4 mb-4 mb-lg-0">
              <div className="about-image-wrapper">
                <img
                  src="/images/home_about.png"
                  alt="Maharaj Event Organiser"
                  className="about-image"
                />
              </div>
            </div>

            {/* Center Content */}
            <div className="col-12 col-lg-5 mb-4 mb-lg-0">
              <div className="about-content">
                <span className="about-subtitle">WELCOME TO</span>
                <div className="maharaj-hero-brand-stack brand-stack-sm">
                  <span className="brand-name-maharaj">Maharaj</span>
                  <span className="brand-name-organiser">The Event Organiser</span>
                  <span className="brand-name-company">Event Maharaj Galaxy Pvt. Ltd.</span>
                </div>
                <p className="about-text right">
                  Maharaj is more than just an event organiser, he is a maestro
                  of creating memorable experiences. His passion for event
                  planning is evident in every detail, from the initial concept
                  to the final execution with a keen eye for aesthetics and a
                  knack for logistics. Maharaj ensures that each event is not
                  only successful but also unforgettable.
                </p>
                <Link
                  to="/about-us"
                  className="maharaj-btn maharaj-btn-primary"
                >
                  KNOW MORE ABOUT US
                </Link>
              </div>
            </div>

            {/* Right Value List */}
            <div className="col-12 col-lg-3">
              <div className="about-values-list">
                <div className="value-item right">
                  <div className="value-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="value-info">
                    <h5 className="value-title">Client - Centric Approach</h5>
                    <p className="value-desc">
                      He Listens to client needs and work closely with them to
                      bring their vision to Life.
                    </p>
                  </div>
                </div>

                <div className="value-item right">
                  <div className="value-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="value-info">
                    <h5 className="value-title">Attention to Detail</h5>
                    <p className="value-desc">
                      Maharaj Leaves no stone unturned, ensuring that every
                      detail is perfect.
                    </p>
                  </div>
                </div>

                <div className="value-item right">
                  <div className="value-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div className="value-info">
                    <h5 className="value-title">Creativity</h5>
                    <p className="value-desc">
                      Each event is a unique master piece, thanks to his
                      innovative ideas and creative flair.
                    </p>
                  </div>
                </div>

                <div className="value-item right">
                  <div className="value-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="value-info">
                    <h5 className="value-title">Reliability</h5>
                    <p className="value-desc">
                      Clients can trust Maharaj to deliver his service on or
                      before time and within budget.
                    </p>
                  </div>
                </div>

                <div className="value-item right">
                  <div className="value-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="value-info">
                    <h5 className="value-title">Health</h5>
                    <p className="value-desc">
                      Maintain your health while enjoying the occasion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR GALLERY SECTION
      ====================================================== */}
      <section className="maharaj-gallery-section">
        <div className="container">
          <div className="text-center section-header">
            <div className="section-subtitle-wrapper">
              <span className="ornate-line"></span>
              <span className="section-subtitle">OUR GALLERY</span>
              <span className="ornate-line"></span>
            </div>
          </div>

          <div className="gallery-slider-wrapper bottom">
            {/* Slider Track */}
            <div
              className="gallery-track"
              ref={galleryScrollRef}
              onScroll={checkGalleryScrollPosition}
              onMouseEnter={() => setIsGalleryHovered(true)}
              onMouseLeave={() => {
                setIsGalleryHovered(false);
                handleGalleryMouseLeaveOrUp();
              }}
              onTouchStart={() => setIsGalleryHovered(true)}
              onTouchEnd={() => setIsGalleryHovered(false)}
              onMouseDown={handleGalleryMouseDown}
              onMouseUp={handleGalleryMouseLeaveOrUp}
              onMouseMove={handleGalleryMouseMove}
            >
              {extendedGalleryData.map((item, index) => (
                <div
                  className="gallery-card-wrapper"
                  key={`${item.id}-${index}`}
                >
                  <div className="gallery-item">
                    <img
                      src={item.image}
                      alt={item.alt || item.title}
                      loading="lazy"
                    />
                    {item.title && (
                      <div className="gallery-item-caption">
                        <span>{item.title}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic 3-Dot Animated Pagination */}
          <div className="gallery-dots-viewport">
            <div
              className="gallery-dots-track"
              style={{
                transform: `translateX(-${Math.max(0, Math.min(activeGalleryIndex - 1, galleryData.length - 3)) * 16}px)`,
              }}
            >
              {galleryData.map((_, i) => {
                const startIndex = Math.max(
                  0,
                  Math.min(activeGalleryIndex - 1, galleryData.length - 3),
                );
                const isVisible = i >= startIndex && i < startIndex + 3;
                const isActive = i === activeGalleryIndex;

                return (
                  <span
                    key={i}
                    className={`dot-slot ${isVisible ? "visible" : "hidden"} ${isActive ? "active" : ""}`}
                    onClick={() => scrollToGalleryIndex(i)}
                  >
                    <span className="dot-inner"></span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="/gallery" className="maharaj-btn maharaj-btn-gallery">
              <span>VIEW FULL GALLERY</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="ms-2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
            STATISTICS COUNTER STRIP
      ====================================================== */}

      <section className="maharaj-stats-section">
        <div className="container">
          <div className="stats-strip">
            {statsData.map((stat, index) => (
              <React.Fragment key={stat.id}>
                {/* ===========================================
              STAT ITEM
          ============================================ */}

                <div className="stat-item">
                  {/* Icon */}

                  <div className="stat-icon">
                    {typeof stat.icon === "string" &&
                    stat.icon.includes(":") ? (
                      <iconify-icon
                        icon={stat.icon}
                        width="38"
                        height="38"
                      ></iconify-icon>
                    ) : (
                      stat.icon
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="stat-content">
                    <div className="stat-number">
                      <Counter value={stat.number} />
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>

                {/* ===========================================
              DIVIDER
          ============================================ */}

                {index < statsData.length - 1 && (
                  <div className="stat-divider">
                    <span></span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT OUR CLIENTS SAY (TESTIMONIALS)
      ====================================================== */}
      <section className="maharaj-testimonials-section">
        <div className="container">
          <div className="text-center section-header">
            <div className="section-subtitle-wrapper">
              <span className="ornate-line"></span>
              <span className="section-subtitle">WHAT OUR CLIENTS SAY</span>
              <span className="ornate-line"></span>
            </div>
          </div>

          <div className="testimonials-slider-wrapper bottom">
            {/* Slider Track */}
            <div
              className="testimonials-track"
              ref={testimonialScrollRef}
              onScroll={checkScrollPosition}
              onMouseEnter={() => setIsTestimonialHovered(true)}
              onMouseLeave={() => {
                setIsTestimonialHovered(false);
                handleTestimonialMouseLeaveOrUp();
              }}
              onTouchStart={() => setIsTestimonialHovered(true)}
              onTouchEnd={() => setIsTestimonialHovered(false)}
              onMouseDown={handleTestimonialMouseDown}
              onMouseUp={handleTestimonialMouseLeaveOrUp}
              onMouseMove={handleTestimonialMouseMove}
            >
              {extendedTestimonialsData.map((item, index) => (
                <div
                  className="testimonial-card-wrapper"
                  key={`${item.id}-${index}`}
                >
                  <div className="testimonial-card">
                    <div className="quote-mark">"</div>
                    <p className="testimonial-quote">{item.quote}</p>
                    {item.rating && (
                      <div className="testimonial-stars">
                        {[...Array(item.rating)].map((_, i) => (
                          <span key={i} className="star-icon">
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="testimonial-author">
                      <strong>- {item.author}</strong>
                      <span>{item.event}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic 3-Dot Animated Pagination */}
          {hasTestimonialDots && (
            <div className="testimonial-dots-viewport">
              <div
                className="testimonial-dots-track"
                style={{
                  transform: `translateX(-${Math.max(0, Math.min(activeTestimonialIndex - 1, testimonialsData.length - 3)) * 16}px)`,
                }}
              >
                {testimonialsData.map((_, i) => {
                  const startIndex = Math.max(
                    0,
                    Math.min(
                      activeTestimonialIndex - 1,
                      testimonialsData.length - 3,
                    ),
                  );
                  const isVisible = i >= startIndex && i < startIndex + 3;
                  const isActive = i === activeTestimonialIndex;

                  return (
                    <span
                      key={i}
                      className={`dot-slot ${isVisible ? "visible" : "hidden"} ${isActive ? "active" : ""}`}
                      onClick={() => scrollToTestimonialIndex(i)}
                    >
                      <span className="dot-inner"></span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          FOOTER CTA BANNER
      ====================================================== */}
      <CtaBanner />
    </main>
  );
}
