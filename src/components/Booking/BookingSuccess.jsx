import React from 'react';
import { CLINIC_CONFIG } from '../../config/clinic';
import { formatDateIndian, formatTime12Hour } from '../../lib/dateUtils';
import { CheckCircle2, Calendar, Clock, User, Phone, Mail, Stethoscope, RefreshCw, Printer, AlertTriangle } from 'lucide-react';

export default function BookingSuccess({ bookingData, onBookAnother }) {
  const {
    id,
    full_name,
    phone,
    email,
    service,
    appointment_date,
    start_time,
  } = bookingData;

  const shortRef = id ? id.slice(0, 8).toUpperCase() : Math.random().toString(36).substring(2, 9).toUpperCase();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl border border-teal-200/90 shadow-card p-6 sm:p-10 max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
      
      {/* Success Icon & Header */}
      <div className="text-center space-y-3 pb-6 border-b border-slate-100">
        <div className="w-16 h-16 rounded-full bg-teal-50 border-4 border-teal-100 text-teal-600 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {CLINIC_CONFIG.bookingSuccess.title}
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          {CLINIC_CONFIG.bookingSuccess.subtitle}
        </p>

        {/* Reference ID Pill */}
        <div className="inline-flex items-center gap-2 bg-slate-100 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-slate-800 border border-slate-200">
          <span>Booking Ref:</span>
          <span className="text-teal-700">TC-{shortRef}</span>
        </div>
      </div>

      {/* Appointment Summary Box */}
      <div className="my-6 bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Appointment Summary
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2.5 text-slate-700">
            <User className="w-4 h-4 text-teal-600 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Patient Name</span>
              <span className="font-semibold text-slate-900">{full_name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700">
            <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Dental Service</span>
              <span className="font-semibold text-slate-900">{service}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700">
            <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Scheduled Date</span>
              <span className="font-semibold text-slate-900">{formatDateIndian(appointment_date)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700">
            <Clock className="w-4 h-4 text-teal-600 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Time Slot</span>
              <span className="font-semibold text-slate-900">{formatTime12Hour(start_time)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Follow-up Note [CONFIRM wording] */}
      <div className="p-4 rounded-xl bg-teal-50 border border-teal-200/80 text-xs text-teal-900 leading-relaxed flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
          i
        </div>
        <div>
          <strong className="font-semibold block mb-0.5">Next Steps:</strong>
          <p>{CLINIC_CONFIG.bookingSuccess.followUpNotice}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Save / Print Summary</span>
        </button>

        <button
          onClick={onBookAnother}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-soft transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Book Another Visit</span>
        </button>
      </div>

    </div>
  );
}
