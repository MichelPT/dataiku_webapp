'use client';
import { Suspense } from 'react';
import WellLogPlot from '@/features/results-display/config/WellLogPlot';
import SelectedStructureInfo from '@/components/business/dashboard/SelectedStructureInfo';
import { FastDashboardSkeleton } from '@/components/ui/fast-skeletons';

export default function DashboardHomePage() {
  return (
    <div className="p-6">
      <SelectedStructureInfo />
      <Suspense fallback={<FastDashboardSkeleton />}>
        <WellLogPlot />
      </Suspense>
    </div>
  );
}