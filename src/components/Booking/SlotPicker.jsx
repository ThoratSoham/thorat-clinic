import React from 'react';
import { generateAllDaySlots, hasTimePassedToday, formatTime12Hour } from '../../lib/dateUtils';
import { Clock, AlertCircle, Loader2 } from 'lucide-react';

export default function SlotPicker({
  selectedDate,
  selectedSlot,
  onSelectSlot,
  bookedSlots = [],
  isLoadingSlots = false,
  isDateClosed = false,
}) {
  if (!selectedDate) {
    return (
      <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-slate-500 text-sm">
        <Clock className="w-6 h-6 mx-auto mb-2 text-slate-400" />
        <p>Please select a preferred date first to view available time slots.</p>
      </div>
    );
  }

  if (isDateClosed) {
    return (
      <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-center text-amber-800 text-sm">
        <AlertCircle className="w-6 h-6 mx-auto mb-2 text-amber-600" />
        <p className="font-semibold">The clinic is closed on this date.</p>
        <p className="text-xs text-amber-700 mt-1">Please select an open operating day (Monday to Saturday).</p>
      </div>
    );
  }

  const allSlots = generateAllDaySlots();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Available Time Slots <span className="text-red-500">*</span>
        </label>
        {isLoadingSlots && (
          <span className="flex items-center gap-1.5 text-xs text-teal-700 font-medium">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Checking slots...
          </span>
        )}
      </div>

      {/* Grid of Slots */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-60 overflow-y-auto p-1 pr-2">
        {allSlots.map((slot) => {
          // Normalize time string (e.g., "08:00" vs "08:00:00")
          const isBooked = bookedSlots.some((b) => b.startsWith(slot.time24));
          const isPassed = hasTimePassedToday(selectedDate, slot.time24);
          const isDisabled = isBooked || isPassed || isLoadingSlots;
          const isSelected = selectedSlot === slot.time24;

          let btnClass = 'bg-white text-slate-800 border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 hover:text-teal-900';

          if (isSelected) {
            btnClass = 'bg-teal-600 text-white border-teal-600 shadow-sm font-bold ring-2 ring-teal-500 ring-offset-1';
          } else if (isBooked) {
            btnClass = 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through opacity-60';
          } else if (isPassed) {
            btnClass = 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50';
          }

          return (
            <button
              key={slot.time24}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectSlot(slot.time24)}
              className={`py-2 px-1 text-center text-xs font-semibold rounded-xl border transition-all duration-150 focus:outline-none ${btnClass}`}
              title={isBooked ? 'Already booked' : isPassed ? 'Time has passed' : `Book for ${slot.time12}`}
            >
              <span>{slot.time12}</span>
              {isBooked && <span className="block text-[9px] uppercase tracking-tight">Booked</span>}
              {isPassed && !isBooked && <span className="block text-[9px] uppercase tracking-tight">Passed</span>}
            </button>
          );
        })}
      </div>

      {/* Slot Status Legend */}
      <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-white border border-slate-300"></span>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-teal-600"></span>
          <span className="font-medium text-slate-700">Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200"></span>
          <span>Booked / Passed</span>
        </div>
      </div>
    </div>
  );
}
