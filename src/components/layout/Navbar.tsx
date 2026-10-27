import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MessageCircle,
  Menu,
  X,
  Heart,
  Phone,
  MapPin,
  Trash2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '../../utils/whatsapp.ts';
import { useData } from '../../context/DataContext.tsx';
import { formatNaira } from '../../utils/formatters.ts';
import { SafeImage } from '../common/SafeImage.tsx';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shortlistOpen, setShortlistOpen] = useState(false);
  const location = useLocation();
  const { properties, favorites, toggleFavorite } = useData();

  const savedProperties = properties.filter((p) => favorites.includes(p.id));
  const totalShortlistValue = savedProperties.reduce((acc, p) => acc + p.price, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and shortlist drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShortlistOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu or shortlist drawer is open
  useEffect(() => {
    if (mobileMenuOpen || shortlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, shortlistOpen]);

  const navLinks = [
    { label: 'Properties', path: '/properties' },
    { label: 'Developments', path: '/developments' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage());

  const shortlistWhatsAppMessage =
    savedProperties.length > 0
      ? `Hello Bahams Realty, I have shortlisted ${savedProperties.length} properties on your website:\n${savedProperties
          .map((p, idx) => `${idx + 1}. ${p.title} (${p.location}) - ${formatNaira(p.price, p.mode === 'rent')} [Ref: ${p.id}]`)
          .join('\n')}\n\nI would like to schedule viewings or receive due diligence files for these listings.`
      : getGeneralWhatsAppMessage();

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAFAF8]/95 backdrop-blur-md shadow-xs border-b border-[#E5E5E0]'
            : 'bg-[#FAFAF8] border-b border-[#E5E5E0]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
            {/* Zone 1: Brand Wordmark (Single clean text element) */}
            <Link
              to="/"
              className="text-base sm:text-xl font-bold tracking-[0.18em] text-[#1A1A1A] uppercase whitespace-nowrap shrink-0 hover:text-[#0F5C4A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4A] rounded"
            >
              Bahams Realty
            </Link>

            {/* Zone 2: Navigation Links (Desktop - 5 primary public links) */}
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-7 text-sm font-medium text-[#1A1A1A]/80"
            >
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0F5C4A] py-1 relative ${
                      isActive ? 'text-[#0F5C4A] font-semibold' : ''
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0F5C4A] rounded-full transition-all" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Shortlist / Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Interactive Shortlist Drawer Trigger */}
              <button
                type="button"
                onClick={() => setShortlistOpen(true)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs border rounded-md transition-all cursor-pointer ${
                  favorites.length > 0
                    ? 'text-neutral-900 border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/80'
                    : 'text-neutral-600 hover:text-neutral-900 border-neutral-200 bg-white'
                }`}
                title="View Saved Property Shortlist"
                aria-label={`Saved properties shortlist (${favorites.length})`}
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-transform ${
                    favorites.length > 0
                      ? 'fill-red-500 text-red-500 scale-110'
                      : 'text-neutral-400'
                  }`}
                />
                <span className="tabular-nums font-semibold">{favorites.length}</span>
                <span className="hidden lg:inline text-[11px] font-medium">Saved</span>
              </button>

              {/* Desktop WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-[#0F5C4A] hover:bg-[#0B4638] active:scale-[0.99] rounded-md transition-all whitespace-nowrap shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4A]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              {/* Compact Mobile WhatsApp Icon */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp Advisory"
                className="sm:hidden p-2 text-white bg-[#0F5C4A] hover:bg-[#0B4638] rounded-md shadow-xs transition-colors"
              >
                <MessageCircle className="w-5 h-5 fill-white text-white" />
              </a>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-neutral-700 hover:text-[#1A1A1A] hover:bg-neutral-100 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4A]"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Full-screen Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 md:hidden bg-black/40 backdrop-blur-xs flex flex-col justify-start">
            <div className="bg-[#FAFAF8] border-b border-[#E5E5E0] shadow-2xl px-5 py-6 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  E Kaabo · Lagos Advisory
                </span>
                <span className="text-[11px] font-semibold text-[#0F5C4A] bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Ikoyi · VI · Lekki
                </span>
              </div>

              <nav className="flex flex-col space-y-1.5" aria-label="Mobile Menu Directory">
                {navLinks.map((link) => {
                  const isActive =
                    location.pathname === link.path ||
                    (link.path !== '/' && location.pathname.startsWith(link.path));
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#0F5C4A] text-white font-semibold shadow-xs'
                          : 'text-neutral-800 hover:bg-neutral-100'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-xs opacity-60">→</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Corridor Shortcuts on Mobile */}
              <div className="pt-2 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  Popular Lagos Corridors
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Ikoyi', 'Victoria Island', 'Lekki Phase 1', 'Ikeja GRA', 'Ibeju-Lekki'].map(
                    (loc) => (
                      <Link
                        key={loc}
                        to={`/properties?location=${encodeURIComponent(loc)}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-2.5 py-1 text-xs font-medium bg-white border border-neutral-200 rounded-md text-neutral-700 hover:border-[#0F5C4A] hover:text-[#0F5C4A]"
                      >
                        {loc}
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Quick Contact Desk */}
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <div className="space-y-1.5 text-xs text-neutral-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#0F5C4A] shrink-0 mt-0.5" />
                    <span>14A Admiralty Way, Lekki Phase 1, Lagos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#0F5C4A] shrink-0" />
                    <a
                      href="tel:+2349167149677"
                      className="font-semibold text-neutral-900 underline"
                    >
                      +234 916 714 9677
                    </a>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-xs font-bold tracking-wider uppercase text-white bg-[#0F5C4A] hover:bg-[#0B4638] rounded-lg transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Lagos Advisory on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          SLIDE-OVER SHORTLIST / SAVED PROPERTIES DRAWER
          ========================================================================= */}
      {shortlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-fadeIn">
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-red-500" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1A1A1A]">
                    Your Lagos Property Shortlist
                  </h2>
                  <p className="text-xs text-neutral-500">
                    {savedProperties.length}{' '}
                    {savedProperties.length === 1 ? 'residence' : 'residences'} saved for review
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShortlistOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-md"
                aria-label="Close shortlist drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {savedProperties.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-neutral-800">
                      No Shortlisted Properties Yet
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                      Tap the heart icon on any Ikoyi, Victoria Island, or Lekki property to build your personal inspection shortlist.
                    </p>
                  </div>
                  <Link
                    to="/properties"
                    onClick={() => setShortlistOpen(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F5C4A] text-white text-xs font-semibold uppercase tracking-wider rounded-md"
                  >
                    <span>Explore Properties</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                savedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="flex items-start gap-3.5 p-3 rounded-xl border border-neutral-200 bg-[#FAFAF8] hover:border-neutral-300 transition-colors"
                  >
                    <Link
                      to={`/properties/${prop.id}`}
                      onClick={() => setShortlistOpen(false)}
                      className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-200 shrink-0"
                    >
                      <SafeImage
                        src={prop.images[0]}
                        alt={prop.title}
                        containerClassName="w-full h-full"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F5C4A]">
                        {prop.location} · {prop.id}
                      </span>
                      <Link
                        to={`/properties/${prop.id}`}
                        onClick={() => setShortlistOpen(false)}
                        className="block font-bold text-xs text-neutral-900 hover:text-[#0F5C4A] line-clamp-1 mt-0.5"
                      >
                        {prop.title}
                      </Link>
                      <p className="text-sm font-extrabold text-[#1A1A1A] tabular-nums mt-1">
                        {formatNaira(prop.price, prop.mode === 'rent')}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Link
                          to={`/properties/${prop.id}`}
                          onClick={() => setShortlistOpen(false)}
                          className="text-[11px] font-semibold text-[#0F5C4A] hover:underline"
                        >
                          View Details →
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(prop.id)}
                          className="text-neutral-400 hover:text-red-600 p-1"
                          title="Remove from shortlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {savedProperties.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-neutral-200 bg-[#FAFAF8] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">Combined Guide Value:</span>
                  <span className="font-bold text-sm text-[#1A1A1A] tabular-nums font-mono">
                    {formatNaira(totalShortlistValue)}
                  </span>
                </div>
                <a
                  href={getWhatsAppUrl(shortlistWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book Inspection for Shortlist on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
