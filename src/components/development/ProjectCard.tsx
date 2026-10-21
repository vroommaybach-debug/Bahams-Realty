import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import { Development } from '../../types/index.ts';
import { SafeImage } from '../common/SafeImage.tsx';
import { formatNaira } from '../../utils/formatters.ts';
import { getWhatsAppUrl, getDevelopmentWhatsAppMessage } from '../../utils/whatsapp.ts';

interface ProjectCardProps {
  development: Development;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ development }) => {
  const whatsappUrl = getWhatsAppUrl(getDevelopmentWhatsAppMessage(development));

  const getStatusColor = (status: Development['status']) => {
    switch (status) {
      case 'Off-plan':
        return 'bg-amber-600 text-white';
      case 'Selling Fast':
        return 'bg-[#0F5C4A] text-white';
      case 'Ready':
        return 'bg-neutral-900 text-white';
      default:
        return 'bg-neutral-800 text-white';
    }
  };

  return (
    <article className="group bg-white rounded-lg border border-[#E5E5E0] overflow-hidden flex flex-col hover:border-neutral-400 hover:shadow-md transition-all duration-300">
      {/* Development Hero Visual */}
      <Link
        to={`/developments/${development.id}`}
        className="block relative aspect-16/10 overflow-hidden bg-neutral-100"
        tabIndex={-1}
        aria-hidden="true"
      >
        <SafeImage
          src={development.images[0]}
          alt={development.name}
          fallbackTitle={development.name}
          containerClassName="w-full h-full"
          className="group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded shadow-xs ${getStatusColor(
              development.status
            )}`}
          >
            {development.status}
          </span>
        </div>

        {/* Units count tag */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-[11px] font-medium bg-black/60 backdrop-blur-xs text-white rounded">
            {development.unitTypes.length} Unit Types
          </span>
        </div>

        {/* Location tag on image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs font-medium">
            <MapPin className="w-3 h-3 text-[#FAFAF8]" />
            <span>{development.location}</span>
          </span>
          <span className="text-[11px] font-mono opacity-80 bg-black/40 px-1.5 py-0.5 rounded">
            Ref: {development.id}
          </span>
        </div>
      </Link>

      {/* Development Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="mb-2">
            <span className="text-xs text-neutral-500 block uppercase tracking-wider">
              Starting From
            </span>
            <p className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tabular-nums tracking-tight">
              {formatNaira(development.startingPrice)}
            </p>
          </div>

          <h3 className="text-lg font-semibold text-[#1A1A1A] group-hover:text-[#0F5C4A] transition-colors line-clamp-1 mb-1">
            <Link to={`/developments/${development.id}`} className="focus:outline-none focus:underline">
              {development.name}
            </Link>
          </h3>

          <p className="text-xs text-neutral-500 mb-3">
            {development.address} · By {development.developer}
          </p>

          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
            {development.overview}
          </p>

          {/* Unit configuration summary */}
          <div className="bg-neutral-50 rounded p-3 border border-neutral-100 text-xs text-neutral-600 space-y-1">
            <span className="font-semibold text-neutral-800 block text-[11px] uppercase tracking-wider">
              Available Configurations:
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-neutral-600">
              {development.unitTypes.map((u) => (
                <span key={u.type} className="inline-flex items-center gap-1">
                  <span>•</span>
                  <span>{u.type}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          <Link
            to={`/developments/${development.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#0F5C4A] transition-colors py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0F5C4A]"
          >
            <span>Explore Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Enquire about this development on WhatsApp"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] bg-[#0F5C4A]/10 hover:bg-[#0F5C4A] hover:text-white rounded transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4A]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </article>
  );
};
