import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { Phone, Mail, MapPin, Calendar, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const { contact, schedule, footer } = CLINIC_CONFIG;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-soft">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.5 2 7 4.5 7 7c0 3 1.5 5 2 9 .3 2.5 1.5 6 3 6s2.7-3.5 3-6c.5-4 2-6 2-9 0-2.5-1.5-5-5-5z" />
                  <path d="M9 11c1.5 1 4.5 1 6 0" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  {CLINIC_CONFIG.name}
                </span>
                <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
                  Dental Care • Pune
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Dedicated to compassionate, high-standard dental healthcare in Pune. Equipped with modern sterilization, digital diagnostics, and pain-free technologies.
            </p>

            <div className="pt-2">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve An Appointment</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Our Dental Treatments</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About Practice & Hygiene</a></li>
              <li><a href="#team" className="hover:text-teal-400 transition-colors">Our Dentists</a></li>
              <li><a href="#reviews" className="hover:text-teal-400 transition-colors">Patient Experiences</a></li>
              <li><a href="#faq" className="hover:text-teal-400 transition-colors">Common Dental Questions</a></li>
              <li><a href="#booking" className="hover:text-teal-400 transition-colors">Online Booking Calendar</a></li>
            </ul>
          </div>

          {/* Col 3: Hours & Reach Out */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Clinic Working Hours
            </h4>
            <div className="text-sm text-slate-400 space-y-1">
              <p className="font-semibold text-slate-200">{schedule.openDaysText}</p>
              <p className="text-xs text-teal-400 font-medium">Appointments every 30 mins</p>
              <p className="text-xs text-slate-500">Last consultation ends at 8:00 PM</p>
            </div>

            <div className="pt-3 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{contact.addressLine1}, {contact.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a href={`tel:${contact.phoneRaw}`} className="hover:text-white transition-colors">{contact.phoneDisplay}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{footer.copyright}</p>

          <div className="flex items-center gap-4">
            {/* Link back to Soham Thorat's Portfolio */}
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-teal-400 font-medium transition-colors"
            >
              <span>{footer.creditText}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
