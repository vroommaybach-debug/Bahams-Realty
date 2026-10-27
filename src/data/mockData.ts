import {
  Property,
  Development,
  Testimonial,
  TeamMember,
  ServiceItem,
} from '../types/index.ts';

/**
 * ============================================================================
 * BAHAMS REALTY - CENTRAL DATA STORE
 * ============================================================================
 *
 * HOW TO CUSTOMIZE:
 * 1. Properties: Add, edit, or remove listings in the `PROPERTIES_DATA` array.
 * 2. Developments: Manage off-plan and estate projects in `DEVELOPMENTS_DATA`.
 * 3. Office & Contact: Update `OFFICE_DETAILS` with your real address, phone, and hours.
 * 4. Team: Modify `TEAM_MEMBERS` with actual staff bios and headshots.
 * 5. Testimonials: Replace `TESTIMONIALS` with real verified client reviews.
 * 6. Images: All image URLs below are high-res placeholders from Unsplash.
 *    To swap with your own photos, replace the URL string with your CDN or asset path.
 */

export const OFFICE_DETAILS = {
  agencyName: 'Bahams Realty',
  tagline: 'Premier Real Estate Advisory & Developments in Lagos',
  // PLACEHOLDER: Replace with your actual office address
  address: '14A Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
  displayPhone: '+234 916 714 9677',
  // WhatsApp digits only without '+' or spaces
  whatsappNumber: '2349167149677',
  email: 'enquiries@bahamsrealty.com.ng',
  domain: 'bahamsrealty.com.ng',
  workingHours: {
    weekdays: 'Monday – Friday: 8:30 AM – 6:00 PM (WAT)',
    saturdays: 'Saturday: 10:00 AM – 4:00 PM (WAT)',
    sundays: 'Sunday: Closed (By Appointment Only)',
  },
  socials: {
    instagram: 'https://instagram.com/bahamsrealty',
    linkedin: 'https://linkedin.com/company/bahamsrealty',
    twitter: 'https://x.com/bahamsrealty',
    facebook: 'https://facebook.com/bahamsrealty',
  },
  registrationNumber: 'RC-1849204',
};

export const TRUST_STATS = [
  {
    value: '12+',
    label: 'Years in Lagos Real Estate',
    subtext: 'Market leadership across Island & Mainland',
  },
  {
    value: '850+',
    label: 'Units Sold & Leased',
    subtext: 'Prime residential and commercial assets',
  },
  {
    value: '120+',
    label: 'Active Verified Listings',
    subtext: 'Direct mandates with clean titles',
  },
  {
    value: '100%',
    label: 'Verified Documentation',
    subtext: "Governor's Consent, C of O, Gazette vetted",
  },
];

export const WHY_BAHAMS_POINTS = [
  {
    number: '01',
    title: 'Verified Title & Due Diligence',
    description:
      "Every listing undergoes rigorous legal search at the Lagos State Lands Registry (Alausa) verifying Governor's Consent, Certificate of Occupancy, and planning approvals.",
  },
  {
    number: '02',
    title: 'Transparent Pricing & Zero Hidden Fees',
    description:
      'Direct pricing structured clearly with agency, legal, and documentation costs broken down upfront. No inflated figures or undisclosed surcharges.',
  },
  {
    number: '03',
    title: 'On-Ground Advisory for Local & Diaspora Buyers',
    description:
      'Headquartered on Admiralty Way, Lekki. We handle private physical viewings, video inspections for clients in the UK, UAE, and North America, and escrow coordination.',
  },
  {
    number: '04',
    title: 'End-to-End Closing & Handover Support',
    description:
      'From deed of assignment drafting and search reports to governor consent stamping and keys handover, our team walks you across the finish line.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '1',
    title: 'Define Your Brief',
    description:
      'Tell us your location preference, budget (₦), property type, and timeline via our form or a 5-minute WhatsApp chat.',
  },
  {
    step: '2',
    title: 'Curated Shortlist & Viewings',
    description:
      'We curate 3–5 matching verified properties and schedule accompanied physical inspections or live video walk-throughs.',
  },
  {
    step: '3',
    title: 'Documentation & Closing',
    description:
      'Our legal partners verify root of title, negotiate best terms, oversee contracts, and ensure seamless key handover.',
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'buy',
    title: 'Property Acquisition & Sales',
    tagline: 'Vetted luxury homes, duplexes, terraces, and commercial spaces across Lagos',
    description:
      'Whether you are acquiring a family home in Old Ikoyi, a buy-to-let apartment in Victoria Island, or prime land in Epe, we represent your interest with deep market intelligence.',
    deliverables: [
      'Comprehensive title search at Lagos State Lands Bureau',
      'Valuation benchmarking to ensure fair market price',
      'Accompanied viewings and live diaspora video walkthroughs',
      'Contract of Sale and Deed of Assignment execution',
      'Post-purchase registration and Governors Consent processing',
    ],
    whatsappMessage: 'Hello Bahams Realty, I would like to enquire about purchasing residential/commercial property in Lagos.',
  },
  {
    id: 'rent',
    title: 'Prime Lettings & Tenant Representation',
    tagline: 'High-specification serviced apartments, penthouses, and detached houses',
    description:
      'We assist corporate expatriates, executives, and families in securing verified luxury rentals with 24/7 power, security, and attentive facility management.',
    deliverables: [
      'Access to off-market and newly completed rental stock',
      'Tenancy agreement review and service charge transparency',
      'Condition report and inventory check before occupancy',
      'Facility management liaison (backup generators, treated water, security)',
      'Renewal management and dispute prevention',
    ],
    whatsappMessage: 'Hello Bahams Realty, I would like assistance finding a prime rental property in Lagos.',
  },
  {
    id: 'sell-let',
    title: 'Landlord & Landowner Representation',
    tagline: 'Targeted marketing to qualified high-net-worth buyers and corporate tenants',
    description:
      'We list, market, and negotiate on behalf of property owners and developers, minimizing vacancy periods and achieving optimal market yields.',
    deliverables: [
      'Professional architectural photography and video showcase',
      'Direct distribution to pre-vetted buyer network and corporate tenant pools',
      'Strict tenant screening and proof of funds verification',
      'Closing management and fund disbursement oversight',
    ],
    whatsappMessage: 'Hello Bahams Realty, I have a property in Lagos I would like to sell or let.',
  },
  {
    id: 'off-plan',
    title: 'Off-Plan & Estate Development Advisory',
    tagline: 'Early-stage entry into Lagos top multi-unit residential projects',
    description:
      'Capitalize on construction milestones with structured installment payment plans, capital appreciation between 25%–40%, and robust developer track records.',
    deliverables: [
      'Developer track record audit and construction speed appraisal',
      'Milestone-based payment plan negotiation (initial deposit + installments)',
      'Independent monthly drone and video construction progress reports',
      'Rental yield projections and exit strategy advisory',
    ],
    whatsappMessage: 'Hello Bahams Realty, I want to explore off-plan development investment opportunities in Lagos.',
  },
];

