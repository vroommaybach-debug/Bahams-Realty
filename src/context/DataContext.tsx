import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';
import { Property, InboundEnquiry, LandingPageConfig } from '../types/index.ts';
import { PROPERTIES_DATA, TRUST_STATS } from '../data/mockData.ts';

const PROPERTIES_STORAGE_KEY = 'bahams_realty_properties_v1';
const LANDING_STORAGE_KEY = 'bahams_realty_landing_v1';
const ENQUIRIES_STORAGE_KEY = 'bahams_realty_enquiries_v1';
const FAVORITES_STORAGE_KEY = 'bahams_realty_favorites_v1';

export const DEFAULT_LANDING_CONFIG: LandingPageConfig = {
  heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
  heroHeadline: 'Find Your Next Address in Lagos.',
  heroSubline: 'Verified titles, institutional diligence, and trusted on-ground advisory for high-end residential sales, prime rentals, and landmark off-plan developments.',
  heroBadgeText: 'Verified Lagos Properties & Developments',
  aboutOfficeImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  whyBahamsImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  howItWorksImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  featuredHighlightTitle: 'Curated Prime Residences',
  trustStats: TRUST_STATS,
};

const SEED_ENQUIRIES: InboundEnquiry[] = [
  {
    id: 'ENQ-901',
    type: 'inspection',
    name: 'Olumide Bakare',
    phone: '+2348039201928',
    email: 'o.bakare@lagosinvest.ng',
    subject: 'Viewing Request for 5 Bed Duplex in Ikoyi',
    details: 'Interested in physical inspection this Saturday morning. Proof of funds verified.',
    propertyOrProjectTitle: '5 Bedroom Contemporary Luxury Detached Duplex',
    propertyOrProjectId: 'BR-101',
    preferredDate: '2026-10-24',
    preferredTime: '10:00 AM',
    createdAt: '2026-10-20T14:30:00Z',
    status: 'new',
  },
  {
    id: 'ENQ-902',
    type: 'development',
    name: 'Dr. Tariq Al-Hassan',
    phone: '+971508921443',
    email: 'tariq.hassan@dubaiholdings.ae',
    subject: 'Off-Plan 4-Bed Penthouse Enquiry at The Oceanic',
    details: 'Client based in Dubai. Requests milestone contract schedule and video conference with managing partner.',
    propertyOrProjectTitle: 'The Oceanic Terraces & Residences',
    propertyOrProjectId: 'DEV-01',
    budget: '₦580,000,000',
    createdAt: '2026-10-19T09:15:00Z',
    status: 'contacted',
  },
];

