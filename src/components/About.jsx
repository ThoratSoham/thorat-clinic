import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { Check, Heart, Sparkles, Shield, UserCheck } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      title: "Patient-First Philosophy",
      desc: "Every procedure is thoroughly explained before we begin. We never rush treatments or recommend unnecessary procedures.",
    },
    {
      title: "Strict 4-Step Sterilisation",
      desc: "Hospital-grade autoclaving, single-use patient kits, and continuous ultrasonic chemical disinfection.",
    },
    {
      title: "Digital Low-Radiation Imaging",
      desc: "Modern digital radiography providing high-resolution diagnostics with up to 90% less radiation exposure.",
    },
    {
      title: "Comfort & Anxiety Reduction",
      desc: "A calm clinical atmosphere with topical numbing solutions and compassionate bedside care for nervous patients.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-100 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest bg-teal-100/60 px-3 py-1 rounded-full border border-teal-200">
            About Our Practice
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Setting the Standard for Dental Excellence in Pune
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Thorat Clinic was established with a singular mission: to make high-quality, comprehensive oral healthcare comfortable, accessible, and transparent for families across Maharashtra.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual with Clinical Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-slate-200/80 bg-white">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
                alt="Dentist discussing treatment plan with patient"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-slate-900 text-lg">Compassionate, Experienced Team</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Our doctors bring specialized training in conservative dentistry, micro-endodontics, and modern restorative prosthetics to every appointment.
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                <span className="block text-2xl font-black text-teal-600">12+</span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Years Service</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                <span className="block text-2xl font-black text-teal-600">8,500+</span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Happy Patients</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                <span className="block text-2xl font-black text-teal-600">100%</span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Autoclaved</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Commitments */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Why Patients Choose Thorat Clinic for Their Families
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We understand that visiting a dentist can sometimes cause apprehension. That is why our entire clinic workflow—from our seamless online booking with zero waiting queues to our gentle treatment chairs—is designed around your comfort.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs hover:border-teal-300 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-bold text-sm group"
              >
                <span>Reserve your consultation slot online</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