export const DEVELOPMENTS_DATA: Development[] = [
  {
    id: 'DEV-01',
    name: 'The Oceanic Terraces & Residences',
    slug: 'oceanic-terraces-residences',
    location: 'Victoria Island',
    address: 'Ozumba Mbadiwe Avenue, Victoria Island, Lagos',
    developer: 'Bahams Prime Developments & Urban Partners',
    status: 'Off-plan',
    startingPrice: 220000000,
    overview:
      'The Oceanic is a landmark 14-storey waterfront development rising on Ozumba Mbadiwe Avenue. Comprising contemporary 2-bedroom lifestyle apartments, 3-bedroom luxury flats, and 4-bedroom panoramic penthouses, each residence is designed with floor-to-ceiling glass, Italian kitchen fittings, uninterrupted harbor views, and 24-hour backup energy infrastructure.',
    unitTypes: [
      { type: '2-Bedroom Luxury Flat', sizeSqm: 145, startingPrice: 220000000, availableUnits: 6 },
      { type: '3-Bedroom Waterfront Flat + BQ', sizeSqm: 215, startingPrice: 340000000, availableUnits: 4 },
      { type: '4-Bedroom Sky Penthouse', sizeSqm: 380, startingPrice: 580000000, availableUnits: 2 },
    ],
    paymentPlan: {
      depositPercentage: 25,
      durationMonths: 24,
      description: 'Structured 25% initial commitment followed by quarterly milestone installments tied to verified construction stages.',
      milestones: [
        '25% Initial Commitment on Contract Signing',
        '25% Upon Completion of 7th Floor Superstructure',
        '25% Upon Roofing and MEP Rough-ins',
        '15% Upon Internal Finishes and Glazing',
        '10% Final Balance Upon Handover of Keys and Title Document',
      ],
    },
    // PLACEHOLDER: Unsplash architecture image
    masterplanImage:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      { label: 'Infinity Waterfront Swimming Pool', icon: 'waves' },
      { label: 'Technogym Equipped Wellness Center', icon: 'dumbbell' },
      { label: '24/7 Primary & Secondary Power Supply', icon: 'zap' },
      { label: 'Private Boat Jetty Access', icon: 'anchor' },
      { label: 'Smart Access Control & CCTV Surveillance', icon: 'shield-check' },
      { label: 'High-Speed Schindler Passenger Elevators', icon: 'arrow-up-down' },
      { label: 'Dedicated Covered Parking (2 per unit)', icon: 'car' },
    ],
    timeline: [
      {
        phase: 'Piling & Substructure Foundations',
        date: 'Q3 2025',
        status: 'completed',
        description: 'Deep foundation piling and marine retaining wall completed and certified by engineering board.',
      },
      {
        phase: 'Superstructure Framework',
        date: 'Q1 – Q3 2026',
        status: 'in-progress',
        description: 'Cast concrete structural frame currently advancing through Level 8.',
      },
      {
        phase: 'External Glazing & MEP Services',
        date: 'Q4 2026',
        status: 'upcoming',
        description: 'Façade curtain wall installation, plumbing, HVAC, and electrical distribution.',
      },
      {
        phase: 'Interior Finishes & Handover',
        date: 'Q2 2027',
        status: 'upcoming',
        description: 'Cabinetry, sanitary ware, commissioning, snagging, and investor key delivery.',
      },
    ],
    faqs: [
      {
        question: 'What title does The Oceanic development hold?',
        answer: 'The project sits on land with an unencumbered Lagos State Certificate of Occupancy (C of O) and fully approved building permits from LASPPPA.',
      },
      {
        question: 'What is the projected rental yield upon completion?',
        answer: 'Due to its Ozumba Mbadiwe waterfront positioning and high corporate demand in Victoria Island, projected annual rental yields range between 9% and 12% in USD or Naira equivalent.',
      },
      {
        question: 'Can diaspora buyers track construction remotely?',
        answer: 'Yes. All verified buyers receive a quarterly high-definition video inspection update, drone aerial survey, and milestone sign-off reports before installment disbursements.',
      },
    ],
    mapQuery: 'Ozumba Mbadiwe Avenue, Victoria Island, Lagos',
    featured: true,
  },
  {
    id: 'DEV-02',
    name: 'The Heritage Court',
    slug: 'heritage-court-ikoyi',
    location: 'Ikoyi',
    address: 'Bourne Terrace, Old Ikoyi, Lagos',
    developer: 'Heritage Urban Spaces Ltd',
    status: 'Selling Fast',
    startingPrice: 580000000,
    overview:
      'Situated within the most serene, leafy precinct of Old Ikoyi, The Heritage Court is an exclusive enclave of eight architecturally refined 4-bedroom and 5-bedroom luxury townhouses. Each home features private elevator shafts, double-volume living rooms, a landscaped courtyard, maid quarters, and biometric security integration.',
    unitTypes: [
      { type: '4-Bedroom Semi-Detached Villa', sizeSqm: 380, startingPrice: 580000000, availableUnits: 2 },
      { type: '5-Bedroom Detached Villa with Pool', sizeSqm: 540, startingPrice: 850000000, availableUnits: 1 },
    ],
    paymentPlan: {
      depositPercentage: 35,
      durationMonths: 12,
      description: '35% initial deposit, 40% spread over 9 months, and 25% upon final title handover.',
      milestones: [
        '35% Deposit upon execution of Sale Agreement',
        '20% at 3 Months (Finishing & MEP Stage)',
        '20% at 6 Months (External Works & Landscaping)',
        '25% Final Balance upon Handover of Keys',
      ],
    },
    masterplanImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      { label: 'Private Landscaped Swimming Pool', icon: 'waves' },
      { label: 'Smart Home Automation Integration', icon: 'cpu' },
      { label: 'Dual Redundant 24/7 Power Plant', icon: 'zap' },
      { label: 'Private Elevator Shaft In Every Unit', icon: 'arrow-up-down' },
      { label: 'Gated Manned Security & Perimeter Beam', icon: 'shield-check' },
      { label: 'Carport for 4 Vehicles', icon: 'car' },
    ],
    timeline: [
      {
        phase: 'Roofing and Façade Works',
        date: 'Q4 2025',
        status: 'completed',
        description: 'Structural framing and external rendering fully executed.',
      },
      {
        phase: 'Interior Fitting & Marble Flooring',
        date: 'Q1 – Q2 2026',
        status: 'in-progress',
        description: 'Imported Spanish tiles, kitchen cabinetry, and sanitary installations ongoing.',
      },
      {
        phase: 'Commissioning & Handover',
        date: 'Q4 2026',
        status: 'upcoming',
        description: 'Final power connection, landscape finishing, and owner move-in.',
      },
    ],
    faqs: [
      {
        question: 'What is the title documentation on the land?',
        answer: 'Federal Government Certificate of Occupancy registered in Lagos State with unexpired term of 78 years.',
      },
      {
        question: 'Are customizations allowed for remaining units?',
        answer: 'Yes, purchasers committing at this stage can specify bespoke interior color palettes and smart home automation packages.',
      },
    ],
    mapQuery: 'Old Ikoyi, Lagos',
    featured: true,
  },
  {
    id: 'DEV-03',
    name: 'Horizon Tech Vista Estate',
    slug: 'horizon-tech-vista-lekki',
    location: 'Lekki Phase 1',
    address: 'Freedom Way Extension, Lekki Phase 1, Lagos',
    developer: 'Horizon Infrastructure Group',
    status: 'Ready',
    startingPrice: 195000000,
    overview:
      'Completed and ready for immediate occupation, Horizon Tech Vista is a gated, tech-enabled residential estate consisting of 24 contemporary 3 & 4-bedroom terraces with boys quarters. Located just 3 minutes off Freedom Way, it offers quick connectivity to both Admiralty Way and the Lekki-Epe corridor.',
    unitTypes: [
      { type: '3-Bedroom Terrace + BQ', sizeSqm: 210, startingPrice: 195000000, availableUnits: 3 },
      { type: '4-Bedroom Corner Piece Terrace + BQ', sizeSqm: 265, startingPrice: 245000000, availableUnits: 2 },
    ],
    paymentPlan: {
      depositPercentage: 50,
      durationMonths: 6,
      description: 'Outright payment or 50% down payment with balance payable within 6 months while taking early possession.',
      milestones: [
        '50% Initial Down Payment with immediate key handover for interior staging',
        '25% at 90 days',
        '25% Final Balance at 180 days upon deed execution',
      ],
    },
    masterplanImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      { label: 'Paved Interlocking Estate Roads', icon: 'road' },
      { label: 'Estate Clubhouse & Fitness Studio', icon: 'dumbbell' },
      { label: 'Central Water Treatment Plant', icon: 'droplet' },
      { label: 'Fibre Optic Internet Cabling', icon: 'wifi' },
      { label: 'Underground Drainage System', icon: 'check-circle' },
    ],
    timeline: [
      {
        phase: 'Full Construction & Snagging',
        date: '2025',
        status: 'completed',
        description: 'All 24 terrace units completed, snagged, and powered.',
      },
      {
        phase: 'Occupancy & Facility Operation',
        date: 'Immediate',
        status: 'completed',
        description: 'Over 65% of units occupied by professional families and tech founders.',
      },
    ],
    faqs: [
      {
        question: 'Are mortgages accepted for this development?',
        answer: 'Yes, we have pre-approved mortgage arrangements with Stanbic IBTC, FirstBank, and Sterling Bank for eligible salary earners and business owners.',
      },
      {
        question: 'Is the estate flood-free during the rainy season?',
        answer: 'Yes. Horizon Tech Vista features an engineered dual deep subterranean drainage network connected to the regional primary collector channel.',
      },
    ],
    mapQuery: 'Freedom Way, Lekki Phase 1, Lagos',
    featured: true,
  },
];

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'BR-101',
    title: '5 Bedroom Contemporary Luxury Detached Duplex',
    slug: '5-bed-contemporary-luxury-duplex-ikoyi',
    price: 950000000,
    mode: 'sale',
    type: 'detached',
    location: 'Ikoyi',
    address: 'Alexander Avenue, Old Ikoyi, Lagos',
    bedrooms: 5,
    bathrooms: 6,
    sizeSqm: 680,
    parkingSpaces: 5,
    yearBuilt: 2025,
    furnished: true,
    status: 'For Sale',
    featured: true,
    description:
      'An architectural tour de force in prestigious Old Ikoyi. This brand-new detached residence showcases grand double-height foyer ceilings, Italian porcelain slab flooring, an open-concept Poliform-style kitchen with Miele appliances, a private cinema room, a custom glass elevator, and an azure swimming pool bordered by lush tropical landscaping.',
    features: [
      'Private Swimming Pool with Cascading Water Feature',
      'Custom Internal Passenger Elevator',
      'Private Soundproofed 8-Seat Cinema Lounge',
      'Fully Fitted Wet & Dry Kitchens with Miele Appliances',
      'Two-Room Attached Domestic Staff Quarters (BQ)',
      'Solar Hybrid Inverter System & 60KVA Generator',
      'Biometric Keyless Access Control & Integrated CCTV',
      'Floor-to-Ceiling Thermal Insulated Low-E Glazing',
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Babatunde Alabi',
      role: 'Managing Partner, Prime Residential',
      phone: '+234 916 714 9677',
      email: 'babatunde@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Alexander Avenue, Ikoyi, Lagos',
    createdAt: '2026-03-10T12:00:00Z',
  },
  {
    id: 'BR-102',
    title: '4 Bedroom Waterfront Sky Penthouse',
    slug: '4-bed-waterfront-sky-penthouse-vi',
    price: 650000000,
    mode: 'sale',
    type: 'flat',
    location: 'Victoria Island',
    address: 'Ahmadu Bello Way, Victoria Island, Lagos',
    bedrooms: 4,
    bathrooms: 4.5,
    sizeSqm: 420,
    parkingSpaces: 3,
    yearBuilt: 2024,
    furnished: true,
    status: 'For Sale',
    featured: true,
    description:
      'Perched atop a premier 12-storey Victoria Island tower, this expansive penthouse offers sweeping 270-degree vistas across the Atlantic Ocean and Five Cowrie Creek. Features an expansive 90sqm wraparound entertainer terrace, private plunge pool, bespoke bar, and high-spec Italian finishes throughout.',
    features: [
      'Private Rooftop Plunge Pool & Sun Deck',
      '270° Panoramic Ocean & Lagos Skyline Views',
      'Dedicated High-Speed Elevator with Penthouse Keycard',
      'Custom Wine Cellar & Cocktail Bar',
      '24/7 Primary Power & Dual Substation Connection',
      'En-Suite Maid Quarters and Laundry Utility',
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Folake Ademola',
      role: 'Head of Luxury Sales',
      phone: '+234 916 714 9677',
      email: 'folake@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Ahmadu Bello Way, Victoria Island, Lagos',
    createdAt: '2026-03-05T09:00:00Z',
  },
  {
    id: 'BR-103',
    title: '4 Bedroom Contemporary Smart Terrace House',
    slug: '4-bed-contemporary-terrace-lekki-phase-1',
    price: 240000000,
    mode: 'sale',
    type: 'terrace',
    location: 'Lekki Phase 1',
    address: 'Off Admiralty Way, Lekki Phase 1, Lagos',
    bedrooms: 4,
    bathrooms: 4,
    sizeSqm: 310,
    parkingSpaces: 3,
    yearBuilt: 2025,
    furnished: false,
    status: 'For Sale',
    featured: true,
    description:
      'Impeccably designed 4-bedroom terrace located within a private, fully serviced 6-unit compound off Admiralty Way. Features soaring ceilings, LED accent coving, a fully fitted German kitchen, rooftop terrace lounge, and full smart-home voice and phone lighting control.',
    features: [
      'Smart Home Automation (Lighting, Audio, Climate)',
      'Private Rooftop Terrace Lounge',
      'Chef-Grade Kitchen with Quartz Island & Heat Extractor',
      'Self-Contained Maid Room',
      'Uniformed 24/7 Gate Security & Electric Fence',
      'Industrial Borehole Water Filtration System',
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Chidiebere Okonkwo',
      role: 'Associate Partner, Lekki Peninsula',
      phone: '+234 916 714 9677',
      email: 'chidiebere@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Admiralty Way, Lekki Phase 1, Lagos',
    createdAt: '2026-02-28T14:30:00Z',
  },
  {
    id: 'BR-104',
    title: '3 Bedroom Serviced Luxury Flat with Pool & Gym',
    slug: '3-bed-serviced-luxury-flat-ikoyi',
    price: 35000000,
    mode: 'rent',
    type: 'flat',
    location: 'Ikoyi',
    address: 'Lugard Avenue, Old Ikoyi, Lagos',
    bedrooms: 3,
    bathrooms: 3.5,
    sizeSqm: 240,
    parkingSpaces: 2,
    yearBuilt: 2024,
    furnished: true,
    status: 'For Rent',
    featured: true,
    description:
      'Turnkey luxury rental in quiet Lugard Avenue, Ikoyi. Fully furnished with contemporary Scandinavian furnishings, top-tier audio system, fitted walk-in closets, Olympic-length swimming pool, squash court, and uninterrupted 24/7 electricity included in the transparent service charter.',
    features: [
      'Full Designer Furnishing & Appliances Included',
      '24-Hour Reliable Power with Zero Downtime',
      'Resident Olympic Swimming Pool & Squash Court',
      'Fully Equipped Fitness Gym',
      'Covered Basement Parking & Concierge Reception',
    ],
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Amara Nwosu',
      role: 'Head of Prime Lettings',
      phone: '+234 916 714 9677',
      email: 'amara@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Lugard Avenue, Ikoyi, Lagos',
    createdAt: '2026-03-01T11:00:00Z',
  },
  {
    id: 'BR-105',
    title: '4 Bedroom Fully Detached Luxury Villa on 800 SQM',
    slug: '4-bed-fully-detached-villa-ikeja-gra',
    price: 480000000,
    mode: 'sale',
    type: 'detached',
    location: 'Ikeja GRA',
    address: 'Isaac John Street Corridor, Ikeja GRA, Lagos',
    bedrooms: 4,
    bathrooms: 5,
    sizeSqm: 560,
    parkingSpaces: 6,
    yearBuilt: 2023,
    furnished: false,
    status: 'For Sale',
    featured: true,
    description:
      'A rare Mainland trophy property situated in the tranquil diplomatic heart of Ikeja GRA. Sprawled across 800 square meters of prime dry land, this masterfully built detached villa provides sprawling green lawns, mature palm trees, separate 2-bedroom guest chalet, and swift access to Lagos International Airport.',
    features: [
      'Substantial 800 SQM Private Compound with Mature Trees',
      'Separate 2-Bedroom Detached Guest Chalet',
      'Gated Compound with Perimeter Razor Wire & CCTV',
      'Generous Parking for 6+ Executive Vehicles',
      '10 Minutes to Murtala Muhammed International Airport',
      'Lagos State Certificate of Occupancy (Clean Root of Title)',
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Babatunde Alabi',
      role: 'Managing Partner, Prime Residential',
      phone: '+234 916 714 9677',
      email: 'babatunde@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Ikeja GRA, Lagos',
    createdAt: '2026-02-18T10:00:00Z',
  },
  {
    id: 'BR-106',
    title: '2 Bedroom Modern Finished Apartment with Balcony',
    slug: '2-bed-modern-apartment-oniru-vi',
    price: 12500000,
    mode: 'rent',
    type: 'flat',
    location: 'Victoria Island',
    address: 'Oniru Estate, Victoria Island Extension, Lagos',
    bedrooms: 2,
    bathrooms: 2,
    sizeSqm: 135,
    parkingSpaces: 2,
    yearBuilt: 2024,
    furnished: false,
    status: 'For Rent',
    featured: true,
    description:
      'Immaculately finished 2-bedroom apartment situated in a gated close in Oniru, directly bordering Victoria Island. Ideal for young executives and expats desiring effortless transit to Sandhurst, Landmark, and VI commercial headquarters.',
    features: [
      'Spacious Living Room with Private Coffee Balcony',
      'All En-Suite Bedrooms with Fitted Wardrobes',
      '24/7 Security Patrol and Uniformed Doorman',
      'Dedicated Transformer & Standby Diesel Generator',
      'Treated Water System',
    ],
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Amara Nwosu',
      role: 'Head of Prime Lettings',
      phone: '+234 916 714 9677',
      email: 'amara@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Oniru, Victoria Island, Lagos',
    createdAt: '2026-03-08T16:00:00Z',
  },
  {
    id: 'BR-107',
    title: '1,200 SQM Prime Commercial Land on Expressway',
    slug: '1200-sqm-prime-commercial-land-lekki',
    price: 750000000,
    mode: 'sale',
    type: 'land',
    location: 'Lekki Phase 1',
    address: 'Lekki-Epe Expressway Corridor, Lekki, Lagos',
    bedrooms: 0,
    bathrooms: 0,
    sizeSqm: 1200,
    parkingSpaces: 0,
    yearBuilt: 'N/A',
    furnished: false,
    status: 'For Sale',
    featured: false,
    description:
      'Strategic 1,200 SQM hard commercial corner-piece plot boasting over 45 meters of direct dual-carriage expressway frontage. Prime for corporate headquarters, automotive showroom, mixed-use retail arcade, or high-density residential towers.',
    features: [
      'Direct Expressway Road Frontage with Superb Visibility',
      'Dry Sand-Filled Land Ready for Immediate Construction',
      'Federal/Lagos State C of O with Commercial Approval',
      'Survey Plan and Beacon Data Verified',
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Folake Ademola',
      role: 'Head of Luxury Sales',
      phone: '+234 916 714 9677',
      email: 'folake@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Lekki-Epe Expressway, Lagos',
    createdAt: '2026-01-25T11:00:00Z',
  },
  {
    id: 'BR-108',
    title: '5 Bedroom Waterfront Mansion with Private Jetty',
    slug: '5-bed-waterfront-mansion-banana-island-ikoyi',
    price: 2200000000,
    mode: 'sale',
    type: 'detached',
    location: 'Ikoyi',
    address: 'Zone K Waterfront, Banana Island, Ikoyi, Lagos',
    bedrooms: 5,
    bathrooms: 7,
    sizeSqm: 1100,
    parkingSpaces: 8,
    yearBuilt: 2025,
    furnished: true,
    status: 'For Sale',
    featured: true,
    description:
      'The pinnacle of African luxury real estate. Positioned on the ultra-exclusive waterfront perimeter of Banana Island, this palatial estate is engineered to world-class standards with private yacht jetty, climate-controlled glass wine vault, infinity edge pool reflecting into the lagoon, and high-security diplomatic grade perimeter.',
    features: [
      'Private Deep-Water Yacht Jetty on Lagos Lagoon',
      'Infinity Edge Waterfront Pool & Outdoor Teppanyaki Lounge',
      'Kone Glass Elevator Serving 3 Levels',
      '12-Seat Dolby Atmos Cinema Room',
      'Triple Maid Quarters and Security Post',
      'Clean Federal C of O with Governors Consent',
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Babatunde Alabi',
      role: 'Managing Partner, Prime Residential',
      phone: '+234 916 714 9677',
      email: 'babatunde@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Banana Island, Ikoyi, Lagos',
    createdAt: '2026-03-12T08:00:00Z',
  },
  {
    id: 'BR-109',
    title: '3 Bedroom Serviced Terrace Duplex in Gated Estate',
    slug: '3-bed-serviced-terrace-duplex-ajah',
    price: 110000000,
    mode: 'sale',
    type: 'terrace',
    location: 'Ajah',
    address: 'Badore Road Corridor, Ajah, Lagos',
    bedrooms: 3,
    bathrooms: 3.5,
    sizeSqm: 220,
    parkingSpaces: 2,
    yearBuilt: 2024,
    furnished: false,
    status: 'For Sale',
    featured: false,
    description:
      'Superb value proposition for families and buy-to-let investors in Ajah. Gated estate with paved infrastructure, kids playground, dedicated facility management, and consistent high occupancy rates yielding ₦6.5M/yr rental income.',
    features: [
      'Gated Access with Armed Security Patrols',
      'Fitted Kitchen with Heat Extractor & Cooker',
      'Balcony with Scenic Estate Views',
      'Clean Governor’s Consent Documentation',
    ],
    images: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Chidiebere Okonkwo',
      role: 'Associate Partner, Lekki Peninsula',
      phone: '+234 916 714 9677',
      email: 'chidiebere@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Ajah, Lagos',
    createdAt: '2026-02-12T13:00:00Z',
  },
  {
    id: 'BR-110',
    title: '4 Bedroom Smart Semi-Detached Duplex with BQ',
    slug: '4-bed-smart-semi-detached-duplex-yaba',
    price: 185000000,
    mode: 'sale',
    type: 'duplex',
    location: 'Yaba',
    address: 'Commercial Avenue Precinct, Yaba, Lagos',
    bedrooms: 4,
    bathrooms: 4.5,
    sizeSqm: 290,
    parkingSpaces: 3,
    yearBuilt: 2025,
    furnished: false,
    status: 'For Sale',
    featured: false,
    description:
      'Modern, technologically wired semi-detached duplex right in the pulse of Yaba (Nigeria’s Silicon Valley). Features fiber optic high-speed routing, smart video doorbell, solar power inverter installation, and immediate proximity to the Third Mainland Bridge.',
    features: [
      '5 Minutes to Third Mainland Bridge On-Ramp',
      'Pre-Wired 10KVA Solar Hybrid Inverter with Lithium Batteries',
      'Smart Door Locks & Ring Video Doorbell',
      'Private Compound with Stamp Concrete Floor',
    ],
    images: [
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Folake Ademola',
      role: 'Head of Luxury Sales',
      phone: '+234 916 714 9677',
      email: 'folake@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Yaba, Lagos',
    createdAt: '2026-02-05T15:00:00Z',
  },
  {
    id: 'BR-111',
    title: '600 SQM Grade-A Commercial Open Office Floor',
    slug: '600-sqm-grade-a-office-floor-vi',
    price: 48000000,
    mode: 'rent',
    type: 'commercial',
    location: 'Victoria Island',
    address: 'Adeola Odeku Street, Victoria Island, Lagos',
    bedrooms: 0,
    bathrooms: 4,
    sizeSqm: 600,
    parkingSpaces: 10,
    yearBuilt: 2023,
    furnished: false,
    status: 'For Rent',
    featured: false,
    description:
      'High-specification open plan commercial office plate on vibrant Adeola Odeku Street. Comes with raised flooring for data cabling, central chiller air-conditioning, dedicated basement parking bays, and 3 high-speed passenger lifts.',
    features: [
      'Grade-A Corporate Tower with LEED Environmental Accreditation',
      '10 Dedicated Basement Parking Slots',
      'Triple Generator Sync System for 100% Uninterrupted Power',
      'Dedicated Male, Female & Accessible Restrooms per Floor',
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Amara Nwosu',
      role: 'Head of Prime Lettings',
      phone: '+234 916 714 9677',
      email: 'amara@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Adeola Odeku Street, Victoria Island, Lagos',
    createdAt: '2026-01-30T10:30:00Z',
  },
  {
    id: 'BR-112',
    title: '1,000 SQM Prime Development Plot in Free Trade Zone Corridor',
    slug: '1000-sqm-development-plot-ibeju-lekki',
    price: 45000000,
    mode: 'sale',
    type: 'land',
    location: 'Ibeju-Lekki',
    address: 'Coastal Road / Lekki Free Zone Corridor, Ibeju-Lekki, Lagos',
    bedrooms: 0,
    bathrooms: 0,
    sizeSqm: 1000,
    parkingSpaces: 0,
    yearBuilt: 'N/A',
    furnished: false,
    status: 'For Sale',
    featured: false,
    description:
      'Prime dry residential/commercial development parcel positioned along the booming Ibeju-Lekki corridor, minutes from Dangote Refinery and Lekki Deep Sea Port. High capital growth corridor with projected 250% appreciation over 5 years.',
    features: [
      '100% Dry Land with Topographic Survey Carried Out',
      'Approved Government Gazette & Registered Survey',
      'Fenced and Gated with Registered Layout Plan',
      'Rapid Capital Appreciation Potential',
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Chidiebere Okonkwo',
      role: 'Associate Partner, Lekki Peninsula',
      phone: '+234 916 714 9677',
      email: 'chidiebere@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Ibeju-Lekki, Lagos',
    createdAt: '2026-01-15T09:15:00Z',
  },
  {
    id: 'BR-113',
    title: '3 Bedroom Classic Detached Home on Large Grounds',
    slug: '3-bed-classic-detached-home-surulere',
    price: 130000000,
    mode: 'sale',
    type: 'detached',
    location: 'Surulere',
    address: 'Adeniran Ogunsanya Precinct, Surulere, Lagos',
    bedrooms: 3,
    bathrooms: 3,
    sizeSqm: 450,
    parkingSpaces: 4,
    yearBuilt: 2021,
    furnished: false,
    status: 'For Sale',
    featured: false,
    description:
      'Charming single-storey detached residential home set in a peaceful cul-de-sac off Adeniran Ogunsanya. Ideal for families wanting spacious single-level living or investors looking to redevelop into luxury flats.',
    features: [
      'Spacious 450 SQM Private Compound',
      'Perimeter Fencing and High Iron Gate',
      'Title: Lagos State Registered Conveyance',
      'Proximity to Leisure Centers and Schools',
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Folake Ademola',
      role: 'Head of Luxury Sales',
      phone: '+234 916 714 9677',
      email: 'folake@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Adeniran Ogunsanya, Surulere, Lagos',
    createdAt: '2026-02-14T11:45:00Z',
  },
  {
    id: 'BR-114',
    title: '2 Bedroom Executive Serviced Apartment in Old Ikoyi',
    slug: '2-bed-executive-serviced-apartment-ikoyi',
    price: 22000000,
    mode: 'rent',
    type: 'flat',
    location: 'Ikoyi',
    address: 'Bourdillon Road, Ikoyi, Lagos',
    bedrooms: 2,
    bathrooms: 2.5,
    sizeSqm: 165,
    parkingSpaces: 2,
    yearBuilt: 2024,
    furnished: true,
    status: 'For Rent',
    featured: false,
    description:
      'Elegantly appointed 2-bedroom executive residence on prestigious Bourdillon Road. Offers quiet, secure residential living with dedicated concierge, 24-hour power, fitness center, and covered assigned parking.',
    features: [
      'Designer Furnished with Italian Leather & Walnut Accents',
      '24-Hour Reliable Power with Zero Drop-Off',
      'Concierge Reception Desk & Mail Handling',
      'Swimming Pool & Residents Lounge',
    ],
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    ],
    agent: {
      name: 'Amara Nwosu',
      role: 'Head of Prime Lettings',
      phone: '+234 916 714 9677',
      email: 'amara@bahamsrealty.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    mapQuery: 'Bourdillon Road, Ikoyi, Lagos',
    createdAt: '2026-03-02T14:15:00Z',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  // PLACEHOLDER: Real client reviews should replace these prior to launch
  {
    id: 'TEST-01',
    name: 'Dr. Kunle & Adetola Oladipo',
    role: 'Diaspora Investors (London, UK)',
    location: 'Acquired 2 Units at The Oceanic, Victoria Island',
    quote:
      'Buying off-plan in Lagos from London was daunting until we partnered with Bahams Realty. Babatunde and his team handled the entire title search at Alausa, shared weekly drone walkthroughs, and ensured our funds were released strictly as milestones were inspected. Exceptional integrity.',
    rating: 5,
    propertyContext: 'Off-Plan Development Acquisition',
  },
  {
    id: 'TEST-02',
    name: 'Stephanie Al-Mansoor',
    role: 'Regional Managing Director',
    location: 'Leased 4-Bed Serviced Residence in Old Ikoyi',
    quote:
      'Relocating our executive family from Dubai to Lagos was smooth because of Bahams Realty. They curated exactly three high-grade properties that met our international security standards, handled the lease negotiations seamlessly, and resolved every snag before our flight landed.',
    rating: 5,
    propertyContext: 'Executive Corporate Relocation',
  },
  {
    id: 'TEST-03',
    name: 'Femi Balogun',
    role: 'Tech Founder & Private Investor',
    location: 'Sold Commercial Plot in Lekki Phase 1',
    quote:
      'Bahams Realty represents the gold standard of real estate agency in Nigeria. No inflated prices, no spurious intermediaries, just transparent legal advisory and vetted buyers. We closed our Lekki transaction in three weeks with total peace of mind.',
    rating: 5,
    propertyContext: 'Commercial Land Divestment',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  // PLACEHOLDER: Replace with actual Bahams Realty staff details
  {
    id: 'TEAM-01',
    name: 'Babatunde Alabi',
    role: 'Managing Partner & Founder',
    bio: 'Over 16 years leading high-value capital transactions across Ikoyi, Banana Island, and Victoria Island. Fellow of the Nigerian Institution of Estate Surveyors and Valuers (NIESV).',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    experienceYears: 16,
  },
  {
    id: 'TEAM-02',
    name: 'Folake Ademola',
    role: 'Partner, Luxury Sales & Off-Plan Advisory',
    bio: 'Specialist in multi-unit project feasibility and off-plan structuring for diaspora and institutional buyers across London, North America, and Lagos.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    experienceYears: 12,
  },
  {
    id: 'TEAM-03',
    name: 'Chidiebere Okonkwo',
    role: 'Senior Associate, Lekki Peninsula & Land',
    bio: 'Extensive on-ground expertise along the Lekki-Epe expressway and Ibeju-Lekki corridors, specializing in verified titles, excision, and commercial plot acquisitions.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    experienceYears: 9,
  },
  {
    id: 'TEAM-04',
    name: 'Amara Nwosu',
    role: 'Head of Prime Lettings & Corporate Relocations',
    bio: 'Manages Bahams Realty portfolio of high-net-worth rental properties and multinational corporate relocation accounts throughout Lagos.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    experienceYears: 8,
  },
];

export const COMPANY_VALUES = [
  {
    title: 'Uncompromising Verification',
    description:
      'We never list a property without verifying root of title at the Lands Registry. If the documentation has ambiguities, we decline the mandate.',
  },
  {
    title: 'Transparent Advisory',
    description:
      'We provide honest market valuations and yield projections rather than telling clients what they wish to hear to secure a commission.',
  },
  {
    title: 'Discretion & Client Confidentiality',
    description:
      'We protect the privacy of high-profile buyers, diaspora families, and sellers with secure communication and non-disclosure standards.',
  },
];
