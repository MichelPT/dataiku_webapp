import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function StructuresSkeleton() {
  return (
    <div className="flex h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Left Sidebar - Fields */}
      <div className="w-64 flex-shrink-0 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 p-4 shadow-sm">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel - Structures */}
      <div className="flex-1 bg-slate-50/50 border-r border-slate-200/60 flex flex-col">
        <div className="p-4 border-b bg-white/60 backdrop-blur-sm shadow-sm">
          <Skeleton className="h-7 w-48" />
        </div>
        <div className="flex-1 p-4 space-y-3">
          <Card className="shadow-sm border-slate-200/60">
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50/50">
                  <Skeleton className="h-4 w-4 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Panel - Details (optional, commented out for now) */}
      {/* 
      <div className="flex-1 bg-white flex flex-col">
        <div className="p-4 border-b">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex-1 p-6 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      */}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex h-16 items-center px-6">
          <Skeleton className="h-8 w-48" />
          <div className="ml-auto flex items-center space-x-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r bg-white/60 backdrop-blur-sm shadow-sm">
          <div className="p-4 space-y-4">
            <Skeleton className="h-6 w-24" />
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-2 rounded-lg">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="shadow-sm border-slate-200/60">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Analysis Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm border-slate-200/60">
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Parameter Table Skeleton */}
                  <div className="space-y-3">
                    <div className="flex space-x-4 pb-2 border-b">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-4 flex-1" />
                      ))}
                    </div>
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex space-x-4 items-center">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 flex-1" />
                        <Skeleton className="h-4 flex-1" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200/60">
                <CardHeader>
                  <Skeleton className="h-6 w-36" />
                </CardHeader>
                <CardContent>
                  {/* Chart Skeleton */}
                  <div className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
