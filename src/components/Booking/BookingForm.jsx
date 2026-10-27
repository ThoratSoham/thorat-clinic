import React, { useState, useEffect } from 'react';
import { CLINIC_CONFIG } from '../../config/clinic';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { 
  getTodayDateString, 
  getMaxBookingDateString, 
  isClinicOpenOnDate, 
  validateIndianMobile 
} from '../../lib/dateUtils';
import SlotPicker from './SlotPicker';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  Lock 
} from 'lucide-react';

export default function BookingForm({ preselectedService, onSuccess }) {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: preselectedService || CLINIC_CONFIG.services[0]?.title || '',
    appointmentDate: getTodayDateString(),
    startTime: '',
    notes: '',
    honeypot: '', // Bot trap
  });

  // UI State
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isDateClosed, setIsDateClosed] = useState(false);

  // Update selected service if parent prop changes
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  // Fetch booked slots whenever appointmentDate changes
  useEffect(() => {
    async function fetchBookedSlotsForDate() {
      if (!formData.appointmentDate) {
        setBookedSlots([]);
        return;
      }

      // Check if clinic is open on that date
      const open = isClinicOpenOnDate(formData.appointmentDate);
      setIsDateClosed(!open);
      if (!open) {
        setBookedSlots([]);
        setFormData((prev) => ({ ...prev, startTime: '' }));
        return;
      }

      setIsLoadingSlots(true);
      setGeneralError('');

      try {
        if (!isSupabaseConfigured) {
          // Development fallback before user adds Supabase keys
          setBookedSlots([]);
          setIsLoadingSlots(false);
          return;
        }

        // Call secure RPC function get_booked_slots(p_date)
        const { data, error } = await supabase.rpc('get_booked_slots', {
          p_date: formData.appointmentDate,
        });

        if (error) {
          // If RPC is not created yet, try direct select or log error
          console.warn('RPC get_booked_slots notice:', error.message);
          setBookedSlots([]);
        } else if (Array.isArray(data)) {
          // Data is array of { booked_time: "08:30:00" } or strings
          const times = data.map((item) => (typeof item === 'string' ? item : item.booked_time));
          setBookedSlots(times);
        }
      } catch (err) {
        console.error('Error fetching booked slots:', err);
      } finally {
        setIsLoadingSlots(false);
      }
    }

    fetchBookedSlotsForDate();
  }, [formData.appointmentDate]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  // Validation
  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 letters).';
    }

    const cleanedPhone = validateIndianMobile(formData.phone);
    if (!cleanedPhone) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address for your appointment details.';
    }

    if (!formData.service) {
      errors.service = 'Please choose a dental service.';
    }

    if (!formData.appointmentDate) {
      errors.appointmentDate = 'Please select an appointment date.';
    } else if (isDateClosed) {
      errors.appointmentDate = 'Thorat Clinic is closed on this day. Please choose another date.';
    }

    if (!formData.startTime) {
      errors.startTime = 'Please click an available time slot button.';
    }

    if (formData.notes && formData.notes.length > 500) {
      errors.notes = 'Notes cannot exceed 500 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot bot protection
    if (formData.honeypot) {
      console.warn('Bot detected via honeypot');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setGeneralError('');

    const cleanedPhone = validateIndianMobile(formData.phone);

    const payload = {
      full_name: formData.fullName.trim(),
      phone: cleanedPhone,
      email: formData.email.trim().toLowerCase(),
      service: formData.service,
      appointment_date: formData.appointmentDate,
      start_time: formData.startTime.length === 5 ? `${formData.startTime}:00` : formData.startTime,
      notes: formData.notes.trim() || null,
      status: 'booked',
    };

    try {
      if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.');
        setGeneralError('Supabase is not connected yet! Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are added to your environment variables (or Vercel project settings) and redeploy.');
        setIsSubmitting(false);
        return;
      }

      // Insert directly into Supabase appointments table (protected by RLS and unique constraint)
      // Note: We do NOT chain .select() because 'anon' role only has INSERT permissions for patient privacy
      const { error } = await supabase
        .from('appointments')
        .insert([payload]);

      if (error) {
        console.error('Supabase booking error:', error);
        // Check for double booking (Postgres unique constraint violation error code 23505)
        if (error.code === '23505' || error.message?.includes('duplicate key') || error.message?.includes('unique')) {
          setGeneralError('That slot was just booked by another patient. Please choose another time slot.');
          // Refresh booked slots list immediately
          setBookedSlots((prev) => [...prev, payload.start_time]);
          setFormData((prev) => ({ ...prev, startTime: '' }));
        } else {
          setGeneralError(error.message || 'Unable to submit your appointment. Please call our clinic directly.');
        }
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      onSuccess(payload);
    } catch (err) {
      console.error('Submission exception:', err);
      setGeneralError('An unexpected network error occurred. Please try again or call the clinic.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      
      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url">Do not fill this</label>
        <input
          type="text"
          id="website_url"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      {/* General Error Banner */}
      {generalError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">Booking Alert:</strong>
            <span>{generalError}</span>
          </div>
        </div>
      )}

      {/* Row 1: Full Name & Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                fieldErrors.fullName
                  ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                  : 'border-slate-200 bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600'
              }`}
            />
          </div>
          {fieldErrors.fullName && (
            <p className="text-[11px] text-red-600 font-medium mt-1">{fieldErrors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Mobile Number (India) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile (e.g. 9876543210)"
              className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                fieldErrors.phone
                  ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                  : 'border-slate-200 bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600'
              }`}
            />
          </div>
          {fieldErrors.phone && (
            <p className="text-[11px] text-red-600 font-medium mt-1">{fieldErrors.phone}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email & Dental Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="yourname@example.com"
              className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                fieldErrors.email
                  ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                  : 'border-slate-200 bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600'
              }`}
            />
          </div>
          {fieldErrors.email && (
            <p className="text-[11px] text-red-600 font-medium mt-1">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Service Required <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Stethoscope className="w-4 h-4" />
            </div>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-slate-800 bg-white focus:outline-none transition-colors ${
                fieldErrors.service
                  ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                  : 'border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600'
              }`}
            >
              {CLINIC_CONFIG.services.map((svc) => (
                <option key={svc.id} value={svc.title}>
                  {svc.title}
                </option>
              ))}
            </select>
          </div>
          {fieldErrors.service && (
            <p className="text-[11px] text-red-600 font-medium mt-1">{fieldErrors.service}</p>
          )}
        </div>
      </div>

      {/* Row 3: Preferred Date */}
      <div>
        <label htmlFor="appointmentDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Preferred Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Calendar className="w-4 h-4" />
          </div>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            required
            min={getTodayDateString()}
            max={getMaxBookingDateString()}
            value={formData.appointmentDate}
            onChange={handleChange}
            className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm text-slate-800 bg-white focus:outline-none transition-colors ${
              fieldErrors.appointmentDate
                ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                : 'border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600'
            }`}
          />
        </div>
        <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
          <span>Operating Days: Monday – Saturday (8 AM – 8 PM)</span>
          <span>Up to 60 days ahead</span>
        </div>
        {fieldErrors.appointmentDate && (
          <p className="text-[11px] text-red-600 font-medium mt-1">{fieldErrors.appointmentDate}</p>
        )}
      </div>

      {/* Row 4: Slot Picker */}
      <div>
        <SlotPicker
          selectedDate={formData.appointmentDate}
          selectedSlot={formData.startTime}
          onSelectSlot={(slotTime) => {
            setFormData((prev) => ({ ...prev, startTime: slotTime }));
            if (fieldErrors.startTime) {
              setFieldErrors((prev) => ({ ...prev, startTime: '' }));
            }
          }}
          bookedSlots={bookedSlots}
          isLoadingSlots={isLoadingSlots}
          isDateClosed={isDateClosed}
        />
        {fieldErrors.startTime && (
          <p className="text-[11px] text-red-600 font-medium mt-1.5">{fieldErrors.startTime}</p>
        )}
      </div>

      {/* Row 5: Notes / Reason for Visit */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Symptoms or Notes <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <span className="text-[11px] text-slate-400">
            {formData.notes.length} / 500
          </span>
        </div>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          maxLength={500}
          value={formData.notes}
          onChange={handleChange}
          placeholder="Describe any tooth pain, sensitivity, or medical history you want our dentists to be aware of..."
          className="w-full p-3.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-colors resize-none"
        ></textarea>
        {fieldErrors.notes && (
          <p className="text-[11px] text-red-600 font-medium mt-1">{fieldErrors.notes}</p>
        )}
      </div>

      {/* Privacy Notice Box [CONFIRM] */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
        <Lock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-700 font-medium">Privacy Commitment: </strong>
          {CLINIC_CONFIG.privacyNotice}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isDateClosed}
        className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-base shadow-soft hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Reserving Your Slot...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-5 h-5" />
            <span>Confirm & Reserve Appointment</span>
          </>
        )}
      </button>

    </form>
  );
}
