import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useUI } from '../../context/UIContext.tsx';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '../../utils/whatsapp.ts';

export const WhatsAppButton: React.FC = () => {
  const { isModalOpen } = useUI();
  const location = useLocation();

  // Hide floating WhatsApp button on admin console or when any modal is open
  if (isModalOpen || location.pathname.startsWith('/admin')) {
    return null;
  }

  const defaultUrl = getWhatsAppUrl(getGeneralWhatsAppMessage());

  return (
    <aside aria-label="WhatsApp quick chat" className="hidden sm:block fixed bottom-6 right-6 z-40">
      <a
        href={defaultUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Bahams Realty on WhatsApp"
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#0F5C4A] hover:bg-[#0B4638] text-white rounded-full shadow-lg transition-all duration-300 whatsapp-pulse focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] focus:ring-offset-2"
      >
        <MessageCircle className="w-5 h-5 text-white fill-white/20 transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline-block text-xs font-semibold tracking-wide uppercase">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
};
