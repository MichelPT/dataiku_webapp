'use client'

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  Menu, 
  Home, 
  Upload, 
  Database, 
  BarChart3, 
  Settings, 
  ChevronDown,
  FileText,
  Activity,
  TrendingUp,
  Layers,
  Target,
  Zap
} from "lucide-react"
import { useIsMobile } from "@/shared/hooks/use-mobile"

interface NavItem {
  title: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home
  },
  {
    title: "Data Management",
    icon: Database,
    children: [
      { title: "File Upload", href: "/file-upload", icon: Upload },
      { title: "Data Input", href: "/data-input", icon: FileText },
      { title: "Structures", href: "/structures", icon: Layers }
    ]
  },
  {
    title: "Quality Control",
    icon: Activity,
    children: [
      { title: "QC Dashboard", href: "/dashboard/qc-control", icon: Target },
      { title: "Data Validation", href: "/dashboard/modules/quality-control", icon: Zap }
    ]
  },
  {
    title: "Analysis Modules",
    icon: BarChart3,
    children: [
      { title: "Crossplot", href: "/dashboard/modules/crossplot", icon: TrendingUp },
      { title: "Histogram", href: "/dashboard/modules/histogram", icon: BarChart3 },
      { title: "SWORAD", href: "/dashboard/modules/sworad", icon: Activity },
      { title: "VSH Calculation", href: "/dashboard/modules/vsh-calculation", icon: Layers },
      { title: "Porosity", href: "/dashboard/modules/porosity", icon: Target },
      { title: "Water Resistivity", href: "/dashboard/modules/water-resistivity-calculation", icon: Zap }
    ]
  },
  {
    title: "Data Processing",
    icon: Settings,
    children: [
      { title: "Trim Data", href: "/dashboard/modules/trim-data", icon: FileText },
      { title: "Fill Missing", href: "/dashboard/modules/fill-missing", icon: Upload },
      { title: "Normalization", href: "/dashboard/modules/normalization", icon: TrendingUp },
      { title: "Smoothing", href: "/dashboard/modules/smoothing", icon: Activity }
    ]
  }
]

interface SidebarProps {
  className?: string
}

function NavItems({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const toggleItem = (title: string) => {
    setOpenItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  React.useEffect(() => {
    // Auto-expand parent if child is active
    items.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => child.href === pathname)
        if (hasActiveChild && !openItems.includes(item.title)) {
          setOpenItems(prev => [...prev, item.title])
        }
      }
    })
  }, [pathname, items, openItems])

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const isActive = item.href === pathname
        const hasChildren = item.children && item.children.length > 0
        const isOpen = openItems.includes(item.title)
        
        if (hasChildren) {
          return (
            <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleItem(item.title)}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left font-normal hover:bg-slate-100/80 hover:text-slate-900",
                    "transition-all duration-200 group"
                  )}
                >
                  {item.icon && (
                    <item.icon className="mr-3 h-4 w-4 text-slate-500 group-hover:text-slate-700" />
                  )}
                  <span className="flex-1">{item.title}</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-slate-400 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 ml-4 mt-1">
                {item.children?.map((child) => {
                  const isChildActive = child.href === pathname
                  return (
                    <Button
                      key={child.title}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-left font-normal text-sm",
                        "hover:bg-slate-100/80 hover:text-slate-900 transition-all duration-200",
                        isChildActive && "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700 border-r-2 border-blue-500"
                      )}
                      asChild
                    >
                      <Link href={child.href!}>
                        {child.icon && (
                          <child.icon className={cn(
                            "mr-3 h-3 w-3",
                            isChildActive ? "text-blue-600" : "text-slate-400"
                          )} />
                        )}
                        {child.title}
                      </Link>
                    </Button>
                  )
                })}
              </CollapsibleContent>
            </Collapsible>
          )
        }

        return (
          <Button
            key={item.title}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal",
              "hover:bg-slate-100/80 hover:text-slate-900 transition-all duration-200",
              isActive && "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700 border-r-2 border-blue-500"
            )}
            asChild
          >
            <Link href={item.href!}>
              {item.icon && (
                <item.icon className={cn(
                  "mr-3 h-4 w-4",
                  isActive ? "text-blue-600" : "text-slate-500"
                )} />
              )}
              {item.title}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}

function SidebarContent() {
  return (
    <div className="flex h-full flex-col bg-white/80 backdrop-blur-sm border-r border-slate-200/60">
      {/* Header */}
      <div className="border-b border-slate-200/60 p-6">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <Database className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Dataiku</h2>
            <p className="text-xs text-slate-500">Petroleum Analytics</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <NavItems items={navigationItems} />
      </div>
      
      {/* Footer */}
      <div className="border-t border-slate-200/60 p-4">
        <div className="flex items-center space-x-3 text-xs text-slate-500">
          <Settings className="h-4 w-4" />
          <span>v1.0.0</span>
        </div>
      </div>
    </div>
  )
}

export function AppSidebar({ className }: SidebarProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className={cn("w-64 border-r", className)}>
      <SidebarContent />
    </div>
  )
}
