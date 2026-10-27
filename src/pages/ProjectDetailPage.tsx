import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  FileText,
  Clock,
  ArrowLeft,
  Waves,
  Dumbbell,
  Zap,
  Anchor,
  ShieldCheck,
  ArrowUpDown,
  Car,
  Cpu,
  Droplet,
  Wifi,
  Sparkles,
} from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import { SafeImage } from '../components/common/SafeImage.tsx';
import { ContactForm } from '../components/contact/ContactForm.tsx';
import { formatNaira, formatSqm } from '../utils/formatters.ts';
import { getWhatsAppUrl, getDevelopmentWhatsAppMessage } from '../utils/whatsapp.ts';

// Helper to render lucide icon by name
const renderAmenityIcon = (iconName: string) => {
  switch (iconName) {
    case 'waves':
      return <Waves className="w-5 h-5 text-[#0F5C4A]" />;
    case 'dumbbell':
      return <Dumbbell className="w-5 h-5 text-[#0F5C4A]" />;
    case 'zap':
      return <Zap className="w-5 h-5 text-[#0F5C4A]" />;
    case 'anchor':
      return <Anchor className="w-5 h-5 text-[#0F5C4A]" />;
    case 'shield-check':
      return <ShieldCheck className="w-5 h-5 text-[#0F5C4A]" />;
    case 'arrow-up-down':
      return <ArrowUpDown className="w-5 h-5 text-[#0F5C4A]" />;
    case 'car':
      return <Car className="w-5 h-5 text-[#0F5C4A]" />;
    case 'cpu':
      return <Cpu className="w-5 h-5 text-[#0F5C4A]" />;
    case 'droplet':
      return <Droplet className="w-5 h-5 text-[#0F5C4A]" />;
    case 'wifi':
      return <Wifi className="w-5 h-5 text-[#0F5C4A]" />;
    default:
      return <Sparkles className="w-5 h-5 text-[#0F5C4A]" />;
  }
};

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { developments } = useData();
  const development = developments.find((d) => d.id === id || d.slug === id);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!development) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">Development Not Found</h2>
        <p className="text-sm text-neutral-600">The development project could not be located.</p>
        <Link
          to="/developments"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F5C4A] text-white text-xs font-semibold uppercase tracking-wider rounded-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Developments</span>
        </Link>
      </div>
    );
  }

  const whatsappGeneralUrl = getWhatsAppUrl(getDevelopmentWhatsAppMessage(development));

  return (
    <div className="space-y-16 pb-16">
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6">
        <div className="relative rounded-2xl overflow-hidden min-h-[440px] sm:min-h-[500px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 shadow-lg">
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={development.images[0]}
              alt={development.name}
              fallbackTitle={development.name}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4 text-white">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded">
                {development.status}
              </span>
              <span className="text-xs text-neutral-300 font-mono">
                Project Ref: {development.id}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {development.name}
            </h1>

            <p className="text-sm sm:text-base text-neutral-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{development.address}</span>
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-3 text-xs sm:text-sm text-neutral-300 border-t border-white/20">
              <div>
                <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">
                  Developer
                </span>
                <span className="font-semibold text-white">{development.developer}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">
                  Starting Price
                </span>
                <span className="font-bold text-white text-base tabular-nums">
                  {formatNaira(development.startingPrice)}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">
                  Initial Deposit
                </span>
                <span className="font-semibold text-white">
                  {development.paymentPlan.depositPercentage}% Down
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* =========================================================================
            SECTION: OVERVIEW & SPECS
            ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#0F5C4A]">
              Project Overview
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Architectural Concept & Master Strategy
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {development.overview}
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Bahams Realty acts as the official institutional co-broker for this development.
              All contracts are governed by standard Lagos State real estate transaction guidelines,
              with dedicated legal escrow arrangements and guaranteed completion covenants.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E5E0] p-6 space-y-5 shadow-xs h-fit">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Direct Advisory Desk
            </h4>
            <div className="space-y-2 text-xs">
              <p className="font-bold text-neutral-900 text-sm">{development.name}</p>
              <p className="text-neutral-600">{development.location}, Lagos</p>
            </div>
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <p className="text-[11px] text-neutral-400 text-center leading-tight">
              Request full investor brochure, floor plans & financial models.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION: UNIT TYPES TABLE
            ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#0F5C4A]">
              Inventory & Floor Plans
            </h2>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              Available Unit Types & Pricing
            </h3>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E5E0] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAFAF8] text-neutral-600 text-[11px] font-bold uppercase tracking-wider border-b border-[#E5E5E0]">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Unit Configuration</th>
                    <th className="py-3.5 px-4">Size (SQM)</th>
                    <th className="py-3.5 px-4">Starting Price (₦)</th>
                    <th className="py-3.5 px-4">Current Availability</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Enquiry Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-800">
                  {development.unitTypes.map((unit) => {
                    const unitWhatsappUrl = getWhatsAppUrl(
                      getDevelopmentWhatsAppMessage({
                        name: development.name,
                        location: development.location,
                        id: development.id,
                        unitType: unit.type,
                      })
                    );

                    return (
                      <tr key={unit.type} className="hover:bg-neutral-50/60 transition-colors">
                        <td className="py-4 px-4 sm:px-6 font-semibold text-neutral-900">
                          {unit.type}
                        </td>
                        <td className="py-4 px-4 tabular-nums text-neutral-600">
                          {formatSqm(unit.sizeSqm)}
                        </td>
                        <td className="py-4 px-4 font-bold text-[#1A1A1A] tabular-nums">
                          {formatNaira(unit.startingPrice)}
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1.5 text-xs text-neutral-700">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>{unit.availableUnits} units available</span>
                          </span>
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-right">
                          <a
                            href={unitWhatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F5C4A] bg-[#0F5C4A]/10 hover:bg-[#0F5C4A] hover:text-white rounded transition-colors whitespace-nowrap"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Reserve Unit</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: PAYMENT PLAN
            ========================================================================= */}
        <section className="bg-white rounded-2xl border border-[#E5E5E0] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#0F5C4A]">
              Flexible Capital Allocation
            </h2>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              Structured Milestone Payment Plan
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
              {development.paymentPlan.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
            {development.paymentPlan.milestones.map((m, idx) => (
              <div
                key={m}
                className="p-4 bg-[#FAFAF8] rounded-xl border border-[#E5E5E0] space-y-2 text-xs"
              >
                <div className="w-6 h-6 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <p className="font-semibold text-neutral-800 leading-snug">{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION: MASTERPLAN & GALLERY
            ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#0F5C4A]">
              Site Blueprint
            </h2>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              Masterplan & Architectural Perspectives
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 aspect-16/10 rounded-xl overflow-hidden bg-neutral-100 border border-[#E5E5E0]">
              <SafeImage
                src={development.masterplanImage}
                alt={`${development.name} Masterplan`}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6 flex flex-col justify-between">
              {development.images.slice(1, 3).map((img, i) => (
                <div
                  key={img + i}
                  className="aspect-16/10 rounded-xl overflow-hidden bg-neutral-100 border border-[#E5E5E0] flex-1"
                >
                  <SafeImage
                    src={img}
                    alt={`${development.name} perspective ${i + 2}`}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: AMENITIES GRID
            ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#0F5C4A]">
              Lifestyle Infrastructure
            </h2>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              Estate Amenities & Facilities
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {development.amenities.map((a) => (
              <div
                key={a.label}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E5E5E0] shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0F5C4A]/10 flex items-center justify-center shrink-0">
                  {renderAmenityIcon(a.icon)}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION: PROGRESS TIMELINE
            ========================================================================= */}
        <section className="bg-white rounded-2xl border border-[#E5E5E0] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#0F5C4A]">
              Execution Tracking
            </h2>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              Construction Progress Timeline
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
            {development.timeline.map((step, idx) => {
              const isDone = step.status === 'completed';
              const isCurrent = step.status === 'in-progress';

              return (
                <div
                  key={step.phase}
                  className={`p-5 rounded-xl border space-y-2 text-xs relative ${
                    isDone
                      ? 'bg-neutral-50 border-neutral-200'
                      : isCurrent
                      ? 'bg-[#0F5C4A]/5 border-[#0F5C4A]/40'
                      : 'bg-white border-neutral-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-neutral-500">
                      Phase 0{idx + 1}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                        isDone
                          ? 'bg-neutral-200 text-neutral-700'
                          : isCurrent
                          ? 'bg-[#0F5C4A] text-white'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-neutral-900 text-sm">{step.phase}</h4>
                  <p className="text-[11px] font-medium text-[#0F5C4A]">{step.date}</p>
                  <p className="text-neutral-600 leading-relaxed text-xs pt-1">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION: FAQ ACCORDION
            ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#0F5C4A]">
              Frequently Asked Questions
            </h2>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              Title, Legal & Investor Inquiries
            </h3>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E5E0] divide-y divide-neutral-100 shadow-xs">
            {development.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.question} className="p-5 sm:p-6">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left gap-4 font-semibold text-neutral-900 hover:text-[#0F5C4A] transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 transition-transform ${
                        isOpen ? 'rotate-180 text-[#0F5C4A]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION: ENQUIRY FORM & WHATSAPP CTA
            ========================================================================= */}
        <section className="bg-[#FAFAF8] rounded-2xl border border-[#E5E5E0] p-6 sm:p-10 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#0F5C4A]">
              Direct Mandate Inquiry
            </h2>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              Schedule Consultation or Request Allocation
            </h3>
            <p className="text-sm text-neutral-600">
              Complete the enquiry form below to receive the complete sales package and investor prospectus for{' '}
              <span className="font-semibold text-neutral-900">{development.name}</span>.
            </p>
          </div>

          <ContactForm initialInterest="Investing" />
        </section>
      </div>
    </div>
  );
};
