import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// Ultra-fast page skeleton
export function FastPageSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="p-6 border rounded-lg">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="p-6 border rounded-lg">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}

// Fast, lightweight skeleton for structures page
export function FastStructuresSkeleton() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar skeleton */}
      <div className="w-80 bg-white border-r border-gray-200 p-6">
        <Skeleton className="h-6 w-20 mb-6" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      </div>
      
      {/* Main content skeleton */}
      <div className="flex-1 p-6">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Fast, lightweight skeleton for dashboard
export function FastDashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
      
      {/* Chart area */}
      <Skeleton className="h-80 w-full rounded-lg" />
    </div>
  )
}

// Inline loading for API calls - very fast
export function InlineLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
        <span className="text-sm text-gray-600">{message}</span>
      </div>
    </div>
  )
}

// Mini skeleton for buttons
export function ButtonSkeleton() {
  return <Skeleton className="h-10 w-24" />
}

// Ultra-fast feature skeleton untuk halaman feature yang ringan
export function FastFeatureSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-6 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-24" />
    </div>
  );
}

// Fast table row skeleton
export function TableRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-3">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-16" />
    </div>
  )
}
