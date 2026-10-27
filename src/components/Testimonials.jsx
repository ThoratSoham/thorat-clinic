import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { Star, Quote, MapPin } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-20 bg-white border-b border-slate-100 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 border border-slate-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            Sample Content [CONFIRM]
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Patients Say
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Real feedback from individuals and families who trust Thorat Clinic for their smiles.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLINIC_CONFIG.testimonials.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50/70 rounded-3xl p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:bg-white hover:border-teal-200 hover:shadow-card transition-all"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                {/* Treatment badge */}
                <span className="inline-block text-[11px] font-bold text-teal-800 bg-teal-100/60 px-2.5 py-0.5 rounded-md mb-3 border border-teal-200/60">
                  {review.treatment}
                </span>

                {/* Comment */}
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Patient signature */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{review.location}</span>
                  </div>
                </div>
                {review.isSample && (
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-200/70 px-2 py-0.5 rounded">
                    Sample
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
