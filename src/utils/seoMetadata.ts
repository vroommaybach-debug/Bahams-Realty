export const PRIMARY_DOMAIN = 'https://bahamasrealty.com.ng';

export interface RouteMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  ogImage: string;
  keywords: string;
  breadcrumbName: string;
}

export const SUBPAGE_SITELINKS = [
  {
    name: 'Properties for Sale & Rent',
    path: '/properties',
    url: `${PRIMARY_DOMAIN}/properties`,
    description:
      'Browse verified luxury duplexes, waterfront penthouses, smart terraces, and serviced flats in Ikoyi, Victoria Island, Lekki Phase 1, and Ikeja GRA.',
  },
  {
    name: 'Off-Plan Developments',
    path: '/developments',
    url: `${PRIMARY_DOMAIN}/developments`,
    description:
      'Explore landmark off-plan residential developments and gated estates in Lagos with structured milestone payment plans and verified titles.',
  },
  {
    name: 'Advisory & Brokerage Services',
    path: '/services',
    url: `${PRIMARY_DOMAIN}/services`,
    description:
      'Institutional real estate advisory, Alausa Land Registry title verification (C of O & Governor’s Consent), corporate lettings, and diaspora concierge.',
  },
  {
    name: 'About Bahams Realty',
    path: '/about',
    url: `${PRIMARY_DOMAIN}/about`,
    description:
      'Learn about Bahams Realty Lagos (RC: 1849204), our 5-stage title diligence standard, and our advisory leadership at 14A Admiralty Way, Lekki Phase 1.',
  },
  {
    name: 'Contact & Private Inspections',
    path: '/contact',
    url: `${PRIMARY_DOMAIN}/contact`,
    description:
      'Schedule a physical or live WhatsApp video property inspection with Bahams Realty advisors at 14A Admiralty Way, Lekki Phase 1, Lagos (+234 916 714 9677).',
  },
];

const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80';

/**
 * Resolves route-specific SEO metadata for Google Search, browser tabs, OpenGraph, and canonical URLs.
 */
export function resolveRouteMetadata(pathname: string): RouteMetadata {
  const cleanPath = (pathname || '/').split('?')[0].replace(/\/+$/, '') || '/';
  const canonicalUrl = `${PRIMARY_DOMAIN}${cleanPath === '/' ? '' : cleanPath}`;

  if (cleanPath === '/properties') {
    return {
      title: 'Properties for Sale & Rent in Lagos | Bahams Realty (Ikoyi, VI & Lekki)',
      description:
        'Explore verified luxury properties for sale and annual lease in Ikoyi, Victoria Island, Lekki Phase 1, and Ikeja GRA with C of O and Governor’s Consent.',
      canonicalUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      keywords:
        'Lagos properties for sale, Ikoyi luxury duplex, Victoria Island apartments, Lekki Phase 1 houses, Bahams Realty properties',
      breadcrumbName: 'Properties',
    };
  }

  if (cleanPath.startsWith('/properties/')) {
    const refId = cleanPath.replace('/properties/', '').toUpperCase();
    return {
      title: `Property Listing ${refId} | Verified Lagos Residence | Bahams Realty`,
      description: `View full specifications, title verification status, Naira pricing, and inspection scheduling for Lagos property listing ${refId} by Bahams Realty.`,
      canonicalUrl,
      ogType: 'article',
      ogImage: DEFAULT_OG_IMAGE,
      keywords: `Lagos property ${refId}, Bahams Realty listing, verified C of O Lagos`,
      breadcrumbName: `Property ${refId}`,
    };
  }

  if (cleanPath === '/developments') {
    return {
      title: 'Off-Plan Developments & New Estates in Lagos | Bahams Realty',
      description:
        'Invest in vetted off-plan residential developments and waterfront estates across Victoria Island, Ikoyi, and Lekki with milestone-backed payment plans.',
      canonicalUrl,
      ogType: 'website',
      ogImage:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
      keywords:
        'Off-plan developments Lagos, Victoria Island new developments, Lekki off-plan estates, Bahams Realty developments',
      breadcrumbName: 'Developments',
    };
  }

  if (cleanPath.startsWith('/developments/')) {
    const devId = cleanPath.replace('/developments/', '').toUpperCase();
    return {
      title: `Development Project ${devId} | Lagos Off-Plan & Ready Estates | Bahams Realty`,
      description: `Explore unit mix, milestone payment schedule, engineering progress, and investment pack for development ${devId} curated by Bahams Realty Lagos.`,
      canonicalUrl,
      ogType: 'article',
      ogImage:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
      keywords: `Lagos development ${devId}, off-plan investment Lagos, Bahams Realty`,
      breadcrumbName: `Development ${devId}`,
    };
  }

  if (cleanPath === '/services') {
    return {
      title: 'Real Estate Advisory, Title Search & Brokerage Services | Bahams Realty Lagos',
      description:
        'Institutional Lagos real estate advisory: Residential Sales, Executive Corporate Lettings, Off-Plan Investment Structuring, and Land Title Verification.',
      canonicalUrl,
      ogType: 'website',
      ogImage:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      keywords:
        'Lagos real estate advisory, Alausa title verification, C of O verification Lagos, diaspora property concierge Nigeria, Bahams Realty services',
      breadcrumbName: 'Services',
    };
  }

  if (cleanPath === '/about') {
    return {
      title: 'About Bahams Realty Lagos | Verified Real Estate Brokerage (RC: 1849204)',
      description:
        'Headquartered at 14A Admiralty Way, Lekki Phase 1, Bahams Realty (RC: 1849204) delivers institutional title diligence and premier real estate advisory in Lagos.',
      canonicalUrl,
      ogType: 'website',
      ogImage:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
      keywords:
        'About Bahams Realty, RC 1849204, Lekki Phase 1 real estate company, trusted Lagos property broker',
      breadcrumbName: 'About Us',
    };
  }

  if (cleanPath === '/contact') {
    return {
      title: 'Contact & Schedule Property Inspection | Bahams Realty Lagos',
      description:
        'Visit Bahams Realty at 14A Admiralty Way, Lekki Phase 1, Lagos or call +234 916 714 9677 to schedule a private physical or live video property viewing.',
      canonicalUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      keywords:
        'Contact Bahams Realty Lagos, schedule property viewing Lekki, 14A Admiralty Way Lekki Phase 1, +2349167149677',
      breadcrumbName: 'Contact',
    };
  }

  if (cleanPath.startsWith('/admin')) {
    return {
      title: 'Executive Operations Portal | Bahams Realty Lagos',
      description: 'Restricted operations management portal for Bahams Realty Lagos.',
      canonicalUrl: `${PRIMARY_DOMAIN}/admin`,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      keywords: 'Bahams Realty operations',
      breadcrumbName: 'Operations',
    };
  }

  return {
    title: 'Bahams Realty Lagos | Premier Properties, Developments & Advisory (RC: 1849204)',
    description:
      'Premier real estate brokerage in Lagos, Nigeria (bahamasrealty.com.ng). Verified C of O & Governor’s Consent luxury homes, executive rentals, and off-plan developments in Ikoyi, VI, and Lekki.',
    canonicalUrl: PRIMARY_DOMAIN,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords:
      'Bahams Realty, bahamasrealty.com.ng, Lagos real estate, Ikoyi properties, Victoria Island apartments, Lekki Phase 1 duplexes, Nigeria diaspora real estate',
    breadcrumbName: 'Home',
  };
}

