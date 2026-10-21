import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { OFFICE_DETAILS } from '../../data/mockData.ts';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '../../utils/whatsapp.ts';

export const Footer: React.FC = () => {
  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage());

  return (
    <footer className="bg-[#141413] text-[#FAFAF8] border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Full-service real estate advisory and development brokerage based in Lagos, Nigeria.
              Trusted by discerning local buyers and diaspora investors across London, Dubai, and North America.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] hover:text-[#18856c] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Advisory: +234 916 714 9677</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400">
              Browse Listings
            </h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <Link to="/properties?mode=sale" className="hover:text-white transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link to="/properties?mode=rent" className="hover:text-white transition-colors">
                  Luxury Rentals & Lettings
                </Link>
              </li>
              <li>
                <Link to="/developments" className="hover:text-white transition-colors">
                  Off-Plan Developments
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Ikoyi" className="hover:text-white transition-colors">
                  Ikoyi & Banana Island
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Victoria%20Island" className="hover:text-white transition-colors">
                  Victoria Island Waterfront
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Lekki%20Phase%201" className="hover:text-white transition-colors">
                  Lekki Phase 1 Prime
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate & Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-400">
              Company
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
                  Diaspora Investment Desk
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
              Lagos Office
            </h3>
            <div className="space-y-2.5 text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0F5C4A] shrink-0 mt-0.5" />
                <span className="leading-snug">{OFFICE_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0F5C4A] shrink-0" />
                <span>{OFFICE_DETAILS.displayPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0F5C4A] shrink-0" />
                <span className="text-xs sm:text-sm">{OFFICE_DETAILS.email}</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 pt-1 leading-relaxed">
              {OFFICE_DETAILS.workingHours.weekdays}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 Bahams Realty. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>RC: {OFFICE_DETAILS.registrationNumber}</span>
            <span aria-hidden="true">·</span>
            <span>Regulated Lagos Real Estate Practice</span>
            <span aria-hidden="true">·</span>
            <Link to="/admin" className="text-neutral-400 hover:text-white transition-colors">
              Operations Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
