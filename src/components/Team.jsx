import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { Award, GraduationCap, Clock, Info } from 'lucide-react';

export default function Team() {
  return (
    <section id="team" className="py-20 bg-slate-50 border-b border-slate-100 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest bg-teal-100/60 px-3 py-1 rounded-full border border-teal-200">
            Meet Our Doctors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Experienced Hands, Compassionate Care
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Our qualified dental surgeons combine years of clinical expertise, specialized master’s training, and a gentle touch for adults and children.
          </p>
        </div>

        {/* Dentists Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {CLINIC_CONFIG.team.map((doctor, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-card transition-all duration-300 group"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={`${doctor.name} - ${doctor.role} at Thorat Clinic`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-teal-800 shadow-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>{doctor.experience}</span>
                </div>
              </div>

              <div className="p-7 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mt-0.5">
                    {doctor.role}
                  </p>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <GraduationCap className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{doctor.qualifications}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {doctor.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Notice on Dentist Assignment */}
        <div className="mt-12 max-w-2xl mx-auto bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-semibold">Dentist Assignment:</strong> Patients select an appointment time and treatment, rather than an individual doctor. Our clinic directs your visit to the specialist with the highest expertise in your selected procedure.
          </p>
        </div>

      </div>
    </section>
  );
}
