import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "iconify-icon";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top automatically on route change and re-init ScrollReveal
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (typeof window !== "undefined" && window.ScrollReveal) {
      const timer = setTimeout(() => {
        const sr = window.ScrollReveal({
          reset: true,
          distance: "40px",
          duration: 900,
          delay: 120,
          easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
          opacity: 0,
          scale: 0.98,
          viewFactor: 0.15,
        });

        sr.reveal(".top", { origin: "top" });
        sr.reveal(".bottom", { origin: "bottom", interval: 80 });
        sr.reveal(".left", { origin: "left" });
        sr.reveal(".right", { origin: "right", interval: 80 });

        // 3-side collage image reveals (glitch-free staggered)
        sr.reveal(".collage-img-main", { origin: "left", distance: "50px", duration: 1000, delay: 100 });
        sr.reveal(".collage-img-top-right", { origin: "top", distance: "50px", duration: 1000, delay: 250 });
        sr.reveal(".collage-img-bottom-right", { origin: "bottom", distance: "50px", duration: 1000, delay: 400 });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Handle scroll position to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`maharaj-scroll-top ${isVisible ? "is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <iconify-icon
        icon="ph:arrow-up-bold"
        width="20"
        height="20"
      ></iconify-icon>
    </button>
  );
}
