import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "iconify-icon";
import galleryData from "../data/gallery.json";
import Counter from "../components/Counter";
import CtaBanner from "../components/CtaBanner";
import "../../public/css/gallery.css";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);

  // Statistics Data for Hero
  const statsList = [
    {
      id: "captured",
      number: "1000+",
      label: "Events Captured",
      icon: "ph:camera-fill",
    },
    {
      id: "clients",
      number: "800+",
      label: "Happy Clients",
      icon: "ph:smiley-fill",
    },
    {
      id: "excellence",
      number: "22+",
      label: "Years of Excellence",
      icon: "ph:crown-fill",
    },
  ];

  // Category Tabs Configuration
  const categoryTabs = [
    { id: "all", label: "All Events", icon: "ph:squares-four-fill" },
    { id: "weddings", label: "Weddings", icon: "mdi:ring" },
    { id: "birthdays", label: "Birthday Parties", icon: "ph:cake-fill" },
    { id: "anniversaries", label: "Anniversaries", icon: "ph:heart-fill" },
    { id: "corporate", label: "Corporate Events", icon: "ph:buildings-fill" },
    { id: "other", label: "Other Celebrations", icon: "ph:balloon-fill" },
  ];

  // Filtered gallery items
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return galleryData;
    }
    return galleryData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Paginated items
  const paginatedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setVisibleCount(12); // Reset page count on filter switch
  };

  const loadMorePhotos = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <main className="gallery-page">
      {/* =====================================================
          HERO BANNER SECTION
      ====================================================== */}
      <section className="maharaj-gallery-hero">
        <div className="gallery-hero-overlay"></div>

        <div className="gallery-hero-content">
          {/* Breadcrumb */}
          <div className="gallery-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-arrow">›</span>
            <span>Gallery</span>
          </div>

          {/* Title */}
          <h1 className="left">
            Our <span>Gallery</span>
          </h1>

          {/* Gold Decorative Underline */}
          <div className="gallery-title-line">
            <span></span>
          </div>

          {/* Subtitle */}
          <p className="right">
            A glimpse of the unforgettable moments we've crafted with passion,
            creativity and perfection.
          </p>

          {/* Stats strip inside Hero Banner */}
          <div className="gallery-hero-stats">
            {statsList.map((stat) => (
              <div className="gallery-stat-item" key={stat.id}>
                <div className="gallery-stat-icon">
                  <iconify-icon icon={stat.icon} width="22" height="22"></iconify-icon>
                </div>
                <div className="gallery-stat-info">
                  <span className="gallery-stat-number">
                    <Counter value={stat.number} />
                  </span>
                  <span className="gallery-stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* =====================================================
          MAIN GALLERY GRID & FILTERS
      ====================================================== */}
      <section className="maharaj-gallery-section">
        <div className="container">
          {/* Navigation Filter Tabs */}
          <div className="gallery-filters-container">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`gallery-filter-btn ${activeCategory === tab.id ? "active" : ""}`}
                onClick={() => handleCategoryChange(tab.id)}
              >
                <iconify-icon icon={tab.icon}></iconify-icon>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Image Grid */}
          <div className="gallery-grid">
            {paginatedItems.map((item, index) => (
              <div
                className="gallery-item-wrapper"
                key={`${item.id}-${activeCategory}-${index}`}
              >
                <div className="gallery-card bottom">
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                    className="gallery-img"
                    loading="lazy"
                  />
                  <div className="gallery-card-overlay">
                    <h4 className="gallery-item-title">{item.title}</h4>
                    <span className="gallery-item-category">
                      {item.category === "birthdays"
                        ? "Birthday Party"
                        : item.category === "corporate"
                        ? "Corporate Event"
                        : item.category === "anniversaries"
                        ? "Anniversary"
                        : item.category === "weddings"
                        ? "Wedding"
                        : "Celebration"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* VIEW MORE PHOTOS Button */}
          {filteredItems.length > visibleCount && (
            <div className="view-more-container">
              <button
                type="button"
                className="view-more-btn"
                onClick={loadMorePhotos}
              >
                <span>View More Photos</span>
                <iconify-icon icon="ph:image-square-fill"></iconify-icon>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          FOOTER CONTACT CTA STRIP (Standard site CTA)
      ====================================================== */}
      <CtaBanner />
    </main>
  );
}
