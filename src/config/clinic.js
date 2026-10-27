/**
 * THORAT CLINIC - CENTRAL CONFIGURATION FILE
 * 
 * All customizable clinic details, operating hours, services, dentist profiles,
 * and wording are maintained here.
 * Look for [CONFIRM] markers to update placeholders with actual clinic data.
 */

export const CLINIC_CONFIG = {
  // [CONFIRM] Clinic Identity & Branding
  name: "Thorat Clinic",
  tagline: "Gentle, State-of-the-Art Dental Care in Pune",
  shortDescription: "Providing painless, compassionate, and modern dental solutions for patients of all ages with cutting-edge technology and experienced care.",
  
  // [CONFIRM] Contact Information (Placeholders)
  contact: {
    addressLine1: "Shop 14, Lotus Plaza, Near Shivaji Park", // [CONFIRM]
    addressLine2: "Kothrud, Pune, Maharashtra 411038", // [CONFIRM]
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    pincode: "411038", // [CONFIRM]
    phoneDisplay: "+91 98765 43210", // [CONFIRM]
    phoneRaw: "+919876543210", // [CONFIRM] For tel: links
    email: "appointments@thoratclinic.com", // [CONFIRM]
    whatsapp: "+919876543210", // [CONFIRM]
    // [CONFIRM] Google Maps embed URL (standard iframe source)
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04711155985!2d73.79292723703991!3d18.5245985995022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d083072!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    // [CONFIRM] Direct Google Maps link for directions button
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Pune,Maharashtra,India",
  },

  // Regional & Localization Rules
  region: {
    countryCode: "+91",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    currency: "INR",
  },

  // [CONFIRM] Operating Schedule
  schedule: {
    // 24-hour format "HH:MM". Open hours: 8:00 AM to 8:00 PM
    openingTime: "08:00",
    closingTime: "20:00", // Last appointment must end by 20:00
    // [CONFIRM] Slot length in minutes (default: 30 minutes)
    slotDurationMinutes: 30,
    // [CONFIRM] Open days: 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
    // Default: Monday (1) to Saturday (6). Sunday (0) closed.
    openDays: [1, 2, 3, 4, 5, 6],
    openDaysText: "Monday – Saturday: 8:00 AM – 8:00 PM (Closed Sundays)",
    // [CONFIRM] Maximum booking advance window in days
    maxAdvanceBookingDays: 60,

    // [CONFIRM] Optional recurring lunch/blocked breaks (e.g., [{ start: "13:00", end: "14:00", reason: "Lunch Break" }])
    blockedTimeRanges: [],

    // [CONFIRM] Specific blocked dates / holidays (format: "YYYY-MM-DD")
    blockedDates: [
      // Example: "2026-11-01"
    ],
  },

  // Trust Highlights for Hero Section
  trustPoints: [
    { title: "Pain-Free Procedures", desc: "Advanced dental anaesthesia & laser technology" },
    { title: "100% Sterilised Facility", desc: "Hospital-grade multi-tier autoclave disinfection" },
    { title: "Instant Online Booking", desc: "Real-time calendar with zero waiting list" },
    { title: "Transparent Care", desc: "Clear treatment plans with thorough consultation" },
  ],

  // [CONFIRM] Dental Services (Prices are deliberately NOT displayed as per medical guidelines)
  services: [
    {
      id: "consultation",
      title: "Dental Checkup & Consultation",
      category: "Preventive Care",
      icon: "Stethoscope",
      description: "Thorough digital oral examination, intraoral camera analysis, and custom treatment planning.",
    },
    {
      id: "scaling",
      title: "Scaling & Polishing (Teeth Cleaning)",
      category: "Hygiene",
      icon: "Sparkles",
      description: "Ultrasonic tartar removal and stain polishing to protect gums and restore natural breath freshness.",
    },
    {
      id: "fillings",
      title: "Fillings & Restorations",
      category: "Restorative",
      icon: "ShieldCheck",
      description: "Durable, tooth-coloured composite resin fillings that blend seamlessly with natural enamel.",
    },
    {
      id: "root-canal",
      title: "Root Canal Treatment (RCT)",
      category: "Endodontics",
      icon: "Activity",
      description: "Painless single-visit or multi-visit root canals using rotary technology to save natural teeth.",
    },
    {
      id: "extraction",
      title: "Tooth Extraction & Wisdom Teeth",
      category: "Oral Surgery",
      icon: "AlertCircle",
      description: "Gentle extractions and surgical removal of impacted wisdom teeth with quick post-op recovery.",
    },
    {
      id: "crowns-bridges",
      title: "Crowns & Fixed Bridges",
      category: "Prosthodontics",
      icon: "Layers",
      description: "Zirconia, ceramic, and PFM crowns to restore strength, chew function, and aesthetics to broken teeth.",
    },
    {
      id: "whitening",
      title: "Teeth Whitening",
      category: "Cosmetic",
      icon: "Sun",
      description: "In-office laser whitening safely lifting years of coffee, tea, and tobacco stains in under 60 minutes.",
    },
    {
      id: "braces-aligners",
      title: "Braces & Clear Aligners",
      category: "Orthodontics",
      icon: "Smile",
      description: "Modern invisible aligners and ceramic bracket systems to correct crowding and spacing at any age.",
    },
    {
      id: "implants",
      title: "Dental Implants",
      category: "Implantology",
      icon: "Award",
      description: "Permanent titanium and ceramic tooth replacements that look, feel, and function like natural teeth.",
    },
    {
      id: "paediatric",
      title: "Paediatric (Children's) Dentistry",
      category: "Pediatric",
      icon: "HeartHandshake",
      description: "Friendly, anxiety-free dental visits, fluoride sealants, and cavity defense for toddlers and teens.",
    },
  ],

  // [CONFIRM] Dental Team (Dentists list - patients do NOT pick dentist when booking)
  team: [
    {
      name: "Dr. Soham Thorat", // [CONFIRM]
      role: "Chief Dental Surgeon & Implantologist", // [CONFIRM]
      qualifications: "BDS, MDS (Prosthodontics & Implantology)", // [CONFIRM]
      experience: "12+ Years Experience", // [CONFIRM]
      bio: "Specializing in painless tooth replacement, aesthetic smile makeovers, and full-mouth rehabilitation.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600", // Placeholder
    },
    {
      name: "Dr. Ananya Thorat", // [CONFIRM]
      role: "Cosmetic Dentist & Endodontist", // [CONFIRM]
      qualifications: "BDS, MDS (Conservative Dentistry & Endodontics)", // [CONFIRM]
      experience: "9+ Years Experience", // [CONFIRM]
      bio: "Dedicated to single-sitting rotary root canals, micro-restorations, and anxiety-free paediatric care.",
      image: "https://images.unsplash.com/photo-1594824813583-a9133a8c54c0?auto=format&fit=crop&q=80&w=600", // Placeholder
    },
  ],

  // [CONFIRM] Patient Testimonials (Sample reviews clearly labeled as illustrative)
  testimonials: [
    {
      id: 1,
      name: "Rajesh Kulkarni", // [CONFIRM]
      location: "Kothrud, Pune",
      treatment: "Root Canal Treatment & Crown",
      comment: "I was extremely anxious about root canal pain, but Dr. Thorat made it virtually painless. The clinic is spotless and modern.",
      rating: 5,
      isSample: true,
    },
    {
      id: 2,
      name: "Pooja Deshmukh", // [CONFIRM]
      location: "Baner, Pune",
      treatment: "Teeth Whitening & Scaling",
      comment: "Online booking was completely effortless with instant slot selection. No waiting time at the clinic and the cleaning was very thorough.",
      rating: 5,
      isSample: true,
    },
    {
      id: 3,
      name: "Amitabh Sen", // [CONFIRM]
      location: "Shivajinagar, Pune",
      treatment: "Dental Implant",
      comment: "Honest advice, zero pressure, and excellent surgical hygiene. Highly recommended for family dental care in Pune.",
      rating: 5,
      isSample: true,
    },
  ],

  // [CONFIRM] Frequently Asked Questions (FAQ)
  faqs: [
    {
      question: "How does the online appointment booking work?",
      answer: "Choose your preferred dental service, select an open date on the calendar, and click any available 30-minute time slot. Once you submit your details, your slot is instantly reserved and our clinic coordinator will call or message to confirm if needed.",
    },
    {
      question: "Can I choose which dentist I see?",
      answer: "Our team assigns appointments according to the specific treatment required (for instance, an endodontist for root canals or an implantologist for tooth replacements) to ensure you receive the highest specialized care.",
    },
    {
      question: "Are dental treatments at Thorat Clinic painful?",
      answer: "We prioritize patient comfort using advanced topical numbing gels, computer-assisted local anaesthesia, and minimally invasive techniques so that treatments are comfortable and virtually pain-free.",
    },
    {
      question: "What safety and sterilisation protocols do you follow?",
      answer: "We adhere to strict hospital-grade sterilization standards with Class-B vacuum autoclaves, individually sealed surgical pouches, and disposable clinical barriers for every single patient.",
    },
    {
      question: "What should I bring to my first visit?",
      answer: "Please bring any previous dental X-rays or medical records you may have, a list of current medications, and a valid government ID for registration.",
    },
    {
      question: "What if I need to reschedule or cancel my booking?",
      answer: "If you need to change your appointment date or time, please call or WhatsApp our clinic reception directly at least 4 hours in advance so we can release your slot for emergency patients.",
    },
    {
      question: "Do you accept digital payments and health insurance?",
      answer: "Yes, we accept UPI (Google Pay, PhonePe, Paytm), credit/debit cards, and cash. We also provide itemized medical bills and documentation required for corporate and private dental insurance reimbursement.",
    },
  ],

  // [CONFIRM] Success Screen Wording
  bookingSuccess: {
    title: "Appointment Request Reserved!",
    subtitle: "Your slot has been successfully booked in our calendar.",
    followUpNotice: "Our clinic front-desk coordinator will reach out via call or WhatsApp on your registered mobile number if any preliminary preparation is recommended before your visit.", // [CONFIRM]
  },

  // [CONFIRM] Privacy & Data Protection Notice
  privacyNotice: "Your personal and health information is strictly confidential. Thorat Clinic uses your contact details solely for appointment scheduling, reminders, and clinical communications. We never share patient information with third parties.", // [CONFIRM]

  // Footer Metadata
  footer: {
    copyright: `© ${new Date().getFullYear()} Thorat Clinic. All rights reserved.`,
    creditText: "Designed & Developed by Soham Thorat",
  }
};
