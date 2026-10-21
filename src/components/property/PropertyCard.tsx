import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize2, MapPin, MessageCircle, ArrowRight, Heart } from 'lucide-react';
import { Property } from '../../types/index.ts';
import { SafeImage } from '../common/SafeImage.tsx';
import { formatNaira, formatBeds, formatBaths, formatSqm } from '../../utils/formatters.ts';
import { getWhatsAppUrl, getPropertyWhatsAppMessage } from '../../utils/whatsapp.ts';
import { useData } from '../../context/DataContext.tsx';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, viewMode = 'grid' }) => {
  const isRent = property.mode === 'rent';
  const whatsappUrl = getWhatsAppUrl(getPropertyWhatsAppMessage(property));
  const { isFavorite, toggleFavorite } = useData();
  const favorite = isFavorite(property.id);

  if (viewMode === 'list') {
    return (
      <article className="group bg-white rounded-xl border border-[#E5E5E0] overflow-hidden flex flex-col sm:flex-row hover:border-neutral-400 hover:shadow-md transition-all duration-300">
        <div className="relative sm:w-72 sm:min-w-[280px] aspect-16/10 sm:aspect-auto overflow-hidden bg-neutral-100">
          <SafeImage
            src={property.images[0]}
            alt={property.title}
            fallbackTitle={property.title}
            containerClassName="w-full h-full"
            className="group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded ${
                property.status === 'Sold' || property.status === 'Let'
                  ? 'bg-neutral-800 text-neutral-200'
                  : 'bg-white/95 text-[#0F5C4A] shadow-xs'
              }`}
            >
              {property.status}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property.id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-600 transition-colors shadow-xs"
            aria-label={favorite ? 'Remove from saved' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <p className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tabular-nums tracking-tight">
                {formatNaira(property.price, isRent)}
              </p>
              <span className="text-[11px] font-mono text-neutral-400">Ref: {property.id}</span>
            </div>

            <h3 className="text-base font-semibold text-[#1A1A1A] group-hover:text-[#0F5C4A] transition-colors line-clamp-1 mb-1">
              <Link to={`/properties/${property.id}`} className="focus:outline-none focus:underline">
                {property.title}
              </Link>
            </h3>

            <p className="text-xs text-neutral-500 line-clamp-1 mb-3 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#0F5C4A]" />
              <span>{property.address}</span>
            </p>

            <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4 hidden sm:block">
              {property.description}
            </p>

            <div className="flex items-center gap-4 py-2 border-y border-neutral-100 text-xs text-neutral-600 font-medium tabular-nums">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-neutral-400" />
                  <span>{formatBeds(property.bedrooms)}</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-neutral-400" />
                  <span>{formatBaths(property.bathrooms)}</span>
                </div>
              )}
              {property.sizeSqm > 0 && (
                <div className="flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-neutral-400" />
                  <span>{formatSqm(property.sizeSqm)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between gap-3">
            <Link
              to={`/properties/${property.id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#0F5C4A] transition-colors py-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] bg-[#0F5C4A]/10 hover:bg-[#0F5C4A] hover:text-white rounded transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </article>
    );
  }

  // Grid view
  return (
    <article className="group bg-white rounded-lg border border-[#E5E5E0] overflow-hidden flex flex-col hover:border-neutral-400 hover:shadow-md transition-all duration-300">
      {/* Property Image Container */}
      <Link
        to={`/properties/${property.id}`}
        className="block relative aspect-16/10 overflow-hidden bg-neutral-100"
        tabIndex={-1}
        aria-hidden="true"
      >
        <SafeImage
          src={property.images[0]}
          alt={property.title}
          fallbackTitle={property.title}
          containerClassName="w-full h-full"
          className="group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Clean status badge in corner */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded ${
              property.status === 'Sold' || property.status === 'Let'
                ? 'bg-neutral-800 text-neutral-200'
                : 'bg-white/95 text-[#0F5C4A] shadow-xs'
            }`}
          >
            {property.status}
          </span>
        </div>

        {/* Heart Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          aria-label={favorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Location tag on image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs font-medium">
            <MapPin className="w-3 h-3 text-[#FAFAF8]" />
            <span className="truncate max-w-[180px]">{property.location}</span>
          </span>
          <span className="text-[11px] font-mono opacity-80 bg-black/40 px-1.5 py-0.5 rounded">
            Ref: {property.id}
          </span>
        </div>
      </Link>

      {/* Property Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="mb-2">
            <p className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tabular-nums tracking-tight">
              {formatNaira(property.price, isRent)}
            </p>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-[#1A1A1A] group-hover:text-[#0F5C4A] transition-colors line-clamp-1 mb-1.5">
            <Link to={`/properties/${property.id}`} className="focus:outline-none focus:underline">
              {property.title}
            </Link>
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1 mb-4">
            {property.address}
          </p>

          {/* Unboxed Metadata Specs */}
          <div className="flex items-center gap-4 py-3 border-y border-neutral-100 text-xs text-neutral-600 font-medium tabular-nums">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
                <Bed className="w-4 h-4 text-neutral-400" />
                <span>{formatBeds(property.bedrooms)}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
                <Bath className="w-4 h-4 text-neutral-400" />
                <span>{formatBaths(property.bathrooms)}</span>
              </div>
            )}
            {property.sizeSqm > 0 && (
              <div className="flex items-center gap-1.5" title={`${property.sizeSqm} Square Meters`}>
                <Maximize2 className="w-4 h-4 text-neutral-400" />
                <span>{formatSqm(property.sizeSqm)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 flex items-center justify-between gap-3">
          <Link
            to={`/properties/${property.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#0F5C4A] transition-colors py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0F5C4A]"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat about this property on WhatsApp"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] bg-[#0F5C4A]/10 hover:bg-[#0F5C4A] hover:text-white rounded transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4A]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
};
