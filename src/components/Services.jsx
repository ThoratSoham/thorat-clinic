import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { 
  Stethoscope, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  AlertCircle, 
  Layers, 
  Sun, 
  Smile, 
  Award, 
  HeartHandshake, 
  ArrowRight 
} from 'lucide-react';

const iconMap = {
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Activity,
  AlertCircle,
  Layers,
  Sun,
  Smile,
  Award,
  HeartHandshake,
};

export default function Services({ onSelectService }) {
  const handleBookService = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-100 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest bg-teal-100/60 px-3 py-1 rounded-full border border-teal-200">
            Comprehensive Dental Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Specialized Treatments Under One Roof
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            From routine checkups and gentle cleanings to advanced dental restorations and aesthetic smiles, we provide tailored treatments tailored to each patient.
          </p>
        </div>

        {/* Services Grid (10 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_CONFIG.services.map((service) => {
            const IconComponent = iconMap[service.icon] || Stethoscope;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-teal-300 hover:shadow-card transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Category and Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100/80">
                      {service.category}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Direct Booking CTA */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Personalized Care</span>
                  <button
                    onClick={() => handleBookService(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 group-hover:translate-x-1 transition-all"
                  >
                    <span>Book this service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice on transparent pricing & consultation */}
        <div className="mt-12 p-6 rounded-2xl bg-teal-50/60 border border-teal-100 text-center max-w-2xl mx-auto">
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Note:</strong> Treatment costs vary depending on patient clinical conditions, tooth positioning, and selected materials. An exact, transparent quote is provided after an initial intraoral consultation.
          </p>
        </div>

      </div>
    </section>
  );
}
