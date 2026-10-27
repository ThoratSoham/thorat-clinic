# Thorat Clinic - Dental Clinic & Online Booking Website

A modern, fast, clinical dental website with a real-time online appointment booking system built for **Thorat Clinic (Pune, Maharashtra, India)**.

Built with **React + Vite**, styled with **Tailwind CSS**, and backed by **Supabase (Free Tier)** with database-level double-booking protection and Row Level Security (RLS).

---

## 🚀 How to Run Locally

1. Open your terminal in the `clinic` directory:
   ```bash
   cd clinic
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local URL (usually `http://localhost:5173`) in your browser.

---

## ⚙️ How to Change Clinic Details, Hours & Services

All clinic configuration and placeholders are centralized in a single file:
👉 **`clinic/src/config/clinic.js`**

Look for `// [CONFIRM]` comments in that file to easily update:
- **Clinic Address & Coordinates**: Change `contact.addressLine1`, `addressLine2`, and the Google Maps embed URL.
- **Phone & WhatsApp**: Change `contact.phoneDisplay` and `contact.whatsapp`.
- **Operating Hours**: In `schedule`, adjust `openingTime` (default: `"08:00"`) or `closingTime` (default: `"20:00"`).
- **Slot Length**: Change `schedule.slotDurationMinutes` (default: `30` mins).
- **Open Days**: Change `schedule.openDays` (default `[1,2,3,4,5,6]` = Monday through Saturday).
- **Blocked Dates / Holidays**: Add holiday dates to `schedule.blockedDates` (e.g. `['2026-11-01']`).
- **Services List**: Add, edit, or reorder services in `services` (prices are omitted).
- **Dentist Profiles**: Edit doctor names, degrees, photos, and experience in `team`.
- **Sample Reviews**: Update or add real testimonials in `testimonials`.
- **Wording & Notices**: Edit the follow-up note in `bookingSuccess.followUpNotice` and `privacyNotice`.

---

## 🔒 Supabase Database Setup & Security

The database SQL script is located at:
👉 **`clinic/supabase_schema.sql`**

### What It Does:
1. **`appointments` Table**: Stores bookings with full name, 10-digit Indian mobile number, email, service, date, start time, notes, and status.
2. **Double-Booking Prevention**: A database-level `UNIQUE (appointment_date, start_time)` constraint guarantees two people can never book the same slot, even if they submit simultaneously.
3. **Row Level Security (RLS)**: Anonymous public visitors can **ONLY INSERT** valid appointments. They **cannot SELECT, UPDATE, or DELETE** rows. Patient data is completely private.
4. **`get_booked_slots(p_date)`**: A secure database function (RPC) that returns only the booked start times for a date with **zero** patient names, phone numbers, or notes.

---

## 📋 How to View & Manage Bookings in Supabase (Free Table Editor)

You do **not** need a separate custom admin website. You can view, search, export, and manage all patient bookings directly in Supabase for free:

1. Log in to [Supabase](https://supabase.com/dashboard).
2. Click on your **Thorat Clinic** project.
3. In the left navigation menu, click **Table Editor** (the icon looks like a small spreadsheet grid).
4. Click on the **`appointments`** table.
5. Here you can:
   - See all patient names, phone numbers, emails, selected services, and time slots in chronological order.
   - Filter by `appointment_date` to see today's or tomorrow's patient list.
   - Change a status from `booked` to `completed` or `cancelled`.
   - Export bookings to CSV at any time by clicking the **Export** button.
