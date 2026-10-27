import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  Search,
  ArrowRight,
  ShieldCheck,
  Building,
  Star,
  MapPin,
  TrendingUp,
  FileCheck,
  Compass,
  Zap,
} from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import {
  WHY_BAHAMS_POINTS,
  HOW_IT_WORKS_STEPS,
  TESTIMONIALS,
} from '../data/mockData.ts';
import { SafeImage } from '../components/common/SafeImage.tsx';
import { PropertyCard } from '../components/property/PropertyCard.tsx';
import { ProjectCard } from '../components/development/ProjectCard.tsx';
import { SectionHeading } from '../components/common/SectionHeading.tsx';
import { AfrocentricDivider, AfrocentricWatermark } from '../components/common/AfrocentricPattern.tsx';
import { getWhatsAppUrl } from '../utils/whatsapp.ts';

interface LagosCorridorIntel {
  id: string;
  name: string;
  yorubaTag: string;
  locationFilter: string;
  avgPricePerSqm: string;
  typicalTitle: string;
  annualYield: string;
  capitalGrowth: string;
  buyerProfile: string;
  summary: string;
  highlights: string[];
  image: string;
}

const EKO_CORRIDOR_INTELLIGENCE: LagosCorridorIntel[] = [
  {
    id: 'ikoyi',
    name: 'Old Ikoyi & Banana Island',
    yorubaTag: 'Ibugbe Oba · Sovereign Ultra-Prime',
    locationFilter: 'Ikoyi',
    avgPricePerSqm: '₦1.8M – ₦3.4M / m²',
    typicalTitle: 'Federal / Lagos State C of O & Governor’s Consent',
    annualYield: '8.5% – 10.5% p.a.',
    capitalGrowth: '+28% YoY (Naira Hedge)',
    buyerProfile: 'UHNW Families, Captains of Industry & Diplomatic Missions',
    summary:
      'Nigeria’s most prestigious residential enclave. Characterized by tree-lined avenues off Bourdillon and Gerrard Road, private lagoon jetties, and low-density gated security.',
    highlights: [
      'Direct private boat club & lagoon jetty access',
      '24/7 independent estate IPP power infrastructure',
      'Strict zoning laws preserving long-term land value',
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'vi',
    name: 'Victoria Island & Eko Atlantic',
    yorubaTag: 'Oko Awo · Commercial & Waterfront Hub',
    locationFilter: 'Victoria Island',
    avgPricePerSqm: '₦1.5M – ₦2.9M / m²',
    typicalTitle: 'Lagos State C of O & Registered Deed of Assignment',
    annualYield: '11.0% – 14.5% (High Short-Let & Expat Demand)',
    capitalGrowth: '+31% YoY',
    buyerProfile: 'Diaspora Investors, Multinational Executives & Corporate Funds',
    summary:
      'The financial heartbeat of West Africa. High-rise luxury penthouses and waterfront towers offering strong USD-indexed corporate lease yields and walkable proximity to fine dining.',
    highlights: [
      'Highest corporate expat & executive short-let occupancy in Lagos',
      'Coastal sea-wall engineering & district cooling in Eko Atlantic',
      'Minutes from multinational headquarters on Adeola Odeku',
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'lekki',
    name: 'Lekki Phase 1 (Admiralty Corridor)',
    yorubaTag: 'Idagbasoke · Dynamic Lifestyle & Family Hub',
    locationFilter: 'Lekki Phase 1',
    avgPricePerSqm: '₦950K – ₦1.6M / m²',
    typicalTitle: 'Governor’s Consent & Registered Gazette',
    annualYield: '10.5% – 13.0% p.a.',
    capitalGrowth: '+26% YoY',
    buyerProfile: 'Tech Founders, Young Families & UK/US Returnees',
    summary:
      'Connected directly to Ikoyi via the iconic cable-stayed Link Bridge. Known for contemporary smart-home detached duplexes with rooftop lounges, swimming pools, and en-suite Boys’ Quarters (BQ).',
    highlights: [
      '2-minute drive to Ikoyi via Lekki-Ikoyi Link Bridge',
      'Vibrant lifestyle corridor with top international schools & clinics',
      'Strong liquidity and fastest resale turnaround in Lagos',
    ],
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ikeja',
    name: 'Ikeja GRA (Mainland Heritage)',
    yorubaTag: 'Ile Aabo · Old-Money Mainland Sanctuary',
    locationFilter: 'Ikeja GRA',
    avgPricePerSqm: '₦850K – ₦1.4M / m²',
    typicalTitle: 'Lagos State C of O & Governor’s Consent',
    annualYield: '9.0% – 11.0% p.a.',
    capitalGrowth: '+24% YoY',
    buyerProfile: 'Aviation Executives, Mainland Industrialists & Diaspora',
    summary:
      'The undisputed jewel of the Lagos Mainland. Generous land plots, serene tree-lined crescents around Isaac John Street, and 10-minute proximity to Murtala Muhammed International Airport.',
    highlights: [
      '10 minutes to Murtala Muhammed International Airport (MMIA)',
      'Naturally elevated topography with zero flood risk',
      'Spacious compound layouts with multi-car parking & dual BQ',
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ibeju',
    name: 'Ibeju-Lekki (New Lagos Corridor)',
    yorubaTag: 'Ojo Iwaju · Strategic Land Banking & Growth',
    locationFilter: 'Ibeju-Lekki',
    avgPricePerSqm: '₦120K – ₦380K / m²',
    typicalTitle: 'Certificate of Occupancy (C of O) & Government Excision',
    annualYield: 'Land Banking / High Equity Appreciation',
    capitalGrowth: '+42% YoY',
    buyerProfile: 'Land Bankers, Institutional Developers & Diaspora Syndicates',
    summary:
      'Anchored by the Lekki Deep Sea Port, Dangote Refinery, and the proposed Lekki International Airport. The #1 corridor for verified dry-land banking with Surveyor-General charted coordinates.',
    highlights: [
      'Surrounded by Lekki Free Trade Zone & Deep Sea Port',
      'Every plot verified at Alausa Surveyor-General Registry',
      'Lowest entry ticket with highest 5-year compounding uplift',
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { properties, developments, services, landingConfig } = useData();

  // Search Bar State
  const [searchMode, setSearchMode] = useState<'sale' | 'rent'>('sale');
  const [searchLocation, setSearchLocation] = useState<string>('all');
  const [searchType, setSearchType] = useState<string>('all');
  const [searchMaxPrice, setSearchMaxPrice] = useState<string>('all');

  // Interactive Eko Market Pulse State
  const [activeCorridorId, setActiveCorridorId] = useState<string>('ikoyi');
  const activeCorridor =
    EKO_CORRIDOR_INTELLIGENCE.find((c) => c.id === activeCorridorId) ||
    EKO_CORRIDOR_INTELLIGENCE[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('mode', searchMode);
    if (searchLocation !== 'all') params.set('location', searchLocation);
    if (searchType !== 'all') params.set('type', searchType);
    if (searchMaxPrice !== 'all') params.set('maxPrice', searchMaxPrice);

    navigate(`/properties?${params.toString()}`);
  };

  const whatsappHeroUrl = getWhatsAppUrl(
    'Hello Bahams Realty, I am exploring verified luxury properties and investments in Lagos and would like to chat with an advisor.'
  );

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 6);
  const featuredDevelopments = developments.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-28 pb-24">
      {/* =========================================================================
          SECTION 1: HERO SECTION
          ========================================================================= */}
      <section className="relative pt-4 sm:pt-10 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Visual Container with Dark Gradient Overlay */}
        <div className="relative rounded-2xl overflow-hidden min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex flex-col justify-end p-5 sm:p-10 lg:p-14 shadow-xl">
          {/* Background Image Placeholder or CMS image */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={landingConfig.heroImage}
              alt="Luxury residence in Lagos Nigeria"
              containerClassName="w-full h-full"
              className="w-full h-full object-cover scale-100 transition-transform duration-700"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-5 text-white animate-fadeIn">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase rounded-md border border-white/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{landingConfig.heroBadgeText}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] [text-wrap:balance]">
              {landingConfig.heroHeadline}
            </h1>

            <p className="text-sm sm:text-lg text-neutral-200 leading-relaxed max-w-2xl [text-wrap:balance]">
              {landingConfig.heroSubline}
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/properties"
                className="w-full sm:w-auto justify-center px-6 py-3.5 bg-[#0F5C4A] hover:bg-[#0B4638] active:scale-[0.99] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all shadow-md inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
              >
                <span>Browse Lagos Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={whatsappHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-semibold uppercase tracking-wider rounded-md transition-all inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Speak to an Advisor</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hero Integrated Search Bar Box */}
        <div className="relative z-20 -mt-6 sm:-mt-12 max-w-5xl mx-auto px-1 sm:px-2">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white rounded-xl shadow-lg border border-[#E5E5E0] p-4 sm:p-6 space-y-4"
          >
            {/* Buy / Rent Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setSearchMode('sale')}
                  className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                    searchMode === 'sale'
                      ? 'bg-[#0F5C4A] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Buy Outright
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode('rent')}
                  className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                    searchMode === 'rent'
                      ? 'bg-[#0F5C4A] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Annual Lease
                </button>
              </div>
              <span className="text-[11px] font-medium text-neutral-500 hidden sm:inline">
                100% Charted Titles · C of O & Governor’s Consent
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Location Dropdown */}
              <div>
                <label
                  htmlFor="heroLocation"
                  className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1"
                >
                  Lagos District
                </label>
                <select
                  id="heroLocation"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs font-medium border border-neutral-200 rounded-md bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                >
                  <option value="all">All Locations (Lagos)</option>
                  <option value="Ikoyi">Old Ikoyi & Banana Island</option>
                  <option value="Victoria Island">Victoria Island & Eko Atlantic</option>
                  <option value="Lekki Phase 1">Lekki Phase 1</option>
                  <option value="Ajah">Ajah & Sangotedo</option>
                  <option value="Ikeja GRA">Ikeja GRA (Mainland)</option>
                  <option value="Yaba">Yaba</option>
                  <option value="Surulere">Surulere</option>
                  <option value="Ibeju-Lekki">Ibeju-Lekki (New Lagos)</option>
                </select>
              </div>

              {/* Property Type Dropdown */}
              <div>
                <label
                  htmlFor="heroType"
                  className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1"
                >
                  Property Type
                </label>
                <select
                  id="heroType"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs font-medium border border-neutral-200 rounded-md bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                >
                  <option value="all">All Property Types</option>
                  <option value="duplex">Detached & Semi-Detached Duplexes</option>
                  <option value="flat">Luxury Apartments & Penthouses</option>
                  <option value="terrace">Contemporary Terraces (with BQ)</option>
                  <option value="detached">Palatial Detached Mansions</option>
                  <option value="land">Verified Land Plots</option>
                  <option value="commercial">Grade-A Commercial</option>
                </select>
              </div>

              {/* Price Range Dropdown */}
              <div>
                <label
                  htmlFor="heroPrice"
                  className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1"
                >
                  Max Budget (₦)
                </label>
                <select
                  id="heroPrice"
                  value={searchMaxPrice}
                  onChange={(e) => setSearchMaxPrice(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs font-medium border border-neutral-200 rounded-md bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                >
                  <option value="all">Any Price</option>
                  {searchMode === 'sale' ? (
                    <>
                      <option value="150000000">Up to ₦150M</option>
                      <option value="300000000">Up to ₦300M</option>
                      <option value="600000000">Up to ₦600M</option>
                      <option value="1000000000">Up to ₦1 Billion</option>
                      <option value="2500000000">Up to ₦2.5 Billion</option>
                    </>
                  ) : (
                    <>
                      <option value="10000000">Up to ₦10M/yr</option>
                      <option value="20000000">Up to ₦20M/yr</option>
                      <option value="35000000">Up to ₦35M/yr</option>
                      <option value="60000000">Up to ₦60M/yr</option>
                    </>
                  )}
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#0F5C4A] hover:bg-[#0B4638] active:scale-[0.99] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TRUST STRIP
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Key agency statistics">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 py-7 sm:py-8 px-5 sm:px-6 bg-white rounded-xl border border-[#E5E5E0] shadow-xs">
          {landingConfig.trustStats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#1A1A1A] tabular-nums tracking-tight block">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#0F5C4A] block">
                {stat.label}
              </span>
              <p className="text-[11px] text-neutral-500 leading-tight">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Subtle Adire Geometric Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AfrocentricDivider variant="subtle" />
      </div>

      {/* =========================================================================
          SECTION 3: FEATURED PROPERTIES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            kicker="Handpicked Lagos Mandates"
            title={landingConfig.featuredHighlightTitle || 'Curated Prime Residences'}
            subtitle="Verified residential sales, executive rentals, and commercial assets with clean root of title ready for private inspection."
          />
          <Link
            to="/properties"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] hover:text-[#0B4638] transition-colors shrink-0"
          >
            <span>View All Listings ({properties.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Property Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
          >
            <span>Browse Full Property Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INTERACTIVE "EKO MARKET PULSE" — LAGOS CORRIDOR EXPLORER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#141413] text-white rounded-2xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl border border-neutral-800 space-y-8">
          <AfrocentricWatermark className="text-emerald-400" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-400">
                <Compass className="w-4 h-4" />
                <span>Eko Market Pulse · Local Neighborhood Intelligence</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Explore Lagos by Prime Real Estate Corridor
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Every Lagos district carries distinct title structures, rental yields, and lifestyle infrastructure. Select a neighborhood below to inspect live market benchmarks.
              </p>
            </div>

            {/* Horizontal scrollable corridor selector tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none shrink-0">
              {EKO_CORRIDOR_INTELLIGENCE.map((corridor) => {
                const isSelected = corridor.id === activeCorridor.id;
                return (
                  <button
                    key={corridor.id}
                    type="button"
                    onClick={() => setActiveCorridorId(corridor.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0F5C4A] text-white shadow-sm border border-emerald-400/40'
                        : 'bg-neutral-800/90 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700'
                    }`}
                  >
                    {corridor.locationFilter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Corridor Detail Panel */}
          <div
            key={activeCorridor.id}
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn"
          >
            {/* Left Column: Image & Yoruba Heritage Kicker */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden aspect-16/10 lg:aspect-4/3 border border-neutral-700 bg-neutral-900">
              <SafeImage
                src={activeCorridor.image}
                alt={activeCorridor.name}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                  {activeCorridor.yorubaTag}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {activeCorridor.name}
                </h3>
              </div>
            </div>

            {/* Right Column: Metrics & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                {activeCorridor.summary}
              </p>

              {/* 4 Benchmark Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Typical Land / Root Title
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 shrink-0" />
                    <span>{activeCorridor.typicalTitle}</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Benchmark Price Index
                  </span>
                  <p className="text-sm font-bold text-white font-mono tabular-nums">
                    {activeCorridor.avgPricePerSqm}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Projected Rental / Lease Yield
                  </span>
                  <p className="text-sm font-bold text-white font-mono tabular-nums flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{activeCorridor.annualYield}</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Annual Capital Appreciation
                  </span>
                  <p className="text-sm font-bold text-amber-400 font-mono tabular-nums">
                    {activeCorridor.capitalGrowth}
                  </p>
                </div>
              </div>

              {/* Infrastructure & Acculturation Points */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Corridor Infrastructure & Buyer Fit ({activeCorridor.buyerProfile}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-neutral-300">
                  {activeCorridor.highlights.map((item) => (
                    <div
                      key={item}
                      className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800 flex items-start gap-2"
                    >
                      <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corridor Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/properties?location=${encodeURIComponent(activeCorridor.locationFilter)}`}
                  className="px-5 py-2.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors inline-flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Browse {activeCorridor.locationFilter} Listings</span>
                </Link>
                <a
                  href={getWhatsAppUrl(
                    `Hello Bahams Realty, I am interested in acquiring property in ${activeCorridor.name} and would like to review available verified mandates.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Request {activeCorridor.locationFilter} Brief</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FEATURED DEVELOPMENTS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            kicker="Off-Plan & Prime Estates"
            title="Featured Developments"
            subtitle="Curated multi-unit residential schemes in Victoria Island, Ikoyi, and Lekki with escrow-backed milestone payment structures."
          />
          <Link
            to="/developments"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] hover:text-[#0B4638] transition-colors shrink-0"
          >
            <span>View All Developments ({developments.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredDevelopments.map((dev) => (
            <ProjectCard key={dev.id} development={dev} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: HOW IT WORKS
          ========================================================================= */}
      <section className="bg-white border-y border-[#E5E5E0] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            centered
            kicker="Simple, Transparent Process"
            title="How Our Lagos Advisory Works"
            subtitle="Whether buying from London, relocating as an expat, or upgrading locally in Lagos, our 3-step verification workflow eliminates title risk."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {landingConfig.howItWorksImage && (
              <div className="lg:col-span-5 aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-neutral-200">
                <SafeImage
                  src={landingConfig.howItWorksImage}
                  alt="Bahams Realty advisory process in Lagos"
                  containerClassName="w-full h-full"
                  className="object-cover"
                />
              </div>
            )}

            <div
              className={`${
                landingConfig.howItWorksImage ? 'lg:col-span-7' : 'lg:col-span-12'
              } grid grid-cols-1 sm:grid-cols-3 gap-6`}
            >
              {HOW_IT_WORKS_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="relative p-6 bg-[#FAFAF8] rounded-xl border border-[#E5E5E0] space-y-3 hover:border-[#0F5C4A]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A1A]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: SERVICES (DYNAMIC FROM DATACONTEXT)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            kicker="Our Core Competencies"
            title="Advisory & Brokerage Services"
            subtitle="Tailored representation for buyers, landlords, institutional developers, and global Nigerian diaspora capital."
          />
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] hover:text-[#0B4638] transition-colors shrink-0"
          >
            <span>Read Full Service Charter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="bg-white rounded-xl border border-[#E5E5E0] overflow-hidden flex flex-col justify-between hover:border-neutral-400 hover:shadow-md transition-all"
            >
              <div>
                {srv.image && (
                  <div className="aspect-16/9 w-full bg-neutral-100 overflow-hidden border-b border-neutral-100">
                    <SafeImage
                      src={srv.image}
                      alt={srv.title}
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 space-y-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0F5C4A]">
                    {srv.categoryBadge || `0${idx + 1}. Practice Area`}
                  </span>
                  <h3 className="text-base font-bold text-[#1A1A1A]">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium leading-snug">
                    {srv.tagline}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-1 line-clamp-3">
                    {srv.description}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  to={`/services#${srv.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] hover:text-[#0B4638]"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: WHY BAHAMS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionHeading
          kicker="Trust & Rigor"
          title="Why Discerning Buyers Choose Bahams"
          subtitle="Real estate transactions in Lagos demand uncompromising Alausa Land Registry verification and fiduciary accountability."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_BAHAMS_POINTS.map((pt) => (
              <div
                key={pt.number}
                className="bg-white p-6 rounded-xl border border-[#E5E5E0] space-y-2.5 hover:border-neutral-300 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-[#0F5C4A]">
                  {pt.number}
                </span>
                <h3 className="text-base font-bold text-[#1A1A1A]">
                  {pt.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            ))}
          </div>

          {landingConfig.whyBahamsImage && (
            <div className="lg:col-span-5 aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-neutral-200">
              <SafeImage
                src={landingConfig.whyBahamsImage}
                alt="Bahams Realty luxury development showcase in Lagos"
                containerClassName="w-full h-full"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: TESTIMONIALS
          ========================================================================= */}
      <section className="bg-neutral-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <AfrocentricWatermark className="text-white" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
              Verified Client Experiences
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Trusted by Local Leaders & Global Nigerian Diaspora
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-neutral-800/85 border border-neutral-700/80 rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm text-neutral-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-700 text-xs">
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-neutral-400">{t.role}</p>
                  <p className="text-[11px] text-emerald-400/90 mt-1 font-mono">
                    {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: CTA BAND
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#0F5C4A] rounded-2xl p-8 sm:p-12 lg:p-16 text-white text-center space-y-6 shadow-xl overflow-hidden">
          <AfrocentricWatermark className="text-white" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
              Admiralty Way, Lekki Phase 1 · Lagos
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Ready to secure your next address in Lagos?
            </h2>
            <p className="text-sm sm:text-base text-neutral-100 leading-relaxed [text-wrap:balance]">
              Speak directly with our senior advisory desk on Admiralty Way, Lekki. We curate verified shortlists with complete title search files tailored to your brief.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={whatsappHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center px-6 py-3.5 bg-white text-[#0F5C4A] hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-md inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#0F5C4A]" />
              <span>Connect on WhatsApp</span>
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto justify-center px-6 py-3.5 bg-[#0B4638] hover:bg-black/20 text-white border border-white/30 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors inline-flex items-center gap-2"
            >
              <span>Send Confidential Brief</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
