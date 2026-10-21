import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  MessageCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  RotateCcw,
  Save,
  Search,
  Filter,
  Eye,
  Sliders,
  DollarSign,
  MapPin,
  Calendar,
  X,
  Sparkles,
  Download,
  Upload,
  UserCheck,
  Phone,
  Mail,
  FileSpreadsheet,
  AlertCircle,
  Check,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import {
  Property,
  PropertyMode,
  PropertyType,
  LagosLocation,
  PropertyStatus,
  InboundEnquiry,
} from '../types/index.ts';
import { formatNaira, formatBeds, formatBaths } from '../utils/formatters.ts';
import { SafeImage } from '../components/common/SafeImage.tsx';
import { getWhatsAppUrl } from '../utils/whatsapp.ts';

// Curated high-resolution imagery presets for quick admin selection
export const CURATED_IMAGE_PRESETS = [
  {
    label: 'Ikoyi Luxury Villa (Exterior)',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
    category: 'Exterior',
  },
  {
    label: 'Victoria Island Waterfront Glass Tower',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    category: 'Development',
  },
  {
    label: 'Banana Island Palatial Residence',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    category: 'Exterior',
  },
  {
    label: 'Lekki Contemporary Smart Terraces',
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1920&q=80',
    category: 'Terrace',
  },
  {
    label: 'Skyline Penthouse Terrace (VI / Ikoyi)',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
    category: 'Penthouse',
  },
  {
    label: 'Modern Minimalist Marble Living Room',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80',
    category: 'Interior',
  },
  {
    label: 'Gourmet Fitted Designer Kitchen',
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=80',
    category: 'Interior',
  },
  {
    label: 'Executive Admiralty Way Lekki Office',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    category: 'Office',
  },
];

