import React, { useState } from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-100 scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest bg-teal-100/60 px-3 py-1 rounded-full border border-teal-200">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Everything you need to know about booking, treatment safety, and your clinic visit.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {CLINIC_CONFIG.faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-teal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base leading-snug">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-teal-50 text-teal-700' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
