import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import ProtectedRoute from "./components/protected_routes/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./views/Home";
import About from "./views/About";
import Contact from "./views/contact";
import Gallery from "./views/Gallery";
import WhyUs from "./views/WhyUs";
import Testimonials from "./views/Testimonials";
import Services from "./views/Services";
import ServiceDetails from "./views/ServiceDetails";

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="app-root">
        <div className="app-main d-flex flex-column min-vh-100">
        <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/why-us" element={<WhyUs />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/service-details" element={<ServiceDetails />} />
              <Route path="/service-details/:id" element={<ServiceDetails />} />
              {/* PROTECTED ROUTES */}
              <Route element={<ProtectedRoute />}>
                
                {/* <Route path="/profile" element={<Profile />} /> */}
              </Route>
            </Routes>
          </main>
        <Footer />
        </div>
      </div>
      {/* ✅ TOAST CONTAINER (GLOBAL) */}
      <ToastContainer
        className={"mb-0"}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
