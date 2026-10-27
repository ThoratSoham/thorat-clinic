-- ==============================================================================
-- THORAT CLINIC - SUPABASE DATABASE SETUP & ROW LEVEL SECURITY (RLS)
-- Free Tier Supabase SQL Script
-- ==============================================================================

-- 1. Create the appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2 AND char_length(full_name) <= 100),
    phone TEXT NOT NULL CHECK (char_length(trim(phone)) >= 10 AND char_length(phone) <= 15),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    service TEXT NOT NULL CHECK (char_length(trim(service)) >= 2),
    appointment_date DATE NOT NULL CHECK (appointment_date >= CURRENT_DATE),
    start_time TIME NOT NULL CHECK (start_time >= '08:00:00' AND start_time <= '19:30:00'),
    notes VARCHAR(500),
    status TEXT DEFAULT 'booked' NOT NULL CHECK (status IN ('booked', 'completed', 'cancelled', 'no_show'))
);

-- 2. Prevent double booking at the Database Level
-- Guarantees that no two patients can ever book the same date and start_time (excluding cancelled bookings)
ALTER TABLE public.appointments
DROP CONSTRAINT IF EXISTS unique_appointment_slot;

ALTER TABLE public.appointments
ADD CONSTRAINT unique_appointment_slot 
UNIQUE (appointment_date, start_time);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Drop previous policies if re-running
DROP POLICY IF EXISTS "Public can insert bookings" ON public.appointments;
DROP POLICY IF EXISTS "No public read access" ON public.appointments;

-- 4. RLS Policy: Anonymous public visitors can ONLY insert valid appointments
CREATE POLICY "Public can insert bookings"
ON public.appointments
FOR INSERT
TO anon
WITH CHECK (
    char_length(trim(full_name)) >= 2
    AND char_length(trim(phone)) >= 10
    AND appointment_date >= CURRENT_DATE
    AND start_time >= '08:00:00'
    AND start_time <= '19:30:00'
);

-- Note: No SELECT, UPDATE, or DELETE policies are granted to 'anon'.
-- This guarantees patient privacy: visitors cannot read or view anyone else's appointments!

-- 5. Safe RPC Function: get_booked_slots
-- Returns ONLY the start times for a given date so the front-end slot picker knows which slots are taken.
-- Zero patient personal info (names, phones, emails) is exposed.
CREATE OR REPLACE FUNCTION public.get_booked_slots(p_date DATE)
RETURNS TABLE (booked_time TIME)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT start_time AS booked_time
    FROM public.appointments
    WHERE appointment_date = p_date
      AND status != 'cancelled';
$$;

-- Grant execution permission to the anonymous public role
GRANT EXECUTE ON FUNCTION public.get_booked_slots(DATE) TO anon;
