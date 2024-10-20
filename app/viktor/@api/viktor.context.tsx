'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ViktorType } from '@/app/viktor/@api/types';

interface ViktorContextType {
  viktor: ViktorType;
  setViktor: React.Dispatch<React.SetStateAction<ViktorType>>;
}

const ViktorContext = createContext<ViktorContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [viktor, setViktor] = useState<ViktorType>({
    module: '',
    action: '',
    unique: '',
    mode: '',
    user: 1
  });

  return (
    <ViktorContext.Provider value={{ viktor, setViktor }}>
      {children}
    </ViktorContext.Provider>
  );
};

export const useViktor = (): ViktorContextType => {
  const context = useContext(ViktorContext);
  if (context === undefined) {
    throw new Error('useViktor must be used within a ViktorProvider');
  }
  return context;
};
