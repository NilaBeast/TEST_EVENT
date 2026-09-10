import React from "react";
import { Link } from "react-router-dom";
import "iconify-icon";
import statsData from "../data/stats.json";
import teamData from "../data/team.json";
import Counter from "../components/Counter";
import CtaBanner from "../components/CtaBanner";
import "../../public/css/about.css";

// Infinite auto-scroll carousel hook (same pattern as homepage)
function useInfiniteCarousel(data) {
  const scrollRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const indexRef = React.useRef(0);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollStart = React.useRef(0);

  const extendedData = React.useMemo(
    () => [...data, ...data, ...data],
    [data]
  );

  const getCardWidth = () => {
    if (!scrollRef.current) return 0;
    const card = scrollRef.current.querySelector(".team-card-wrapper");
    return card ? card.offsetWidth + 20 : 0;
  };

  const onScroll = React.useCallback(() => {
    if (!scrollRef.current) return;
    const cw = getCardWidth();
    if (!cw) return;
    const raw = Math.round(scrollRef.current.scrollLeft / cw);
    setActiveIndex(raw % data.length);
    if (!isDragging.current) indexRef.current = raw;
  }, [data.length]);

  // Auto-scroll
  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const cw = getCardWidth();
      if (!cw) return;
      const next = indexRef.current + 1;
      scrollRef.current.scrollTo({ left: next * cw, behavior: "smooth" });
      indexRef.current = next;
      setActiveIndex(next % data.length);
      if (next >= data.length) {
        setTimeout(() => {
          if (!scrollRef.current) return;
          const reset = next % data.length;
          scrollRef.current.style.scrollBehavior = "auto";
          scrollRef.current.scrollLeft = reset * cw;
          void scrollRef.current.offsetHeight;
          scrollRef.current.style.scrollBehavior = "smooth";
          indexRef.current = reset;
        }, 500);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, data.length]);

  const onMouseDown = (e) => {
    isDragging.current = true;
    scrollRef.current?.classList.add("dragging");
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollStart.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onMouseUpOrLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    scrollRef.current?.classList.remove("dragging");
    const cw = getCardWidth();
    if (cw && scrollRef.current) {
      indexRef.current = Math.round(scrollRef.current.scrollLeft / cw);
    }
  };

  const onMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollStart.current - (x - startX.current) * 1.5;
  };

  const scrollToIndex = (i) => {
    if (!scrollRef.current) return;
    const cw = getCardWidth();
    indexRef.current = i;
    setActiveIndex(i % data.length);
    scrollRef.current.scrollTo({ left: i * cw, behavior: "smooth" });
  };

  return {
    scrollRef, activeIndex, extendedData,
    setIsHovered, onScroll,
    onMouseDown, onMouseUpOrLeave, onMouseMove,
    scrollToIndex,
  };
}

