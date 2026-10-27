import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Building2,
  Building,
  MessageCircle,
  Compass,
} from 'lucide-react';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '../../utils/whatsapp.ts';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage());

  // Hide mobile public bottom bar when inside the private /admin route
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E5E0] md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* 1. Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center h-full transition-colors ${
              isActive ? 'text-[#0F5C4A]' : 'text-neutral-500 hover:text-neutral-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Home className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                Home
              </span>
            </>
          )}
        </NavLink>

        {/* 2. Properties */}
        <NavLink
          to="/properties"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center h-full transition-colors ${
              isActive ? 'text-[#0F5C4A]' : 'text-neutral-500 hover:text-neutral-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Building2 className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                Properties
              </span>
            </>
          )}
        </NavLink>

        {/* 3. Developments */}
        <NavLink
          to="/developments"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center h-full transition-colors ${
              isActive ? 'text-[#0F5C4A]' : 'text-neutral-500 hover:text-neutral-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Building className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                Projects
              </span>
            </>
          )}
        </NavLink>

        {/* 4. Advisory Services */}
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center h-full transition-colors ${
              isActive ? 'text-[#0F5C4A]' : 'text-neutral-500 hover:text-neutral-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Compass className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                Services
              </span>
            </>
          )}
        </NavLink>

        {/* 5. WhatsApp Quick Advisory */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full text-emerald-700 hover:text-emerald-800 transition-colors"
          title="Direct WhatsApp Advisory"
        >
          <div className="w-8 h-8 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center shadow-xs">
            <MessageCircle className="w-4 h-4 fill-white text-white" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold text-[#0F5C4A]">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
