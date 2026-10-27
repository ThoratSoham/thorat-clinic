import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { MapPin, Phone, Mail, Clock, MessageSquare, Navigation } from 'lucide-react';

export default function Contact() {
  const { contact, schedule } = CLINIC_CONFIG;

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-100 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest bg-teal-100/60 px-3 py-1 rounded-full border border-teal-200">
            Find & Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Conveniently Located in Pune
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Have questions or need emergency assistance? Reach out to our front desk directly.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-400 mb-1">
                  Clinic Location [CONFIRM]
                </h3>
                <p className="font-semibold text-slate-800 text-sm leading-snug">
                  {contact.addressLine1}
                </p>
                <p className="text-slate-600 text-xs mt-0.5">
                  {contact.addressLine2}
                </p>
                <a
                  href={contact.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 mt-2.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-400 mb-1">
                  Phone & WhatsApp [CONFIRM]
                </h3>
                <a
                  href={`tel:${contact.phoneRaw}`}
                  className="font-bold text-slate-900 text-base hover:text-teal-700 block transition-colors"
                >
                  {contact.phoneDisplay}
                </a>
                <p className="text-xs text-slate-500 mt-0.5">
                  For immediate assistance & emergency queries
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-400 mb-1">
                  Email Inquiries [CONFIRM]
                </h3>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-semibold text-slate-800 text-sm hover:text-teal-700 transition-colors"
                >
                  {contact.email}
                </a>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reports, records & insurance paperwork
                </p>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-400 mb-1">
                  Clinic Timings [CONFIRM]
                </h3>
                <p className="font-bold text-slate-800 text-sm">
                  {schedule.openDaysText}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Last appointment starts at 7:30 PM and ends at 8:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Google Map */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card p-2 flex flex-col min-h-[400px]">
            <iframe
              title="Thorat Clinic Location Map Pune"
              src={contact.googleMapsEmbedUrl}
              className="w-full h-full rounded-2xl border-0 min-h-[380px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
