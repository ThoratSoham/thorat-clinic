import React, { useState } from 'react';
import { CLINIC_CONFIG } from '../../config/clinic';
import BookingForm from './BookingForm';
import BookingSuccess from './BookingSuccess';
import { Calendar, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function BookingSection({ preselectedService }) {
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleBookingSuccess = (data) => {
    setConfirmedBooking(data);
    // Smooth scroll up to booking section top if needed
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookAnother = () => {
    setConfirmedBooking(null);
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-white via-teal-50/30 to-white border-b border-slate-100 scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest bg-teal-100/60 px-3 py-1 rounded-full border border-teal-200">
            Real-Time Online Scheduling
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Book Your Dental Appointment
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Select your required dental service, pick an available slot between 8:00 AM and 8:00 PM, and your consultation will be reserved instantly.
          </p>
        </div>

        {/* Dynamic Card Container */}
        {confirmedBooking ? (
          <BookingSuccess
            bookingData={confirmedBooking}
            onBookAnother={handleBookAnother}
          />
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10">
            <BookingForm
              preselectedService={preselectedService}
              onSuccess={handleBookingSuccess}
            />
          </div>
        )}

      </div>
    </section>
  );
}
