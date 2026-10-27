/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { UIProvider } from './context/UIContext.tsx';
import { DataProvider } from './context/DataContext.tsx';
import { Navbar } from './components/layout/Navbar.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { WhatsAppButton } from './components/common/WhatsAppButton.tsx';
import { InspectionModal } from './components/inspection/InspectionModal.tsx';
import { MobileBottomNav } from './components/layout/MobileBottomNav.tsx';
import { SEOHead } from './components/common/SEOHead.tsx';
import { resolveSpaFallbackRoute } from './utils/adminAuth.ts';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { PropertiesPage } from './pages/PropertiesPage.tsx';
import { PropertyDetailPage } from './pages/PropertyDetailPage.tsx';
import { DevelopmentsPage } from './pages/DevelopmentsPage.tsx';
import { ProjectDetailPage } from './pages/ProjectDetailPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';

// Scroll to top on navigation helper + SPA fallback route handler
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fallbackRoute = resolveSpaFallbackRoute(search, hash);
    if (fallbackRoute && fallbackRoute !== pathname) {
      navigate(fallbackRoute, { replace: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, search, hash, navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <UIProvider>
          <ScrollToTop />
          <SEOHead />
          <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#1A1A1A]">
            {/* Sticky Global Top Bar */}
            <Navbar />

            {/* Main Route Content */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/developments" element={<DevelopmentsPage />} />
                <Route path="/developments/:id" element={<ProjectDetailPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>

            {/* Global Inspection Modal */}
            <InspectionModal />

            {/* Global Floating WhatsApp Button */}
            <WhatsAppButton />

            {/* Global Footer */}
            <Footer />

            {/* Sticky Mobile Bottom Navigation */}
            <MobileBottomNav />
          </div>
        </UIProvider>
      </DataProvider>
    </BrowserRouter>
  );
}
