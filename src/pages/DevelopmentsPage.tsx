import React, { useState } from 'react';
import { DEVELOPMENTS_DATA } from '../data/mockData.ts';
import { ProjectCard } from '../components/development/ProjectCard.tsx';
import { SectionHeading } from '../components/common/SectionHeading.tsx';
import { Development, DevelopmentStatus } from '../types/index.ts';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Calculator,
  ArrowRight,
  MessageCircle,
  Percent,
  DollarSign,
  Download,
  CheckCircle2,
  X,
  FileText,
  Clock,
  Sparkles,
  Phone,
  Compass,
} from 'lucide-react';
import { formatNaira } from '../utils/formatters.ts';
import { getWhatsAppUrl } from '../utils/whatsapp.ts';
import { useData } from '../context/DataContext.tsx';

export const DevelopmentsPage: React.FC = () => {
  const { addEnquiry } = useData();
  const [statusFilter, setStatusFilter] = useState<'all' | DevelopmentStatus>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // Request Investor Pack Modal State
  const [activeBrochureDev, setActiveBrochureDev] = useState<Development | null>(null);
  const [investorName, setInvestorName] = useState('');
  const [investorPhone, setInvestorPhone] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [investorBracket, setInvestorBracket] = useState('₦200M – ₦500M');
  const [brochureSuccess, setBrochureSuccess] = useState(false);

  // Investment Calculator State
  const [calcBudget, setCalcBudget] = useState(250000000);
  const [calcLocation, setCalcLocation] = useState<'Victoria Island' | 'Ikoyi' | 'Lekki Phase 1' | 'Banana Island'>('Victoria Island');
  const [calcHoldingYears, setCalcHoldingYears] = useState(3);

  // Yield calculations based on Lagos market benchmarks
  const yieldRate =
    calcLocation === 'Victoria Island'
      ? 0.11
      : calcLocation === 'Ikoyi'
      ? 0.095
      : calcLocation === 'Banana Island'
      ? 0.085
      : 0.12;
  const annualRentalIncome = calcBudget * yieldRate;
  const capitalAppreciationRate =
    calcLocation === 'Ikoyi'
      ? 0.32
      : calcLocation === 'Victoria Island'
      ? 0.3
      : calcLocation === 'Banana Island'
      ? 0.38
      : 0.35;
  const projectedAppreciation = calcBudget * capitalAppreciationRate;
  const projectedTotalValue = calcBudget + projectedAppreciation;

  const whatsappCalculatorUrl = getWhatsAppUrl(
    `Hello Bahams Realty, I used your Off-Plan Investment Calculator for a budget of ${formatNaira(
      calcBudget
    )} in ${calcLocation}. I would like to explore matching off-plan inventory, milestone schedules, and developer audited track records.`
  );

  const filteredDevelopments = DEVELOPMENTS_DATA.filter((dev) => {
    if (statusFilter !== 'all' && dev.status !== statusFilter) return false;
    if (selectedLocation !== 'all' && dev.location !== selectedLocation) return false;
    return true;
  });

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!investorName.trim() || !investorPhone.trim() || !activeBrochureDev) return;

    // Log enquiry to central store so admin immediately sees it on /admin
    addEnquiry({
      type: 'development',
      name: investorName.trim(),
      phone: investorPhone.trim(),
      email: investorEmail.trim() || undefined,
      subject: `Investor Pack Request for ${activeBrochureDev.name}`,
      details: `Prospect requested complete milestone schedule, floor plans, and technical due diligence report for ${activeBrochureDev.name}. Investment bracket: ${investorBracket}.`,
      propertyOrProjectTitle: activeBrochureDev.name,
      propertyOrProjectId: activeBrochureDev.id,
      budget: investorBracket,
    });

    setBrochureSuccess(true);
  };

  const handleOpenBrochureModal = (dev: Development) => {
    setActiveBrochureDev(dev);
    setBrochureSuccess(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E5E0]">
        <SectionHeading
          kicker="Prime Developments & Estates"
          title="Off-Plan & Completed Projects"
          subtitle="Direct institutional developer mandates across Victoria Island, Ikoyi, and Lekki. Structured milestone payments, audited construction timelines, and capital growth."
        />

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-white border border-[#E5E5E0] rounded-lg text-xs font-semibold shrink-0">
            {(['all', 'Off-plan', 'Selling Fast', 'Ready'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  statusFilter === s
                    ? 'bg-[#0F5C4A] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {s === 'all' ? 'All Status' : s}
              </button>
            ))}
          </div>

          {/* Location filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E5E5E0] bg-white text-neutral-700"
          >
            <option value="all">All Locations</option>
            <option value="Victoria Island">Victoria Island</option>
            <option value="Ikoyi">Ikoyi</option>
            <option value="Lekki Phase 1">Lekki Phase 1</option>
          </select>
        </div>
      </div>

      {/* Value Prop Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-white rounded-xl border border-[#E5E5E0] shadow-xs text-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0F5C4A]/10 text-[#0F5C4A] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-sm">Escrow & Milestone Audits</h3>
            <p className="text-neutral-500 mt-0.5 leading-relaxed">
              Investor tranches disbursed strictly upon certified engineering stage sign-offs.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0F5C4A]/10 text-[#0F5C4A] flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-sm">25% – 40% Capital Uplift</h3>
            <p className="text-neutral-500 mt-0.5 leading-relaxed">
              Pre-construction pricing offers substantial equity gains upon handover.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0F5C4A]/10 text-[#0F5C4A] flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-sm">Vetted Developer Balance Sheets</h3>
            <p className="text-neutral-500 mt-0.5 leading-relaxed">
              We exclusively represent developers with zero historic defaults and verified title roots.
            </p>
          </div>
        </div>
      </div>

      {/* Developments Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1A1A1A]">
            Current Development Mandates ({filteredDevelopments.length})
          </h2>
          <span className="text-xs text-neutral-500">
            Showing verified active projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDevelopments.map((dev) => (
            <div key={dev.id} className="flex flex-col">
              <ProjectCard development={dev} />
              <button
                type="button"
                onClick={() => handleOpenBrochureModal(dev)}
                className="mt-2 w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#0F5C4A]" />
                <span>Request Detailed Investor Pack</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Off-Plan Yield & Capital Appreciation Calculator */}
      <div className="bg-white rounded-2xl border border-[#E5E5E0] p-6 sm:p-10 shadow-xs space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F5C4A] flex items-center gap-1.5">
            <Calculator className="w-4 h-4" />
            <span>Interactive Feasibility Tool</span>
          </span>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            Lagos Off-Plan Yield & Capital Growth Estimator
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Estimate potential returns on prime Lagos multi-unit developments based on actual rental indices and construction milestone equity curves.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-6 bg-[#FAFAF8] p-6 rounded-xl border border-neutral-200">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Target Location
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Victoria Island', 'Ikoyi', 'Lekki Phase 1', 'Banana Island'] as const).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setCalcLocation(loc)}
                    className={`py-2 px-3 text-xs font-semibold rounded-md border text-center transition-all ${
                      calcLocation === loc
                        ? 'bg-[#0F5C4A] text-white border-[#0F5C4A]'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                <span>Investment Outlay (₦)</span>
                <span className="text-[#0F5C4A] font-mono font-bold text-sm">
                  {formatNaira(calcBudget)}
                </span>
              </div>
              <input
                type="range"
                min={100000000}
                max={1500000000}
                step={25000000}
                value={calcBudget}
                onChange={(e) => setCalcBudget(Number(e.target.value))}
                className="w-full accent-[#0F5C4A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                <span>₦100M</span>
                <span>₦500M</span>
                <span>₦1.5B</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-200 text-xs text-neutral-500">
              <p>
                * Benchmarks calibrated against 2024–2026 prime Lagos Island occupancy rates and construction CPI indices.
              </p>
            </div>
          </div>

          {/* Metrics Output */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#FAFAF8] rounded-xl border border-neutral-200 space-y-1">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Projected Annual Rental Yield
              </span>
              <p className="text-2xl font-bold text-[#0F5C4A] font-mono tabular-nums">
                {(yieldRate * 100).toFixed(1)}% / yr
              </p>
              <p className="text-xs text-neutral-600 pt-1">
                Estimated Gross Rent:{' '}
                <span className="font-bold text-neutral-900 font-mono">
                  {formatNaira(annualRentalIncome)}/yr
                </span>
              </p>
            </div>

            <div className="p-5 bg-[#FAFAF8] rounded-xl border border-neutral-200 space-y-1">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Projected Milestone Equity Gain
              </span>
              <p className="text-2xl font-bold text-neutral-900 font-mono tabular-nums">
                +{(capitalAppreciationRate * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-neutral-600 pt-1">
                Estimated Capital Gain:{' '}
                <span className="font-bold text-emerald-700 font-mono">
                  {formatNaira(projectedAppreciation)}
                </span>
              </p>
            </div>

            <div className="sm:col-span-2 p-5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  Projected Asset Value on Delivery
                </span>
                <span className="text-2xl font-extrabold text-[#0F5C4A] font-mono tabular-nums">
                  {formatNaira(projectedTotalValue)}
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Represents estimated market completion valuation in {calcLocation} based on historical delivery premium over launch phase pricing.
              </p>
              <div className="pt-2">
                <a
                  href={whatsappCalculatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Request Matching Off-Plan Inventory on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Partnership CTA Strip */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#1A1A1A] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            For Real Estate Developers & Joint Ventures
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            Are You Developing a Multi-Unit Scheme in Lagos?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Bahams Realty provides comprehensive co-transaction advisory, institutional marketing, and diaspora pre-sales distribution for qualified luxury projects.
          </p>
        </div>

        <a
          href={getWhatsAppUrl(
            'Hello Bahams Realty, I am a developer/landowner with a multi-unit project in Lagos and would like to discuss exclusive sales and transaction representation.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shrink-0 shadow-md"
        >
          <Building2 className="w-4 h-4" />
          <span>Partner with Bahams Realty</span>
        </a>
      </div>

      {/* =========================================================================
          MODAL: REQUEST DETAILED INVESTOR PACK
          ========================================================================= */}
      {activeBrochureDev && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#0F5C4A]">
                  Confidential Due Diligence
                </span>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  Request Investor Pack
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveBrochureDev(null)}
                className="p-1 text-neutral-400 hover:text-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {brochureSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-neutral-900">
                    Request Received & Logged
                  </h4>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    Our development desk has received your request for{' '}
                    <span className="font-semibold text-neutral-800">
                      {activeBrochureDev.name}
                    </span>
                    . We are sending the technical pack, floor plans, and milestone contracts to your phone/email.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={getWhatsAppUrl(
                      `Hello Bahams Realty, I just requested the investor pack for ${activeBrochureDev.name}. Could you also share the latest construction video update?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0F5C4A] text-white text-xs font-semibold rounded-md uppercase tracking-wider"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Connect on WhatsApp for Immediate Dispatch</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveBrochureDev(null)}
                    className="text-xs text-neutral-500 hover:text-neutral-800 py-1"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBrochureSubmit} className="space-y-4">
                <div className="bg-[#FAFAF8] p-3 rounded-lg border border-neutral-200 text-xs space-y-1">
                  <p className="font-bold text-neutral-900">{activeBrochureDev.name}</p>
                  <p className="text-neutral-500">
                    Location: {activeBrochureDev.location} · Starting at{' '}
                    <span className="font-bold text-[#0F5C4A]">
                      {formatNaira(activeBrochureDev.startingPrice)}
                    </span>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={investorName}
                    onChange={(e) => setInvestorName(e.target.value)}
                    placeholder="e.g. Dr. Kemi Adeleke"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={investorPhone}
                    onChange={(e) => setInvestorPhone(e.target.value)}
                    placeholder="+234 or international format"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email Address (for PDF dispatch)
                  </label>
                  <input
                    type="email"
                    required
                    value={investorEmail}
                    onChange={(e) => setInvestorEmail(e.target.value)}
                    placeholder="investor@domain.com"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Investment Budget Allocation
                  </label>
                  <select
                    value={investorBracket}
                    onChange={(e) => setInvestorBracket(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white font-medium"
                  >
                    <option value="₦150M – ₦300M">₦150M – ₦300M</option>
                    <option value="₦300M – ₦600M">₦300M – ₦600M</option>
                    <option value="₦600M – ₦1.2B">₦600M – ₦1.2B</option>
                    <option value="₦1.2B+ (Institutional / Bulk)">₦1.2B+ (Institutional / Bulk)</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setActiveBrochureDev(null)}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs"
                  >
                    Dispatch Investor Pack
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