interface DataContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => Property;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  resetPropertiesToDefault: () => void;

  landingConfig: LandingPageConfig;
  updateLandingConfig: (updates: Partial<LandingPageConfig>) => void;
  resetLandingConfig: () => void;

  enquiries: InboundEnquiry[];
  addEnquiry: (enquiry: Omit<InboundEnquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: InboundEnquiry['status']) => void;
  deleteEnquiry: (id: string) => void;
  clearEnquiries: () => void;

  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;

  isFirebaseConnected: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(true);

  // 1. Properties State
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem(PROPERTIES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return PROPERTIES_DATA;
  });

  // 2. Landing Page Config
  const [landingConfig, setLandingConfig] = useState<LandingPageConfig>(() => {
    try {
      const stored = localStorage.getItem(LANDING_STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_LANDING_CONFIG, ...JSON.parse(stored) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_LANDING_CONFIG;
  });

  // 3. Enquiries State
  const [enquiries, setEnquiries] = useState<InboundEnquiry[]>(() => {
    try {
      const stored = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return SEED_ENQUIRIES;
  });

  // 4. Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // Real-time Firestore Listeners
  useEffect(() => {
    // 1. Listen for Enquiries
    const enquiriesRef = collection(db, 'enquiries');
    const unsubEnquiries = onSnapshot(
      enquiriesRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: InboundEnquiry[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as InboundEnquiry);
          });
          list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setEnquiries(list);
          try {
            localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(list));
          } catch {
            // ignore
          }
        }
        setIsFirebaseConnected(true);
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.LIST, 'enquiries');
        } catch {
          // keep local fallback working smoothly
        }
        setIsFirebaseConnected(false);
      }
    );

    // 2. Listen for Landing Config
    const landingRef = doc(db, 'settings', 'landingConfig');
    const unsubLanding = onSnapshot(
      landingRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as LandingPageConfig;
          setLandingConfig((prev) => ({ ...prev, ...data }));
          try {
            localStorage.setItem(LANDING_STORAGE_KEY, JSON.stringify(data));
          } catch {
            // ignore
          }
        }
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.GET, 'settings/landingConfig');
        } catch {
          // ignore
        }
      }
    );

    // 3. Listen for Properties
    const propertiesRef = collection(db, 'properties');
    const unsubProperties = onSnapshot(
      propertiesRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Property[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Property);
          });
          setProperties(list);
          try {
            localStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(list));
          } catch {
            // ignore
          }
        }
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.LIST, 'properties');
        } catch {
          // ignore
        }
      }
    );

    return () => {
      unsubEnquiries();
      unsubLanding();
      unsubProperties();
    };
  }, []);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(properties));
    } catch {
      // ignore
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(LANDING_STORAGE_KEY, JSON.stringify(landingConfig));
    } catch {
      // ignore
    }
  }, [landingConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
    } catch {
      // ignore
    }
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Operations
  const addProperty = (newPropData: Omit<Property, 'id' | 'createdAt'>): Property => {
    const id = `BR-${Math.floor(100 + Math.random() * 900)}`;
    const newProp: Property = {
      ...newPropData,
      id,
      createdAt: new Date().toISOString(),
    };
    setProperties((prev) => [newProp, ...prev]);

    // Persist to Firestore
    setDoc(doc(db, 'properties', id), newProp).catch((err) => {
      try {
        handleFirestoreError(err, OperationType.CREATE, `properties/${id}`);
      } catch {
        // local state remains updated
      }
    });

    return newProp;
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );

    updateDoc(doc(db, 'properties', id), updates).catch((err) => {
      try {
        handleFirestoreError(err, OperationType.UPDATE, `properties/${id}`);
      } catch {
        // local state remains updated
      }
    });
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));

    deleteDoc(doc(db, 'properties', id)).catch((err) => {
      try {
        handleFirestoreError(err, OperationType.DELETE, `properties/${id}`);
      } catch {
        // local state remains updated
      }
    });
  };

  const resetPropertiesToDefault = () => {
    setProperties(PROPERTIES_DATA);
    localStorage.removeItem(PROPERTIES_STORAGE_KEY);
  };

  const updateLandingConfig = (updates: Partial<LandingPageConfig>) => {
    const updated = { ...landingConfig, ...updates };
    setLandingConfig(updated);

    // Persist to Firestore settings
    setDoc(doc(db, 'settings', 'landingConfig'), updated, { merge: true }).catch((err) => {
      try {
        handleFirestoreError(err, OperationType.WRITE, 'settings/landingConfig');
      } catch {
        // local state remains updated
      }
    });
  };

  const resetLandingConfig = () => {
    setLandingConfig(DEFAULT_LANDING_CONFIG);
    localStorage.removeItem(LANDING_STORAGE_KEY);

    setDoc(doc(db, 'settings', 'landingConfig'), DEFAULT_LANDING_CONFIG).catch((err) => {
      try {
        handleFirestoreError(err, OperationType.WRITE, 'settings/landingConfig');
      } catch {
        // local state remains updated
      }
    });
  };

  const addEnquiry = (enquiryData: Omit<InboundEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const id = `ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnq: InboundEnquiry = {
      ...enquiryData,
      id,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setEnquiries((prev) => [newEnq, ...prev]);

    // Persist to Firestore
    setDoc(doc(db, 'enquiries', id), newEnq).catch((err) => {
      try {
        handleFirestoreError(err, OperationType.CREATE, `enquiries/${id}`);
      } catch {
        // local state remains updated
      }
    });
  };

  const updateEnquiryStatus = (id: string, status: InboundEnquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );

    updateDoc(doc(db, 'enquiries', id), { status }).catch((err) => {
      try {
        handleFirestoreError(err, OperationType.UPDATE, `enquiries/${id}`);
      } catch {
        // local state remains updated
      }
    });
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));

    deleteDoc(doc(db, 'enquiries', id)).catch((err) => {
      try {
        handleFirestoreError(err, OperationType.DELETE, `enquiries/${id}`);
      } catch {
        // local state remains updated
      }
    });
  };

  const clearEnquiries = () => {
    setEnquiries([]);
    localStorage.removeItem(ENQUIRIES_STORAGE_KEY);
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  return (
    <DataContext.Provider
      value={{
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
        favorites,
        toggleFavorite,
        isFavorite,
        isFirebaseConnected,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
