import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building,
  KeyRound,
  FileCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import {
  DEVELOPMENTS_DATA,
  WHY_BAHAMS_POINTS,
  HOW_IT_WORKS_STEPS,
  SERVICES_DATA,
  TESTIMONIALS,
} from '../data/mockData.ts';
import { SafeImage } from '../components/common/SafeImage.tsx';
import { PropertyCard } from '../components/property/PropertyCard.tsx';
import { ProjectCard } from '../components/development/ProjectCard.tsx';
import { SectionHeading } from '../components/common/SectionHeading.tsx';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '../utils/whatsapp.ts';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { properties, landingConfig } = useData();

  // Search Bar State
  const [searchMode, setSearchMode] = useState<'sale' | 'rent'>('sale');
  const [searchLocation, setSearchLocation] = useState<string>('all');
  const [searchType, setSearchType] = useState<string>('all');
  const [searchMaxPrice, setSearchMaxPrice] = useState<string>('all');


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
  const featuredDevelopments = DEVELOPMENTS_DATA.slice(0, 3);

  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      {/* =========================================================================
          SECTION 2: HERO SECTION
          ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Visual Container with Dark Gradient Overlay */}
        <div className="relative rounded-2xl overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col justify-end p-6 sm:p-10 lg:p-14 shadow-xl">
          {/* Background Image Placeholder or CMS image */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={landingConfig.heroImage}
              alt="Luxury residence in Lagos Nigeria"
              containerClassName="w-full h-full"
              className="w-full h-full object-cover scale-100"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl space-y-5 text-white">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md text-white text-xs font-semibold tracking-wider uppercase rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{landingConfig.heroBadgeText}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight [text-wrap:balance]">
              {landingConfig.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl [text-wrap:balance]">
              {landingConfig.heroSubline}
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/properties"
                className="px-6 py-3.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shadow-md inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
              >
                <span>Browse Properties</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={whatsappHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hero Integrated Search Bar Box */}
        <div className="relative z-20 -mt-10 sm:-mt-12 max-w-5xl mx-auto px-2">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white rounded-xl shadow-lg border border-[#E5E5E0] p-4 sm:p-6 space-y-4"
          >
            {/* Buy / Rent Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setSearchMode('sale')}
                  className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-md transition-all ${
                    searchMode === 'sale'
                      ? 'bg-white text-[#1A1A1A] shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode('rent')}
                  className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-md transition-all ${
                    searchMode === 'rent'
                      ? 'bg-white text-[#1A1A1A] shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Rent
                </button>
              </div>
              <span className="text-xs text-neutral-500 hidden sm:inline">
                Instant Lagos Property Search
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Location Dropdown */}
              <div>
                <label htmlFor="heroLocation" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Location
                </label>
                <select
                  id="heroLocation"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs font-medium border border-neutral-200 rounded-md bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                >
                  <option value="all">All Locations (Lagos)</option>
                  <option value="Ikoyi">Ikoyi & Banana Island</option>
                  <option value="Victoria Island">Victoria Island</option>
                  <option value="Lekki Phase 1">Lekki Phase 1</option>
                  <option value="Ajah">Ajah & Sangotedo</option>
                  <option value="Ikeja GRA">Ikeja GRA (Mainland)</option>
                  <option value="Yaba">Yaba</option>
                  <option value="Surulere">Surulere</option>
                  <option value="Ibeju-Lekki">Ibeju-Lekki (Free Zone)</option>
                </select>
              </div>

              {/* Property Type Dropdown */}
              <div>
                <label htmlFor="heroType" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Property Type
                </label>
                <select
                  id="heroType"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs font-medium border border-neutral-200 rounded-md bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                >
                  <option value="all">All Types</option>
                  <option value="flat">Apartments & Flats</option>
                  <option value="duplex">Duplexes</option>
                  <option value="terrace">Terraces</option>
                  <option value="detached">Detached Houses</option>
                  <option value="land">Land Plots</option>
                  <option value="commercial">Commercial Spaces</option>
                </select>
              </div>

              {/* Price Range Dropdown */}
              <div>
                <label htmlFor="heroPrice" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
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
                  className="w-full py-2.5 px-4 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
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
          SECTION 3: TRUST STRIP
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Key agency statistics">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 py-8 px-6 bg-white rounded-xl border border-[#E5E5E0] shadow-xs">
          {landingConfig.trustStats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tabular-nums tracking-tight block">
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

      {/* =========================================================================
          SECTION 4: FEATURED DEVELOPMENTS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            kicker="Off-Plan & Prime Estates"
            title="Featured Developments"
            subtitle="Curated multi-unit residential projects in Victoria Island, Ikoyi, and Lekki with milestone payment structures."
          />
          <Link
            to="/developments"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] hover:text-[#0B4638] transition-colors shrink-0"
          >
            <span>View All Developments</span>
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
          SECTION 5: FEATURED PROPERTIES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            kicker="Handpicked Mandates"
            title="Featured Properties"
            subtitle="Verified residential sales, executive rentals, and commercial assets ready for immediate inspection."
          />
          <Link
            to="/properties"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] hover:text-[#0B4638] transition-colors shrink-0"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Property Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
          >
            <span>Browse Full Property Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
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
            title="How It Works"
            subtitle="Whether buying from the UK, renting as an expat, or investing locally, our structured 3-step workflow eliminates ambiguity."
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

            <div className={`${landingConfig.howItWorksImage ? 'lg:col-span-7' : 'lg:col-span-12'} grid grid-cols-1 sm:grid-cols-3 gap-6`}>
              {HOW_IT_WORKS_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="relative p-6 bg-[#FAFAF8] rounded-xl border border-[#E5E5E0] space-y-3"
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
          SECTION 7: SERVICES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            kicker="Our Core Competencies"
            title="Advisory & Brokerage Services"
            subtitle="Tailored representation for buyers, landlords, developers, and diaspora capital."
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
          {SERVICES_DATA.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-xl border border-[#E5E5E0] p-6 flex flex-col justify-between hover:border-neutral-400 transition-colors"
            >
              <div className="space-y-2.5">
                <h3 className="text-base font-bold text-[#1A1A1A]">
                  {srv.title}
                </h3>
                <p className="text-xs text-neutral-500 font-medium leading-snug">
                  {srv.tagline}
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed pt-2 line-clamp-3">
                  {srv.description}
                </p>
              </div>
              <div className="pt-6">
                <Link
                  to={`/services#${srv.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] hover:text-[#0B4638]"
                >
                  <span>Learn More</span>
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
          title="Why Serious Clients Choose Bahams"
          subtitle="Real estate transactions in Lagos demand uncompromising local verification and corporate accountability."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_BAHAMS_POINTS.map((pt) => (
              <div
                key={pt.number}
                className="bg-white p-6 rounded-xl border border-[#E5E5E0] space-y-2.5"
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
          SECTION 9: TESTIMONIALS (Realistic Placeholders)
          ========================================================================= */}
      <section className="bg-neutral-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
              Verified Client Experiences
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Trusted by Local Leaders & Global Diaspora
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-neutral-800/80 border border-neutral-700/80 rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Star Rating */}
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

          <p className="text-center text-xs text-neutral-500 font-mono">
            Verified review records maintained on file at Bahams Realty.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: CTA BAND
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F5C4A] rounded-2xl p-8 sm:p-12 lg:p-16 text-white text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Ready to find your place in Lagos?
            </h2>
            <p className="text-sm sm:text-base text-neutral-100 leading-relaxed [text-wrap:balance]">
              Speak directly with an experienced property advisor on Admiralty Way, Lekki. We will curate a shortlist matching your exact specifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={whatsappHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white text-[#0F5C4A] hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-md inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#0F5C4A]" />
              <span>Connect on WhatsApp</span>
            </a>
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-[#0B4638] hover:bg-black/20 text-white border border-white/30 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors inline-flex items-center gap-2"
            >
              <span>Send an Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
