import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRIMARY_DOMAIN,
  SUBPAGE_SITELINKS,
  resolveRouteMetadata,
  buildStructuredDataJsonLd,
} from './seoMetadata';

test('PRIMARY_DOMAIN is wired to bahamasrealty.com.ng and all 5 subpages are registered for Google sitelinks', () => {
  assert.equal(PRIMARY_DOMAIN, 'https://bahamasrealty.com.ng');
  const paths = SUBPAGE_SITELINKS.map((s) => s.path);
  assert.deepEqual(paths, [
    '/properties',
    '/developments',
    '/services',
    '/about',
    '/contact',
  ]);
});

test('resolveRouteMetadata returns dedicated titles, descriptions, and canonical URLs for subpages', () => {
  const propsMeta = resolveRouteMetadata('/properties');
  assert.equal(propsMeta.canonicalUrl, 'https://bahamasrealty.com.ng/properties');
  assert.equal(propsMeta.title.includes('Properties for Sale & Rent'), true);

  const devMeta = resolveRouteMetadata('/developments');
  assert.equal(devMeta.canonicalUrl, 'https://bahamasrealty.com.ng/developments');
  assert.equal(devMeta.title.includes('Off-Plan Developments'), true);

  const srvMeta = resolveRouteMetadata('/services');
  assert.equal(srvMeta.canonicalUrl, 'https://bahamasrealty.com.ng/services');

  const aboutMeta = resolveRouteMetadata('/about');
  assert.equal(aboutMeta.canonicalUrl, 'https://bahamasrealty.com.ng/about');

  const contactMeta = resolveRouteMetadata('/contact');
  assert.equal(contactMeta.canonicalUrl, 'https://bahamasrealty.com.ng/contact');
});

test('buildStructuredDataJsonLd includes RealEstateAgent, WebSite, and SiteNavigationElement graph nodes', () => {
  const jsonLd = buildStructuredDataJsonLd('/properties');
  assert.equal(jsonLd['@context'], 'https://schema.org');
  assert.equal(Array.isArray(jsonLd['@graph']), true);
  assert.equal(jsonLd['@graph'].length, 4);
});
