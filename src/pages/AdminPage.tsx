import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Plus,
  Trash2,
  Edit3,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Save,
  Search,
  Eye,
  EyeOff,
  Calendar,
  X,
  Download,
  Upload,
  Phone,
  Mail,
  FileSpreadsheet,
  Check,
  Lock,
  LogOut,
  ShieldCheck,
  Briefcase,
  Layers,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import {
  Property,
  PropertyMode,
  PropertyType,
  LagosLocation,
  PropertyStatus,
  Development,
  DevelopmentStatus,
  ServiceItem,
  InboundEnquiry,
} from '../types/index.ts';
import { formatNaira, formatBeds, formatBaths } from '../utils/formatters.ts';
import { SafeImage } from '../components/common/SafeImage.tsx';
import { getWhatsAppUrl } from '../utils/whatsapp.ts';
import {
  verifyAdminGatePassword,
  validateAdminPasswordChange,
  isAdminSessionUnlocked,
  setAdminSessionUnlocked,
} from '../utils/adminAuth.ts';
import {
  processUploadedImageFile,
  normalizeExternalImageUrl,
  detectImageSourceType,
} from '../utils/imageUpload.ts';
import { AfrocentricWatermark } from '../components/common/AfrocentricPattern.tsx';

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

type AdminTab = 'properties' | 'developments' | 'services' | 'cms' | 'enquiries' | 'settings';

