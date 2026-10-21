import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  openInspectionModal: (propertyContext?: { title: string; location: string; id: string }) => void;
  closeInspectionModal: () => void;
  inspectionProperty: { title: string; location: string; id: string } | null;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inspectionProperty, setInspectionProperty] = useState<{
    title: string;
    location: string;
    id: string;
  } | null>(null);

  const openInspectionModal = (propertyContext?: { title: string; location: string; id: string }) => {
    setInspectionProperty(propertyContext || null);
    setIsModalOpen(true);
  };

  const closeInspectionModal = () => {
    setInspectionProperty(null);
    setIsModalOpen(false);
  };

  return (
    <UIContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        openInspectionModal,
        closeInspectionModal,
        inspectionProperty,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