/**
 * Generates Schema.org JSON-LD structured data including RealEstateAgent, WebSite,
 * SiteNavigationElement (for Google Sitelinks), and BreadcrumbList.
 */
export function buildStructuredDataJsonLd(pathname: string) {
  const meta = resolveRouteMetadata(pathname);
  const cleanPath = (pathname || '/').split('?')[0].replace(/\/+$/, '') || '/';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': `${PRIMARY_DOMAIN}/#organization`,
        name: 'Bahams Realty',
        legalName: 'Bahams Realty Limited (RC: 1849204)',
        url: PRIMARY_DOMAIN,
        logo: `${PRIMARY_DOMAIN}/favicon.svg`,
        image: meta.ogImage,
        description:
          'Full-service real estate brokerage and development advisory firm in Lagos, Nigeria specializing in verified residential sales, executive lettings, and off-plan developments.',
        telephone: '+234-916-714-9677',
        email: 'advisory@bahamasrealty.com.ng',
        priceRange: '₦₦₦₦',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '14A Admiralty Way, Lekki Phase 1',
          addressLocality: 'Lagos',
          addressRegion: 'Lagos State',
          postalCode: '106104',
          addressCountry: 'NG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 6.4474,
          longitude: 3.4723,
        },
        areaServed: [
          { '@type': 'City', name: 'Ikoyi, Lagos' },
          { '@type': 'City', name: 'Victoria Island, Lagos' },
          { '@type': 'City', name: 'Lekki Phase 1, Lagos' },
          { '@type': 'City', name: 'Ikeja GRA, Lagos' },
          { '@type': 'City', name: 'Ibeju-Lekki, Lagos' },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${PRIMARY_DOMAIN}/#website`,
        url: PRIMARY_DOMAIN,
        name: 'Bahams Realty Lagos',
        publisher: {
          '@id': `${PRIMARY_DOMAIN}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${PRIMARY_DOMAIN}/properties?location={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${PRIMARY_DOMAIN}/#sitelinks`,
        name: 'Bahams Realty Main Navigation & Sitelinks',
        itemListElement: SUBPAGE_SITELINKS.map((item, idx) => ({
          '@type': 'SiteNavigationElement',
          position: idx + 1,
          name: item.name,
          description: item.description,
          url: item.url,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${meta.canonicalUrl}#breadcrumb`,
        itemListElement:
          cleanPath === '/'
            ? [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: PRIMARY_DOMAIN,
                },
              ]
            : [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: PRIMARY_DOMAIN,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: meta.breadcrumbName,
                  item: meta.canonicalUrl,
                },
              ],
      },
    ],
  };
}
