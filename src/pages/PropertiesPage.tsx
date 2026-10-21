import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Search,
  X,
  LayoutGrid,
  List,
  Heart,
  Check,
  Scale,
  DollarSign,
  MessageCircle,
  Eye,
  Bed,
  Bath,
  Maximize2,
  Car,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '../context/DataContext.tsx';
import { FilterState, LagosLocation, PropertyMode, PropertyType, Property } from '../types/index.ts';
import { filterProperties } from '../utils/filterProperties.ts';
import { PropertyCard } from '../components/property/PropertyCard.tsx';
import { SectionHeading } from '../components/common/SectionHeading.tsx';
import { formatNaira, formatCompactNaira, formatBeds, formatBaths, formatSqm } from '../utils/formatters.ts';
import { SafeImage } from '../components/common/SafeImage.tsx';
import { getWhatsAppUrl, getPropertyWhatsAppMessage } from '../utils/whatsapp.ts';

// Currency rates for diaspora buyers
const USD_RATE = 1550; // ₦1,550 = $1
const GBP_RATE = 1980; // ₦1,980 = £1

export const PropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, favorites } = useData();

  // Read initial values from URL query string if present
  const initialMode = (searchParams.get('mode') as PropertyMode) || 'all';
  const initialLocation = (searchParams.get('location') as LagosLocation) || 'all';
  const initialType = (searchParams.get('type') as PropertyType) || 'all';
  const initialMaxPrice = Number(searchParams.get('maxPrice')) || 0;

  const [filter, setFilter] = useState<FilterState>({
    mode: initialMode,
    location: initialLocation,
    type: initialType,
    bedrooms: 'all',
    minPrice: 0,
    maxPrice: initialMaxPrice,
    furnished: 'all',
    sortBy: 'newest',
    searchQuery: '',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GBP'>('NGN');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  // Property Comparison State (up to 3 items)
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Sync state if URL search parameters change
  useEffect(() => {
    const mode = (searchParams.get('mode') as PropertyMode) || 'all';
    const loc = (searchParams.get('location') as LagosLocation) || 'all';
    const type = (searchParams.get('type') as PropertyType) || 'all';
    const maxP = Number(searchParams.get('maxPrice')) || 0;

    setFilter((prev) => ({
      ...prev,
      mode: mode || prev.mode,
      location: loc || prev.location,
      type: type || prev.type,
      maxPrice: maxP || prev.maxPrice,
    }));
  }, [searchParams]);

  // Client-side filtering and sorting
  const filteredProperties = useMemo(() => {
    let list = filterProperties(properties, filter);
    if (onlyFavorites) {
      list = list.filter((p) => favorites.includes(p.id));
    }
    return list;
  }, [properties, filter, onlyFavorites, favorites]);

  const displayedProperties = filteredProperties.slice(0, visibleCount);

  const resetFilters = () => {
    setFilter({
      mode: 'all',
      location: 'all',
      type: 'all',
      bedrooms: 'all',
      minPrice: 0,
      maxPrice: 0,
      furnished: 'all',
      sortBy: 'newest',
      searchQuery: '',
    });
    setOnlyFavorites(false);
    setSearchParams({});
    setVisibleCount(9);
  };

  const hasActiveFilters =
    filter.mode !== 'all' ||
    filter.location !== 'all' ||
    filter.type !== 'all' ||
    filter.bedrooms !== 'all' ||
    filter.furnished !== 'all' ||
    filter.maxPrice > 0 ||
    filter.searchQuery.length > 0 ||
    onlyFavorites;

  // Toggle comparison item
  const toggleComparison = (id: string) => {
    setComparisonIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id]; // keep max 3
      }
      return [...prev, id];
    });
  };

  const comparisonProperties = properties.filter((p) => comparisonIds.includes(p.id));

  // Currency Formatter Helper
  const formatPriceInCurrency = (priceInNaira: number, isRent: boolean) => {
    if (currency === 'USD') {
      const usd = Math.round(priceInNaira / USD_RATE);
      return `$${usd.toLocaleString('en-US')}${isRent ? '/yr' : ''}`;
    }
    if (currency === 'GBP') {
      const gbp = Math.round(priceInNaira / GBP_RATE);
      return `£${gbp.toLocaleString('en-GB')}${isRent ? '/yr' : ''}`;
    }
    return formatNaira(priceInNaira, isRent);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E5E0]">
        <SectionHeading
          kicker="Prime Lagos Real Estate"
          title="Browse Properties"
          subtitle="Explore verified residential sales, executive rentals, and commercial acquisitions across Ikoyi, Victoria Island, and Lekki."
        />

        {/* Global Toolbar: Currency Switcher & View Mode */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Currency Switcher for diaspora buyers */}
          <div className="flex items-center gap-1 p-1 bg-white border border-[#E5E5E0] rounded-lg text-xs font-semibold">
            <span className="text-[11px] text-neutral-400 px-2 uppercase">Currency:</span>
            {(['NGN', 'USD', 'GBP'] as const).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setCurrency(curr)}
                className={`px-2.5 py-1 rounded transition-all ${
                  currency === curr
                    ? 'bg-[#0F5C4A] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {curr === 'NGN' ? '₦ NGN' : curr === 'USD' ? '$ USD' : '£ GBP'}
              </button>
            ))}
          </div>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-white border border-[#E5E5E0] rounded-lg text-neutral-600">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-all ${
                viewMode === 'grid' ? 'bg-[#0F5C4A] text-white shadow-xs' : 'hover:text-neutral-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-all ${
                viewMode === 'list' ? 'bg-[#0F5C4A] text-white shadow-xs' : 'hover:text-neutral-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-[#0F5C4A] text-white text-xs font-semibold rounded-lg shadow-xs"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Quick Budget Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-3 text-xs font-semibold overflow-x-auto">
        <span className="text-neutral-400 uppercase text-[11px] tracking-wider shrink-0 mr-1">
          Quick Budget:
        </span>
        {[
          { label: 'All Budgets', max: 0 },
          { label: 'Under ₦100M', max: 100000000 },
          { label: '₦100M – ₦250M', max: 250000000 },
          { label: '₦250M – ₦500M', max: 500000000 },
          { label: '₦500M – ₦1B', max: 1000000000 },
          { label: '₦1B+ Palatial', max: 2500000000 },
        ].map((tier) => (
          <button
            key={tier.label}
            type="button"
            onClick={() => setFilter((prev) => ({ ...prev, maxPrice: tier.max }))}
            className={`px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
              filter.maxPrice === tier.max
                ? 'bg-[#0F5C4A] text-white border-[#0F5C4A] shadow-xs'
                : 'bg-white text-neutral-600 border-[#E5E5E0] hover:border-neutral-400'
            }`}
          >
            {tier.label}
          </button>
        ))}
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* =========================================================================
            DESKTOP FILTER SIDEBAR
            ========================================================================= */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-xl border border-[#E5E5E0] shadow-xs space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E0]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#0F5C4A]" />
              <span>Refine Search</span>
            </h3>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 font-medium transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Query */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Keyword
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Title, street, or ref..."
                value={filter.searchQuery}
                onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-8 pr-3 py-2 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Mode Toggle (Buy / Rent) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Transaction Mode
            </label>
            <div className="grid grid-cols-3 gap-1 bg-[#FAFAF8] p-1 rounded-md border border-[#E5E5E0] text-xs font-semibold">
              {(['all', 'sale', 'rent'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setFilter((prev) => ({ ...prev, mode: m }))}
                  className={`py-1.5 rounded capitalize transition-all ${
                    filter.mode === m
                      ? 'bg-[#0F5C4A] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {m === 'all' ? 'All' : m === 'sale' ? 'Buy' : 'Rent'}
                </button>
              ))}
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Lagos Location
            </label>
            <select
              value={filter.location}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, location: e.target.value as LagosLocation | 'all' }))
              }
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] bg-white font-medium"
            >
              <option value="all">All Locations</option>
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

          {/* Property Type Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Property Type
            </label>
            <select
              value={filter.type}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, type: e.target.value as PropertyType | 'all' }))
              }
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] bg-white capitalize font-medium"
            >
              <option value="all">All Types</option>
              <option value="duplex">Duplex</option>
              <option value="terrace">Terrace</option>
              <option value="detached">Detached</option>
              <option value="flat">Flat / Apartment</option>
              <option value="land">Land Plot</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Bedrooms Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Bedrooms
            </label>
            <div className="grid grid-cols-5 gap-1 text-xs font-semibold">
              {(['all', 2, 3, 4, 5] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setFilter((prev) => ({ ...prev, bedrooms: b }))}
                  className={`py-1.5 rounded border transition-all ${
                    filter.bedrooms === b
                      ? 'bg-[#0F5C4A] text-white border-[#0F5C4A]'
                      : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  {b === 'all' ? 'Any' : `${b}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Furnished status */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Furnishing
            </label>
            <div className="grid grid-cols-3 gap-1 text-xs font-semibold">
              {(['all', 'yes', 'no'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter((prev) => ({ ...prev, furnished: f }))}
                  className={`py-1.5 rounded border transition-all ${
                    filter.furnished === f
                      ? 'bg-[#0F5C4A] text-white border-[#0F5C4A]'
                      : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  {f === 'all' ? 'Any' : f === 'yes' ? 'Furnished' : 'Unfurnished'}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Sort Order
            </label>
            <select
              value={filter.sortBy}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy'],
                }))
              }
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] bg-white font-medium"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Saved Favorites Only */}
          {favorites.length > 0 && (
            <div className="pt-2 border-t border-[#E5E5E0]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700">
                <input
                  type="checkbox"
                  checked={onlyFavorites}
                  onChange={(e) => setOnlyFavorites(e.target.checked)}
                  className="w-4 h-4 text-[#0F5C4A] rounded focus:ring-0"
                />
                <span>Show Saved Favorites ({favorites.length})</span>
              </label>
            </div>
          )}
        </aside>

        {/* =========================================================================
            RESULTS COLUMN
            ========================================================================= */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filter Chips Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-neutral-800">
              Showing {filteredProperties.length} verified{' '}
              {filteredProperties.length === 1 ? 'property' : 'properties'}
            </span>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-1.5">
                {filter.mode !== 'all' && (
                  <span className="px-2.5 py-1 bg-neutral-200 text-neutral-700 rounded-full font-medium flex items-center gap-1">
                    Mode: {filter.mode}
                    <button
                      type="button"
                      onClick={() => setFilter((p) => ({ ...p, mode: 'all' }))}
                      className="hover:text-black"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filter.location !== 'all' && (
                  <span className="px-2.5 py-1 bg-neutral-200 text-neutral-700 rounded-full font-medium flex items-center gap-1">
                    {filter.location}
                    <button
                      type="button"
                      onClick={() => setFilter((p) => ({ ...p, location: 'all' }))}
                      className="hover:text-black"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filter.type !== 'all' && (
                  <span className="px-2.5 py-1 bg-neutral-200 text-neutral-700 rounded-full font-medium capitalize flex items-center gap-1">
                    {filter.type}
                    <button
                      type="button"
                      onClick={() => setFilter((p) => ({ ...p, type: 'all' }))}
                      className="hover:text-black"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filter.maxPrice > 0 && (
                  <span className="px-2.5 py-1 bg-neutral-200 text-neutral-700 rounded-full font-medium flex items-center gap-1">
                    ≤ {formatCompactNaira(filter.maxPrice)}
                    <button
                      type="button"
                      onClick={() => setFilter((p) => ({ ...p, maxPrice: 0 }))}
                      className="hover:text-black"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results: Grid or List */}
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E5E5E0] p-12 text-center space-y-4">
              <Search className="w-10 h-10 text-neutral-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-800">
                  No Matching Properties Found
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try broadening your price bounds, clearing specific filters, or contact our advisory desk for off-market inventory.
                </p>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 bg-[#0F5C4A] text-white text-xs font-semibold rounded-md uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProperties.map((prop) => (
                <div key={prop.id} className="relative group">
                  <PropertyCard property={prop} />

                  {/* Comparison Quick Select Button */}
                  <div className="mt-1 flex items-center justify-between text-xs px-1">
                    <button
                      type="button"
                      onClick={() => toggleComparison(prop.id)}
                      className={`text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                        comparisonIds.includes(prop.id)
                          ? 'text-[#0F5C4A] font-bold'
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{comparisonIds.includes(prop.id) ? 'Selected for Compare' : 'Compare'}</span>
                    </button>

                    <a
                      href={getWhatsAppUrl(getPropertyWhatsAppMessage(prop))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#0F5C4A] hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {displayedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white rounded-xl border border-[#E5E5E0] p-4 flex flex-col sm:flex-row items-center gap-5 shadow-xs hover:border-neutral-400 transition-colors"
                >
                  <div className="w-full sm:w-48 h-36 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                    <SafeImage
                      src={prop.images[0]}
                      alt={prop.title}
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2 text-left w-full">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#0F5C4A] bg-emerald-50 px-2 py-0.5 rounded">
                        {prop.type} · {prop.location}
                      </span>
                      <span className="font-mono text-xs text-neutral-400">Ref: {prop.id}</span>
                    </div>

                    <h3 className="font-bold text-base text-neutral-900 line-clamp-1">{prop.title}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-2">{prop.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 pt-1">
                      <span>{formatBeds(prop.bedrooms)}</span>
                      <span>•</span>
                      <span>{formatBaths(prop.bathrooms)}</span>
                      <span>•</span>
                      <span>{formatSqm(prop.sizeSqm)}</span>
                    </div>
                  </div>

                  <div className="sm:border-l sm:border-neutral-200 sm:pl-5 flex flex-col items-end justify-between self-stretch shrink-0 w-full sm:w-44 pt-3 sm:pt-0 border-t sm:border-t-0">
                    <div className="text-right w-full sm:w-auto">
                      <p className="text-lg font-bold text-[#1A1A1A] tabular-nums">
                        {formatPriceInCurrency(prop.price, prop.mode === 'rent')}
                      </p>
                      <span className="text-[10px] text-neutral-400 block font-medium">
                        {prop.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2 w-full justify-end">
                      <button
                        type="button"
                        onClick={() => toggleComparison(prop.id)}
                        className={`p-2 rounded border text-xs ${
                          comparisonIds.includes(prop.id)
                            ? 'bg-[#0F5C4A] text-white border-[#0F5C4A]'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                        }`}
                        title="Add to comparison"
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        to={`/properties/${prop.id}`}
                        className="px-3.5 py-1.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Pagination */}
          {visibleCount < filteredProperties.length && (
            <div className="text-center pt-8">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                Load More Properties ({filteredProperties.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          COMPARISON DOCK & MODAL
          ========================================================================= */}
      {comparisonIds.length > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-neutral-900 text-white px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 sm:gap-4 animate-slideUp max-w-[94vw] sm:max-w-none">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Compare ({comparisonIds.length}/3 selected)</span>
          </div>

          <div className="flex items-center gap-1.5">
            {comparisonProperties.map((p) => (
              <div
                key={p.id}
                className="w-7 h-7 rounded-full overflow-hidden border border-white/40 shrink-0"
                title={p.title}
              >
                <SafeImage src={p.images[0]} alt={p.title} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsCompareModalOpen(true)}
            className="px-4 py-1.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-bold uppercase tracking-wider rounded-full"
          >
            Compare Now
          </button>

          <button
            type="button"
            onClick={() => setComparisonIds([])}
            className="text-neutral-400 hover:text-white text-xs"
            title="Clear comparison"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#0F5C4A]" />
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  Property Side-by-Side Comparison
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparisonProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-[#FAFAF8] p-4 rounded-xl border border-neutral-200 space-y-3"
                >
                  <div className="aspect-16/10 rounded-lg overflow-hidden bg-neutral-200">
                    <SafeImage
                      src={prop.images[0]}
                      alt={prop.title}
                      containerClassName="w-full h-full"
                      className="object-cover"
                    />
                  </div>

                  <h4 className="font-bold text-sm text-neutral-900 line-clamp-1">{prop.title}</h4>
                  <p className="text-base font-extrabold text-[#0F5C4A]">
                    {formatNaira(prop.price, prop.mode === 'rent')}
                  </p>

                  <div className="space-y-1.5 text-xs text-neutral-700 pt-2 border-t border-neutral-200">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Location:</span>
                      <span className="font-semibold">{prop.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Type:</span>
                      <span className="font-semibold capitalize">{prop.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Beds:</span>
                      <span className="font-semibold">{prop.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Baths:</span>
                      <span className="font-semibold">{prop.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Floor Size:</span>
                      <span className="font-semibold">{prop.sizeSqm} SQM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Parking:</span>
                      <span className="font-semibold">{prop.parkingSpaces} cars</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Furnishing:</span>
                      <span className="font-semibold">{prop.furnished ? 'Yes' : 'No'}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-col gap-2">
                    <Link
                      to={`/properties/${prop.id}`}
                      target="_blank"
                      className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded text-center"
                    >
                      View Details
                    </Link>
                    <a
                      href={getWhatsAppUrl(getPropertyWhatsAppMessage(prop))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MOBILE FILTER DRAWER
          ========================================================================= */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-sm h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E0]">
              <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-800">
                Filter Listings
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filters Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Location
                </label>
                <select
                  value={filter.location}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      location: e.target.value as LagosLocation | 'all',
                    }))
                  }
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white"
                >
                  <option value="all">All Locations</option>
                  <option value="Ikoyi">Ikoyi</option>
                  <option value="Victoria Island">Victoria Island</option>
                  <option value="Lekki Phase 1">Lekki Phase 1</option>
                  <option value="Ajah">Ajah</option>
                  <option value="Ikeja GRA">Ikeja GRA</option>
                  <option value="Yaba">Yaba</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Transaction
                </label>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  {(['all', 'sale', 'rent'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFilter((prev) => ({ ...prev, mode: m }))}
                      className={`py-1.5 rounded border ${
                        filter.mode === m
                          ? 'bg-[#0F5C4A] text-white border-[#0F5C4A]'
                          : 'bg-white text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {m === 'all' ? 'All' : m === 'sale' ? 'Buy' : 'Rent'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Property Type
                </label>
                <select
                  value={filter.type}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      type: e.target.value as PropertyType | 'all',
                    }))
                  }
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white capitalize"
                >
                  <option value="all">All Types</option>
                  <option value="duplex">Duplex</option>
                  <option value="terrace">Terrace</option>
                  <option value="detached">Detached</option>
                  <option value="flat">Flat</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex-1 py-2 text-xs font-semibold border border-neutral-300 rounded"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2 text-xs font-bold uppercase bg-[#0F5C4A] text-white rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
