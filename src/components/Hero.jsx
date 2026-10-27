import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { Calendar, ShieldCheck, Clock, Award, Star, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
      {/* Decorative subtle medical grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#0D9488 1px, transparent 1px)`, backgroundSize: '24px 24px' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-200/80 text-teal-800 text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-teal-600"></span>
              Modern & Pain-Free Dental Clinic in Pune
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Healthy, Confident Smiles Begin With{' '}
              <span className="text-teal-600 underline decoration-teal-300 underline-offset-4 decoration-wavy">
                Gentle Care
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              {CLINIC_CONFIG.shortDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-soft hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment Online</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 hover:border-slate-300 shadow-sm transition-all"
              >
                <span>View All Services</span>
              </a>
            </div>

            {/* Quick Micro-Trust Factors */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>No Advance Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Zero Clinic Waiting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Open Mon–Sat till 8 PM</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card with Experience Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/4.2]">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
                  alt="Modern sterilised dental treatment room at Thorat Clinic Pune"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                {/* Bottom caption card */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs uppercase font-bold tracking-wider text-teal-300">Sterilisation Standard</p>
                  <p className="text-base font-semibold leading-snug">Class-B Autoclave & Digital Low-Radiation Diagnostics</p>
                </div>
              </div>

              {/* Floating Badge 1: Rating */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white rounded-2xl p-4 shadow-card border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1 font-bold text-slate-900 text-sm">
                    <span>4.9 / 5.0</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Patient Satisfaction</span>
                </div>
              </div>

              {/* Floating Badge 2: Real-time Slot Indicator */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white rounded-2xl p-4 shadow-card border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">30-Min Appointments</span>
                  <span className="text-xs text-slate-600 font-medium">Slots Open for Booking</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Pillars Trust Row */}
        <div className="mt-16 pt-12 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_CONFIG.trustPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-teal-200 hover:shadow-soft transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 mb-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">{point.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
