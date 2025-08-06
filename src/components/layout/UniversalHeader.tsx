"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Database, Folder, LayoutDashboard, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/shared/lib/utils"

const navItems = [
   // {
  //   label: 'File Upload',
  //   path: '/file-upload',
  //   icon: Upload,
  //   description: 'Upload files and documents'
  // },
  // {
  //   label: 'Data Input',
  //   path: '/data-input',
  //   icon: Database,
  //   description: 'Import and manage data'
  // },
  {
    label: "Structures",
    path: "/structures",
    icon: Folder,
    description: "Browse data structures",
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    description: "Analytics dashboard",
  },
]

export default function UniversalHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsOpen(false) // Close mobile menu after navigation
  }

  const isActivePath = (path: string) => {
    if (path === "/dashboard") {
      return pathname.startsWith("/dashboard")
    }
    return pathname === path
  }

  const NavButton = ({ item, className = "" }: { item: (typeof navItems)[0]; className?: string }) => {
    const Icon = item.icon
    const isActive = isActivePath(item.path)

    return (
      <Button
        variant="ghost"
        onClick={() => handleNavigation(item.path)}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 h-auto justify-start transition-all duration-200 hover:scale-[1.02]",
          isActive
            ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
          className,
        )}
        title={item.description}
      >
        <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-blue-600" : "text-gray-500")} />
        <span className="font-medium">{item.label}</span>
      </Button>
    )
  }

  return (
    <header className="top-0 left-0 right-0 z-50 w-full border-b bg-white font-sans">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Database className="h-4 w-4" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavButton key={item.path} item={item} />
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-gray-900">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white">
                    <Database className="h-3 w-3" />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => (
                  <NavButton key={item.path} item={item} className="w-full rounded-lg" />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
