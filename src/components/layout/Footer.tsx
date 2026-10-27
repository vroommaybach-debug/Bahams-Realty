import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { OFFICE_DETAILS } from '../../data/mockData.ts';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '../../utils/whatsapp.ts';
import { AfrocentricDivider } from '../common/AfrocentricPattern.tsx';
import { BahamsLogo } from '../common/BahamsLogo.tsx';

export const Footer: React.FC = () => {
  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage());

  return (
    <footer className="bg-[#141413] text-[#FAFAF8] border-t border-neutral-800 pt-12 pb-36 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-10">
          <AfrocentricDivider variant="emerald" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <BahamsLogo variant="light" showTagline />
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Full-service real estate advisory and development brokerage headquartered in Lekki Phase 1, Lagos, Nigeria (bahamasrealty.com.ng).
              Trusted by discerning Nigerian families, corporate institutions, and global diaspora investors across London, Houston, Toronto, and Dubai.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-emerald-400/90 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>C of O & Governor’s Consent Verified Practice</span>
            </div>
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Advisory: +234 916 714 9677</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400">
              Lagos Portfolios
            </h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <Link to="/properties?mode=sale" className="hover:text-white transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link to="/properties?mode=rent" className="hover:text-white transition-colors">
                  Executive Rentals & Lettings
                </Link>
              </li>
              <li>
                <Link to="/developments" className="hover:text-white transition-colors">
                  Off-Plan Developments
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?location=Ikoyi"
                  className="hover:text-white transition-colors"
                >
                  Old Ikoyi & Banana Island
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?location=Victoria%20Island"
                  className="hover:text-white transition-colors"
                >
                  Victoria Island & Eko Atlantic
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?location=Lekki%20Phase%201"
                  className="hover:text-white transition-colors"
                >
                  Lekki Phase 1 & Admiralty
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate & Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400">
              Advisory Practice
            </h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Our Advisory Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Bahams Realty
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Schedule an Inspection
                </Link>
              </li>
              <li>
                <Link to="/services#off-plan" className="hover:text-white transition-colors">
                  Diaspora Concierge Desk
                </Link>
              </li>
              <li>
                <a
                  href={OFFICE_DETAILS.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400">
              Lagos Headquarters
            </h3>
            <div className="space-y-2.5 text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0F5C4A] shrink-0 mt-0.5" />
                <span className="leading-snug">{OFFICE_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0F5C4A] shrink-0" />
                <a href="tel:+2349167149677" className="hover:text-white transition-colors">
                  {OFFICE_DETAILS.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0F5C4A] shrink-0" />
                <span className="text-xs sm:text-sm break-all">{OFFICE_DETAILS.email}</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 pt-1 leading-relaxed">
              {OFFICE_DETAILS.workingHours.weekdays}
            </p>
          </div>
        </div>

        {/* Bottom Legal, RC Number & "Imagined by June Studios" Signature Bar */}
        <div className="pt-8 pb-4 md:pb-2 lg:pr-44 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            <span className="text-neutral-300 font-medium">
              © 2026 Bahams Realty, Lagos. All rights reserved.
            </span>
            <span aria-hidden="true" className="text-neutral-600">
              ·
            </span>
            <span className="font-mono text-neutral-300">
              RC: {OFFICE_DETAILS.registrationNumber}
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-neutral-600">
              ·
            </span>
            <span className="hidden sm:inline">LASRERA & NIESV Aligned Practice</span>
          </div>

          {/* Special Brand Curation Signature Panel */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-[#E8D399]/30 text-[#FAFAF8] shadow-xs shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#E8D399] shrink-0" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-200">
              Imagined by <span className="text-[#E8D399] font-bold">June Studios</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
