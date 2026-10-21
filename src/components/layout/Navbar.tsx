import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X, Shield, Heart, Phone, MapPin, ExternalLink } from 'lucide-react';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '../../utils/whatsapp.ts';
import { useData } from '../../context/DataContext.tsx';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useData();

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Properties', path: '/properties' },
    { label: 'Developments', path: '/developments' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage());

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAFAF8]/95 backdrop-blur-md shadow-xs border-b border-[#E5E5E0]'
          : 'bg-[#FAFAF8] border-b border-[#E5E5E0]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="text-base sm:text-xl font-bold tracking-[0.18em] text-[#1A1A1A] uppercase whitespace-nowrap shrink-0 hover:text-[#0F5C4A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4A] rounded"
          >
            Bahams Realty
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#1A1A1A]/80">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
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
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0F5C4A] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Admin Console Link */}
            <Link
              to="/admin"
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0F5C4A] py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                location.pathname === '/admin' ? 'text-[#0F5C4A] font-bold' : 'text-neutral-500'
              }`}
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Wishlist Link if items saved */}
            {favorites.length > 0 && (
              <Link
                to="/properties"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded-md bg-white"
                title={`${favorites.length} saved properties`}
              >
                <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                <span className="tabular-nums font-semibold">{favorites.length}</span>
              </Link>
            )}

            {/* Desktop WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-[#0F5C4A] hover:bg-[#0B4638] rounded-md transition-colors whitespace-nowrap shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4A]"
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
          <div className="bg-[#FAFAF8] border-b border-[#E5E5E0] shadow-2xl px-6 py-6 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Menu & Directory
              </span>
              <span className="text-[11px] font-semibold text-[#0F5C4A] bg-emerald-50 px-2 py-0.5 rounded">
                Lagos, Nigeria
              </span>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-colors ${
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

              <div className="pt-2">
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    location.pathname === '/admin'
                      ? 'bg-[#0F5C4A] text-white'
                      : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#0F5C4A]" />
                    <span>Admin Operations Portal</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </div>
            </nav>

            {/* Quick Contact Desk */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0F5C4A] shrink-0 mt-0.5" />
                  <span>14A Admiralty Way, Lekki Phase 1, Lagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#0F5C4A] shrink-0" />
                  <a href="tel:+2349167149677" className="font-semibold text-neutral-900 underline">
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
  );
};
