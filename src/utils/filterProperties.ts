import { FilterState, Property } from '../types/index.ts';

/**
 * Pure client-side filtering and sorting for property listings
 */
export function filterProperties(properties: Property[], filter: FilterState): Property[] {
  return properties
    .filter((property) => {
      // Mode filter: sale / rent / all
      if (filter.mode !== 'all' && property.mode !== filter.mode) {
        return false;
      }

      // Location filter
      if (filter.location !== 'all' && property.location !== filter.location) {
        return false;
      }

      // Property type filter
      if (filter.type !== 'all' && property.type !== filter.type) {
        return false;
      }

      // Bedrooms filter
      if (filter.bedrooms !== 'all') {
        const targetBeds = Number(filter.bedrooms);
        if (targetBeds === 5) {
          // 5+ beds
          if (property.bedrooms < 5) return false;
        } else if (property.bedrooms !== targetBeds) {
          return false;
        }
      }

      // Furnished filter
      if (filter.furnished === 'yes' && !property.furnished) {
        return false;
      }
      if (filter.furnished === 'no' && property.furnished) {
        return false;
      }

      // Price range
      if (filter.minPrice > 0 && property.price < filter.minPrice) {
        return false;
      }
      if (filter.maxPrice > 0 && property.price > filter.maxPrice) {
        return false;
      }

      // Text search query
      if (filter.searchQuery && filter.searchQuery.trim().length > 0) {
        const query = filter.searchQuery.toLowerCase().trim();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesAddress = property.address.toLowerCase().includes(query);
        const matchesLocation = property.location.toLowerCase().includes(query);
        const matchesFeatures = property.features.some((f) => f.toLowerCase().includes(query));
        const matchesId = property.id.toLowerCase().includes(query);

        if (!matchesTitle && !matchesAddress && !matchesLocation && !matchesFeatures && !matchesId) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (filter.sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (filter.sortBy === 'price-desc') {
        return b.price - a.price;
      }
      // 'newest' by default
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}
