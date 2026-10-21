import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  Target,
  ArrowRight,
  MessageCircle,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  Mail,
  X,
  FileCheck,
} from 'lucide-react';
import { TEAM_MEMBERS, COMPANY_VALUES, OFFICE_DETAILS } from '../data/mockData.ts';
import { useData } from '../context/DataContext.tsx';
import { SafeImage } from '../components/common/SafeImage.tsx';
import { SectionHeading } from '../components/common/SectionHeading.tsx';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '../utils/whatsapp.ts';

export const AboutPage: React.FC = () => {
  const { landingConfig, addEnquiry } = useData();
  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage());

  // Office Visit Modal State
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [visitNotes, setVisitNotes] = useState('');
  const [visitSubmitted, setVisitSubmitted] = useState(false);

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorPhone.trim() || !visitDate) return;

    addEnquiry({
      type: 'contact',
      name: visitorName.trim(),
      phone: visitorPhone.trim(),
      subject: `Office Visit at Admiralty Way (${visitDate} at ${visitTime})`,
      details: visitNotes.trim() || `Client requested in-person office meeting at Lekki Phase 1 office.`,
      preferredDate: visitDate,
      preferredTime: visitTime,
    });

    setVisitSubmitted(true);
  };

  const milestones = [
    {
      year: '2014',
      title: 'Foundation on Admiralty Way',
      description: 'Bahams Realty established its primary office in Lekki Phase 1, focusing on prime Island residential lettings and land registry due diligence.',
    },
    {
      year: '2017',
      title: 'Private Clients Ikoyi Desk',
      description: 'Expanded specialized due diligence and acquisition services to high-net-worth buyers in Old Ikoyi and Banana Island.',
    },
    {
      year: '2020',
      title: '₦25 Billion Closed Milestone',
      description: 'Surpassed ₦25B in verified closed transactions across prime Lagos residential and commercial sectors.',
    },
    {
      year: '2022',
      title: 'Offshore Diaspora Desk',
      description: 'Launched dedicated London and Dubai advisory desks with live virtual walk-throughs and escrow title coordination.',
    },
    {
      year: '2025 – Present',
      title: 'Landmark Off-Plan Advisory',
      description: 'Appointed co-transaction advisors on multi-billion Naira waterfront developments in Victoria Island and Lekki-Epe corridor.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-10 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0F5C4A]">
              About Bahams Realty
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
              A Higher Standard of Real Estate Advisory in Lagos.
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Founded on Admiralty Way in Lekki Phase 1, Bahams Realty was established to solve
              the transparency deficit in Nigerian real estate. We represent discerning private clients,
              multinational executives, and diaspora families who require world-class diligence,
              clear titles, and seamless execution.
            </p>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              From historic Ikoyi and waterfront Victoria Island to the burgeoning Lekki-Epe corridor,
              our team brings over four combined decades of institutional real estate advisory,
              surveying, and development appraisal experience.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/properties"
                className="px-6 py-3 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shadow-xs"
              >
                Browse Our Portfolio
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsVisitModalOpen(true);
                  setVisitSubmitted(false);
                }}
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                Schedule Office Visit
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
              <SafeImage
                src={landingConfig.aboutOfficeImage}
                alt="Bahams Realty Lagos Office on Admiralty Way Lekki"
                containerClassName="w-full h-full"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl border border-[#E5E5E0] shadow-lg hidden sm:block max-w-xs space-y-1">
              <span className="text-xs font-bold text-[#0F5C4A] uppercase tracking-wider block">
                Corporate Headquarters
              </span>
              <p className="text-xs font-bold text-neutral-900">14A Admiralty Way, Lekki Phase 1</p>
              <p className="text-[11px] text-neutral-500">Advisory meetings Monday to Saturday</p>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Credentials Strip */}
      <section className="bg-white border-y border-[#E5E5E0] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0F5C4A]">
              Accreditation & Compliance
            </span>
            <h3 className="text-base font-bold text-neutral-900">
              Institutional Due Diligence & Statutory Standards
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-[#FAFAF8] rounded-xl border border-neutral-200 space-y-1">
              <Award className="w-5 h-5 text-[#0F5C4A] mx-auto" />
              <p className="text-xs font-bold text-neutral-900">NIESV Affiliation</p>
              <p className="text-[10px] text-neutral-500">Nigerian Institution of Estate Surveyors</p>
            </div>

            <div className="p-4 bg-[#FAFAF8] rounded-xl border border-neutral-200 space-y-1">
              <ShieldCheck className="w-5 h-5 text-[#0F5C4A] mx-auto" />
              <p className="text-xs font-bold text-neutral-900">ESVARBON Certified</p>
              <p className="text-[10px] text-neutral-500">Estate Surveyors & Valuers Board</p>
            </div>

            <div className="p-4 bg-[#FAFAF8] rounded-xl border border-neutral-200 space-y-1">
              <FileCheck className="w-5 h-5 text-[#0F5C4A] mx-auto" />
              <p className="text-xs font-bold text-neutral-900">SCUML Compliant</p>
              <p className="text-[10px] text-neutral-500">Anti-Money Laundering Certified</p>
            </div>

            <div className="p-4 bg-[#FAFAF8] rounded-xl border border-neutral-200 space-y-1">
              <Building2 className="w-5 h-5 text-[#0F5C4A] mx-auto" />
              <p className="text-xs font-bold text-neutral-900">REDAN Member</p>
              <p className="text-[10px] text-neutral-500">Real Estate Developers Association</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          centered
          kicker="Our Standards"
          title="The Four Pillars of Bahams Realty"
          subtitle="How our operational principles ensure clients never buy into disputed land, delayed handovers, or inflated valuations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY_VALUES.map((val) => (
            <div
              key={val.title}
              className="bg-white p-6 rounded-xl border border-[#E5E5E0] space-y-3 shadow-xs"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0F5C4A]/10 text-[#0F5C4A] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A1A]">{val.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agency Milestones Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          kicker="Decade in Lagos Real Estate"
          title="Our Journey & Growth"
          subtitle="From Lekki lettings to premier off-plan development advisory across Lagos State."
        />

        <div className="relative border-l-2 border-[#0F5C4A]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {milestones.map((m) => (
            <div key={m.year} className="relative space-y-1.5">
              <div className="absolute -left-[31px] sm:-left-[47px] top-0.5 w-4 h-4 rounded-full bg-[#0F5C4A] border-4 border-white shadow-xs" />
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0F5C4A] px-2 py-0.5 bg-emerald-50 rounded">
                  {m.year}
                </span>
                <h4 className="text-base font-bold text-neutral-900">{m.title}</h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          kicker="Advisory Leadership"
          title="The Partners Behind Bahams Realty"
          subtitle="Seasoned property negotiators, chartered surveyors, and investment advisors dedicated to client success."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl border border-[#E5E5E0] overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square bg-neutral-100 overflow-hidden">
                  <SafeImage
                    src={member.image}
                    alt={member.name}
                    containerClassName="w-full h-full"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 space-y-1.5">
                  <h3 className="font-bold text-base text-[#1A1A1A]">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#0F5C4A]">{member.role}</p>
                  <span className="text-[10px] text-neutral-400 block font-mono">
                    {member.experienceYears}+ Years in Lagos Real Estate
                  </span>
                  <p className="text-xs text-neutral-600 pt-2 leading-relaxed">{member.bio}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href={getWhatsAppUrl(
                    `Hello Bahams Realty, I would like to consult with ${member.name} regarding property advisory in Lagos.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-[#FAFAF8] hover:bg-[#0F5C4A] hover:text-white text-neutral-700 text-xs font-semibold rounded border border-neutral-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Office Details & Schedule Visit Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1A1A] text-white rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Visit Us in Person
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              We Welcome You to Our Lekki Phase 1 Office
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Stop by our Admiralty Way office for espresso, property consultation, and legal due diligence discussions with a managing partner.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                14A Admiralty Way, Lekki Phase 1
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                Mon–Fri: 8:30 AM – 6:00 PM
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => {
                setIsVisitModalOpen(true);
                setVisitSubmitted(false);
              }}
              className="px-6 py-3.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors text-center shadow-md"
            >
              Book Office Appointment
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-md transition-colors text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#0F5C4A]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODAL: SCHEDULE LEKKI OFFICE VISIT
          ========================================================================= */}
      {isVisitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#0F5C4A]">
                  Lekki Phase 1 Office
                </span>
                <h3 className="text-base font-bold text-[#1A1A1A]">
                  Schedule Private Meeting
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVisitModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {visitSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-neutral-900">
                    Appointment Request Logged
                  </h4>
                  <p className="text-xs text-neutral-600">
                    Thank you, {visitorName}. We have prepared our conference schedule for {visitDate} at {visitTime}. An advisor will reach out to confirm your slot.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVisitModalOpen(false)}
                  className="px-5 py-2 bg-[#0F5C4A] text-white text-xs font-semibold rounded-md"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleVisitSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Chief Adeleke"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    placeholder="+234..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Time Slot
                    </label>
                    <select
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:30 PM">3:30 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Discussion Topic
                  </label>
                  <textarea
                    rows={2}
                    value={visitNotes}
                    onChange={(e) => setVisitNotes(e.target.value)}
                    placeholder="Acquiring 4-bed duplex in Old Ikoyi / Off-plan feasibility..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsVisitModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-neutral-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase rounded-md shadow-xs"
                  >
                    Confirm Office Visit
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
