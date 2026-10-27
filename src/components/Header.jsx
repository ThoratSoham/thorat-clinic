import React, { useState, useEffect } from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { Calendar, Phone, Menu, X, Clock, MapPin } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Dentists', href: '#team' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top emergency & timing bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              Open Today: 8:00 AM – 8:00 PM
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {CLINIC_CONFIG.contact.city}, Maharashtra
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${CLINIC_CONFIG.contact.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label="Call clinic reception"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold text-slate-200">{CLINIC_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <nav
        className={`transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              {/* Dental Tooth Logo SVG */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.5 2 7 4.5 7 7c0 3 1.5 5 2 9 .3 2.5 1.5 6 3 6s2.7-3.5 3-6c.5-4 2-6 2-9 0-2.5-1.5-5-5-5z" />
                <path d="M9 11c1.5 1 4.5 1 6 0" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors block leading-tight">
                {CLINIC_CONFIG.name}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-600 block">
                Dental Care • Pune
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-teal-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-sm hover:shadow-soft transition-all duration-200 active:scale-95 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-slate-700 hover:text-teal-700 hover:bg-teal-50/60 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href={`tel:${CLINIC_CONFIG.contact.phoneRaw}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 font-semibold text-sm"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  Call: {CLINIC_CONFIG.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
