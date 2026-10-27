import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import BookingSection from './components/Booking/BookingSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');

  const handleSelectService = (serviceTitle) => {
    setSelectedServiceForBooking(serviceTitle);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">
      {/* Sticky Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero / Home */}
        <Hero />

        {/* 2. About Clinic */}
        <About />

        {/* 3. Dental Services */}
        <Services onSelectService={handleSelectService} />

        {/* 4. Dentist Profiles */}
        <Team />

        {/* 5. Patient Testimonials */}
        <Testimonials />

        {/* 6. FAQ Accordion */}
        <FAQ />

        {/* 7. Appointment Booking System */}
        <BookingSection preselectedService={selectedServiceForBooking} />

        {/* 8. Contact & Map */}
        <Contact />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
