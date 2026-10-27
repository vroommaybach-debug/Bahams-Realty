import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { OFFICE_DETAILS } from '../../data/mockData.ts';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '../../utils/whatsapp.ts';
import { AfrocentricDivider } from '../common/AfrocentricPattern.tsx';

export const Footer: React.FC = () => {
  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage());

  return (
    <footer className="bg-[#141413] text-[#FAFAF8] border-t border-neutral-800 pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-10">
          <AfrocentricDivider variant="emerald" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="text-xl font-bold tracking-[0.2em] text-[#FAFAF8] uppercase block hover:text-[#0F5C4A] transition-colors"
            >
              Bahams Realty
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Full-service real estate advisory and development brokerage headquartered in Lekki Phase 1, Lagos, Nigeria.
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
                <Link to="/properties?location=Ikoyi" className="hover:text-white transition-colors">
                  Old Ikoyi & Banana Island
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Victoria%20Island" className="hover:text-white transition-colors">
                  Victoria Island & Eko Atlantic
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Lekki%20Phase%201" className="hover:text-white transition-colors">
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

        {/* Bottom bar - Clean public legal & regulatory strip with zero admin link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 text-center sm:text-left">
          <p>© 2026 Bahams Realty Lagos. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <span>RC: {OFFICE_DETAILS.registrationNumber}</span>
            <span aria-hidden="true">·</span>
            <span>LASRERA & NIESV Aligned Practice</span>
            <span aria-hidden="true">·</span>
            <span>Lagos Land Registry Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
