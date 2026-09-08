import React, { useState } from "react";
import { Link } from "react-router-dom";
import "iconify-icon";
import CtaBanner from "../components/CtaBanner";
import "../../public/css/contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        eventType: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <main className="contact-page">
      {/* =====================================================
          HERO SECTION (Matches About Hero CSS & Design)
      ====================================================== */}
      <section className="maharaj-contact-hero">
        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-content">
          <div className="contact-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-arrow">›</span>
            <span>Contact Us</span>
          </div>

          <h1 className="left">
            Contact <span className="title-gold">Us</span>
          </h1>

          <div className="contact-title-line">
            <span></span>
          </div>

          <p className="right">
            We'd love to hear from you! Whether you have a question, need a quote,
            or want to discuss your upcoming event, our team is here to help.
          </p>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFO STRIP (4 Luxury Cards)
      ====================================================== */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-strip">
            {/* Card 1: Call Us */}
            <div className="info-card-item">
              <div className="info-card-badge">
                <iconify-icon icon="ph:phone-call-fill" width="22" height="22"></iconify-icon>
              </div>
              <div className="info-card-body">
                <h4 className="info-card-title">Call Us</h4>
                <a href="tel:+91 9007194502" className="info-card-detail">
                  +91 9007194502
                </a>
                <span className="info-card-sub">Mon - Sun: 10:00 AM - 8:00 PM</span>
              </div>
            </div>

            <div className="info-card-divider"></div>

            {/* Card 2: Email Us */}
            <div className="info-card-item">
              <div className="info-card-badge">
                <iconify-icon icon="ph:envelope-simple-fill" width="22" height="22"></iconify-icon>
              </div>
              <div className="info-card-body">
                <h4 className="info-card-title">Email Us</h4>
                <a href="mailto:maharajeventorganiser@gmail.com" className="info-card-detail">
                  maharajeventorganiser@gmail.com
                </a>
                <span className="info-card-sub">We reply within 24 hours</span>
              </div>
            </div>

            <div className="info-card-divider"></div>

            {/* Card 3: Visit Us */}
            <div className="info-card-item">
              <div className="info-card-badge">
                <iconify-icon icon="ph:map-pin-fill" width="22" height="22"></iconify-icon>
              </div>
              <div className="info-card-body">
                <h4 className="info-card-title">Visit Us</h4>
                <span className="info-card-detail">70/1, Bihari Lal Ghosh Road,</span>
                <span className="info-card-sub">Kolkata - 700057</span>
              </div>
            </div>

            {/* <div className="info-card-divider"></div> */}

            {/* Card 4: Follow Us */}
            {/* <div className="info-card-item">
              <div className="info-card-badge">
                <iconify-icon icon="ph:clock-fill" width="22" height="22"></iconify-icon>
              </div>
              <div className="info-card-body">
                <h4 className="info-card-title">Follow Us</h4>
                <div className="info-social-links">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <iconify-icon icon="ph:facebook-logo-fill" width="18" height="18"></iconify-icon>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <iconify-icon icon="ph:instagram-logo-fill" width="18" height="18"></iconify-icon>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                    <iconify-icon icon="ph:youtube-logo-fill" width="18" height="18"></iconify-icon>
                  </a>
                  <a href="https://wa.me/919830777615" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                    <iconify-icon icon="ph:whatsapp-logo-fill" width="18" height="18"></iconify-icon>
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* =====================================================
          GET IN TOUCH (FORM + SIDE BANNER CARD)
      ====================================================== */}
      <section className="contact-form-section">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            {/* Left Column: Form Card */}
            <div className="col-12 col-lg-7">
              <div className="contact-form-card bottom">
                <div className="section-subtitle-wrapper text-start mb-2">
                  <span className="ornate-line"></span>
                  <span className="section-subtitle">SEND US A MESSAGE</span>
                  <span className="ornate-line"></span>
                </div>

                <h2 className="contact-form-title">
                  Get In <span className="title-gold">Touch</span>
                </h2>

                <p className="contact-form-desc">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {submitted && (
                  <div className="alert alert-success contact-success-alert mb-4">
                    Thank you for reaching out! Our team will contact you shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row g-3">
                    {/* Full Name */}
                    <div className="col-12 col-md-6 left">
                      <div className="form-group-custom">
                        <iconify-icon icon="ph:user-bold" className="form-field-icon"></iconify-icon>
                        <input
                          type="text"
                          name="fullName"
                          className="form-control-custom"
                          placeholder="Full Name *"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="col-12 col-md-6 left">
                      <div className="form-group-custom">
                        <iconify-icon icon="ph:envelope-simple-bold" className="form-field-icon"></iconify-icon>
                        <input
                          type="email"
                          name="email"
                          className="form-control-custom"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="col-12 col-md-6 right">
                      <div className="form-group-custom">
                        <iconify-icon icon="ph:phone-bold" className="form-field-icon"></iconify-icon>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control-custom"
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Select Event Type */}
                    <div className="col-12 col-md-6 right">
                      <div className="form-group-custom">
                        <iconify-icon icon="ph:calendar-blank-bold" className="form-field-icon"></iconify-icon>
                        <select
                          name="eventType"
                          className="form-control-custom form-select-custom"
                          value={formData.eventType}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled hidden>
                            Select Event Type *
                          </option>
                          <option value="Wedding">Wedding</option>
                          <option value="Corporate Event">Corporate Event</option>
                          <option value="Birthday Party">Birthday Party</option>
                          <option value="Reception">Reception</option>
                          <option value="Baby Shower">Baby Shower</option>
                          <option value="Anniversary">Anniversary</option>
                          <option value="Other">Other</option>
                        </select>
                        <iconify-icon icon="ph:caret-down-bold" className="select-caret-icon"></iconify-icon>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="col-12 bottom">
                      <div className="form-group-custom textarea-group">
                        <iconify-icon icon="ph:chat-teardrop-text-bold" className="form-field-icon textarea-icon"></iconify-icon>
                        <textarea
                          name="message"
                          rows="4"
                          className="form-control-custom textarea-custom"
                          placeholder="Your Message *"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 mt-4">
                      <button
                        type="submit"
                        className="contact-submit-btn bottom"
                        disabled={isSubmitting}
                      >
                        <iconify-icon icon="ph:paper-plane-tilt-bold"></iconify-icon>
                        <span>{isSubmitting ? "SENDING..." : "SEND MESSAGE"}</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Corner Floral Artwork Flourish */}
                <div className="contact-corner-flourish">
                  <svg width="90" height="90" viewBox="0 0 100 100" fill="none" opacity="0.15">
                    <path
                      d="M90 90C60 90 30 60 30 30M90 90C90 60 60 30 30 30M90 90L30 30"
                      stroke="#C99832"
                      strokeWidth="2"
                    />
                    <circle cx="90" cy="90" r="4" fill="#C99832" />
                    <circle cx="30" cy="30" r="4" fill="#C99832" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column: Side Banner Card */}
            <div className="col-12 col-lg-5 bottom">
              <div className="contact-side-banner">
                <div className="side-banner-overlay"></div>
                <div className="side-banner-content">
                  <h3 className="side-banner-title left">
                    Let's Plan <br />
                    <span>Your Perfect Event</span>
                  </h3>

                  <p className="side-banner-desc right">
                    Your dream event is just a message away. Our team will get in
                    touch with you to understand your requirements and provide the
                    best solutions.
                  </p>

                  <div className="side-banner-quote-box">
                    <div className="quote-line-flourish">
                      <span className="flourish-diamond">❖</span>
                      <span className="flourish-bar"></span>
                      <span className="flourish-diamond">❖</span>
                    </div>
                    <blockquote className="side-banner-quote bottom">
                      “ We Create Memories <br />
                      <span>That Last Forever ”</span>
                    </blockquote>
                    <div className="quote-line-flourish">
                      <span className="flourish-diamond">❖</span>
                      <span className="flourish-bar"></span>
                      <span className="flourish-diamond">❖</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR LOCATION / MAP SECTION
      ====================================================== */}
      <section className="contact-location-section">
        <div className="container bottom">
          <div className="location-card-wrapper">
            <div className="row g-0 align-items-stretch">
              {/* Map Left */}
              <div className="col-12 col-lg-5">
                <div className="map-iframe-container">
                  <iframe
                    title="Event Maharaj Galaxy Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14727.649331905977!2d88.35905078715824!3d22.65705700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d236ad8fa33%3A0x299763d4a5ebcb3f!2sEvent%20Maharaj%20Galaxy%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1787859814779!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "340px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </div>
              </div>

              {/* Location Right Card */}
              <div className="col-12 col-lg-7">
                <div className="location-right-card">
                  {/* Info Box Left */}
                  <div className="location-info-box">
                    <div className="section-subtitle-wrapper text-start mb-2">
                      <span className="ornate-line"></span>
                      <span className="section-subtitle">Our Location</span>
                      <span className="ornate-line"></span>
                    </div>

                    <h3 className="location-title left">Maharaj Galaxy</h3>

                    <div className="location-address-row right">
                      <iconify-icon icon="ph:map-pin-fill" className="location-pin-icon"></iconify-icon>
                      <div className="address-text">
                        <span className="d-block">70/1, Bihari Lal Ghosh Road,
</span>
                        <span>Kolkata - 700156</span>
                      </div>
                    </div>

                    <a
                      href="https://maps.google.com/?q=Event+Maharaj+Galaxy+Pvt+Ltd"
                      target="_blank"
                      rel="noreferrer"
                      className="location-directions-btn bottom"
                    >
                      <span>GET DIRECTIONS</span>
                      <iconify-icon icon="ph:arrow-up-right-bold"></iconify-icon>
                    </a>
                  </div>

                  {/* Building Image Right */}
                  <div className="location-building-img-wrapper">
                    <picture>
                      <source
                        media="(max-width: 991.98px)"
                        srcSet="/images/contact_building_responsive.png"
                      />
                      <img
                        src="/images/contact_building.png"
                        alt="Maharaj Galaxy Building"
                        className="location-building-img"
                      />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER CTA BANNER
      ====================================================== */}
      <CtaBanner />
    </main>
  );
}
