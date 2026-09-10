import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../public/css/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* =========================================================
     CLOSE MENU WHEN WINDOW BECOMES DESKTOP
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =========================================================
     TOGGLE MOBILE MENU
  ========================================================= */

  const toggleNavbar = () => {
    setMenuOpen((prev) => !prev);
  };

  /* =========================================================
     CLOSE NAVBAR
  ========================================================= */

  const closeNavbar = () => {
    setMenuOpen(false);
  };

  /* =========================================================
     NAV CLASS
  ========================================================= */

  const navClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <nav className="maharaj-navbar">
      <div className="container maharaj-navbar-container">
        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link to="/" className="maharaj-logo" onClick={closeNavbar}>
          <img src="/images/logo.png" alt="Maharaj The Event Organiser" />
        </Link>

        {/* =====================================================
            MOBILE HAMBURGER
        ===================================================== */}

        <button
          className={`maharaj-toggler ${menuOpen ? "is-open" : ""}`}
          type="button"
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <div className={`maharaj-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="maharaj-nav">
            {/* HOME */}

            <li className="nav-item">
              <NavLink to="/" end className={navClass} onClick={closeNavbar}>
                Home
              </NavLink>
            </li>

            {/* ABOUT */}

            <li className="nav-item">
              <NavLink
                to="/about-us"
                className={navClass}
                onClick={closeNavbar}
              >
                About Us
              </NavLink>
            </li>

            {/* WHY US */}

            <li className="nav-item">
              <NavLink to="/why-us" className={navClass} onClick={closeNavbar}>
                Why Us
              </NavLink>
            </li>

            {/* =================================================
                SERVICES
            ================================================= */}

            <li className="nav-item">
              <NavLink
                to="/services"
                className={navClass}
                onClick={closeNavbar}
              >
                Services
              </NavLink>
            </li>

            {/* GALLERY */}

            <li className="nav-item">
              <NavLink to="/gallery" className={navClass} onClick={closeNavbar}>
                Gallery
              </NavLink>
            </li>

            

            {/* TESTIMONIALS */}

            <li className="nav-item">
              <NavLink
                to="/testimonials"
                className={navClass}
                onClick={closeNavbar}
              >
                Testimonials
              </NavLink>
            </li>

            {/* CONTACT */}

            <li className="nav-item">
              <NavLink
                to="/contact-us"
                className={navClass}
                onClick={closeNavbar}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>

          {/* ===================================================
              ACTIONS
          =================================================== */}

          <div className="maharaj-actions">
            <a href="tel:+919007194502" className="maharaj-phone">
              <span className="phone-icon">☎</span>

              <span>+91 9007194502</span>
            </a>

            <Link to="/contact-us" className="book-now-btn" onClick={closeNavbar}>
              <span className="btn-text">BOOK NOW</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