function TeamSection() {
  const isSlider = teamData.length > 4;
  const carousel = useInfiniteCarousel(teamData);

  return (
    <section className="maharaj-team-section">
      <div className="container">
        <div className="team-section-header">
          <div className="team-section-subtitle">
            <span className="team-ornament-line"></span>
            <span>MEET THE TEAM</span>
            <span className="team-ornament-line"></span>
          </div>
          <h2 className="team-section-title">The Minds Behind The Magic</h2>
          <div className="team-heading-divider"><span></span></div>
        </div>

        {isSlider ? (
          <>
            {/* Carousel Track */}
            <div
              className="team-track bottom"
              ref={carousel.scrollRef}
              onScroll={carousel.onScroll}
              onMouseEnter={() => carousel.setIsHovered(true)}
              onMouseLeave={() => { carousel.setIsHovered(false); carousel.onMouseUpOrLeave(); }}
              onTouchStart={() => carousel.setIsHovered(true)}
              onTouchEnd={() => carousel.setIsHovered(false)}
              onMouseDown={carousel.onMouseDown}
              onMouseUp={carousel.onMouseUpOrLeave}
              onMouseMove={carousel.onMouseMove}
            >
              {carousel.extendedData.map((member, i) => (
                <div className="team-card-wrapper" key={`${member.id}-${i}`}>
                  <div className="team-card">
                    <div className="team-avatar-wrapper">
                      <img src={member.image} alt={member.name} className="team-avatar" loading="lazy" />
                    </div>
                    <h4 className="team-name">{member.name}</h4>
                    {member.role && <span className="team-role">{member.role}</span>}
                    <p className="team-desc">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="team-dots">
              {teamData.map((_, i) => (
                <span
                  key={i}
                  className={`team-dot${i === carousel.activeIndex ? " active" : ""}`}
                  onClick={() => carousel.scrollToIndex(i)}
                />
              ))}
            </div>
          </>
        ) : (
          /* Static Grid when 4 or fewer items */
          <div className="team-static-grid bottom">
            {teamData.map((member) => (
              <div className="team-card-wrapper" key={member.id}>
                <div className="team-card">
                  <div className="team-avatar-wrapper">
                    <img src={member.image} alt={member.name} className="team-avatar" loading="lazy" />
                  </div>
                  <h4 className="team-name">{member.name}</h4>
                  {member.role && <span className="team-role">{member.role}</span>}
                  <p className="team-desc">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function About() {
  const valuesData = [
    {
      id: 1,
      title: "Client Centric Approach",
      description: "We listen, understand and bring your vision to life.",
      icon: "fa7-solid:handshake",
    },
    {
      id: 2,
      title: "Attention to Detail",
      description: "Every detail is planned and executed to perfection.",
      icon: "ph:sparkle",
    },
    {
      id: 3,
      title: "Creativity & Innovation",
      description: "Unique ideas and creative flair make every event special.",
      icon: "ph:flower-lotus",
    },
    {
      id: 4,
      title: "Reliability",
      description: "We deliver on time, every time with complete reliability.",
      icon: "ph:shield-check",
    },
    {
      id: 5,
      title: "Passion for Perfection",
      description: "From planning to execution, perfection is our promise.",
      icon: "ph:sun-dim",
    },
  ];

  return (
    <main className="about-page">
      {/* =====================================================
          ABOUT HERO SECTION
          ====================================================== */}
      <section className="maharaj-about-hero">
        {/* Subtle readability overlay */}
        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">
          {/* Breadcrumb */}
          <div className="about-breadcrumb">
            <Link to="/">Home</Link>

            <span className="breadcrumb-arrow">›</span>

            <span>Our Profile</span>
          </div>

          {/* Main Heading */}
          <h1 className="left">
            <span>Our</span> Profile
          </h1>

          {/* Gold Decorative Line */}
          <div className="about-title-line">
            <span></span>
          </div>

          {/* Description */}
          <p className="right">
            Maharaj The Event Organiser is more than just an event management
            company – we are creators of unforgettable experiences.
          </p>
        </div>
      </section>

      {/* =====================================================
          WHO WE ARE SECTION
      ====================================================== */}
      <section className="maharaj-who-we-are">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Image Column with Luxury Gold Offset Frame */}
            <div className="col-12 col-lg-5 mb-4 mb-lg-0">
              <div className="who-we-are-image-wrapper">
                <div className="who-we-are-gold-backdrop"></div>
                <div className="who-we-are-image-frame">
                  <img
                    src="/images/home_about.png"
                    alt="Maharaj Event Aisle Decor"
                    className="who-we-are-img"
                  />
                </div>
              </div>
            </div>

            {/* Right Text Column */}
            <div className="col-12 col-lg-7 ps-lg-5">
              <div className="who-we-are-content">
                <div className="section-subtitle-wrapper text-start mb-2">
                  <span className="ornate-line"></span>
                  <span className="section-subtitle">WHO WE ARE</span>
                  <span className="ornate-line"></span>
                </div>

                <h2 className="who-we-are-brand-stack bottom">
                  <span className="brand-name-maharaj">Maharaj</span>
                  <span className="brand-name-organiser">The Event Organiser</span>
                  <span className="brand-name-company">Event Maharaj Galaxy Pvt. Ltd.</span>
                </h2>

                <p className="who-we-are-text left">
                  Established in 2002, Maharaj The Event Organiser (Registered
                  Name – Event Maharaj Galaxy Pvt. Ltd.) has been at the
                  forefront of creating memorable events that reflect elegance,
                  perfection and royal hospitality.
                </p>

                <p className="who-we-are-text right">
                  With more than two decades of experience, we have successfully
                  planned and executed thousands of events – from intimate
                  gatherings to grand celebrations. Our passion for perfection,
                  eye for detail and commitment to client satisfaction have
                  earned us the trust and respect of our clients.
                </p>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATISTICS COUNTER STRIP (Loaded from stats.json)
      ====================================================== */}
      <section className="maharaj-stats-section">
        <div className="container">
          <div className="stats-strip">
            {statsData.map((stat, index) => (
              <React.Fragment key={stat.id}>
                <div className="stat-item">
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
                  <div className="stat-content">
                    <div className="stat-number">
                      <Counter value={stat.number} />
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>

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
          OUR VALUES SECTION (What Drives Us)
      ====================================================== */}
      <section className="maharaj-values-section">
        <div className="container">
          <div className="text-center section-header">
            <div className="section-subtitle-wrapper">
              <span className="ornate-line"></span>
              <span className="section-subtitle">OUR VALUES</span>
              <span className="ornate-line"></span>
            </div>
            <h2 className="section-title">What Drives Us</h2>
          </div>

          <div className="values-grid bottom">
            {valuesData.map((val) => (
              <div className="value-card" key={val.id}>
                <div className="value-card-icon">
                  <iconify-icon
                    icon={val.icon}
                    width="32"
                    height="32"
                  ></iconify-icon>
                </div>
                <h4 className="value-card-title">{val.title}</h4>
                <p className="value-card-desc">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* =====================================================
    MEET THE TEAM SECTION
===================================================== */}
<TeamSection />

      {/* =====================================================
          FOOTER CTA BANNER
      ====================================================== */}
      <CtaBanner />
    </main>
  );
}
