"use client"

export function LoadingSkeleton() {
  return (
    <div className="flex h-[calc(100vh-80px)] w-full bg-gray-50">
      {/* Left Sidebar Skeleton */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="animate-pulse">
            {/* Wells Section */}
            <div className="border border-gray-200 rounded-lg shadow-sm">
              <div className="bg-gray-50 p-4 rounded-t-lg">
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="p-4 space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>

            {/* Intervals Section */}
            <div className="border border-gray-200 rounded-lg shadow-sm mt-4">
              <div className="bg-gray-50 p-4 rounded-t-lg">
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="p-4 space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>

            {/* Plot Display Section */}
            <div className="border border-gray-200 rounded-lg shadow-sm mt-4">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-t-lg">
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="p-4 space-y-3">
                <div className="h-10 bg-gray-100 rounded"></div>
                <div className="h-px bg-gray-200"></div>
                <div className="space-y-2">
                  <div className="h-9 bg-gray-100 rounded"></div>
                  <div className="h-9 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-white rounded-lg border border-gray-200 mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-white rounded-lg border border-gray-200"></div>
            <div className="h-32 bg-white rounded-lg border border-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Skeleton */}
      <div className="w-80 bg-white border-l border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg shadow-sm">
                <div className="bg-gray-50 p-4 rounded-t-lg">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="p-4 space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-9 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
