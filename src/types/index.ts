export type PropertyMode = 'sale' | 'rent';

export type PropertyType = 
  | 'flat' 
  | 'duplex' 
  | 'terrace' 
  | 'detached' 
  | 'land' 
  | 'commercial';

export type LagosLocation = 
  | 'Ikoyi' 
  | 'Victoria Island' 
  | 'Lekki Phase 1' 
  | 'Ajah' 
  | 'Ikeja GRA' 
  | 'Yaba' 
  | 'Surulere' 
  | 'Ibeju-Lekki' 
  | 'Other';

export type PropertyStatus = 'For Sale' | 'For Rent' | 'Sold' | 'Let' | 'Selling Fast';

export interface Agent {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  mode: PropertyMode;
  type: PropertyType;
  location: LagosLocation;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  parkingSpaces: number;
  yearBuilt: number | string;
  furnished: boolean;
  status: PropertyStatus;
  featured: boolean;
  description: string;
  features: string[];
  images: string[];
  agent: Agent;
  mapQuery: string;
  createdAt: string;
}

export type DevelopmentStatus = 'Off-plan' | 'Ready' | 'Selling Fast';

export interface DevelopmentUnitType {
  type: string;
  sizeSqm: number;
  startingPrice: number;
  availableUnits: number;
}

export interface DevelopmentMilestone {
  phase: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
}

export interface DevelopmentFAQ {
  question: string;
  answer: string;
}

export interface Development {
  id: string;
  name: string;
  slug: string;
  location: LagosLocation;
  address: string;
  developer: string;
  status: DevelopmentStatus;
  startingPrice: number;
  overview: string;
  unitTypes: DevelopmentUnitType[];
  paymentPlan: {
    depositPercentage: number;
    durationMonths: number;
    description: string;
    milestones: string[];
  };
  masterplanImage: string;
  images: string[];
  amenities: { label: string; icon: string }[];
  timeline: DevelopmentMilestone[];
  faqs: DevelopmentFAQ[];
  mapQuery: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  propertyContext: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  experienceYears: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  whatsappMessage: string;
}

export interface FilterState {
  mode: 'all' | PropertyMode;
  location: 'all' | LagosLocation;
  type: 'all' | PropertyType;
  bedrooms: 'all' | number;
  minPrice: number;
  maxPrice: number;
  furnished: 'all' | 'yes' | 'no';
  sortBy: 'newest' | 'price-asc' | 'price-desc';
  searchQuery: string;
}

export type EnquiryType = 'inspection' | 'development' | 'contact' | 'service';

export interface InboundEnquiry {
  id: string;
  type: EnquiryType;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  details: string;
  propertyOrProjectTitle?: string;
  propertyOrProjectId?: string;
  preferredDate?: string;
  preferredTime?: string;
  budget?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface LandingPageConfig {
  heroImage: string;
  heroHeadline: string;
  heroSubline: string;
  heroBadgeText: string;
  aboutOfficeImage: string;
  whyBahamsImage?: string;
  howItWorksImage?: string;
  featuredHighlightTitle?: string;
  trustStats: {
    value: string;
    label: string;
    subtext: string;
  }[];
}