export const AdminPage: React.FC = () => {
  const {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    resetPropertiesToDefault,
    landingConfig,
    updateLandingConfig,
    resetLandingConfig,
    enquiries,
    addEnquiry,
    updateEnquiryStatus,
    deleteEnquiry,
    clearEnquiries,
    isFirebaseConnected,
  } = useData();

  const [activeTab, setActiveTab] = useState<'properties' | 'cms' | 'enquiries' | 'settings'>('properties');
  const [propertySearch, setPropertySearch] = useState('');
  const [propertyFilterMode, setPropertyFilterMode] = useState<'all' | 'sale' | 'rent'>('all');
  const [enquiryFilter, setEnquiryFilter] = useState<'all' | 'development' | 'inspection' | 'contact' | 'service'>('all');
  const [enquirySearch, setEnquirySearch] = useState('');

  // New Property Modal State
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Property Form State
  const [propTitle, setPropTitle] = useState('');
  const [propPrice, setPropPrice] = useState(150000000);
  const [propMode, setPropMode] = useState<PropertyMode>('sale');
  const [propType, setPropType] = useState<PropertyType>('duplex');
  const [propLocation, setPropLocation] = useState<LagosLocation>('Ikoyi');
  const [propAddress, setPropAddress] = useState('');
  const [propBeds, setPropBeds] = useState(4);
  const [propBaths, setPropBaths] = useState(4);
  const [propSize, setPropSize] = useState(450);
  const [propParking, setPropParking] = useState(3);
  const [propStatus, setPropStatus] = useState<PropertyStatus>('For Sale');
  const [propFeatured, setPropFeatured] = useState(true);
  const [propFurnished, setPropFurnished] = useState(false);
  const [propImage, setPropImage] = useState(
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  );
  const [propDesc, setPropDesc] = useState('');
  const [propFeaturesText, setPropFeaturesText] = useState('Swimming Pool, 24/7 Power, Fitted Kitchen, CCTV');

  // Landing Page CMS Form State
  const [cmsHeroImage, setCmsHeroImage] = useState(landingConfig.heroImage);
  const [cmsHeroHeadline, setCmsHeroHeadline] = useState(landingConfig.heroHeadline);
  const [cmsHeroSubline, setCmsHeroSubline] = useState(landingConfig.heroSubline);
  const [cmsHeroBadge, setCmsHeroBadge] = useState(landingConfig.heroBadgeText);
  const [cmsAboutImage, setCmsAboutImage] = useState(landingConfig.aboutOfficeImage);
  const [cmsWhyBahamsImage, setCmsWhyBahamsImage] = useState(
    landingConfig.whyBahamsImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  );
  const [cmsHowItWorksImage, setCmsHowItWorksImage] = useState(
    landingConfig.howItWorksImage || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  );
  const [cmsTrustStats, setCmsTrustStats] = useState(landingConfig.trustStats);
  const [cmsSuccessMessage, setCmsSuccessMessage] = useState('');

  // Manual Lead Modal State
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadType, setLeadType] = useState<InboundEnquiry['type']>('development');
  const [leadSubject, setLeadSubject] = useState('');
  const [leadDetails, setLeadDetails] = useState('');
  const [leadBudget, setLeadBudget] = useState('₦250M – ₦500M');

  // Backup / Import State
  const [importStatus, setImportStatus] = useState<string>('');

  // Handle saving landing page CMS
  const handleSaveLandingCMS = (e: React.FormEvent) => {
    e.preventDefault();
    updateLandingConfig({
      heroImage: cmsHeroImage,
      heroHeadline: cmsHeroHeadline,
      heroSubline: cmsHeroSubline,
      heroBadgeText: cmsHeroBadge,
      aboutOfficeImage: cmsAboutImage,
      whyBahamsImage: cmsWhyBahamsImage,
      howItWorksImage: cmsHowItWorksImage,
      trustStats: cmsTrustStats,
    });
    setCmsSuccessMessage('Landing page visual content and stats published live!');
    setTimeout(() => setCmsSuccessMessage(''), 4000);
  };

  // Open property editor for new
  const handleOpenAddProperty = () => {
    setEditingPropertyId(null);
    setPropTitle('');
    setPropPrice(180000000);
    setPropMode('sale');
    setPropType('duplex');
    setPropLocation('Ikoyi');
    setPropAddress('Bourne Road, Ikoyi, Lagos');
    setPropBeds(4);
    setPropBaths(4);
    setPropSize(420);
    setPropParking(3);
    setPropStatus('For Sale');
    setPropFeatured(true);
    setPropFurnished(false);
    setPropImage(CURATED_IMAGE_PRESETS[0].url);
    setPropDesc(
      'Modern architectural luxury residence in prime Lagos with top-tier finishes, private grounds, and verified title.'
    );
    setPropFeaturesText('Swimming Pool, 24/7 Electricity, CCTV, Fitted German Kitchen, En-Suite BQ');
    setIsAddingProperty(true);
  };

  // Open property editor for existing
  const handleEditProperty = (p: Property) => {
    setEditingPropertyId(p.id);
    setPropTitle(p.title);
    setPropPrice(p.price);
    setPropMode(p.mode);
    setPropType(p.type);
    setPropLocation(p.location);
    setPropAddress(p.address);
    setPropBeds(p.bedrooms);
    setPropBaths(p.bathrooms);
    setPropSize(p.sizeSqm);
    setPropParking(p.parkingSpaces);
    setPropStatus(p.status);
    setPropFeatured(p.featured);
    setPropFurnished(p.furnished);
    setPropImage(p.images[0] || CURATED_IMAGE_PRESETS[0].url);
    setPropDesc(p.description);
    setPropFeaturesText(p.features.join(', '));
    setIsAddingProperty(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = propFeaturesText
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingPropertyId) {
      updateProperty(editingPropertyId, {
        title: propTitle,
        price: Number(propPrice),
        mode: propMode,
        type: propType,
        location: propLocation,
        address: propAddress,
        bedrooms: Number(propBeds),
        bathrooms: Number(propBaths),
        sizeSqm: Number(propSize),
        parkingSpaces: Number(propParking),
        status: propStatus,
        featured: propFeatured,
        furnished: propFurnished,
        images: [propImage, ...(properties.find((p) => p.id === editingPropertyId)?.images.slice(1) || [])],
        description: propDesc,
        features: featuresArray,
      });
    } else {
      addProperty({
        title: propTitle,
        slug: propTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        price: Number(propPrice),
        mode: propMode,
        type: propType,
        location: propLocation,
        address: propAddress,
        bedrooms: Number(propBeds),
        bathrooms: Number(propBaths),
        sizeSqm: Number(propSize),
        parkingSpaces: Number(propParking),
        yearBuilt: new Date().getFullYear(),
        furnished: propFurnished,
        status: propStatus,
        featured: propFeatured,
        description: propDesc,
        features: featuresArray,
        images: [propImage],
        agent: {
          name: 'Babatunde Alabi',
          role: 'Managing Partner',
          phone: '+234 916 714 9677',
          email: 'babatunde@bahamsrealty.com',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        },
        mapQuery: `${propAddress}, ${propLocation}, Lagos`,
      });
    }

    setIsAddingProperty(false);
    setEditingPropertyId(null);
  };

  // Handle adding manual lead
  const handleSaveManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;

    addEnquiry({
      type: leadType,
      name: leadName.trim(),
      phone: leadPhone.trim(),
      email: leadEmail.trim() || undefined,
      subject: leadSubject.trim() || `${leadType.toUpperCase()} Enquiry`,
      details: leadDetails.trim() || 'Direct client consultation logged by management.',
      budget: leadBudget,
    });

    setIsAddingLead(false);
    setLeadName('');
    setLeadPhone('');
    setLeadEmail('');
    setLeadSubject('');
    setLeadDetails('');
  };

  // Export data as JSON file
  const handleExportData = () => {
    const dataToExport = {
      exportDate: new Date().toISOString(),
      properties,
      landingConfig,
      enquiries,
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bahams-realty-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export inquiries as CSV
  const handleExportEnquiriesCSV = () => {
    const headers = ['ID', 'Type', 'Name', 'Phone', 'Email', 'Subject', 'Property/Project', 'Date', 'Time Slot', 'Budget', 'Status', 'Created At'];
    const rows = enquiries.map((e) => [
      e.id,
      e.type,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email || ''}"`,
      `"${e.subject.replace(/"/g, '""')}"`,
      `"${(e.propertyOrProjectTitle || '').replace(/"/g, '""')}"`,
      `"${e.preferredDate || ''}"`,
      `"${e.preferredTime || ''}"`,
      `"${e.budget || ''}"`,
      e.status,
      e.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bahams-inbound-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered properties
  const filteredProperties = properties.filter((p) => {
    if (propertyFilterMode !== 'all' && p.mode !== propertyFilterMode) return false;
    return (
      p.title.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.location.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.id.toLowerCase().includes(propertySearch.toLowerCase())
    );
  });

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    if (enquiryFilter !== 'all' && e.type !== enquiryFilter) return false;
    if (!enquirySearch.trim()) return true;
    const q = enquirySearch.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      (e.email && e.email.toLowerCase().includes(q)) ||
      e.subject.toLowerCase().includes(q) ||
      (e.propertyOrProjectTitle && e.propertyOrProjectTitle.toLowerCase().includes(q))
    );
  });

  // Count metrics
  const devRequestsCount = enquiries.filter((e) => e.type === 'development').length;
  const inspectionCount = enquiries.filter((e) => e.type === 'inspection').length;
  const newRequestsCount = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-[#E5E5E0] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F5C4A]">
              Administrative Portal
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
              <span className={`w-1.5 h-1.5 rounded-full ${isFirebaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              {isFirebaseConnected ? 'Firebase Cloud Synced' : 'Local Offline Mode'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] mt-1">Bahams Realty Operations Manager</h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage listings, update visual imagery, and review live development & inspection requests.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-md transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleExportData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-md transition-colors"
            title="Download full database backup as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup</span>
          </button>
          <button
            type="button"
            onClick={handleOpenAddProperty}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E5E5E0] space-y-1 shadow-xs">
          <span className="text-xs text-neutral-500 block uppercase tracking-wider">
            Total Listings
          </span>
          <p className="text-2xl font-bold text-[#1A1A1A] tabular-nums">{properties.length}</p>
          <div className="flex items-center justify-between text-[11px] text-neutral-500">
            <span className="text-emerald-700 font-semibold">
              {properties.filter((p) => p.status === 'For Sale' || p.status === 'For Rent').length} Active
            </span>
            <span>{properties.filter((p) => p.featured).length} Featured</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E5E0] space-y-1 shadow-xs">
          <span className="text-xs text-neutral-500 block uppercase tracking-wider">
            Development Inquiries
          </span>
          <p className="text-2xl font-bold text-[#0F5C4A] tabular-nums">{devRequestsCount}</p>
          <span className="text-[11px] text-neutral-500 font-medium">
            Off-plan investor packs & brochure requests
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E5E0] space-y-1 shadow-xs">
          <span className="text-xs text-neutral-500 block uppercase tracking-wider">
            Inspection Bookings
          </span>
          <p className="text-2xl font-bold text-amber-700 tabular-nums">{inspectionCount}</p>
          <span className="text-[11px] text-neutral-500 font-medium">
            Physical viewings & diaspora video walkthroughs
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E5E0] space-y-1 shadow-xs">
          <span className="text-xs text-neutral-500 block uppercase tracking-wider">
            Action Items
          </span>
          <p className="text-2xl font-bold text-red-600 tabular-nums">{newRequestsCount}</p>
          <span className="text-[11px] text-neutral-500 font-medium">
            Uncontacted new prospects awaiting reply
          </span>
        </div>
      </div>

      {/* Main Tab Controls with smooth horizontal scrolling on mobile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E5E0] scrollbar-none snap-x">
        <button
          type="button"
          onClick={() => setActiveTab('properties')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shrink-0 snap-start ${
            activeTab === 'properties'
              ? 'bg-[#0F5C4A] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          Properties Catalog ({properties.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shrink-0 snap-start ${
            activeTab === 'cms'
              ? 'bg-[#0F5C4A] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          Landing & Hero CMS
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors relative whitespace-nowrap shrink-0 snap-start ${
            activeTab === 'enquiries'
              ? 'bg-[#0F5C4A] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          Inbound Enquiries & Requests ({enquiries.length})
          {newRequestsCount > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded-full">
              {newRequestsCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shrink-0 snap-start ${
            activeTab === 'settings'
              ? 'bg-[#0F5C4A] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          Database & Backups
        </button>
      </div>

      {/* =========================================================================
          TAB 1: PROPERTIES CATALOG MANAGEMENT
          ========================================================================= */}
      {activeTab === 'properties' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E5E5E0]">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Filter by title, location, or ref ID..."
                  value={propertySearch}
                  onChange={(e) => setPropertySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              </div>

              {/* Mode filter */}
              <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-md text-xs font-semibold shrink-0">
                {(['all', 'sale', 'rent'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPropertyFilterMode(m)}
                    className={`px-2.5 py-1 rounded capitalize transition-all ${
                      propertyFilterMode === m ? 'bg-white shadow-xs text-[#0F5C4A]' : 'text-neutral-600'
                    }`}
                  >
                    {m === 'all' ? 'All' : m === 'sale' ? 'Sale' : 'Rent'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-neutral-500 font-medium">
                Showing {filteredProperties.length} of {properties.length}
              </span>
              <button
                type="button"
                onClick={resetPropertiesToDefault}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-md transition-colors"
                title="Reset properties to initial catalog"
              >
                Reset Default Seed
              </button>
            </div>
          </div>

          {/* Mobile Property Cards View (visible on < md) */}
          <div className="md:hidden space-y-3">
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E5E5E0] p-8 text-center text-xs text-neutral-500">
                No properties found matching your search.
              </div>
            ) : (
              filteredProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white rounded-xl border border-[#E5E5E0] p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                      <SafeImage
                        src={prop.images[0]}
                        alt={prop.title}
                        containerClassName="w-full h-full"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[10px] text-neutral-400">
                          {prop.id} · {prop.type.toUpperCase()}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateProperty(prop.id, { featured: !prop.featured })}
                          className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                            prop.featured
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-neutral-100 text-neutral-500'
                          }`}
                        >
                          {prop.featured ? '★ Featured' : 'Standard'}
                        </button>
                      </div>
                      <h4 className="font-bold text-xs text-neutral-900 line-clamp-2 mt-0.5">
                        {prop.title}
                      </h4>
                      <p className="text-xs font-bold text-[#0F5C4A] mt-0.5 tabular-nums">
                        {formatNaira(prop.price, prop.mode === 'rent')}
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {prop.location} · {formatBeds(prop.bedrooms)} · {formatBaths(prop.bathrooms)} · {prop.sizeSqm}m²
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-100">
                    <select
                      value={prop.status}
                      onChange={(e) =>
                        updateProperty(prop.id, { status: e.target.value as PropertyStatus })
                      }
                      aria-label={`Update status for ${prop.title}`}
                      className="px-2 py-1 text-xs font-semibold rounded border border-neutral-300 bg-white"
                    >
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                      <option value="Selling Fast">Selling Fast</option>
                      <option value="Sold">Sold</option>
                      <option value="Let">Let</option>
                    </select>

                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/properties/${prop.id}`}
                        target="_blank"
                        className="p-2 text-neutral-600 hover:text-neutral-900 bg-neutral-100 rounded-md"
                        title="View Property Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleEditProperty(prop)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#0F5C4A] bg-[#0F5C4A]/10 rounded-md"
                        title="Edit Listing Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete ${prop.title}?`)) {
                            deleteProperty(prop.id);
                          }
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop/Tablet Properties Table (hidden on mobile) */}
          <div className="hidden md:block bg-white rounded-xl border border-[#E5E5E0] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAFAF8] text-neutral-600 text-[11px] font-bold uppercase tracking-wider border-b border-[#E5E5E0]">
                  <tr>
                    <th className="py-3 px-4">Property</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Price (₦)</th>
                    <th className="py-3 px-4">Specs</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-800">
                  {filteredProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-10 rounded overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                            <SafeImage
                              src={prop.images[0]}
                              alt={prop.title}
                              containerClassName="w-full h-full"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-neutral-900 line-clamp-1 max-w-[220px]">
                              {prop.title}
                            </p>
                            <span className="font-mono text-[10px] text-neutral-400">
                              Ref: {prop.id} · {prop.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-neutral-700">{prop.location}</span>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#1A1A1A] tabular-nums">
                        {formatNaira(prop.price, prop.mode === 'rent')}
                      </td>
                      <td className="py-3 px-4 text-neutral-600 text-xs tabular-nums">
                        {formatBeds(prop.bedrooms)} · {formatBaths(prop.bathrooms)} · {prop.sizeSqm}m²
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={prop.status}
                          onChange={(e) =>
                            updateProperty(prop.id, { status: e.target.value as PropertyStatus })
                          }
                          aria-label={`Update status for ${prop.title}`}
                          className="px-2 py-1 text-xs font-semibold rounded border border-neutral-300 bg-white"
                        >
                          <option value="For Sale">For Sale</option>
                          <option value="For Rent">For Rent</option>
                          <option value="Selling Fast">Selling Fast</option>
                          <option value="Sold">Sold</option>
                          <option value="Let">Let</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => updateProperty(prop.id, { featured: !prop.featured })}
                          className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors ${
                            prop.featured
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                          }`}
                        >
                          {prop.featured ? 'Featured' : 'Standard'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/properties/${prop.id}`}
                            target="_blank"
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded"
                            title="View Property Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleEditProperty(prop)}
                            className="p-1.5 text-[#0F5C4A] hover:bg-[#0F5C4A]/10 rounded"
                            title="Edit Listing Details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${prop.title}?`)) {
                                deleteProperty(prop.id);
                              }
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: LANDING PAGE & HERO CMS
          ========================================================================= */}
      {activeTab === 'cms' && (
        <div className="bg-white rounded-xl border border-[#E5E5E0] p-6 sm:p-8 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#1A1A1A]">Landing Page Visual Content & Photos</h2>
              <p className="text-xs text-neutral-500">
                Update the hero photograph, highlight photos, marketing headlines, and trust strip statistics.
              </p>
            </div>
            <button
              type="button"
              onClick={resetLandingConfig}
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 underline self-start sm:self-auto"
            >
              Reset to Brand Defaults
            </button>
          </div>

          {cmsSuccessMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{cmsSuccessMessage}</span>
            </div>
          )}

          <form onSubmit={handleSaveLandingCMS} className="space-y-8">
            {/* 1. HERO PHOTO PRESET SELECTOR & INPUT */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  1. Hero Background Photography
                </label>
                <span className="text-[11px] text-neutral-400">
                  Select a curated luxury preset or paste any image URL
                </span>
              </div>

              {/* Visual preset thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CURATED_IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setCmsHeroImage(preset.url)}
                    className={`relative rounded-lg overflow-hidden border-2 text-left group transition-all aspect-16/10 ${
                      cmsHeroImage === preset.url
                        ? 'border-[#0F5C4A] ring-2 ring-[#0F5C4A]/20 shadow-md'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <SafeImage
                      src={preset.url}
                      alt={preset.label}
                      containerClassName="w-full h-full"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] font-semibold text-white leading-tight line-clamp-1">
                        {preset.label}
                      </span>
                    </div>
                    {cmsHeroImage === preset.url && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom input with live preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start pt-2">
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-[11px] font-semibold text-neutral-600">
                    Custom Photo URL (or paste external CDN link):
                  </label>
                  <input
                    type="url"
                    value={cmsHeroImage}
                    onChange={(e) => setCmsHeroImage(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                    placeholder="https://..."
                  />
                  <p className="text-[11px] text-neutral-400">
                    High-resolution horizontal architectural image recommended (16:9 or 21:9).
                  </p>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Live Hero Preview:
                  </label>
                  <div className="aspect-16/9 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 relative">
                    <SafeImage
                      src={cmsHeroImage}
                      alt="Hero Preview"
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2 text-center">
                      <p className="text-white text-xs font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                        {cmsHeroHeadline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. HERO HEADLINES & COPY */}
            <div className="pt-4 border-t border-neutral-100 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                2. Hero Headlines & Marketing Copy
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={cmsHeroHeadline}
                    onChange={(e) => setCmsHeroHeadline(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">
                    Hero Trust Badge Kicker
                  </label>
                  <input
                    type="text"
                    value={cmsHeroBadge}
                    onChange={(e) => setCmsHeroBadge(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Hero Value Proposition Subline
                </label>
                <textarea
                  rows={2}
                  value={cmsHeroSubline}
                  onChange={(e) => setCmsHeroSubline(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                />
              </div>
            </div>

            {/* 3. SPECIFIC LANDING PAGE HIGHLIGHT PHOTOS */}
            <div className="pt-4 border-t border-neutral-100 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                3. Highlight Photos Across the Website
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* About Office Photo */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-neutral-700">
                    About Office Showcase Photo
                  </label>
                  <div className="aspect-16/10 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
                    <SafeImage
                      src={cmsAboutImage}
                      alt="About Office"
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="url"
                    value={cmsAboutImage}
                    onChange={(e) => setCmsAboutImage(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                  <div className="flex gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setCmsAboutImage(CURATED_IMAGE_PRESETS[7].url)}
                      className="text-[10px] text-[#0F5C4A] hover:underline font-semibold"
                    >
                      Use Office Preset
                    </button>
                  </div>
                </div>

                {/* Why Bahams Highlight Photo */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-neutral-700">
                    "Why Bahams" Spotlight Visual
                  </label>
                  <div className="aspect-16/10 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
                    <SafeImage
                      src={cmsWhyBahamsImage}
                      alt="Why Bahams Visual"
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="url"
                    value={cmsWhyBahamsImage}
                    onChange={(e) => setCmsWhyBahamsImage(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                  <div className="flex gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setCmsWhyBahamsImage(CURATED_IMAGE_PRESETS[2].url)}
                      className="text-[10px] text-[#0F5C4A] hover:underline font-semibold"
                    >
                      Use Banana Island Preset
                    </button>
                  </div>
                </div>

                {/* How It Works Visual */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-neutral-700">
                    "How It Works" Advisory Photo
                  </label>
                  <div className="aspect-16/10 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
                    <SafeImage
                      src={cmsHowItWorksImage}
                      alt="How It Works Visual"
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="url"
                    value={cmsHowItWorksImage}
                    onChange={(e) => setCmsHowItWorksImage(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                  <div className="flex gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setCmsHowItWorksImage(CURATED_IMAGE_PRESETS[5].url)}
                      className="text-[10px] text-[#0F5C4A] hover:underline font-semibold"
                    >
                      Use Interior Preset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. TRUST STATS STRIP */}
            <div className="pt-4 border-t border-neutral-100 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                4. Trust Strip Statistics (Displayed below Hero)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cmsTrustStats.map((stat, idx) => (
                  <div key={idx} className="p-3 bg-[#FAFAF8] rounded-lg border border-neutral-200 space-y-2">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase">
                        Stat Value
                      </label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...cmsTrustStats];
                          updated[idx] = { ...updated[idx], value: e.target.value };
                          setCmsTrustStats(updated);
                        }}
                        className="w-full px-2 py-1 text-sm font-bold border border-neutral-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase">
                        Label
                      </label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...cmsTrustStats];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setCmsTrustStats(updated);
                        }}
                        className="w-full px-2 py-1 text-xs border border-neutral-300 rounded bg-white font-medium"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Publish Visual Content & Updates</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================================================
          TAB 3: INBOUND ENQUIRIES & DEVELOPMENT REQUESTS
          ========================================================================= */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E5E5E0]">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-neutral-500 font-semibold uppercase">Category:</span>
              <div className="flex flex-wrap gap-1">
                {(['all', 'development', 'inspection', 'contact', 'service'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setEnquiryFilter(t)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md capitalize transition-colors ${
                      enquiryFilter === t
                        ? 'bg-[#0F5C4A] text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {t === 'all'
                      ? `All (${enquiries.length})`
                      : t === 'development'
                      ? `Developments (${devRequestsCount})`
                      : t === 'inspection'
                      ? `Inspections (${inspectionCount})`
                      : t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>

              <button
                type="button"
                onClick={handleExportEnquiriesCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md"
                title="Export leads to CSV spreadsheet"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#0F5C4A]" />
                <span>Export CSV</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAddingLead(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-[#0F5C4A] text-white hover:bg-[#0B4638] rounded-md shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Lead</span>
              </button>
            </div>
          </div>

          {/* Enquiries List */}
          <div className="space-y-4">
            {filteredEnquiries.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E5E5E0] p-12 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-neutral-300 mx-auto" />
                <h3 className="text-base font-bold text-neutral-800">No Enquiries Found</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  There are no inbound leads matching your current filter. When visitors submit inspection or development requests, they appear here instantly.
                </p>
              </div>
            ) : (
              filteredEnquiries.map((enq) => {
                // Pre-fill agent reply message for WhatsApp
                const agentReply = `Hello ${enq.name}, thank you for contacting Bahams Realty regarding "${enq.subject}". This is the advisory desk. We have received your request and would be delighted to assist you. When is the most convenient time for a quick consultation?`;
                const whatsappReplyUrl = getWhatsAppUrl(agentReply, enq.phone.replace(/[^0-9]/g, ''));

                return (
                  <div
                    key={enq.id}
                    className={`bg-white rounded-xl border p-5 sm:p-6 transition-all shadow-xs space-y-4 ${
                      enq.status === 'new'
                        ? 'border-emerald-500/50 ring-1 ring-emerald-500/10'
                        : 'border-[#E5E5E0]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase ${
                            enq.type === 'development'
                              ? 'bg-amber-100 text-amber-800'
                              : enq.type === 'inspection'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {enq.type[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-[#1A1A1A]">{enq.name}</h3>
                            <span
                              className={`px-2 py-0.5 text-[10px] font-semibold rounded uppercase tracking-wider ${
                                enq.type === 'development'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : enq.type === 'inspection'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-neutral-100 text-neutral-600'
                              }`}
                            >
                              {enq.type === 'development'
                                ? 'Development Lead'
                                : enq.type === 'inspection'
                                ? 'Viewing Booking'
                                : enq.type}
                            </span>
                          </div>
                          <span className="text-[11px] text-neutral-400 font-mono">
                            Ref: {enq.id} · Logged: {new Date(enq.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-neutral-400 font-medium">Status:</span>
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            updateEnquiryStatus(enq.id, e.target.value as InboundEnquiry['status'])
                          }
                          aria-label={`Update enquiry status for ${enq.name}`}
                          className={`px-2.5 py-1 text-xs font-semibold rounded border ${
                            enq.status === 'new'
                              ? 'bg-red-50 text-red-800 border-red-200'
                              : enq.status === 'contacted'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          <option value="new">New (Uncontacted)</option>
                          <option value="contacted">Contacted / In Progress</option>
                          <option value="resolved">Resolved / Scheduled</option>
                        </select>
                      </div>
                    </div>

                    {/* Details Body */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-700">
                      <div className="space-y-1">
                        <span className="font-semibold text-neutral-900 block">{enq.subject}</span>
                        {enq.propertyOrProjectTitle && (
                          <p className="text-neutral-500">
                            Asset:{' '}
                            <span className="font-semibold text-neutral-800">
                              {enq.propertyOrProjectTitle}
                            </span>
                          </p>
                        )}
                        {enq.budget && (
                          <p className="text-neutral-500">
                            Budget Range: <span className="font-bold text-[#0F5C4A]">{enq.budget}</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <p className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-neutral-400" />
                          <span className="font-mono">{enq.phone}</span>
                        </p>
                        {enq.email && (
                          <p className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{enq.email}</span>
                          </p>
                        )}
                        {enq.preferredDate && (
                          <p className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {enq.preferredDate} at {enq.preferredTime || 'Morning'}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100 space-y-1">
                        <span className="font-semibold text-[11px] text-neutral-500 uppercase tracking-wider block">
                          Prospect Notes / Message:
                        </span>
                        <p className="italic text-neutral-600 line-clamp-3 leading-relaxed">
                          "{enq.details}"
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100">
                      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        <a
                          href={whatsappReplyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            if (enq.status === 'new') updateEnquiryStatus(enq.id, 'contacted');
                          }}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Reply</span>
                        </a>

                        {enq.phone && (
                          <a
                            href={`tel:${enq.phone}`}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-md"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call</span>
                          </a>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Delete this enquiry record?')) {
                            deleteEnquiry(enq.id);
                          }
                        }}
                        className="text-neutral-400 hover:text-red-500 text-xs font-semibold transition-colors"
                      >
                        Delete Record
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: SETTINGS & DATABASE TOOLS
          ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border border-[#E5E5E0] p-6 sm:p-8 space-y-6 shadow-xs max-w-3xl">
          <div>
            <h2 className="text-lg font-bold text-[#1A1A1A]">Data Storage & System Utilities</h2>
            <p className="text-xs text-neutral-500">
              Manage local data persistence, export backups, and maintain the live catalog state.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Download Full JSON Backup
                </h3>
                <p className="text-xs text-neutral-500">
                  Export all current listings, CMS configurations, and enquiries to a file.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportData}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export Backup</span>
              </button>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Restore Catalog Defaults
                </h3>
                <p className="text-xs text-neutral-500">
                  Resets the properties array to the verified 14 landmark Lagos listings.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset property catalog to default Lagos seed?')) {
                    resetPropertiesToDefault();
                  }
                }}
                className="px-4 py-2 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Seed</span>
              </button>
            </div>

            <div className="p-4 bg-red-50/50 rounded-lg border border-red-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-red-900 uppercase tracking-wider">
                  Clear Inbound Enquiries
                </h3>
                <p className="text-xs text-red-600/80">
                  Remove all current leads and viewing requests from the local cache.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to clear all inquiries?')) {
                    clearEnquiries();
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear Leads</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD / EDIT PROPERTY
          ========================================================================= */}
      {isAddingProperty && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-8 space-y-5 max-h-[94vh] overflow-y-auto shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#0F5C4A]">
                  Listing Manager
                </span>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  {editingPropertyId ? 'Edit Property Listing' : 'Add New Lagos Property'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingProperty(false)}
                className="p-1 text-neutral-400 hover:text-neutral-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Property Title
                </label>
                <input
                  type="text"
                  required
                  value={propTitle}
                  onChange={(e) => setPropTitle(e.target.value)}
                  placeholder="e.g. 5 Bedroom Contemporary Luxury Detached Duplex"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:ring-2 focus:ring-[#0F5C4A]"
                />
              </div>

              {/* Price & Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Price in Naira (₦)
                  </label>
                  <input
                    type="number"
                    required
                    min={1000000}
                    value={propPrice}
                    onChange={(e) => setPropPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono font-bold"
                  />
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    Formatted: {formatNaira(propPrice, propMode === 'rent')}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Mode
                  </label>
                  <select
                    value={propMode}
                    onChange={(e) => setPropMode(e.target.value as PropertyMode)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-semibold bg-white"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent (/yr)</option>
                  </select>
                </div>
              </div>

              {/* Type, Location, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Property Type
                  </label>
                  <select
                    value={propType}
                    onChange={(e) => setPropType(e.target.value as PropertyType)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white capitalize"
                  >
                    <option value="duplex">Duplex</option>
                    <option value="terrace">Terrace</option>
                    <option value="detached">Detached</option>
                    <option value="flat">Flat / Apartment</option>
                    <option value="land">Land Plot</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Lagos Location
                  </label>
                  <select
                    value={propLocation}
                    onChange={(e) => setPropLocation(e.target.value as LagosLocation)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  >
                    <option value="Ikoyi">Ikoyi</option>
                    <option value="Victoria Island">Victoria Island</option>
                    <option value="Lekki Phase 1">Lekki Phase 1</option>
                    <option value="Ajah">Ajah</option>
                    <option value="Ikeja GRA">Ikeja GRA</option>
                    <option value="Yaba">Yaba</option>
                    <option value="Surulere">Surulere</option>
                    <option value="Ibeju-Lekki">Ibeju-Lekki</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={propStatus}
                    onChange={(e) => setPropStatus(e.target.value as PropertyStatus)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  >
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                    <option value="Selling Fast">Selling Fast</option>
                    <option value="Sold">Sold</option>
                    <option value="Let">Let</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Specific Address / Street
                </label>
                <input
                  type="text"
                  required
                  value={propAddress}
                  onChange={(e) => setPropAddress(e.target.value)}
                  placeholder="e.g. Off Admiralty Way, Lekki Phase 1, Lagos"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              {/* Specs: Beds, Baths, Size, Parking */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Beds
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={propBeds}
                    onChange={(e) => setPropBeds(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Baths
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={propBaths}
                    onChange={(e) => setPropBaths(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Size (SQM)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={propSize}
                    onChange={(e) => setPropSize(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Parking
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={propParking}
                    onChange={(e) => setPropParking(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono"
                  />
                </div>
              </div>

              {/* Visual Photo Selection with presets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-neutral-700 uppercase">
                    Primary Photo (Select Preset or Paste URL)
                  </label>
                  <span className="text-[10px] text-neutral-400">Click a preset to apply</span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {CURATED_IMAGE_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPropImage(p.url)}
                      className={`relative aspect-square rounded overflow-hidden border-2 transition-all ${
                        propImage === p.url ? 'border-[#0F5C4A] ring-2 ring-[#0F5C4A]/30' : 'border-neutral-200'
                      }`}
                      title={p.label}
                    >
                      <SafeImage
                        src={p.url}
                        alt={p.label}
                        containerClassName="w-full h-full"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                <input
                  type="url"
                  required
                  value={propImage}
                  onChange={(e) => setPropImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  placeholder="https://..."
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Property Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={propDesc}
                  onChange={(e) => setPropDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Key Amenities (Comma-separated)
                </label>
                <input
                  type="text"
                  value={propFeaturesText}
                  onChange={(e) => setPropFeaturesText(e.target.value)}
                  placeholder="Swimming Pool, 24/7 Power, CCTV, Fitted Kitchen"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700">
                  <input
                    type="checkbox"
                    checked={propFeatured}
                    onChange={(e) => setPropFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#0F5C4A] rounded"
                  />
                  <span>Feature on Homepage Spotlight</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700">
                  <input
                    type="checkbox"
                    checked={propFurnished}
                    onChange={(e) => setPropFurnished(e.target.checked)}
                    className="w-4 h-4 text-[#0F5C4A] rounded"
                  />
                  <span>Furnished</span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddingProperty(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs"
                >
                  {editingPropertyId ? 'Save Changes' : 'Publish Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: MANUAL INBOUND LEAD LOGGING
          ========================================================================= */}
      {isAddingLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-[#1A1A1A]">Log Walk-in / Phone Prospect</h3>
              <button
                type="button"
                onClick={() => setIsAddingLead(false)}
                className="p-1 text-neutral-400 hover:text-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveManualLead} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Client Full Name
                </label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Chief Adebayo Benson"
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
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="+234..."
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="client@..."
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Lead Type
                  </label>
                  <select
                    value={leadType}
                    onChange={(e) => setLeadType(e.target.value as InboundEnquiry['type'])}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white capitalize"
                  >
                    <option value="development">Development</option>
                    <option value="inspection">Inspection</option>
                    <option value="contact">Contact</option>
                    <option value="service">Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Budget Range
                  </label>
                  <input
                    type="text"
                    value={leadBudget}
                    onChange={(e) => setLeadBudget(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Subject / Property Interest
                </label>
                <input
                  type="text"
                  value={leadSubject}
                  onChange={(e) => setLeadSubject(e.target.value)}
                  placeholder="e.g. 4-Bed Penthouse at The Oceanic"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Requirements & Notes
                </label>
                <textarea
                  rows={2}
                  value={leadDetails}
                  onChange={(e) => setLeadDetails(e.target.value)}
                  placeholder="Client met in Lekki office. Requests floor plans..."
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddingLead(false)}
                  className="px-3 py-1.5 text-xs text-neutral-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase rounded-md shadow-xs"
                >
                  Save Lead Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
