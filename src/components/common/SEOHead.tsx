import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext.tsx';
import {
  resolveRouteMetadata,
  buildStructuredDataJsonLd,
  PRIMARY_DOMAIN,
} from '../../utils/seoMetadata.ts';
import { formatNaira } from '../../utils/formatters.ts';

function upsertMetaTag(
  attrName: 'name' | 'property',
  attrValue: string,
  content: string
) {
  let el = document.head.querySelector(
    `meta[${attrName}="${attrValue}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLinkTag(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const SEOHead: React.FC = () => {
  const { pathname } = useLocation();
  const { properties, developments } = useData();

  useEffect(() => {
    const baseMeta = resolveRouteMetadata(pathname);
    let { title, description, ogImage } = baseMeta;

    // Enrich dynamic property detail pages with actual listing data
    if (pathname.startsWith('/properties/')) {
      const propId = pathname.replace('/properties/', '').trim();
      const prop = properties.find(
        (p) => p.id.toLowerCase() === propId.toLowerCase() || p.slug === propId
      );
      if (prop) {
        title = `${prop.title} in ${prop.location} (${formatNaira(
          prop.price,
          prop.mode === 'rent'
        )}) | Bahams Realty Lagos`;
        description = `${prop.bedrooms > 0 ? `${prop.bedrooms} Bed ` : ''}${
          prop.title
        } at ${prop.address}. Verified title, ${prop.sizeSqm} sqm. Listed at ${formatNaira(
          prop.price,
          prop.mode === 'rent'
        )} by Bahams Realty Lagos.`;
        if (prop.images?.[0] && !prop.images[0].startsWith('data:')) {
          ogImage = prop.images[0];
        }
      }
    }

    // Enrich dynamic development detail pages with actual project data
    if (pathname.startsWith('/developments/')) {
      const devId = pathname.replace('/developments/', '').trim();
      const dev = developments.find(
        (d) => d.id.toLowerCase() === devId.toLowerCase() || d.slug === devId
      );
      if (dev) {
        title = `${dev.name} (${dev.location}) – From ${formatNaira(
          dev.startingPrice
        )} | Bahams Realty Developments`;
        description = `${dev.name} by ${dev.developer} in ${dev.location}, Lagos. ${dev.status} development with ${dev.paymentPlan.depositPercentage}% initial deposit over ${dev.paymentPlan.durationMonths} months.`;
        if (dev.images?.[0] && !dev.images[0].startsWith('data:')) {
          ogImage = dev.images[0];
        }
      }
    }

    // Update document title
    document.title = title;

    // Update standard & social meta tags
    upsertMetaTag('name', 'description', description);
    upsertMetaTag('name', 'keywords', baseMeta.keywords);
    upsertMetaTag('name', 'author', 'Bahams Realty Lagos (Imagined by June Studios)');
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:type', baseMeta.ogType);
    upsertMetaTag('property', 'og:url', baseMeta.canonicalUrl);
    upsertMetaTag('property', 'og:image', ogImage);
    upsertMetaTag('property', 'og:site_name', 'Bahams Realty Lagos');
    upsertMetaTag('property', 'og:locale', 'en_NG');
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', ogImage);
    upsertMetaTag('name', 'application-name', 'Bahams Realty Lagos');
    upsertMetaTag('name', 'apple-mobile-web-app-title', 'Bahams Realty');
    upsertMetaTag('name', 'theme-color', '#0F5C4A');

    // Update canonical URL (bahamasrealty.com.ng)
    upsertLinkTag('canonical', baseMeta.canonicalUrl);

    // Update Schema.org JSON-LD script for Google Search & Sitelinks
    const jsonLd = buildStructuredDataJsonLd(pathname);
    let scriptEl = document.getElementById('bahams-jsonld') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'bahams-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify({
      ...jsonLd,
      url: PRIMARY_DOMAIN,
    });
  }, [pathname, properties, developments]);

  return null;
};
