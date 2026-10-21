import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Bed,
  Bath,
  Maximize2,
  Car,
  Calendar,
  MapPin,
  Check,
  MessageCircle,
  Phone,
  Mail,
  ShieldCheck,
  ArrowLeft,
  Share2,
  Maximize,
} from 'lucide-react';
import { PROPERTIES_DATA } from '../data/mockData.ts';
import { SafeImage } from '../components/common/SafeImage.tsx';
import { LightboxModal } from '../components/gallery/LightboxModal.tsx';
import { PropertyCard } from '../components/property/PropertyCard.tsx';
import { formatNaira, formatBeds, formatBaths, formatSqm } from '../utils/formatters.ts';
import { getWhatsAppUrl, getPropertyWhatsAppMessage } from '../utils/whatsapp.ts';
import { useUI } from '../context/UIContext.tsx';
import { useData } from '../context/DataContext.tsx';

export const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openInspectionModal, setIsModalOpen } = useUI();
  const { properties } = useData();

  const property = properties.find((p) => p.id === id || p.slug === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
  }, [id]);

  // Synchronize modal state to hide floating WhatsApp button
  useEffect(() => {
    setIsModalOpen(isLightboxOpen);
  }, [isLightboxOpen, setIsModalOpen]);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">Property Not Found</h2>
        <p className="text-sm text-neutral-600">
          The requested listing could not be found or has been withdrawn.
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F5C4A] text-white text-xs font-semibold uppercase tracking-wider rounded-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Properties</span>
        </Link>
      </div>
    );
  }

  const isRent = property.mode === 'rent';
  const whatsappUrl = getWhatsAppUrl(getPropertyWhatsAppMessage(property));

  // 3 similar properties in same location or same type
  const similarProperties = PROPERTIES_DATA.filter(
    (p) => p.id !== property.id && (p.location === property.location || p.type === property.type)
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: property.title,
          text: `${property.title} in ${property.location} - Bahams Realty`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-neutral-900 transition-colors">
            Properties
          </Link>
          <span>/</span>
          <span className="text-neutral-800 font-medium truncate max-w-[200px] sm:max-w-md">
            {property.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
          <span className="font-mono bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-[11px]">
            Ref: {property.id}
          </span>
        </div>
      </div>

      {/* Main Gallery Section */}
      <div className="space-y-3">
        {/* Main Large Visual */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsLightboxOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsLightboxOpen(true);
            }
          }}
          className="relative aspect-16/9 sm:aspect-21/9 rounded-xl overflow-hidden cursor-pointer group bg-neutral-100 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
          aria-label="Click to enlarge image gallery"
        >
          <SafeImage
            src={property.images[activeImageIndex]}
            alt={property.title}
            fallbackTitle={property.title}
            containerClassName="w-full h-full"
            className="group-hover:scale-102 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-white/95 text-[#0F5C4A] rounded shadow-xs">
              {property.status}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/75 hover:bg-black/90 text-white px-3 py-1.5 rounded-md text-xs font-medium backdrop-blur-xs flex items-center gap-1.5 transition-colors">
            <Maximize className="w-3.5 h-3.5" />
            <span>View All {property.images.length} Photos</span>
          </div>
        </div>

        {/* Thumbnails row */}
        {property.images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={img + idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 sm:w-28 aspect-16/10 rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIndex === idx
                    ? 'border-[#0F5C4A] shadow-xs'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                aria-label={`View photo ${idx + 1}`}
              >
                <SafeImage
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  containerClassName="w-full h-full"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Details Grid: Left Column Content + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-10">
          {/* Header & Title */}
          <div className="space-y-3 pb-6 border-b border-[#E5E5E0]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A]">
              <MapPin className="w-4 h-4" />
              <span>{property.location}, Lagos</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-500">{property.mode === 'sale' ? 'For Outright Sale' : 'Annual Lease'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1A1A1A] [text-wrap:balance]">
              {property.title}
            </h1>

            <p className="text-sm text-neutral-600 flex items-center gap-2">
              <span className="font-medium text-neutral-900">{property.address}</span>
            </p>

            {/* Mobile price indicator */}
            <div className="lg:hidden pt-2">
              <p className="text-2xl font-extrabold text-[#1A1A1A] tabular-nums">
                {formatNaira(property.price, isRent)}
              </p>
            </div>
          </div>

          {/* Key Facts Row */}
          <section aria-label="Key Facts" className="space-y-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-400">
              Key Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 p-4 bg-white rounded-xl border border-[#E5E5E0] shadow-xs text-xs">
              <div className="space-y-1">
                <span className="text-neutral-500 block">Bedrooms</span>
                <span className="font-bold text-neutral-900 flex items-center gap-1.5 text-sm">
                  <Bed className="w-4 h-4 text-[#0F5C4A]" />
                  {formatBeds(property.bedrooms)}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block">Bathrooms</span>
                <span className="font-bold text-neutral-900 flex items-center gap-1.5 text-sm">
                  <Bath className="w-4 h-4 text-[#0F5C4A]" />
                  {formatBaths(property.bathrooms)}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block">Property Size</span>
                <span className="font-bold text-neutral-900 flex items-center gap-1.5 text-sm">
                  <Maximize2 className="w-4 h-4 text-[#0F5C4A]" />
                  {formatSqm(property.sizeSqm)}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block">Parking</span>
                <span className="font-bold text-neutral-900 flex items-center gap-1.5 text-sm">
                  <Car className="w-4 h-4 text-[#0F5C4A]" />
                  {property.parkingSpaces ? `${property.parkingSpaces} Cars` : 'Street'}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block">Completed</span>
                <span className="font-bold text-neutral-900 flex items-center gap-1.5 text-sm">
                  <Calendar className="w-4 h-4 text-[#0F5C4A]" />
                  {property.yearBuilt}
                </span>
              </div>
            </div>
          </section>

          {/* Description Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[#1A1A1A]">
              Property Overview & Architectural Highlights
            </h2>
            <div className="text-sm text-neutral-700 leading-relaxed space-y-4">
              <p>{property.description}</p>
              <p>
                Inspected and fully vetted under the Bahams Realty compliance protocol. All structural,
                electrical, and drainage provisions have been verified on-site. Documentation
                including Governor’s Consent and registered title deeds are accessible for legal verification.
              </p>
            </div>
          </section>

          {/* Features / Amenities Simple List */}
          <section className="space-y-4 pt-6 border-t border-[#E5E5E0]">
            <h2 className="text-lg font-bold text-[#1A1A1A]">
              Features & Amenities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-800">
              {property.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#0F5C4A]/10 text-[#0F5C4A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Location Section with Google Maps Embed Placeholder */}
          <section className="space-y-4 pt-6 border-t border-[#E5E5E0]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">
                  Location & Neighborhood
                </h2>
                <p className="text-xs text-neutral-500">
                  {property.address} · {property.location}, Lagos
                </p>
              </div>
              <span className="text-xs font-mono text-[#0F5C4A] bg-[#0F5C4A]/10 px-2.5 py-1 rounded">
                Verified Address
              </span>
            </div>

            <div className="w-full h-72 rounded-xl overflow-hidden border border-[#E5E5E0] bg-neutral-100">
              <iframe
                title={`Map of ${property.location}, Lagos`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  property.mapQuery
                )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </section>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: STICKY SIDEBAR
            ========================================================================= */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-[#E5E5E0] p-6 space-y-6 shadow-sm sticky top-24">
            {/* Price Box */}
            <div className="pb-5 border-b border-neutral-100">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Guide Price
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tabular-nums tracking-tight mt-1">
                {formatNaira(property.price, isRent)}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#0F5C4A] font-medium mt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Clean Title · Direct Mandate</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              {/* WhatsApp CTA pre-fills the exact required format */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Book an Inspection Button */}
              <button
                type="button"
                onClick={() =>
                  openInspectionModal({
                    title: property.title,
                    location: property.location,
                    id: property.id,
                  })
                }
                className="w-full py-3.5 px-4 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                Book an Inspection
              </button>
            </div>

            {/* Assigned Listing Agent Card */}
            <div className="pt-4 border-t border-neutral-100 space-y-3">
              <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 block">
                Assigned Advisory Lead
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                  <SafeImage
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    containerClassName="w-full h-full"
                    className="object-cover"
                  />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-neutral-900">{property.agent.name}</p>
                  <p className="text-neutral-500">{property.agent.role}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#0F5C4A]" />
                  <span>{property.agent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#0F5C4A]" />
                  <span>{property.agent.email}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 text-[11px] text-neutral-500 leading-relaxed">
              Bahams Realty clients receive private inspection transport upon request from our Lekki office.
            </div>
          </div>
        </aside>
      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <section className="pt-12 border-t border-[#E5E5E0] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                Similar Verified Properties
              </h2>
              <p className="text-xs text-neutral-500">
                Other prime listings in {property.location} and comparable Lagos districts
              </p>
            </div>
            <Link
              to="/properties"
              className="text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] hover:underline"
            >
              Browse All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={property.images}
        currentIndex={activeImageIndex}
        onSelectIndex={setActiveImageIndex}
        title={property.title}
      />
    </div>
  );
};
