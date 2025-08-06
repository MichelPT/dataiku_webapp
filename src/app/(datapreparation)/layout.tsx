// src/app/(dashboard)/layout.tsx

'use client';

import React from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import { MainContent } from '@/components/layout/MainContent';
import { DashboardProvider } from '@/shared/contexts/DashboardContext';
import { usePathname } from 'next/navigation';

export default function DataPreparationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DataPreparationWrapper>{children}</DataPreparationWrapper>
    </DashboardProvider>
  );
}

// Komponen wrapper untuk layout data preparation
function DataPreparationWrapper({ children }: { children: React.ReactNode }) {    
  const pathname = usePathname();
  
  // Extract active module from pathname untuk ditampilkan di RightSidebar
  const pathSegments = pathname.split('/').filter(Boolean);
  const activeModule = pathSegments.length > 1 
    ? pathSegments[pathSegments.length - 1].toUpperCase().replace(/-/g, ' ').replace(/_/g, ' ')
    : 'DATA PREPARATION';
    
  return (
    <div className="flex h-[calc(100vh-80px)] w-full bg-gray-100 font-sans text-gray-800">
      <LeftSidebar />
      <MainContent>{children}</MainContent>
      <RightSidebar activeButton={activeModule} />
    </div>
  );
}