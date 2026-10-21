import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProperties } from './filterProperties.ts';
import { FilterState, Property } from '../types/index.ts';

const mockProperties: Property[] = [
  {
    id: 'BR-01',
    title: 'Luxury 4 Bed Duplex',
    slug: 'luxury-4-bed-duplex',
    price: 350000000,
    mode: 'sale',
    type: 'duplex',
    location: 'Ikoyi',
    address: 'Bourne Road, Ikoyi',
    bedrooms: 4,
    bathrooms: 4,
    sizeSqm: 520,
    parkingSpaces: 3,
    yearBuilt: 2024,
    furnished: true,
    status: 'For Sale',
    featured: true,
    description: 'Stunning luxury duplex in prime Ikoyi.',
    features: ['Swimming pool', 'Fitted kitchen', '24/7 Power'],
    images: ['https://example.com/1.jpg'],
    agent: {
      name: 'Babatunde Alabi',
      role: 'Senior Partner',
      phone: '+234 916 714 9677',
      email: 'babatunde@bahamsrealty.com',
      avatar: 'https://example.com/avatar.jpg',
    },
    mapQuery: 'Bourne Road, Ikoyi, Lagos',
    createdAt: '2026-02-15T10:00:00Z',
  },
  {
    id: 'BR-02',
    title: 'Modern 2 Bed Flat',
    slug: 'modern-2-bed-flat',
    price: 15000000,
    mode: 'rent',
    type: 'flat',
    location: 'Victoria Island',
    address: 'Ahmadu Bello Way, VI',
    bedrooms: 2,
    bathrooms: 2,
    sizeSqm: 140,
    parkingSpaces: 2,
    yearBuilt: 2023,
    furnished: false,
    status: 'For Rent',
    featured: false,
    description: 'Sleek serviced flat.',
    features: ['Elevator', 'Gym'],
    images: ['https://example.com/2.jpg'],
    agent: {
      name: 'Amara Nwosu',
      role: 'Lettings Specialist',
      phone: '+234 916 714 9677',
      email: 'amara@bahamsrealty.com',
      avatar: 'https://example.com/avatar2.jpg',
    },
    mapQuery: 'Victoria Island, Lagos',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'BR-03',
    title: '5 Bed Detached Villa',
    slug: '5-bed-detached-villa',
    price: 850000000,
    mode: 'sale',
    type: 'detached',
    location: 'Lekki Phase 1',
    address: 'Admiralty Way, Lekki',
    bedrooms: 5,
    bathrooms: 5,
    sizeSqm: 700,
    parkingSpaces: 4,
    yearBuilt: 2025,
    furnished: true,
    status: 'For Sale',
    featured: true,
    description: 'Grand architectural villa.',
    features: ['Cinema', 'Private pool'],
    images: ['https://example.com/3.jpg'],
    agent: {
      name: 'Babatunde Alabi',
      role: 'Senior Partner',
      phone: '+234 916 714 9677',
      email: 'babatunde@bahamsrealty.com',
      avatar: 'https://example.com/avatar.jpg',
    },
    mapQuery: 'Lekki Phase 1, Lagos',
    createdAt: '2026-01-10T10:00:00Z',
  },
];

const defaultFilter: FilterState = {
  mode: 'all',
  location: 'all',
  type: 'all',
  bedrooms: 'all',
  minPrice: 0,
  maxPrice: 0,
  furnished: 'all',
  sortBy: 'newest',
  searchQuery: '',
};

test('filters by mode (rent only)', () => {
  const result = filterProperties(mockProperties, { ...defaultFilter, mode: 'rent' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'BR-02');
});

test('filters by location (Ikoyi only)', () => {
  const result = filterProperties(mockProperties, { ...defaultFilter, location: 'Ikoyi' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'BR-01');
});

test('filters by minimum 5 bedrooms', () => {
  const result = filterProperties(mockProperties, { ...defaultFilter, bedrooms: 5 });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'BR-03');
});

test('sorts by price ascending and descending', () => {
  const asc = filterProperties(mockProperties, { ...defaultFilter, sortBy: 'price-asc' });
  assert.equal(asc[0].id, 'BR-02');
  assert.equal(asc[2].id, 'BR-03');

  const desc = filterProperties(mockProperties, { ...defaultFilter, sortBy: 'price-desc' });
  assert.equal(desc[0].id, 'BR-03');
  assert.equal(desc[2].id, 'BR-02');
});
