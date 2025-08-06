"use client"

import { Skeleton } from '@/components/ui/skeleton';

// Skeleton untuk daftar fields di sidebar
export function FieldsListSkeleton() {
  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6">
      <Skeleton className="h-8 w-20 mb-6" />
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// Skeleton untuk grid structures
export function StructuresGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg border">
          <Skeleton className="h-5 w-32 mb-3" />
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

// Skeleton untuk detail structure
export function StructureDetailSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main skeleton untuk structures page
export function StructuresLoadingSkeleton() {
  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50">
      <FieldsListSkeleton />
      <div className="flex-1">
        <div className="p-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <StructuresGridSkeleton />
        </div>
      </div>
    </div>
  );
}
