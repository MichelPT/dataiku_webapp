"use client"

import type React from "react"
import { useState, useEffect, memo, useCallback } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { toast } from "sonner"

interface RightSidebarProps {
  activeButton: string | null
}

interface ModuleSectionProps {
  title?: string
  buttons: (string | DropdownButton)[]
  activeButton: string | null
  isLoading?: boolean
}

interface DropdownButton {
  label: string
  items: string[]
}

const ModuleSection = memo(function ModuleSection({
  title,
  buttons,
  activeButton,
  isLoading = false,
}: ModuleSectionProps) {
  const [expandedDropdowns, setExpandedDropdowns] = useState<Set<string>>(new Set())

  const toggleDropdown = useCallback((label: string) => {
    setExpandedDropdowns((prev) => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(label)) {
        newExpanded.delete(label)
        toast.info("Section collapsed", { description: `${label} section collapsed` })
      } else {
        newExpanded.add(label)
        toast.info("Section expanded", { description: `${label} section expanded` })
      }
      return newExpanded
    })
  }, [])

  const getRouteForItem = useCallback((itemName: string) => {
    switch (itemName) {
      case "VSH-GR":
        return "vsh-calculation"
      case "VSH-DN":
        return "vsh-dn-calculation"
      case "SW INDONESIA":
        return "sw-calculation"
      case "SW SIMANDOUX":
        return "sw-simandoux"
      case "RGSA":
      case "DGSA":
      case "NGSA":
        return "rgsa-ngsa-dgsa"
      default:
        return itemName.toLowerCase().replace(/\s+/g, "-")
    }
  }, [])

  // Loading skeleton for module section
  if (isLoading) {
    return (
      <Card className="border-gray-200 shadow-sm">
        {title && (
          <CardHeader className="py-1 px-3 bg-gray-50 rounded-t-lg border-b border-gray-100">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
          </CardHeader>
        )}
        <CardContent className="p-1.5">
          <div className="space-y-1">
            {[...Array(buttons.length)].map((_, index) => (
              <div key={index} className="h-7 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {title && (
        <CardHeader className="py-1 px-3 bg-gray-50 rounded-t-lg border-b border-gray-100">
          <CardTitle className="text-xs font-semibold text-gray-700 truncate">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-1.5">
        <div className="space-y-1">
          {buttons.map((btn) => {
            if (typeof btn === "string") {
              const urlFriendlyBtn = btn.toLowerCase().replace(/\s+/g, "-")
              const href = `/dashboard/modules/${urlFriendlyBtn}`
              const isActive = activeButton === urlFriendlyBtn

              return (
                <Link href={href} key={btn}>
                  <Button
                    variant={isActive ? "default" : "outline"}
                    className={`w-full justify-start text-xs h-7 px-2 ${
                      isActive
                        ? "bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      toast.success("Module selected", {
                        description: `Navigating to ${btn}`,
                      })
                    }}
                  >
                    <span className="truncate text-left">{btn}</span>
                  </Button>
                </Link>
              )
            } else {
              const isExpanded = expandedDropdowns.has(btn.label)

              return (
                <Collapsible key={btn.label} open={isExpanded} onOpenChange={() => toggleDropdown(btn.label)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between text-xs h-7 px-2 bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                    >
                      <span className="truncate text-left">{btn.label}</span>
                      {isExpanded ? (
                        <ChevronDown className="w-3 h-3 ml-1 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-3 h-3 ml-1 flex-shrink-0" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-1 ml-2">
                    {btn.items.map((item) => {
                      const routeName = getRouteForItem(item)
                      const href = `/dashboard/modules/${routeName}`
                      const isActive = activeButton === routeName

                      return (
                        <Link href={href} key={item}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            size="sm"
                            className={`w-full justify-start text-xs h-6 px-2 ${
                              isActive
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-600"
                            }`}
                            onClick={() => {
                              toast.success("Sub-module selected", {
                                description: `Navigating to ${item}`,
                              })
                            }}
                          >
                            <span className="truncate text-left">{item}</span>
                          </Button>
                        </Link>
                      )
                    })}
                  </CollapsibleContent>
                </Collapsible>
              )
            }
          })}
        </div>
      </CardContent>
    </Card>
  )
})

const RightSidebar: React.FC<RightSidebarProps> = ({ activeButton }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set())

  // Simulate staggered loading for different sections
  useEffect(() => {
    const loadingSections = ["data-preparation", "interpretation", "gows"]

    // Initial loading delay
    const initialTimer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 800)

    // Staggered section loading
    loadingSections.forEach((section, index) => {
      setTimeout(
        () => {
          setLoadedSections((prev) => new Set([...prev, section]))
        },
        1000 + index * 300,
      ) // Load each section 300ms apart
    })

    return () => {
      clearTimeout(initialTimer)
    }
  }, [])

  const qualityControlButtons: (string | DropdownButton)[] = [
    "TRIM DATA",
    "DEPTH MATCHING",
    "FILL MISSING",
    "SMOOTHING",
    "NORMALIZATION",
    "SPLICING/MERGING",
  ]

  const logInterpretationButtons: (string | DropdownButton)[] = [
    {
      label: "VSH CALCULATION",
      items: ["VSH-GR", "VSH-DN"],
    },
    "POROSITY CALCULATION",
    {
      label: "SW CALCULATION",
      items: ["SW INDONESIA", "SW SIMANDOUX"],
    },
    "WATER RESISTIVITY CALCULATION",
  ]

  const gowsButtons: (string | DropdownButton)[] = [
    {
      label: "RGSA",
      items: ["RGSA", "DGSA", "NGSA"],
    },
    "RGBE-RPBE",
    "AUTO FLUID",
    "RT RO",
    "SWGRAD",
    "DNS-DNSV",
    "GWD",
  ]

  // Full loading skeleton
  if (isInitialLoading) {
    return (
      <aside className="w-52 bg-white border-l border-gray-200 flex flex-col shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-28 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Data Preparation Section Skeleton */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="py-1 px-3 bg-gray-50 rounded-t-lg border-b border-gray-100">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
            </CardHeader>
            <CardContent className="p-1.5">
              <div className="space-y-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-7 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interpretation Section Skeleton */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="py-1 px-3 bg-gray-50 rounded-t-lg border-b border-gray-100">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
            </CardHeader>
            <CardContent className="p-1.5">
              <div className="space-y-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-7 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* GOWS Section Skeleton */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="py-1 px-3 bg-gray-50 rounded-t-lg border-b border-gray-100">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
            </CardHeader>
            <CardContent className="p-1.5">
              <div className="space-y-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-7 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-52 bg-white border-l border-gray-200 flex flex-col shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-100 rounded-lg">
            <Settings className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Module Configuration</h2>
            <p className="text-xs text-gray-500">Select analysis modules</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <ModuleSection
          title="Data Preparation"
          buttons={qualityControlButtons}
          activeButton={activeButton}
          isLoading={!loadedSections.has("data-preparation")}
        />
        <ModuleSection
          title="Interpretation"
          buttons={logInterpretationButtons}
          activeButton={activeButton}
          isLoading={!loadedSections.has("interpretation")}
        />
        <ModuleSection
          title="Gas Oil Water Scanner (GOWS)"
          buttons={gowsButtons}
          activeButton={activeButton}
          isLoading={!loadedSections.has("gows")}
        />
      </div>
    </aside>
  )
}

export default RightSidebar
