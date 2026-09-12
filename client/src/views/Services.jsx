import React from "react";
import { Link } from "react-router-dom";
import "iconify-icon";
// import servicesList from "../data/services.json";
import "../../public/css/services.css";

export default function Services() {
  const servicesList = [
    {
      id: "weddings",
      title: "Weddings",
      description:
        "Complete wedding planning with venue selection, destination weddings, theme and decoration, food, hospitality, photography, music, DJ, bridal makeup and traditional wedding arrangements.",
      icon: "hugeicons:wedding",
      image: "/images/gallery/gallery_17.png",
      link: "/services/weddings",
    },

    {
      id: "family-events",
      title: "Family Events",
      description:
        "Beautifully planned family gatherings including naming ceremonies, friendly parties, kitty parties, picnics and other memorable family occasions.",
      icon: "mdi:account-group-outline",
      image: "/images/gallery/gallery_2.jpg",
      link: "/services/family-events",
    },
    {
      id: "anniversaries",
      title: "Anniversaries",
      description:
        "Beautiful anniversary celebrations with venue selection, theme and decoration, food, hospitality, photography, videography, music, DJ, destination celebrations, mehendi, henna and make-up.",
      icon: "mdi:heart-outline",
      image:
        "/images/gallery/gallery_18.png",
      link: "/services/anniversaries",
    },
    {
      id: "vintage-cars",
      title: "Vintage Cars",
      description:
        "Make your special occasion grand with beautifully maintained vintage cars for wedding arrivals, photo shoots, guest transportation, celebrations and memorable event experiences.",
      icon: "mdi:car-side",
      image: "/images/gallery/gallery_15.png",
      link: "/services/vintage-cars",
    },
    {
      id: "catering-services",
      title: "Catering Services",
      description:
        "Complete catering solutions with customized menus, traditional and multi-cuisine food, live counters, snacks, desserts, beverages and professional hospitality for every occasion.",
      icon: "mdi:silverware-fork-knife",
      image: "/images/gallery/gallery_16.png",
      link: "/services/catering-services",
    },

    {
      id: "birthday-parties",
      title: "Birthday Parties",
      description:
        "Fun-filled birthday celebrations with venue selection, themed decoration, food, hospitality, photography, videography, music, DJ, cartoons, magic shows and destination celebrations.",
      icon: "mdi:cake-variant-outline",
      image:
        "/images/gallery/gallery_22.png",
      link: "/services/birthday-parties",
    },

    {
      id: "rice-ceremonies",
      title: "Rice Ceremonies",
      description:
        "Traditional rice ceremony celebrations planned with venue selection, theme and decoration, food, hospitality, photography and videography.",
      icon: "mdi:lamp",
      image: "/images/gallery/gallery_10.png",
      link: "/services/rice-ceremonies",
    },

    {
      id: "thread-ceremonies",
      title: "Thread Ceremonies",
      description:
        "Traditional thread ceremonies arranged with venue selection, theme and decoration, food, hospitality, photography, videography, music, cartoons, haldi ceremony, priest and traditional transportation.",
      icon: "mdi:flower-outline",
      image: "/images/gallery/gallery_19.png",
      link: "/services/thread-ceremonies",
    },

    {
      id: "baby-showers",
      title: "Baby Showers",
      description:
        "Warm and charming baby shower celebrations with venue selection, themed decoration, food, hospitality, photography, videography, music, DJ, make-up and mehendi.",
      icon: "mdi:baby-carriage",
      image:
        "/images/gallery/gallery_21.png",
      link: "/services/baby-showers",
    },

    {
      id: "house-warming",
      title: "House Warming Celebrations",
      description:
        "Auspicious house warming celebrations planned with venue selection, theme and decoration, food, hospitality and traditional arrangements.",
      icon: "mdi:home-outline",
      image:
        "/images/gallery/gallery_23.png",
      link: "/services/house-warming",
    },

    {
      id: "office-events",
      title: "Office Events",
      description:
        "Professional office events with venue selection, theme and decoration, food and hospitality, photography, videography, music, DJ and media coverage.",
      icon: "mdi:office-building-outline",
      image: "/images/gallery/gallery_20.png",
      link: "/services/office-events",
    },

    {
      id: "office-conferences",
      title: "Office Conferences",
      description:
        "Professionally organised office conferences with venue selection, theme and decoration, food and hospitality, photography, videography, music, DJ and media coverage.",
      icon: "mdi:account-group-outline",
      image: "/images/gallery/gallery_11.png",
      link: "/services/office-conferences",
    },

    {
      id: "product-book-launch",
      title: "Product / Book Launch",
      description:
        "Complete launch event management including venue selection, theme and decoration, food and hospitality, photography, videography, felicitation, media coverage, special guests, special stage and guest transportation.",
      icon: "mdi:rocket-launch-outline",
      image: "/images/gallery/gallery_7.png",
      link: "/services/product-book-launch",
    },

    {
      id: "musical-concerts",
      title: "Musical Concerts",
      description:
        "Complete musical concert planning with venue selection, theme and decoration, food and hospitality, PR, media coverage, music and DJ, lighting, stage decoration and guest transportation.",
      icon: "mdi:music-note-outline",
      image:
        // "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
        "/images/gallery/gallery_3.jpg",
      link: "/services/musical-concerts",
    },

    {
      id: "film-promotion",
      title: "Film Promotion",
      description:
        "Film promotion support including media coverage, food and hospitality on shoot days, hall distribution, daily logistics, planning and arrangement, marketing and special hosts.",
      icon: "mdi:movie-open-outline",
      image: "/images/gallery/gallery_8.png",
      link: "/services/film-promotion",
    },

    {
      id: "promotional-tours",
      title: "Promotional Tours for Offices",
      description:
        "Corporate promotional tours and destination parties with venue selection, food and hospitality, music and DJ and complete pick-up and drop facilities.",
      icon: "mdi:map-marker-path",
      image: "/images/gallery/gallery_9.png",
      link: "/services/promotional-tours",
    },

    {
      id: "social-gatherings",
      title: "Social Gatherings",
      description:
        "Organised social gatherings including puja ceremonies and social events for clubs, NGOs and other organisations.",
      icon: "mdi:account-group-outline",
      image: "/images/gallery/gallery_4.jpg",
      link: "/services/social-gatherings",
    },

    {
      id: "destination-events",
      title: "Tours & Destination Events",
      description:
        "Destination weddings, honeymoon packages, destination office and corporate events, movie promotions and tour packages with complete event services.",
      icon: "mdi:airplane-marker",
      image: "/images/gallery/gallery_12.png",
      link: "/services/destination-events",
    },
    {
      id: "kitty-parties",
      title: "Kitty Parties",
      description:
        "Fun and stylish kitty parties planned with venue selection, themed decoration, food and hospitality, games, music, photography and entertainment for a memorable gathering with friends.",
      icon: "mdi:account-heart-outline",
      image: "/images/gallery/gallery_14.png",
      link: "/services/kitty-parties",
    },
  ];

  const differenceCards = [
    {
      icon: "ph:crown-fill",
      title: "22+ Years of Excellence",
      description: "Over two decades of crafting magical experiences.",
    },
    {
      icon: "ph:users-three-fill",
      title: "1000+ Events Done",
      description:
        "A proven track record of successful events across all scales.",
    },
    {
      icon: "ph:diamond-fill",
      title: "Premium Quality",
      description: "Top-notch services and attention to every little detail.",
    },
    {
      icon: "ph:headset-fill",
      title: "End-to-End Support",
      description: "From planning to execution, we're with you every step.",
    },
    {
      icon: "ph:heart-fill",
      title: "Client Satisfaction",
      description: "Your happiness is our success and our biggest reward.",
    },
  ];

  return (
    <main className="services-page">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="maharaj-services-hero">
        <div className="services-hero-overlay"></div>

        <div className="services-hero-content">
          {/* Breadcrumb */}
          <div className="services-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-arrow">›</span>
            <span>Services</span>
          </div>

          {/* Heading */}
          <h1 className="left">
            Our <span>Services</span>
          </h1>

          {/* Decorative Divider */}
          <div className="services-title-line">
            <span></span>
          </div>

          {/* Description */}
          <p className="right">
            From intimate gatherings to grand celebrations, we provide
            end-to-end event planning and flawless execution with a touch of
            royalty.
          </p>
        </div>
      </section>

      {/* =====================================================
          INTRO SECTION
      ====================================================== */}
      <section className="services-intro-section">
        <div className="container">
          <div className="subtitle-badge">
            <span className="badge-decoration">
              <span></span>
              <i>◆</i>
              <span></span>
            </span>

            <span>WE PLAN, YOU CELEBRATE</span>

            <span className="badge-decoration reverse">
              <span></span>
              <i>◆</i>
              <span></span>
            </span>
          </div>

          <h2>Events Crafted to Perfection</h2>

          <div className="services-scroll-divider">
            <span></span>

            <i>◆</i>

            <span></span>
          </div>

          <p className="services-intro-desc bottom">
            At Maharaj, every event is a unique masterpiece. We blend
            creativity, precision and seamless coordination to turn your vision
            into an unforgettable experience.
          </p>
        </div>
      </section>

      {/* =====================================================
          SERVICES GRID
      ====================================================== */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-luxury-grid">
            {servicesList.map((service) => (
              <article className="service-luxury-card bottom" key={service.id}>
                {/* Image */}
                <div className="card-image-box">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>

                {/* Icon */}
                <div className="card-icon-circle">
                  <iconify-icon icon={service.icon} width="25" height="25" />
                </div>

                {/* Content */}
                <div className="card-details-box">
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <Link to={service.link} className="explore-link">
                    <span>EXPLORE MORE</span>

                    <iconify-icon
                      icon="ph:arrow-right"
                      width="13"
                      height="13"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA SECTION
      ====================================================== */}
      <section className="services-cta-section">
        <div className="container">
          <div className="services-cta-banner">
            <div className="cta-left">
              <div className="cta-icon-outer">
                <iconify-icon
                  icon="f7:calendar-badge-plus"
                  width="30"
                  height="30"
                />
              </div>

              <div className="cta-texts">
                <span className="cta-small-title">
                  READY TO PLAN YOUR EVENT?
                </span>

                <h3 className="cta-main-title left">
                  Let's Create Something Unforgettable
                </h3>

                <p className="cta-desc-text right">
                  Share your ideas with us and we'll handle the rest.
                </p>
              </div>
            </div>

            <Link to="/contact-us" className="cta-btn-gold bottom">
              <span>GET A FREE QUOTE</span>

              <iconify-icon icon="ph:arrow-right" width="14" height="14" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE MAHARAJ
      ====================================================== */}
      <section className="services-difference-section">
        <div className="container">
          <div className="difference-header">
            <div className="subtitle-badge difference-badge">
              <span className="badge-decoration">
                <span></span>
                <i>◆</i>
                <span></span>
              </span>

              <span>WHY CHOOSE MAHARAJ</span>

              <span className="badge-decoration reverse">
                <span></span>
                <i>◆</i>
                <span></span>
              </span>
            </div>

            <h2>Experience the Royal Difference</h2>
          </div>

          <div className="difference-stats-grid">
            {differenceCards.map((card, index) => (
              <div className="diff-card bottom" key={index}>
                <div className="diff-icon-box">
                  <iconify-icon icon={card.icon} width="38" height="38" />
                </div>

                <h4>{card.title}</h4>

                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
