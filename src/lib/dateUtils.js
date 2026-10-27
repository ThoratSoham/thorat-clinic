import { CLINIC_CONFIG } from '../config/clinic';

/**
 * Returns today's date in YYYY-MM-DD format according to Asia/Kolkata timezone
 */
export function getTodayDateString() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: CLINIC_CONFIG.region.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(new Date());
}

/**
 * Returns maximum booking date (today + maxAdvanceBookingDays) in YYYY-MM-DD
 */
export function getMaxBookingDateString() {
  const now = new Date();
  const maxDate = new Date(now.getTime() + CLINIC_CONFIG.schedule.maxAdvanceBookingDays * 24 * 60 * 60 * 1000);
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: CLINIC_CONFIG.region.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(maxDate);
}

/**
 * Formats YYYY-MM-DD into DD/MM/YYYY
 */
export function formatDateIndian(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * Converts "14:30" or "14:30:00" to "2:30 PM"
 */
export function formatTime12Hour(timeStr) {
  if (!timeStr) return '';
  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr.padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

/**
 * Checks if a given YYYY-MM-DD falls on an open clinic day
 */
export function isClinicOpenOnDate(dateStr) {
  if (!dateStr) return false;
  // Parse date safely in UTC to avoid local timezone offset shifting the day
  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const dayOfWeek = dateObj.getUTCDay(); // 0 = Sun, 1 = Mon...
  
  // Check blocked dates
  if (CLINIC_CONFIG.schedule.blockedDates.includes(dateStr)) {
    return false;
  }

  return CLINIC_CONFIG.schedule.openDays.includes(dayOfWeek);
}

/**
 * Generates all candidate time slots for the clinic day
 * from openingTime (08:00) to closingTime (20:00).
 * Last appointment must end by 20:00, so last start time is (closingTime - slotDuration).
 */
export function generateAllDaySlots() {
  const { openingTime, closingTime, slotDurationMinutes, blockedTimeRanges } = CLINIC_CONFIG.schedule;

  const [openH, openM] = openingTime.split(':').map(Number);
  const [closeH, closeM] = closingTime.split(':').map(Number);

  const startTotalMinutes = openH * 60 + openM;
  const endTotalMinutes = closeH * 60 + closeM;

  const slots = [];
  let currentMinutes = startTotalMinutes;

  while (currentMinutes + slotDurationMinutes <= endTotalMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const mins = currentMinutes % 60;
    const timeString = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

    // Check if slot falls in any blocked time ranges (e.g. lunch)
    const isBlocked = blockedTimeRanges.some(range => {
      const [bStartH, bStartM] = range.start.split(':').map(Number);
      const [bEndH, bEndM] = range.end.split(':').map(Number);
      const bStartTotal = bStartH * 60 + bStartM;
      const bEndTotal = bEndH * 60 + bEndM;
      return currentMinutes >= bStartTotal && currentMinutes < bEndTotal;
    });

    if (!isBlocked) {
      slots.push({
        time24: timeString, // "08:00"
        time12: formatTime12Hour(timeString), // "8:00 AM"
      });
    }

    currentMinutes += slotDurationMinutes;
  }

  return slots;
}

/**
 * Checks if a specific time has already passed for TODAY in Asia/Kolkata
 */
export function hasTimePassedToday(dateStr, time24) {
  const todayStr = getTodayDateString();
  if (dateStr !== todayStr) return false;

  // Get current time in Asia/Kolkata
  const now = new Date();
  const kolkataTimeStr = now.toLocaleTimeString('en-GB', {
    timeZone: CLINIC_CONFIG.region.timezone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  const [nowH, nowM] = kolkataTimeStr.split(':').map(Number);
  const [slotH, slotM] = time24.split(':').map(Number);

  const nowMinutes = nowH * 60 + nowM;
  const slotMinutes = slotH * 60 + slotM;

  // Disallow slots starting in less than 15 minutes
  return slotMinutes <= nowMinutes + 15;
}

/**
 * Indian 10-digit mobile phone validator
 * Accepts "9876543210", "+919876543210", "+91 9876543210", "09876543210"
 * Returns cleaned 10-digit string or null if invalid
 */
export function validateIndianMobile(phoneStr) {
  if (!phoneStr) return null;
  // Strip whitespace, hyphens, parentheses
  let cleaned = phoneStr.replace(/[\s\-\(\)]/g, '');
  
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }

  // Indian mobile numbers start with 6, 7, 8, or 9 and are exactly 10 digits
  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (indianMobileRegex.test(cleaned)) {
    return cleaned;
  }
  return null;
}
