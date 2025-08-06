"use client"

import { useState, useEffect, memo, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Target, Settings } from "lucide-react"
import { type PlotType, useDashboard } from "@/shared/contexts/DashboardContext"
import { toast } from "sonner"

export const LeftSidebar = memo(function LeftSidebar() {
  const {
    availableWells,
    selectedWells,
    toggleWellSelection,
    selectedIntervals,
    toggleInterval,
    plotType,
    availableIntervals,
    setPlotType,
  } = useDashboard()

  const [isMounted, setIsMounted] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
      setIsMounted(true)
      toast.success("Data selection loaded", {
        description: "Wells and intervals are ready for selection",
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSelectAllWells = useCallback(
    (checked: boolean) => {
      if (checked) {
        const newSelections = availableWells.filter((well) => !selectedWells.includes(well))
        newSelections.forEach((well) => toggleWellSelection(well))
        if (newSelections.length > 0) {
          toast.success("Wells selected", {
            description: `Selected ${newSelections.length} additional wells`,
          })
        }
      } else {
        const count = selectedWells.length
        selectedWells.forEach((well) => toggleWellSelection(well))
        if (count > 0) {
          toast.info("Wells deselected", {
            description: `Deselected ${count} wells`,
          })
        }
      }
    },
    [availableWells, selectedWells, toggleWellSelection],
  )

  const handleSelectAllIntervals = useCallback(
    (checked: boolean) => {
      if (checked) {
        const newSelections = availableIntervals.filter((interval) => !selectedIntervals.includes(interval))
        newSelections.forEach((interval) => toggleInterval(interval))
        if (newSelections.length > 0) {
          toast.success("Intervals selected", {
            description: `Selected ${newSelections.length} additional intervals`,
          })
        }
      } else {
        const count = selectedIntervals.length
        selectedIntervals.forEach((interval) => toggleInterval(interval))
        if (count > 0) {
          toast.info("Intervals deselected", {
            description: `Deselected ${count} intervals`,
          })
        }
      }
    },
    [availableIntervals, selectedIntervals, toggleInterval],
  )

  const handleWellToggle = useCallback(
    (well: string) => {
      toggleWellSelection(well)
      const isSelected = selectedWells.includes(well)
      toast.info(isSelected ? "Well deselected" : "Well selected", {
        description: `${well} ${isSelected ? "removed from" : "added to"} selection`,
      })
    },
    [selectedWells, toggleWellSelection],
  )

  const handleIntervalToggle = useCallback(
    (interval: string) => {
      toggleInterval(interval)
      const isSelected = selectedIntervals.includes(interval)
      toast.info(isSelected ? "Interval deselected" : "Interval selected", {
        description: `${interval} ${isSelected ? "removed from" : "added to"} selection`,
      })
    },
    [selectedIntervals, toggleInterval],
  )

  const handlePlotTypeChange = useCallback(
    (value: PlotType) => {
      setPlotType(value)
      toast.success("Plot type changed", {
        description: `Switched to ${value.replace("-", " ")} layout`,
      })
    },
    [setPlotType],
  )

  // Loading skeleton that matches exact width
  if (isInitialLoading) {
    return (
      <aside className="w-52 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Header Skeleton */}
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="animate-pulse">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Wells Section Skeleton */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2 bg-gray-50 rounded-t-lg">
              <div className="animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2 animate-pulse">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2 p-1">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Intervals Section Skeleton */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2 bg-gray-50 rounded-t-lg">
              <div className="animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2 p-1">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plot Configuration Skeleton */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-t-lg">
              <div className="animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </CardHeader>
            <CardContent className="pt-3 space-y-3">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-52 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <Settings className="w-4 h-4 " />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Data Selection</h2>
            <p className="text-xs text-gray-600">Configure parameters</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Wells Section */}
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="rounded-t-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-green-100 rounded">
                <Target className="w-3 h-3 text-green-600" />
              </div>
              <CardTitle className="text-xs font-semibold text-gray-800">Wells</CardTitle>
              <Badge variant="outline" className="ml-auto text-xs bg-white border-gray-300 text-gray-700">
                {selectedWells.length}/{availableWells.length}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all-wells"
                checked={selectedWells.length === availableWells.length}
                onCheckedChange={handleSelectAllWells}
                className="border-gray-400"
              />
              <label htmlFor="select-all-wells" className="text-xs text-gray-600 cursor-pointer font-medium">
                Select all
              </label>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="max-h-32 overflow-y-auto space-y-1.5">
              {!isMounted ? (
                <div className="space-y-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-5 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : (
                availableWells.map((well) => (
                  <div
                    key={well}
                    className="flex items-center space-x-2 p-1 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      id={`well-${well}`}
                      checked={selectedWells.includes(well)}
                      onCheckedChange={() => handleWellToggle(well)}
                      className="border-gray-400"
                    />
                    <label
                      htmlFor={`well-${well}`}
                      className="text-xs text-gray-700 cursor-pointer truncate font-medium flex-1"
                    >
                      {well}
                    </label>
                    {selectedWells.includes(well) && <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Intervals Section */}
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className=" rounded-t-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-purple-100 rounded">
                <BarChart3 className="w-3 h-3 text-purple-600" />
              </div>
              <CardTitle className="text-xs font-semibold text-gray-800">Intervals</CardTitle>
              <Badge variant="outline" className="ml-auto text-xs bg-white border-gray-300 text-gray-700">
                {selectedIntervals.length}/{availableIntervals.length}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all-intervals"
                checked={selectedIntervals.length === availableIntervals.length}
                onCheckedChange={handleSelectAllIntervals}
                className="border-gray-400"
              />
              <label htmlFor="select-all-intervals" className="text-xs text-gray-600 cursor-pointer font-medium">
                Select all
              </label>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-32 overflow-y-auto space-y-1.5">
              {availableIntervals.map((interval) => (
                <div
                  key={interval}
                  className="flex items-center space-x-2 p-1 rounded hover:bg-gray-50 transition-colors"
                >
                  <Checkbox
                    id={`interval-${interval}`}
                    checked={selectedIntervals.includes(interval)}
                    onCheckedChange={() => handleIntervalToggle(interval)}
                    className="border-gray-400"
                  />
                  <label
                    htmlFor={`interval-${interval}`}
                    className="text-xs text-gray-700 cursor-pointer truncate font-medium flex-1"
                  >
                    {interval}
                  </label>
                  {selectedIntervals.includes(interval) && (
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plot Configuration Section */}
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-orange-100 rounded">
                <BarChart3 className="w-3 h-3 text-orange-600" />
              </div>
              <CardTitle className="text-xs font-semibold text-gray-800">Plot Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">Layout Type</label>
              <Select value={plotType} onValueChange={handlePlotTypeChange}>
                <SelectTrigger className="w-full border-gray-300 bg-white text-xs h-8">
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="default">Layout Default</SelectItem>
                  <SelectItem value="normalization">Layout Normalisasi</SelectItem>
                  <SelectItem value="smoothing">Layout Smoothing</SelectItem>
                  <SelectItem value="vsh">Layout VSH</SelectItem>
                  <SelectItem value="porosity">Layout Porosity</SelectItem>
                  <SelectItem value="sw">Layout SW</SelectItem>
                  <SelectItem value="rwa">Layout RWA</SelectItem>
                  <SelectItem value="module2">Layout Module 2</SelectItem>
                  <SelectItem value="gsa">Layout GSA</SelectItem>
                  <SelectItem value="rpbe-rgbe">Layout RPBE RGBE</SelectItem>
                  <SelectItem value="iqual">Layout IQUAL</SelectItem>
                  <SelectItem value="swgrad">Layout SWGRAD</SelectItem>
                  <SelectItem value="dns-dnsv">Layout DNS-DNSV</SelectItem>
                  <SelectItem value="rt-ro">Layout RT-RO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <label className="text-xs font-medium text-gray-700 mb-2 block">Analysis Tools</label>
              <div className="space-y-1.5">
                <Link href="histogram">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs h-7 bg-white border-gray-300 hover:bg-gray-50 text-gray-700"
                  >
                    <BarChart3 className="w-3 h-3 mr-1.5" />
                    Histogram
                  </Button>
                </Link>
                <Link href="crossplot">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs h-7 bg-white border-gray-300 hover:bg-gray-50 text-gray-700"
                  >
                    <Target className="w-3 h-3 mr-1.5" />
                    Crossplot
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Summary */}
      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between items-center">
            <span>Selected Wells:</span>
            <Badge variant="outline" className="text-xs bg-white border-gray-300 text-gray-700">
              {selectedWells.length}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Selected Intervals:</span>
            <Badge variant="outline" className="text-xs bg-white border-gray-300 text-gray-700">
              {selectedIntervals.length}
            </Badge>
          </div>
        </div>
      </div>
    </aside>
  )
})

export default LeftSidebar
