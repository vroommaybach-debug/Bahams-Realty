import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  Compass,
  Plane,
  CheckCircle2,
  Building,
  Car,
  Briefcase,
} from 'lucide-react';
import { OFFICE_DETAILS } from '../data/mockData.ts';
import { ContactForm } from '../components/contact/ContactForm.tsx';
import { SectionHeading } from '../components/common/SectionHeading.tsx';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '../utils/whatsapp.ts';

export const ContactPage: React.FC = () => {
  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage());

  const departments = [
    {
      title: 'Luxury Residential Sales Desk',
      lead: 'Babatunde Alabi (Managing Partner)',
      phone: '+234 916 714 9677',
      email: 'sales@bahamsrealty.com',
      coverage: 'Old Ikoyi, Banana Island, Victoria Island, Lekki Phase 1',
    },
    {
      title: 'Prime Lettings & Corporate Leases',
      lead: 'Amara Nwosu (Head of Lettings)',
      phone: '+234 916 714 9677',
      email: 'lettings@bahamsrealty.com',
      coverage: 'Serviced penthouses, diplomatic compounds, corporate housing',
    },
    {
      title: 'Off-Plan & Developer Mandates',
      lead: 'Folake Ademola (Development Advisory)',
      phone: '+234 916 714 9677',
      email: 'developments@bahamsrealty.com',
      coverage: 'Multi-unit schemes, joint ventures, pre-construction equity',
    },
    {
      title: 'UK, US & UAE Diaspora Relations',
      lead: 'Chidiebere Okonkwo (Diaspora Desk)',
      phone: '+234 916 714 9677',
      email: 'diaspora@bahamsrealty.com',
      coverage: 'Remote closing, CBN FX remittances, power of attorney',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E5E5E0]">
        <SectionHeading
          kicker="Direct Advisory Desk"
          title="Contact Bahams Realty"
          subtitle="Speak with our on-ground advisory team at our Lekki Phase 1 office, schedule a verified private inspection, or chat directly on WhatsApp."
        />

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Advisory Desk Active (8:30 AM – 6:00 PM WAT)</span>
        </div>
      </div>

      {/* Large WhatsApp Quick Contact Banner */}
      <div className="bg-[#0F5C4A] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            Fastest Response Channel
          </span>
          <h2 className="text-xl sm:text-2xl font-bold">
            Need an immediate response? Chat on WhatsApp
          </h2>
          <p className="text-xs sm:text-sm text-neutral-100 max-w-xl">
            Our property consultants respond within 15 minutes during business hours to answer listing inquiries, share video walkthroughs, and book viewings.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-[#0F5C4A] hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-md transition-colors shrink-0 shadow-xs"
        >
          <MessageCircle className="w-5 h-5 text-[#0F5C4A]" />
          <span>Chat Now (+234 916 714 9677)</span>
        </a>
      </div>

      {/* Main Grid: Form + Office Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Form Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#1A1A1A]">
              Send a Confidential Enquiry
            </h3>
            <p className="text-xs text-neutral-500">
              Fill in your specifications and an advisory partner will contact you promptly.
            </p>
          </div>
          <ContactForm />
        </div>

        {/* Office Details Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E5E0] p-6 space-y-6 shadow-xs">
            <h3 className="font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
              Lekki Phase 1 Headquarters
            </h3>

            <div className="space-y-4 text-xs text-neutral-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0F5C4A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">{OFFICE_DETAILS.address}</p>
                  <p className="text-neutral-500 mt-0.5">
                    Near Lekki-Ikoyi Link Bridge roundabout, Admiralty Way.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0F5C4A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">{OFFICE_DETAILS.displayPhone}</p>
                  <p className="text-neutral-500 mt-0.5">Direct phone lines & WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0F5C4A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">{OFFICE_DETAILS.email}</p>
                  <p className="text-neutral-500 mt-0.5">Corporate correspondence</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#0F5C4A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">
                    {OFFICE_DETAILS.workingHours.weekdays}
                  </p>
                  <p className="text-neutral-500">{OFFICE_DETAILS.workingHours.saturdays}</p>
                  <p className="text-neutral-500">{OFFICE_DETAILS.workingHours.sundays}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-4 h-4 text-[#0F5C4A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">Dedicated Visitor Parking</p>
                  <p className="text-neutral-500">Secure compound parking for visiting clients.</p>
                </div>
              </div>
            </div>

            {/* Google Maps Placeholder Frame */}
            <div className="pt-2">
              <div className="w-full h-44 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 relative">
                <iframe
                  title="Bahams Realty Office Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.717466548174!2d3.4735!3d6.442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf45300000001%3A0x1!2sAdmiralty%20Way%2C%20Lekki%20Phase%201%2C%20Lagos!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Specialized Desks Strip */}
      <div className="space-y-6 pt-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F5C4A]">
            Direct Advisory Desks
          </span>
          <h3 className="text-xl font-bold text-[#1A1A1A]">
            Connect with Specialized Transaction Partners
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.title}
              className="bg-white p-6 rounded-xl border border-[#E5E5E0] space-y-3 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <Briefcase className="w-5 h-5 text-[#0F5C4A]" />
                <h4 className="font-bold text-sm text-neutral-900">{dept.title}</h4>
                <p className="text-xs font-semibold text-[#0F5C4A]">{dept.lead}</p>
                <p className="text-[11px] text-neutral-500 leading-snug">{dept.coverage}</p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <a
                  href={`tel:${dept.phone}`}
                  className="text-neutral-700 hover:text-neutral-900 font-mono font-medium"
                >
                  {dept.phone}
                </a>
                <a
                  href={getWhatsAppUrl(`Hello ${dept.lead}, I would like to consult with your ${dept.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0F5C4A] hover:underline font-bold"
                >
                  WhatsApp →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