export const AdminPage: React.FC = () => {
  // Password Gate State
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => isAdminSessionUnlocked());
  const [gatePasswordInput, setGatePasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gateError, setGateError] = useState('');

  const {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    resetPropertiesToDefault,
    developments,
    addDevelopment,
    updateDevelopment,
    deleteDevelopment,
    resetDevelopmentsToDefault,
    services,
    addService,
    updateService,
    deleteService,
    resetServicesToDefault,
    landingConfig,
    updateLandingConfig,
    resetLandingConfig,
    enquiries,
    addEnquiry,
    updateEnquiryStatus,
    deleteEnquiry,
    clearEnquiries,
    adminGatePassword,
    updateAdminGatePassword,
    resetAdminGatePasswordToDefault,
    isFirebaseConnected,
  } = useData();

  const [activeTab, setActiveTab] = useState<AdminTab>('properties');
  const [uploadStatusMsg, setUploadStatusMsg] = useState<string>('');

  // Admin Gate Password Change Form State
  const [currentGatePassInput, setCurrentGatePassInput] = useState('');
  const [newGatePassInput, setNewGatePassInput] = useState('');
  const [confirmGatePassInput, setConfirmGatePassInput] = useState('');
  const [showChangePasswords, setShowChangePasswords] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  // Search & Filter states
  const [propertySearch, setPropertySearch] = useState('');
  const [propertyFilterMode, setPropertyFilterMode] = useState<'all' | 'sale' | 'rent'>('all');
  const [enquiryFilter, setEnquiryFilter] = useState<
    'all' | 'development' | 'inspection' | 'contact' | 'service'
  >('all');
  const [enquirySearch, setEnquirySearch] = useState('');

  // ============================================================================
  // 1. PROPERTY MODAL STATE
  // ============================================================================
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
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
  const [propImage, setPropImage] = useState(CURATED_IMAGE_PRESETS[0].url);
  const [propExtraImages, setPropExtraImages] = useState<string[]>([]);
  const [propDesc, setPropDesc] = useState('');
  const [propFeaturesText, setPropFeaturesText] = useState(
    'Swimming Pool, 24/7 Estate Power, Fitted Kitchen, En-Suite BQ, CCTV'
  );

  // ============================================================================
  // 2. DEVELOPMENT MODAL STATE
  // ============================================================================
  const [isAddingDevelopment, setIsAddingDevelopment] = useState(false);
  const [editingDevelopmentId, setEditingDevelopmentId] = useState<string | null>(null);
  const [devName, setDevName] = useState('');
  const [devLocation, setDevLocation] = useState<LagosLocation>('Victoria Island');
  const [devAddress, setDevAddress] = useState('');
  const [devDeveloper, setDevDeveloper] = useState('Bahams Development Partners');
  const [devStatus, setDevStatus] = useState<DevelopmentStatus>('Off-plan');
  const [devStartingPrice, setDevStartingPrice] = useState(220000000);
  const [devDepositPct, setDevDepositPct] = useState(30);
  const [devDurationMonths, setDevDurationMonths] = useState(18);
  const [devPaymentDesc, setDevPaymentDesc] = useState(
    '30% initial deposit with balance spread across 18 months tied to certified engineering milestones.'
  );
  const [devMilestonesText, setDevMilestonesText] = useState(
    '30% Initial Deposit, 20% Piling & Substructure, 20% Superstructure, 20% Roofing & MEP, 10% Handover'
  );
  const [devOverview, setDevOverview] = useState('');
  const [devPrimaryImage, setDevPrimaryImage] = useState(CURATED_IMAGE_PRESETS[1].url);
  const [devMasterplanImage, setDevMasterplanImage] = useState(CURATED_IMAGE_PRESETS[4].url);
  const [devUnitSummaryText, setDevUnitSummaryText] = useState(
    '2 Bedroom Luxury Residence | 145 | 220000000 | 6\n3 Bedroom Waterfront Residence | 230 | 340000000 | 4\n4 Bedroom Sky Penthouse | 420 | 650000000 | 2'
  );
  const [devFeatured, setDevFeatured] = useState(true);

  // ============================================================================
  // 3. SERVICE MODAL STATE
  // ============================================================================
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [srvTitle, setSrvTitle] = useState('');
  const [srvBadge, setSrvBadge] = useState('Advisory Mandate');
  const [srvTagline, setSrvTagline] = useState('');
  const [srvDescription, setSrvDescription] = useState('');
  const [srvDeliverablesText, setSrvDeliverablesText] = useState(
    'Alausa Land Registry Title Search, Surveyor-General Coordinate Charting, Contract & Deed Conveyancing, Private Viewing Logistics'
  );
  const [srvWhatsappMsg, setSrvWhatsappMsg] = useState('');
  const [srvImage, setSrvImage] = useState('');

  // ============================================================================
  // 4. LANDING PAGE CMS STATE
  // ============================================================================
  const [cmsHeroImage, setCmsHeroImage] = useState(landingConfig.heroImage);
  const [cmsHeroHeadline, setCmsHeroHeadline] = useState(landingConfig.heroHeadline);
  const [cmsHeroSubline, setCmsHeroSubline] = useState(landingConfig.heroSubline);
  const [cmsHeroBadge, setCmsHeroBadge] = useState(landingConfig.heroBadgeText);
  const [cmsFeaturedTitle, setCmsFeaturedTitle] = useState(
    landingConfig.featuredHighlightTitle || 'Curated Prime Residences'
  );
  const [cmsAboutImage, setCmsAboutImage] = useState(landingConfig.aboutOfficeImage);
  const [cmsWhyBahamsImage, setCmsWhyBahamsImage] = useState(
    landingConfig.whyBahamsImage || CURATED_IMAGE_PRESETS[2].url
  );
  const [cmsHowItWorksImage, setCmsHowItWorksImage] = useState(
    landingConfig.howItWorksImage || CURATED_IMAGE_PRESETS[5].url
  );
  const [cmsTrustStats, setCmsTrustStats] = useState(landingConfig.trustStats);
  const [cmsSuccessMessage, setCmsSuccessMessage] = useState('');

  // ============================================================================
  // 5. MANUAL LEAD STATE
  // ============================================================================
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadType, setLeadType] = useState<InboundEnquiry['type']>('development');
  const [leadSubject, setLeadSubject] = useState('');
  const [leadDetails, setLeadDetails] = useState('');
  const [leadBudget, setLeadBudget] = useState('₦250M – ₦500M');

  // Flash helper for uploads
  const showUploadToast = (msg: string) => {
    setUploadStatusMsg(msg);
    setTimeout(() => setUploadStatusMsg(''), 3500);
  };

  // Generic File Input handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void,
    label = 'Image'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressedDataUrl = await processUploadedImageFile(file);
      onSuccess(compressedDataUrl);
      showUploadToast(`${label} uploaded and optimized!`);
    } catch (err) {
      showUploadToast(err instanceof Error ? err.message : 'Failed to process image file.');
    } finally {
      e.target.value = '';
    }
  };

  // ============================================================================
  // GATE AUTHENTICATION & PASSWORD CHANGE HANDLERS
  // ============================================================================
  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminGatePassword(gatePasswordInput, adminGatePassword)) {
      setAdminSessionUnlocked(true);
      setIsUnlocked(true);
      setGateError('');
      setGatePasswordInput('');
    } else {
      setGateError('Invalid access key. Please verify your executive credentials.');
    }
  };

  const handleLockPortal = () => {
    setAdminSessionUnlocked(false);
    setIsUnlocked(false);
    setGatePasswordInput('');
    setGateError('');
  };

  const handleChangeGatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess('');

    const validation = validateAdminPasswordChange({
      currentInput: currentGatePassInput,
      newPassword: newGatePassInput,
      confirmPassword: confirmGatePassInput,
      activeCustomPassword: adminGatePassword,
    });

    if (!validation.valid || !validation.sanitizedPassword) {
      setPasswordChangeError(validation.error || 'Could not update password.');
      return;
    }

    updateAdminGatePassword(validation.sanitizedPassword);
    setCurrentGatePassInput('');
    setNewGatePassInput('');
    setConfirmGatePassInput('');
    setPasswordChangeSuccess(
      'Executive Gate Password updated and synced to Firebase Cloud Security!'
    );
    showUploadToast('Gate password updated in Firebase!');
  };

  // ============================================================================
  // RENDER SECURITY GATE IF NOT UNLOCKED
  // ============================================================================
  if (!isUnlocked) {
    return (
      <div className="min-h-[82vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#E5E5E0] shadow-xl overflow-hidden animate-scaleUp">
          {/* Dark Emerald Header */}
          <div className="relative bg-[#141413] text-white p-6 sm:p-8 space-y-2 overflow-hidden">
            <AfrocentricWatermark className="text-emerald-400" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0F5C4A] text-white text-[10px] font-bold uppercase tracking-widest">
                <Lock className="w-3 h-3" />
                <span>Restricted Route</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400">/admin</span>
            </div>
            <h1 className="relative z-10 text-xl sm:text-2xl font-bold tracking-tight pt-2">
              Bahams Realty Operations Gate
            </h1>
            <p className="relative z-10 text-xs text-neutral-300 leading-relaxed">
              Authorised access for managing Lagos property mandates, off-plan developments, advisory services, and site media.
            </p>
          </div>

          {/* Gate Form */}
          <form onSubmit={handleGateSubmit} className="p-6 sm:p-8 space-y-5">
            {gateError && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{gateError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="admin-gate-password"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
              >
                Executive Access Key
              </label>
              <div className="relative">
                <input
                  id="admin-gate-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  autoComplete="current-password"
                  value={gatePasswordInput}
                  onChange={(e) => {
                    setGatePasswordInput(e.target.value);
                    if (gateError) setGateError('');
                  }}
                  placeholder="Enter authorised gate password"
                  className="w-full pl-3.5 pr-10 py-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] bg-[#FAFAF8] focus:bg-white font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#0F5C4A] hover:bg-[#0B4638] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Operations Portal</span>
            </button>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <span>14A Admiralty Way, Lekki</span>
              <Link to="/" className="text-[#0F5C4A] hover:underline font-semibold">
                ← Return to Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ============================================================================
  // PROPERTY CRUD HANDLERS
  // ============================================================================
  const handleOpenAddProperty = () => {
    setEditingPropertyId(null);
    setPropTitle('');
    setPropPrice(180000000);
    setPropMode('sale');
    setPropType('duplex');
    setPropLocation('Ikoyi');
    setPropAddress('Bourdillon Road, Old Ikoyi, Lagos');
    setPropBeds(4);
    setPropBaths(4);
    setPropSize(420);
    setPropParking(3);
    setPropStatus('For Sale');
    setPropFeatured(true);
    setPropFurnished(false);
    setPropImage(CURATED_IMAGE_PRESETS[0].url);
    setPropExtraImages([]);
    setPropDesc(
      'Modern architectural luxury residence in prime Lagos with top-tier finishes, private grounds, en-suite Boys’ Quarters (BQ), and verified Governor’s Consent.'
    );
    setPropFeaturesText(
      'Swimming Pool, 24/7 Estate Power, CCTV, Fitted German Kitchen, En-Suite BQ, Governor’s Consent'
    );
    setIsAddingProperty(true);
  };

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
    setPropExtraImages(p.images.slice(1));
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

    const normalizedPrimary = normalizeExternalImageUrl(propImage);
    const allImages = [
      normalizedPrimary,
      ...propExtraImages.map((img) => normalizeExternalImageUrl(img)).filter(Boolean),
    ];

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
        images: allImages,
        description: propDesc,
        features: featuresArray,
      });
      showUploadToast('Property listing updated!');
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
        images: allImages,
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
      showUploadToast('New property published to live catalog!');
    }

    setIsAddingProperty(false);
    setEditingPropertyId(null);
  };

  // ============================================================================
  // DEVELOPMENT CRUD HANDLERS
  // ============================================================================
  const handleOpenAddDevelopment = () => {
    setEditingDevelopmentId(null);
    setDevName('');
    setDevLocation('Victoria Island');
    setDevAddress('Ahmadu Bello Way, Victoria Island, Lagos');
    setDevDeveloper('Bahams Prime Developments');
    setDevStatus('Off-plan');
    setDevStartingPrice(240000000);
    setDevDepositPct(30);
    setDevDurationMonths(18);
    setDevPaymentDesc(
      '30% initial deposit with structured milestone tranches over 18 months.'
    );
    setDevMilestonesText(
      '30% Initial Deposit, 20% Substructure & Piling, 25% Superstructure, 15% Finishes & Glazing, 10% Handover'
    );
    setDevOverview(
      'A landmark multi-unit residential tower offering panoramic Atlantic and Lagoon views, smart home automation, resort deck swimming pool, and escrow-verified construction milestones.'
    );
    setDevPrimaryImage(CURATED_IMAGE_PRESETS[1].url);
    setDevMasterplanImage(CURATED_IMAGE_PRESETS[4].url);
    setDevUnitSummaryText(
      '2 Bedroom Executive Suite | 140 | 240000000 | 8\n3 Bedroom Luxury Residence + BQ | 220 | 380000000 | 5\n4 Bedroom Sky Villa Penthouse | 410 | 720000000 | 2'
    );
    setDevFeatured(true);
    setIsAddingDevelopment(true);
  };

  const handleEditDevelopment = (dev: Development) => {
    setEditingDevelopmentId(dev.id);
    setDevName(dev.name);
    setDevLocation(dev.location);
    setDevAddress(dev.address);
    setDevDeveloper(dev.developer);
    setDevStatus(dev.status);
    setDevStartingPrice(dev.startingPrice);
    setDevDepositPct(dev.paymentPlan.depositPercentage);
    setDevDurationMonths(dev.paymentPlan.durationMonths);
    setDevPaymentDesc(dev.paymentPlan.description);
    setDevMilestonesText(dev.paymentPlan.milestones.join(', '));
    setDevOverview(dev.overview);
    setDevPrimaryImage(dev.images[0] || CURATED_IMAGE_PRESETS[1].url);
    setDevMasterplanImage(dev.masterplanImage || CURATED_IMAGE_PRESETS[4].url);
    setDevUnitSummaryText(
      dev.unitTypes
        .map((u) => `${u.type} | ${u.sizeSqm} | ${u.startingPrice} | ${u.availableUnits}`)
        .join('\n')
    );
    setDevFeatured(dev.featured);
    setIsAddingDevelopment(true);
  };

  const handleSaveDevelopment = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedUnits = devUnitSummaryText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split('|').map((p) => p.trim());
        return {
          type: parts[0] || '3 Bedroom Residence',
          sizeSqm: Number(parts[1]) || 180,
          startingPrice: Number(parts[2]) || Number(devStartingPrice),
          availableUnits: Number(parts[3]) || 4,
        };
      });

    const parsedMilestones = devMilestonesText
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    const payload: Omit<Development, 'id'> = {
      name: devName,
      slug: devName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      location: devLocation,
      address: devAddress,
      developer: devDeveloper,
      status: devStatus,
      startingPrice: Number(devStartingPrice),
      overview: devOverview,
      unitTypes:
        parsedUnits.length > 0
          ? parsedUnits
          : [
              {
                type: '3 Bedroom Luxury Apartment',
                sizeSqm: 210,
                startingPrice: Number(devStartingPrice),
                availableUnits: 5,
              },
            ],
      paymentPlan: {
        depositPercentage: Number(devDepositPct),
        durationMonths: Number(devDurationMonths),
        description: devPaymentDesc,
        milestones:
          parsedMilestones.length > 0
            ? parsedMilestones
            : ['30% Initial Deposit', '40% Construction Milestones', '30% Handover'],
      },
      masterplanImage: normalizeExternalImageUrl(devMasterplanImage),
      images: [
        normalizeExternalImageUrl(devPrimaryImage),
        normalizeExternalImageUrl(devMasterplanImage),
        CURATED_IMAGE_PRESETS[5].url,
      ],
      amenities: [
        { label: 'Infinity Swimming Pool', icon: 'waves' },
        { label: '24/7 IPP Power Plant', icon: 'zap' },
        { label: 'Private Gym & Wellness Club', icon: 'dumbbell' },
        { label: 'Armed Concierge Security', icon: 'shield-check' },
      ],
      timeline: [
        {
          phase: 'Site Acquisition & Piling',
          date: 'Completed',
          status: 'completed',
          description: 'Title perfection and foundation piling certified.',
        },
        {
          phase: 'Superstructure Construction',
          date: 'In Progress',
          status: 'in-progress',
          description: 'Reinforced concrete structural framing underway.',
        },
        {
          phase: 'MEP & Interior Finishes',
          date: 'Upcoming',
          status: 'upcoming',
          description: 'Glazing, mechanical/electrical installations, and cabinetry.',
        },
        {
          phase: 'Key Handover & Facility Activation',
          date: 'Q4 2027',
          status: 'upcoming',
          description: 'Final inspection and allocation handover to subscribers.',
        },
      ],
      faqs: [
        {
          question: 'What title documentation backs this development?',
          answer:
            'The project is backed by a verified Lagos State Certificate of Occupancy / Governor’s Consent with clean root of title.',
        },
        {
          question: 'Can diaspora subscribers pay in milestone tranches?',
          answer:
            'Yes, subscribers pay in structured construction milestones into the designated project escrow account.',
        },
      ],
      mapQuery: `${devAddress}, ${devLocation}, Lagos`,
      featured: devFeatured,
    };

    if (editingDevelopmentId) {
      updateDevelopment(editingDevelopmentId, payload);
      showUploadToast('Development project updated!');
    } else {
      addDevelopment(payload);
      showUploadToast('New development project published!');
    }

    setIsAddingDevelopment(false);
    setEditingDevelopmentId(null);
  };

  // ============================================================================
  // SERVICE CRUD HANDLERS
  // ============================================================================
  const handleOpenAddService = () => {
    setEditingServiceId(null);
    setSrvTitle('');
    setSrvBadge('Specialized Advisory');
    setSrvTagline('');
    setSrvDescription('');
    setSrvDeliverablesText(
      'Alausa Land Registry Verification, Surveyor-General Coordinate Charting, Legal Conveyancing & Escrow, Private Inspection Chauffeur'
    );
    setSrvWhatsappMsg(
      'Hello Bahams Realty, I would like to consult with your advisory desk regarding this service.'
    );
    setSrvImage(CURATED_IMAGE_PRESETS[7].url);
    setIsAddingService(true);
  };

  const handleEditService = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setSrvTitle(srv.title);
    setSrvBadge(srv.categoryBadge || 'Core Advisory Pillar');
    setSrvTagline(srv.tagline);
    setSrvDescription(srv.description);
    setSrvDeliverablesText(srv.deliverables.join(', '));
    setSrvWhatsappMsg(srv.whatsappMessage);
    setSrvImage(srv.image || '');
    setIsAddingService(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const deliverables = srvDeliverablesText
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const payload: Omit<ServiceItem, 'id'> = {
      title: srvTitle.trim(),
      categoryBadge: srvBadge.trim() || 'Core Advisory Pillar',
      tagline: srvTagline.trim(),
      description: srvDescription.trim(),
      deliverables:
        deliverables.length > 0
          ? deliverables
          : ['Complete Title Verification', 'Dedicated Transaction Partner'],
      whatsappMessage:
        srvWhatsappMsg.trim() ||
        `Hello Bahams Realty, I am interested in your ${srvTitle.trim()} service.`,
      image: srvImage.trim() ? normalizeExternalImageUrl(srvImage) : undefined,
    };

    if (editingServiceId) {
      updateService(editingServiceId, payload);
      showUploadToast('Advisory service updated!');
    } else {
      addService(payload);
      showUploadToast('New advisory service published!');
    }

    setIsAddingService(false);
    setEditingServiceId(null);
  };

  // ============================================================================
  // LANDING CMS & BACKUP HANDLERS
  // ============================================================================
  const handleSaveLandingCMS = (e: React.FormEvent) => {
    e.preventDefault();
    updateLandingConfig({
      heroImage: normalizeExternalImageUrl(cmsHeroImage),
      heroHeadline: cmsHeroHeadline,
      heroSubline: cmsHeroSubline,
      heroBadgeText: cmsHeroBadge,
      featuredHighlightTitle: cmsFeaturedTitle,
      aboutOfficeImage: normalizeExternalImageUrl(cmsAboutImage),
      whyBahamsImage: normalizeExternalImageUrl(cmsWhyBahamsImage),
      howItWorksImage: normalizeExternalImageUrl(cmsHowItWorksImage),
      trustStats: cmsTrustStats,
    });
    setCmsSuccessMessage('Landing page imagery, headlines, and statistics published live!');
    showUploadToast('Landing CMS published live!');
    setTimeout(() => setCmsSuccessMessage(''), 4000);
  };

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
    showUploadToast('Client lead logged!');
  };

  const handleExportData = () => {
    const dataToExport = {
      exportDate: new Date().toISOString(),
      properties,
      developments,
      services,
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

  const handleExportEnquiriesCSV = () => {
    const headers = [
      'ID',
      'Type',
      'Name',
      'Phone',
      'Email',
      'Subject',
      'Property/Project',
      'Date',
      'Time Slot',
      'Budget',
      'Status',
      'Created At',
    ];
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

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `bahams-inbound-leads-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered lists
  const filteredProperties = properties.filter((p) => {
    if (propertyFilterMode !== 'all' && p.mode !== propertyFilterMode) return false;
    return (
      p.title.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.location.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.id.toLowerCase().includes(propertySearch.toLowerCase())
    );
  });

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

  const devRequestsCount = enquiries.filter((e) => e.type === 'development').length;
  const inspectionCount = enquiries.filter((e) => e.type === 'inspection').length;
  const newRequestsCount = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 pb-24">
      {/* Floating Upload Toast */}
      {uploadStatusMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F5C4A] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{uploadStatusMsg}</span>
        </div>
      )}

      {/* Top Executive Header Banner */}
      <div className="bg-white rounded-xl border border-[#E5E5E0] p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F5C4A]">
              Executive Operations Portal
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isFirebaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              {isFirebaseConnected ? 'Firebase Cloud Synced' : 'Local Storage Synced'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mt-1">
            Bahams Realty Content & Upload Manager
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Upload properties, off-plan developments, advisory services, site photography, and manage client leads.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-md transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleExportData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-md transition-colors cursor-pointer"
            title="Download full database backup as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup</span>
          </button>
          <button
            type="button"
            onClick={handleLockPortal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
            title="Lock Admin Gate"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Gate</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E5E5E0] space-y-1 shadow-xs">
          <span className="text-[11px] text-neutral-500 block uppercase tracking-wider font-semibold">
            Properties
          </span>
          <p className="text-2xl font-bold text-[#1A1A1A] tabular-nums">{properties.length}</p>
          <span className="text-[11px] text-emerald-700 font-medium block">
            {properties.filter((p) => p.featured).length} Featured on Home
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E5E5E0] space-y-1 shadow-xs">
          <span className="text-[11px] text-neutral-500 block uppercase tracking-wider font-semibold">
            Developments
          </span>
          <p className="text-2xl font-bold text-[#0F5C4A] tabular-nums">{developments.length}</p>
          <span className="text-[11px] text-neutral-500 font-medium block">
            Off-plan & Ready Estates
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E5E5E0] space-y-1 shadow-xs">
          <span className="text-[11px] text-neutral-500 block uppercase tracking-wider font-semibold">
            Services
          </span>
          <p className="text-2xl font-bold text-[#1A1A1A] tabular-nums">{services.length}</p>
          <span className="text-[11px] text-neutral-500 font-medium block">
            Advisory Pillars
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E5E5E0] space-y-1 shadow-xs">
          <span className="text-[11px] text-neutral-500 block uppercase tracking-wider font-semibold">
            Inbound Leads
          </span>
          <p className="text-2xl font-bold text-amber-700 tabular-nums">{enquiries.length}</p>
          <span className="text-[11px] text-neutral-500 font-medium block">
            {devRequestsCount} Dev · {inspectionCount} Viewing
          </span>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-4 sm:p-5 rounded-xl border border-[#E5E5E0] space-y-1 shadow-xs">
          <span className="text-[11px] text-neutral-500 block uppercase tracking-wider font-semibold">
            Action Items
          </span>
          <p className="text-2xl font-bold text-red-600 tabular-nums">{newRequestsCount}</p>
          <span className="text-[11px] text-neutral-500 font-medium block">
            Uncontacted prospects
          </span>
        </div>
      </div>

      {/* Main Tab Navigation (6 Tabs with smooth horizontal scroll on mobile/tablet) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E5E0] scrollbar-none snap-x">
        <button
          type="button"
          onClick={() => setActiveTab('properties')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shrink-0 snap-start cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'properties'
              ? 'bg-[#0F5C4A] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Properties ({properties.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('developments')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shrink-0 snap-start cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'developments'
              ? 'bg-[#0F5C4A] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Developments ({developments.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shrink-0 snap-start cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'services'
              ? 'bg-[#0F5C4A] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Services ({services.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shrink-0 snap-start cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'cms'
              ? 'bg-[#0F5C4A] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Site Media & Hero CMS</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors relative whitespace-nowrap shrink-0 snap-start cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'enquiries'
              ? 'bg-[#0F5C4A] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          <span>Inbound Leads ({enquiries.length})</span>
          {newRequestsCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded-full">
              {newRequestsCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shrink-0 snap-start cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'bg-[#0F5C4A] text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Security & Backups</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: PROPERTIES CATALOG & UPLOADS
          ========================================================================= */}
      {activeTab === 'properties' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E5E5E0]">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search title, location, or ref ID..."
                  value={propertySearch}
                  onChange={(e) => setPropertySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              </div>

              <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-md text-xs font-semibold self-start">
                {(['all', 'sale', 'rent'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPropertyFilterMode(m)}
                    className={`px-2.5 py-1 rounded capitalize transition-all cursor-pointer ${
                      propertyFilterMode === m ? 'bg-white shadow-xs text-[#0F5C4A]' : 'text-neutral-600'
                    }`}
                  >
                    {m === 'all' ? 'All' : m === 'sale' ? 'Sale' : 'Rent'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2">
              <button
                type="button"
                onClick={resetPropertiesToDefault}
                className="px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-md transition-colors cursor-pointer"
              >
                Reset Seed
              </button>
              <button
                type="button"
                onClick={handleOpenAddProperty}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Property</span>
              </button>
            </div>
          </div>

          {/* Mobile Property Cards (< md) */}
          <div className="md:hidden space-y-3">
            {filteredProperties.map((prop) => (
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
                      {prop.location} · {formatBeds(prop.bedrooms)} · {formatBaths(prop.bathrooms)}
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
                      className="p-2 text-neutral-600 hover:text-neutral-900 bg-neutral-100 rounded-md"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleEditProperty(prop)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#0F5C4A] bg-[#0F5C4A]/10 rounded-md"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProperty(prop.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Properties Table (>= md) */}
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
                            <p className="font-semibold text-neutral-900 line-clamp-1 max-w-[240px]">
                              {prop.title}
                            </p>
                            <span className="font-mono text-[10px] text-neutral-400">
                              Ref: {prop.id} · {prop.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-neutral-700">{prop.location}</td>
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
                          className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
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
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded"
                            title="View Property Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleEditProperty(prop)}
                            className="p-1.5 text-[#0F5C4A] hover:bg-[#0F5C4A]/10 rounded cursor-pointer"
                            title="Edit Listing Details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProperty(prop.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded cursor-pointer"
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
          TAB 2: DEVELOPMENTS UPLOAD & MANAGEMENT
          ========================================================================= */}
      {activeTab === 'developments' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#E5E5E0]">
            <div>
              <h2 className="text-base font-bold text-[#1A1A1A]">
                Off-Plan & Completed Developments ({developments.length})
              </h2>
              <p className="text-xs text-neutral-500">
                Upload new multi-unit schemes, update starting prices, unit configurations, and construction photos.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={resetDevelopmentsToDefault}
                className="px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-md cursor-pointer"
              >
                Reset Default Seed
              </button>
              <button
                type="button"
                onClick={handleOpenAddDevelopment}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Development</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developments.map((dev) => (
              <div
                key={dev.id}
                className="bg-white rounded-xl border border-[#E5E5E0] overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 bg-neutral-100">
                    <SafeImage
                      src={dev.images[0]}
                      alt={dev.name}
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white rounded">
                        {dev.status}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-white/90 text-neutral-800 rounded">
                        {dev.id}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F5C4A]">
                      {dev.location} · {dev.developer}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 line-clamp-1">
                      {dev.name}
                    </h3>
                    <p className="text-lg font-extrabold text-[#1A1A1A] tabular-nums">
                      From {formatNaira(dev.startingPrice)}
                    </p>
                    <p className="text-xs text-neutral-600 line-clamp-2">{dev.overview}</p>
                    <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-neutral-500">
                      <span className="px-2 py-0.5 bg-neutral-100 rounded">
                        {dev.paymentPlan.depositPercentage}% Deposit
                      </span>
                      <span className="px-2 py-0.5 bg-neutral-100 rounded">
                        {dev.paymentPlan.durationMonths} Months Plan
                      </span>
                      <span className="px-2 py-0.5 bg-neutral-100 rounded">
                        {dev.unitTypes.length} Unit Types
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAFAF8] border-t border-neutral-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/developments/${dev.id}`}
                    className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </Link>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditDevelopment(dev)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#0F5C4A] bg-emerald-50 hover:bg-emerald-100 rounded-md cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit / Upload</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteDevelopment(dev.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
                      title="Delete Development"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: SERVICES UPLOAD & MANAGEMENT
          ========================================================================= */}
      {activeTab === 'services' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#E5E5E0]">
            <div>
              <h2 className="text-base font-bold text-[#1A1A1A]">
                Advisory & Brokerage Services ({services.length})
              </h2>
              <p className="text-xs text-neutral-500">
                Upload new advisory services, update service photography, deliverables, and WhatsApp consultation templates.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={resetServicesToDefault}
                className="px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-md cursor-pointer"
              >
                Reset Default Seed
              </button>
              <button
                type="button"
                onClick={handleOpenAddService}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Service</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((srv, idx) => (
              <div
                key={srv.id}
                className="bg-white rounded-xl border border-[#E5E5E0] overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  {srv.image && (
                    <div className="aspect-16/9 bg-neutral-100 border-b border-neutral-100">
                      <SafeImage
                        src={srv.image}
                        alt={srv.title}
                        containerClassName="w-full h-full"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F5C4A] bg-emerald-50 px-2.5 py-0.5 rounded">
                        {srv.categoryBadge || `Service Pillar 0${idx + 1}`}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">ID: {srv.id}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A]">{srv.title}</h3>
                    <p className="text-xs font-semibold text-neutral-600">{srv.tagline}</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">{srv.description}</p>
                    <div className="pt-2 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                        Deliverables ({srv.deliverables.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {srv.deliverables.map((d, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[11px] bg-[#FAFAF8] border border-neutral-200 rounded text-neutral-700"
                          >
                            ✓ {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAFAF8] border-t border-neutral-100 flex items-center justify-between">
                  <Link
                    to={`/services#${srv.id}`}
                    className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View on Services Page</span>
                  </Link>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditService(srv)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#0F5C4A] bg-emerald-50 hover:bg-emerald-100 rounded-md cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit / Upload Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteService(srv.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: SITE MEDIA & LANDING PAGE CMS
          ========================================================================= */}
      {activeTab === 'cms' && (
        <div className="bg-white rounded-xl border border-[#E5E5E0] p-6 sm:p-8 space-y-8 shadow-xs animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#1A1A1A]">
                Site Media Uploads, Hero Photography & Headlines
              </h2>
              <p className="text-xs text-neutral-500">
                Upload custom images directly from your device, select presets, or update headlines and statistics.
              </p>
            </div>
            <button
              type="button"
              onClick={resetLandingConfig}
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 underline self-start sm:self-auto cursor-pointer"
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
            {/* 1. HERO PHOTO UPLOAD & PRESET SELECTOR */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  1. Hero Background Photograph
                </label>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md cursor-pointer shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Hero Photo from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setCmsHeroImage, 'Hero photo')}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CURATED_IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setCmsHeroImage(preset.url)}
                    className={`relative rounded-lg overflow-hidden border-2 text-left group transition-all aspect-16/10 cursor-pointer ${
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start pt-2">
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-[11px] font-semibold text-neutral-600">
                    Hero Photo URL or Uploaded Data URI:
                  </label>
                  <input
                    type="text"
                    value={cmsHeroImage}
                    onChange={(e) => setCmsHeroImage(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                    placeholder="https://... or upload a file above"
                  />
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
                      <p className="text-white text-xs font-bold">{cmsHeroHeadline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. HERO HEADLINES & COPY */}
            <div className="pt-4 border-t border-neutral-100 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                2. Hero Headlines & Cultural Copy
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={cmsHeroHeadline}
                    onChange={(e) => setCmsHeroHeadline(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md"
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
                    className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">
                    Featured Properties Section Heading
                  </label>
                  <input
                    type="text"
                    value={cmsFeaturedTitle}
                    onChange={(e) => setCmsFeaturedTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md"
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
                  className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md"
                />
              </div>
            </div>

            {/* 3. HIGHLIGHT PHOTOS WITH DIRECT FILE UPLOAD */}
            <div className="pt-4 border-t border-neutral-100 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                3. Section Highlight Photography (Upload or Paste URL)
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* About Office Photo */}
                <div className="space-y-2 p-4 bg-[#FAFAF8] rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-neutral-800">
                      About Office Photo
                    </label>
                    <label className="text-[11px] font-bold text-[#0F5C4A] hover:underline cursor-pointer flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, setCmsAboutImage, 'About photo')}
                      />
                    </label>
                  </div>
                  <div className="aspect-16/10 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
                    <SafeImage
                      src={cmsAboutImage}
                      alt="About Office"
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    value={cmsAboutImage}
                    onChange={(e) => setCmsAboutImage(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  />
                </div>

                {/* Why Bahams Photo */}
                <div className="space-y-2 p-4 bg-[#FAFAF8] rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-neutral-800">
                      "Why Bahams" Photo
                    </label>
                    <label className="text-[11px] font-bold text-[#0F5C4A] hover:underline cursor-pointer flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, setCmsWhyBahamsImage, 'Why Bahams photo')
                        }
                      />
                    </label>
                  </div>
                  <div className="aspect-16/10 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
                    <SafeImage
                      src={cmsWhyBahamsImage}
                      alt="Why Bahams Visual"
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    value={cmsWhyBahamsImage}
                    onChange={(e) => setCmsWhyBahamsImage(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  />
                </div>

                {/* How It Works Photo */}
                <div className="space-y-2 p-4 bg-[#FAFAF8] rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-neutral-800">
                      "How It Works" Photo
                    </label>
                    <label className="text-[11px] font-bold text-[#0F5C4A] hover:underline cursor-pointer flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, setCmsHowItWorksImage, 'How It Works photo')
                        }
                      />
                    </label>
                  </div>
                  <div className="aspect-16/10 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
                    <SafeImage
                      src={cmsHowItWorksImage}
                      alt="How It Works Visual"
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    value={cmsHowItWorksImage}
                    onChange={(e) => setCmsHowItWorksImage(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  />
                </div>
              </div>
            </div>

            {/* 4. TRUST STATS STRIP */}
            <div className="pt-4 border-t border-neutral-100 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                4. Trust Strip Statistics
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cmsTrustStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAFAF8] rounded-lg border border-neutral-200 space-y-2"
                  >
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Publish Site Media & CMS Updates</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================================================
          TAB 5: INBOUND ENQUIRIES & DEVELOPMENT REQUESTS
          ========================================================================= */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E5E5E0]">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-neutral-500 font-semibold uppercase">Category:</span>
              <div className="flex flex-wrap gap-1">
                {(['all', 'development', 'inspection', 'contact', 'service'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setEnquiryFilter(t)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md capitalize transition-colors cursor-pointer ${
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

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#0F5C4A]" />
                <span>Export CSV</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAddingLead(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-[#0F5C4A] text-white hover:bg-[#0B4638] rounded-md shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Lead</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredEnquiries.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E5E5E0] p-12 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-neutral-300 mx-auto" />
                <h3 className="text-base font-bold text-neutral-800">No Enquiries Found</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  When visitors submit inspection bookings, development brochure requests, or service inquiries, they appear here automatically.
                </p>
              </div>
            ) : (
              filteredEnquiries.map((enq) => {
                const agentReply = `Hello ${enq.name}, thank you for contacting Bahams Realty regarding "${enq.subject}". This is the advisory desk. We have received your request and would be delighted to assist you. When is the most convenient time for a quick consultation?`;
                const whatsappReplyUrl = getWhatsAppUrl(
                  agentReply,
                  enq.phone.replace(/[^0-9]/g, '')
                );

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
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-sm text-[#1A1A1A]">{enq.name}</h3>
                            <span className="px-2 py-0.5 text-[10px] font-semibold rounded uppercase tracking-wider bg-neutral-100 text-neutral-700">
                              {enq.type}
                            </span>
                          </div>
                          <span className="text-[11px] text-neutral-400 font-mono">
                            Ref: {enq.id} · Logged: {new Date(enq.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-neutral-400 font-medium">Status:</span>
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            updateEnquiryStatus(
                              enq.id,
                              e.target.value as InboundEnquiry['status']
                            )
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
                            Budget: <span className="font-bold text-[#0F5C4A]">{enq.budget}</span>
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
                          Prospect Notes:
                        </span>
                        <p className="italic text-neutral-600 line-clamp-3 leading-relaxed">
                          "{enq.details}"
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={whatsappReplyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            if (enq.status === 'new') updateEnquiryStatus(enq.id, 'contacted');
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
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
                        onClick={() => deleteEnquiry(enq.id)}
                        className="text-neutral-400 hover:text-red-500 text-xs font-semibold transition-colors cursor-pointer"
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
          TAB 6: SECURITY GATE PASSWORD & DATABASE BACKUPS
          ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          {/* Card 1: Change Executive Gate Password (Synced with Firebase) */}
          <div className="bg-white rounded-xl border border-[#E5E5E0] p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-100">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0F5C4A]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Firebase Cloud Security · settings/adminSecurity</span>
                </span>
                <h2 className="text-lg font-bold text-[#1A1A1A] mt-0.5">
                  Change Executive Gate Password
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Update the password required to unlock <code className="font-mono">/admin</code>. Changes sync automatically with Firebase Firestore security rules.
                </p>
              </div>
            </div>

            {passwordChangeError && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{passwordChangeError}</span>
              </div>
            )}

            {passwordChangeSuccess && (
              <div
                role="status"
                className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{passwordChangeSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangeGatePassword} className="space-y-4">
              <div>
                <label
                  htmlFor="current-gate-pass"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  Current Gate Password
                </label>
                <input
                  id="current-gate-pass"
                  type={showChangePasswords ? 'text' : 'password'}
                  required
                  value={currentGatePassInput}
                  onChange={(e) => setCurrentGatePassInput(e.target.value)}
                  placeholder="Enter current gate password"
                  className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-md font-mono bg-[#FAFAF8] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="new-gate-pass"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    New Gate Password
                  </label>
                  <input
                    id="new-gate-pass"
                    type={showChangePasswords ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newGatePassInput}
                    onChange={(e) => setNewGatePassInput(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-md font-mono bg-[#FAFAF8] focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm-gate-pass"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-gate-pass"
                    type={showChangePasswords ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmGatePassInput}
                    onChange={(e) => setConfirmGatePassInput(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-md font-mono bg-[#FAFAF8] focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="inline-flex items-center gap-2 text-xs text-neutral-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showChangePasswords}
                    onChange={(e) => setShowChangePasswords(e.target.checked)}
                    className="rounded text-[#0F5C4A]"
                  />
                  <span>Show password characters</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    resetAdminGatePasswordToDefault();
                    setPasswordChangeError('');
                    setPasswordChangeSuccess(
                      'Gate password restored to initial default credential.'
                    );
                    showUploadToast('Gate password restored to default.');
                  }}
                  className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
                >
                  Restore Initial Default Password
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Update Gate Password in Firebase</span>
              </button>
            </form>
          </div>

          {/* Card 2: Data Storage, Universal Image Resolver & System Backups */}
          <div className="bg-white rounded-xl border border-[#E5E5E0] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-lg font-bold text-[#1A1A1A]">
                Data Storage, Universal Image Links & System Utilities
              </h2>
              <p className="text-xs text-neutral-500">
                Export JSON backups, restore seed catalogs for Properties, Developments, and Services, or lock the session.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-lg border border-emerald-200 space-y-1.5">
              <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                Universal Image & Asset Engine Active
              </h3>
              <p className="text-xs text-emerald-900/80 leading-relaxed">
                All upload fields across Properties, Developments, Services, and Site Media accept direct phone/desktop image files (<code className="font-mono">JPG, PNG, WEBP, HEIC, AVIF</code>) as well as external links from <strong>Google Drive</strong>, <strong>Pinterest</strong>, <strong>Dropbox</strong>, <strong>Imgur</strong>, and direct web URLs with automatic CDN optimization for mobile browsers.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Download Full JSON Backup
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Export all properties, developments, services, CMS configurations, and enquiries.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleExportData}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Backup</span>
                </button>
              </div>

              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Restore All Default Seed Catalogs
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Reset Properties, Developments, and Services to the verified Lagos seed data.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    resetPropertiesToDefault();
                    resetDevelopmentsToDefault();
                    resetServicesToDefault();
                    showUploadToast('All catalogs restored to default Lagos seed!');
                  }}
                  className="px-4 py-2 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Seeds</span>
                </button>
              </div>

              <div className="p-4 bg-red-50/50 rounded-lg border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                    clearEnquiries();
                    showUploadToast('Inbound enquiries cleared.');
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear Leads</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: ADD / EDIT PROPERTY (WITH DIRECT IMAGE UPLOAD)
          ========================================================================= */}
      {isAddingProperty && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-8 space-y-5 max-h-[94vh] overflow-y-auto shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#0F5C4A]">
                  Property Upload & Editor
                </span>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  {editingPropertyId ? 'Edit Property Listing' : 'Upload New Lagos Property'}
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
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Property Title
                </label>
                <input
                  type="text"
                  required
                  value={propTitle}
                  onChange={(e) => setPropTitle(e.target.value)}
                  placeholder="e.g. 5 Bedroom Contemporary Luxury Detached Duplex with BQ"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

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

              {/* Property Photo Upload + Presets */}
              <div className="space-y-2 p-3.5 bg-[#FAFAF8] rounded-xl border border-neutral-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-xs font-bold text-neutral-700 uppercase">
                    Primary Property Photo (Upload File, Select Preset, or URL)
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F5C4A] text-white text-[11px] font-bold uppercase tracking-wider rounded cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, setPropImage, 'Property photo')}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1">
                  {CURATED_IMAGE_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPropImage(p.url)}
                      className={`relative aspect-square rounded overflow-hidden border-2 transition-all cursor-pointer ${
                        propImage === p.url
                          ? 'border-[#0F5C4A] ring-2 ring-[#0F5C4A]/30'
                          : 'border-neutral-200'
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
                  type="text"
                  required
                  value={propImage}
                  onChange={(e) => setPropImage(e.target.value)}
                  onBlur={() => setPropImage(normalizeExternalImageUrl(propImage))}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  placeholder="Paste Google Drive, Pinterest, Dropbox, or image URL, or upload file above"
                />
                <div className="flex items-center justify-between text-[10px] text-neutral-500">
                  <span>Supports Device Upload, Google Drive, Pinterest, Dropbox & Web URLs</span>
                  <span className="font-semibold text-[#0F5C4A]">
                    {detectImageSourceType(propImage)}
                  </span>
                </div>
              </div>

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

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Key Amenities & Title Features (Comma-separated)
                </label>
                <input
                  type="text"
                  value={propFeaturesText}
                  onChange={(e) => setPropFeaturesText(e.target.value)}
                  placeholder="Swimming Pool, 24/7 Power, En-Suite BQ, Governor's Consent"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
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
                  className="px-6 py-2.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs cursor-pointer"
                >
                  {editingPropertyId ? 'Save Property Changes' : 'Publish Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: ADD / EDIT DEVELOPMENT (WITH IMAGE & MASTERPLAN UPLOAD)
          ========================================================================= */}
      {isAddingDevelopment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-8 space-y-5 max-h-[94vh] overflow-y-auto shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#0F5C4A]">
                  Development Upload & Manager
                </span>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  {editingDevelopmentId ? 'Edit Development Project' : 'Upload New Development Project'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingDevelopment(false)}
                className="p-1 text-neutral-400 hover:text-neutral-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDevelopment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    required
                    value={devName}
                    onChange={(e) => setDevName(e.target.value)}
                    placeholder="e.g. Eko Pearl Lagoon Terraces"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Developer / Sponsor Name
                  </label>
                  <input
                    type="text"
                    required
                    value={devDeveloper}
                    onChange={(e) => setDevDeveloper(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Lagos Location
                  </label>
                  <select
                    value={devLocation}
                    onChange={(e) => setDevLocation(e.target.value as LagosLocation)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  >
                    <option value="Victoria Island">Victoria Island</option>
                    <option value="Ikoyi">Ikoyi</option>
                    <option value="Lekki Phase 1">Lekki Phase 1</option>
                    <option value="Ajah">Ajah</option>
                    <option value="Ikeja GRA">Ikeja GRA</option>
                    <option value="Ibeju-Lekki">Ibeju-Lekki</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Development Status
                  </label>
                  <select
                    value={devStatus}
                    onChange={(e) => setDevStatus(e.target.value as DevelopmentStatus)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                  >
                    <option value="Off-plan">Off-plan</option>
                    <option value="Selling Fast">Selling Fast</option>
                    <option value="Ready">Ready</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Starting Price (₦)
                  </label>
                  <input
                    type="number"
                    required
                    min={1000000}
                    value={devStartingPrice}
                    onChange={(e) => setDevStartingPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={devAddress}
                  onChange={(e) => setDevAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Initial Deposit (%)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={100}
                    value={devDepositPct}
                    onChange={(e) => setDevDepositPct(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Payment Tenor (Months)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={devDurationMonths}
                    onChange={(e) => setDevDurationMonths(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono"
                  />
                </div>
              </div>

              {/* Primary Photo & Masterplan File Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-[#FAFAF8] rounded-xl border border-neutral-200">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase text-neutral-700">
                      Hero Render Photo
                    </label>
                    <label className="text-[11px] font-bold text-[#0F5C4A] hover:underline cursor-pointer flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, setDevPrimaryImage, 'Development hero photo')
                        }
                      />
                    </label>
                  </div>
                  <div className="aspect-16/10 rounded overflow-hidden border border-neutral-200 bg-neutral-100">
                    <SafeImage
                      src={devPrimaryImage}
                      alt="Development Render"
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={devPrimaryImage}
                    onChange={(e) => setDevPrimaryImage(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase text-neutral-700">
                      Masterplan / Aerial Photo
                    </label>
                    <label className="text-[11px] font-bold text-[#0F5C4A] hover:underline cursor-pointer flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, setDevMasterplanImage, 'Masterplan photo')
                        }
                      />
                    </label>
                  </div>
                  <div className="aspect-16/10 rounded overflow-hidden border border-neutral-200 bg-neutral-100">
                    <SafeImage
                      src={devMasterplanImage}
                      alt="Masterplan"
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={devMasterplanImage}
                    onChange={(e) => setDevMasterplanImage(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Architectural Overview
                </label>
                <textarea
                  rows={2}
                  required
                  value={devOverview}
                  onChange={(e) => setDevOverview(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Unit Configurations (One per line: Name | SQM | Price | Available Units)
                </label>
                <textarea
                  rows={3}
                  value={devUnitSummaryText}
                  onChange={(e) => setDevUnitSummaryText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddingDevelopment(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs cursor-pointer"
                >
                  {editingDevelopmentId ? 'Save Development' : 'Publish Development'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: ADD / EDIT SERVICE (WITH IMAGE UPLOAD)
          ========================================================================= */}
      {isAddingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-4 sm:p-8 space-y-5 max-h-[94vh] overflow-y-auto shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#0F5C4A]">
                  Advisory Service Manager
                </span>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  {editingServiceId ? 'Edit Service Pillar' : 'Upload New Advisory Service'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingService(false)}
                className="p-1 text-neutral-400 hover:text-neutral-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Service Title
                  </label>
                  <input
                    type="text"
                    required
                    value={srvTitle}
                    onChange={(e) => setSrvTitle(e.target.value)}
                    placeholder="e.g. Diaspora Concierge & Escrow"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Category Badge
                  </label>
                  <input
                    type="text"
                    value={srvBadge}
                    onChange={(e) => setSrvBadge(e.target.value)}
                    placeholder="e.g. Service Pillar 05"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Executive Tagline
                </label>
                <input
                  type="text"
                  required
                  value={srvTagline}
                  onChange={(e) => setSrvTagline(e.target.value)}
                  placeholder="e.g. End-to-end representation for overseas Nigerian buyers."
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Scope of Advisory Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={srvDescription}
                  onChange={(e) => setSrvDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Key Deliverables (Comma-separated)
                </label>
                <textarea
                  rows={2}
                  required
                  value={srvDeliverablesText}
                  onChange={(e) => setSrvDeliverablesText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md"
                />
              </div>

              {/* Service Image Upload */}
              <div className="space-y-2 p-3.5 bg-[#FAFAF8] rounded-xl border border-neutral-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-neutral-700">
                    Service Showcase Image (Optional)
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0F5C4A] text-white text-[11px] font-bold uppercase rounded cursor-pointer">
                    <Upload className="w-3 h-3" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, setSrvImage, 'Service image')}
                    />
                  </label>
                </div>
                {srvImage && (
                  <div className="aspect-16/9 rounded overflow-hidden border border-neutral-200 bg-neutral-100">
                    <SafeImage
                      src={srvImage}
                      alt="Service Preview"
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>
                )}
                <input
                  type="text"
                  value={srvImage}
                  onChange={(e) => setSrvImage(e.target.value)}
                  placeholder="https://... or upload image file above"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddingService(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs cursor-pointer"
                >
                  {editingServiceId ? 'Save Service Changes' : 'Publish Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: MANUAL INBOUND LEAD LOGGING
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
                  className="px-5 py-2 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase rounded-md shadow-xs cursor-pointer"
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
