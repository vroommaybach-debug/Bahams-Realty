import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Building2,
  Building,
  Compass,
  PhoneCall,
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  // Hide mobile public bottom bar when inside the private /admin route
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const tabs = [
    { to: '/', label: 'Home', icon: Home, end: true },
    { to: '/properties', label: 'Properties', icon: Building2, end: false },
    { to: '/developments', label: 'Projects', icon: Building, end: false },
    { to: '/services', label: 'Services', icon: Compass, end: false },
    { to: '/contact', label: 'Contact', icon: PhoneCall, end: false },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E5E0] md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full transition-colors relative ${
                  isActive ? 'text-[#0F5C4A]' : 'text-neutral-500 hover:text-neutral-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#0F5C4A] rounded-full" />
                  )}
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                  <span
                    className={`text-[10px] mt-1 tracking-tight ${
                      isActive ? 'font-bold text-[#0F5C4A]' : 'font-medium'
                    }`}
                  >
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
