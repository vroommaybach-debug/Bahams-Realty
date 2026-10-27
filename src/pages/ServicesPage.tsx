import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Check,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Key,
  TrendingUp,
  Calculator,
  FileCheck,
  Globe,
  HelpCircle,
  Sparkles,
  Calendar,
  X,
  CheckCircle2,
  Phone,
  Scale,
  Award,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading.tsx';
import { SafeImage } from '../components/common/SafeImage.tsx';
import { getWhatsAppUrl, getServiceWhatsAppMessage } from '../utils/whatsapp.ts';
import { formatNaira } from '../utils/formatters.ts';
import { useData } from '../context/DataContext.tsx';

export const ServicesPage: React.FC = () => {
  const location = useLocation();
  const { services, addEnquiry } = useData();

  // Closing Cost Calculator State
  const [purchasePrice, setPurchasePrice] = useState(250000000);

  // Standard Lagos State statutory and professional closing costs
  const governorsConsent = purchasePrice * 0.015; // ~1.5%
  const stampDuty = purchasePrice * 0.0075; // 0.75%
  const legalFee = purchasePrice * 0.05; // 5% standard legal & search
  const agencyFee = purchasePrice * 0.05; // 5% professional agency fee
  const totalClosingCosts = governorsConsent + stampDuty + legalFee + agencyFee;
  const totalOutlay = purchasePrice + totalClosingCosts;

  // Service Consultation Modal State
  const [activeConsultationService, setActiveConsultationService] = useState<string | null>(null);
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultEmail, setConsultEmail] = useState('');
  const [consultNotes, setConsultNotes] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'buy':
        return <Building2 className="w-6 h-6 text-[#0F5C4A]" />;
      case 'rent':
        return <Key className="w-6 h-6 text-[#0F5C4A]" />;
      case 'sell-let':
        return <ShieldCheck className="w-6 h-6 text-[#0F5C4A]" />;
      case 'off-plan':
        return <TrendingUp className="w-6 h-6 text-[#0F5C4A]" />;
      default:
        return <Building2 className="w-6 h-6 text-[#0F5C4A]" />;
    }
  };

  const whatsappCalculatorUrl = getWhatsAppUrl(
    `Hello Bahams Realty, I used your Lagos Closing Cost Estimator for a purchase price of ${formatNaira(
      purchasePrice
    )}. I would like a consultation with your legal advisory desk regarding documentation, title verification, and closing requirements.`
  );

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName.trim() || !consultPhone.trim() || !activeConsultationService) return;

    addEnquiry({
      type: 'service',
      name: consultName.trim(),
      phone: consultPhone.trim(),
      email: consultEmail.trim() || undefined,
      subject: `Advisory Consultation: ${activeConsultationService}`,
      details: consultNotes.trim() || `Client requested advisory consultation for ${activeConsultationService}.`,
    });

    setConsultSubmitted(true);
  };

  const FAQS = [
    {
      q: "What is the difference between Governor's Consent and a Certificate of Occupancy (C of O)?",
      a: "A Certificate of Occupancy (C of O) is the first state-issued document conferring 99-year leasehold ownership of virgin state land to an individual or company. When that land or property is subsequently transferred, sold, or mortgaged to a new party, the Land Use Act requires the consent of the Lagos State Governor—known as Governor's Consent. Bahams Realty verifies root titles back to the original Gazette or C of O before facilitating any transaction.",
    },
    {
      q: 'How does Bahams Realty facilitate purchases for diaspora clients in the UK, US, or Dubai?',
      a: 'Over 40% of our transactions involve diaspora buyers. We conduct high-definition live video walkthroughs, provide independent drone site inspections, verify survey coordinates with the Surveyor General’s office, and facilitate notarized Power of Attorney structures so you can close securely without international travel.',
    },
    {
      q: 'What are typical closing costs for residential property in Lagos?',
      a: 'Statutory and professional closing costs typically average between 10% and 12% of the purchase price. This includes Lagos State Governor’s Consent fees (~1.5%), Stamp Duty (~0.75%), Legal Due Diligence & Conveyancing (5%), and Agency Brokerage (5%). Use our interactive calculator on this page for a customized breakdown.',
    },
    {
      q: 'How are funds protected when investing in off-plan developments?',
      a: 'We mandate that off-plan developers establish independent escrow or milestone-linked construction accounts. Client funds are disbursed in tranches only upon independent quantity surveyor sign-off on structural milestones (substructure, superstructure, roofing, finishes).',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Header */}
      <SectionHeading
        kicker="Comprehensive Real Estate Representation"
        title="Our Advisory & Brokerage Services"
        subtitle="Institutional rigor, deep market intelligence, and trusted transaction management across residential sales, prime lettings, and development advisory in Lagos."
      />

      {/* Dynamic Service Sections */}
      <div className="space-y-10">
        {services.map((service, index) => {
          const serviceWhatsAppUrl = getWhatsAppUrl(
            service.whatsappMessage || getServiceWhatsAppMessage(service.title)
          );

          return (
            <div
              key={service.id}
              id={service.id}
              className="bg-white rounded-2xl border border-[#E5E5E0] p-6 sm:p-10 shadow-xs scroll-mt-28 space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-neutral-100">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 shrink-0">
                    {getServiceIcon(service.id)}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F5C4A]">
                      {service.categoryBadge || `Service Pillar 0${index + 1}`}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                      {service.title}
                    </h2>
                    <p className="text-sm font-semibold text-neutral-600">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveConsultationService(service.title);
                      setConsultSubmitted(false);
                    }}
                    className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                  >
                    Book Consultation
                  </button>

                  <a
                    href={serviceWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  {service.image && (
                    <div className="aspect-16/9 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 mb-3">
                      <SafeImage
                        src={service.image}
                        alt={service.title}
                        containerClassName="w-full h-full"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Scope of Advisory
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Our team provides fiduciary representation designed to protect asset value, verify legal encumbrances at the Lagos State Land Registry, and minimize closing friction.
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Key Deliverables & Verification Protocol
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAFAF8] border border-neutral-200/80 text-xs text-neutral-800"
                      >
                        <Check className="w-4 h-4 text-[#0F5C4A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Closing Cost Estimator */}
      <div className="bg-white rounded-2xl border border-[#E5E5E0] p-6 sm:p-10 shadow-xs space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F5C4A] flex items-center gap-1.5">
            <Calculator className="w-4 h-4" />
            <span>Statutory Due Diligence Tool</span>
          </span>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            Lagos Real Estate Statutory Closing Cost Estimator
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Estimate legal search, Governors Consent, stamp duty, and conveyancing fees on any property transaction in Lagos State.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4 bg-[#FAFAF8] p-6 rounded-xl border border-neutral-200">
            <div>
              <div className="flex justify-between text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                <span>Purchase Price (₦)</span>
                <span className="text-[#0F5C4A] font-mono font-bold text-sm">
                  {formatNaira(purchasePrice)}
                </span>
              </div>
              <input
                type="range"
                min={50000000}
                max={1500000000}
                step={25000000}
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full accent-[#0F5C4A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                <span>₦50M</span>
                <span>₦750M</span>
                <span>₦1.5B</span>
              </div>
            </div>

            <p className="text-xs text-neutral-500 pt-2 border-t border-neutral-200">
              * Statutory percentages represent official rates applicable under the Lagos State Land Instruments Registration Law and NBA recommended conveyancing scales.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#FAFAF8] rounded-xl border border-neutral-200 space-y-1">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  Governors Consent (~1.5%)
                </span>
                <p className="text-lg font-bold text-neutral-900 font-mono tabular-nums">
                  {formatNaira(governorsConsent)}
                </p>
                <p className="text-[11px] text-neutral-500">Lagos State Lands Bureau Assessment</p>
              </div>

              <div className="p-4 bg-[#FAFAF8] rounded-xl border border-neutral-200 space-y-1">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  Stamp Duty (~0.75%)
                </span>
                <p className="text-lg font-bold text-neutral-900 font-mono tabular-nums">
                  {formatNaira(stampDuty)}
                </p>
                <p className="text-[11px] text-neutral-500">Federal/State Inland Revenue Stamp</p>
              </div>

              <div className="p-4 bg-[#FAFAF8] rounded-xl border border-neutral-200 space-y-1">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  Legal & Title Search (5.0%)
                </span>
                <p className="text-lg font-bold text-neutral-900 font-mono tabular-nums">
                  {formatNaira(legalFee)}
                </p>
                <p className="text-[11px] text-neutral-500">Root of title audit & Deed drafting</p>
              </div>

              <div className="p-4 bg-[#FAFAF8] rounded-xl border border-neutral-200 space-y-1">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  Professional Agency (5.0%)
                </span>
                <p className="text-lg font-bold text-neutral-900 font-mono tabular-nums">
                  {formatNaira(agencyFee)}
                </p>
                <p className="text-[11px] text-neutral-500">Buyer representation & negotiation</p>
              </div>
            </div>

            <div className="p-5 bg-emerald-50/70 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                  Total Estimated Outlay (Purchase + Closing)
                </span>
                <span className="text-2xl font-extrabold text-[#0F5C4A] font-mono tabular-nums">
                  {formatNaira(totalOutlay)}
                </span>
              </div>

              <a
                href={whatsappCalculatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consult Our Legal Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl border border-[#E5E5E0] p-6 sm:p-10 shadow-xs space-y-6">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F5C4A]">
            Knowledge & Advisory
          </span>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            Lagos Real Estate Regulatory FAQs
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Clear answers to fundamental legal and transactional questions.
          </p>
        </div>

        <div className="divide-y divide-neutral-200">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-neutral-900 gap-4"
              >
                <span>{faq.q}</span>
                <span className="text-neutral-400 font-mono text-base">
                  {openFaq === idx ? '−' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MODAL: BOOK SERVICE CONSULTATION
          ========================================================================= */}
      {activeConsultationService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#0F5C4A]">
                  Direct Advisory Desk
                </span>
                <h3 className="text-base font-bold text-[#1A1A1A]">
                  Schedule Consultation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveConsultationService(null)}
                className="p-1 text-neutral-400 hover:text-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {consultSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-neutral-900">
                    Consultation Requested
                  </h4>
                  <p className="text-xs text-neutral-600">
                    Your appointment request for{' '}
                    <span className="font-semibold text-neutral-800">
                      {activeConsultationService}
                    </span>{' '}
                    has been recorded. An advisory partner will contact you shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveConsultationService(null)}
                  className="px-5 py-2 bg-[#0F5C4A] text-white text-xs font-semibold rounded-md"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div className="p-3 bg-neutral-50 rounded-lg text-xs font-semibold text-neutral-800">
                  Topic: {activeConsultationService}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                    placeholder="e.g. Tunde Balogun"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={consultPhone}
                    onChange={(e) => setConsultPhone(e.target.value)}
                    placeholder="+234..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={consultEmail}
                    onChange={(e) => setConsultEmail(e.target.value)}
                    placeholder="email@domain.com"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Brief Notes on Your Requirement
                  </label>
                  <textarea
                    rows={2}
                    value={consultNotes}
                    onChange={(e) => setConsultNotes(e.target.value)}
                    placeholder="Looking for a 4-bed duplex in Old Ikoyi with clean Governor's Consent..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setActiveConsultationService(null)}
                    className="px-3 py-1.5 text-xs text-neutral-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase rounded-md shadow-xs"
                  >
                    Confirm Consultation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
