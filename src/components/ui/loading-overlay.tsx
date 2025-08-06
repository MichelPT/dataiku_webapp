'use client'

import { useLoading } from '@/shared/contexts/LoadingContext'
import { Loader2 } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface LoadingOverlayProps {
  className?: string
  type?: 'page' | 'api' | 'inline'
  message?: string
  children?: React.ReactNode
}

export function LoadingOverlay({ 
  className, 
  type = 'api', 
  message,
  children 
}: LoadingOverlayProps) {
  const { isPageLoading, isApiLoading, apiLoadingMessage } = useLoading()
  
  const isVisible = type === 'page' ? isPageLoading : isApiLoading
  const displayMessage = message || (type === 'api' ? apiLoadingMessage : 'Loading...')

  if (!isVisible) return null

  if (type === 'inline') {
    return (
      <div className={cn(
        "flex items-center justify-center space-x-2 py-8",
        className
      )}>
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        <span className="text-sm text-slate-600">{displayMessage}</span>
      </div>
    )
  }

  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-white/80 backdrop-blur-sm",
      "flex items-center justify-center",
      type === 'page' && "bg-slate-50/90",
      className
    )}>
      <div className="flex flex-col items-center space-y-4 p-8 bg-white rounded-xl shadow-lg border border-slate-200/60">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-slate-200">
            <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute inset-0"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-slate-900">{displayMessage}</p>
          <p className="text-xs text-slate-500">Please wait...</p>
        </div>
        
        {children}
      </div>
    </div>
  )
}

// Komponen untuk inline loading state
export function InlineLoader({ 
  message = "Loading...", 
  size = "sm",
  className 
}: { 
  message?: string
  size?: "xs" | "sm" | "md" | "lg"
  className?: string 
}) {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4", 
    md: "h-5 w-5",
    lg: "h-6 w-6"
  }

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base", 
    lg: "text-lg"
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Loader2 className={cn("animate-spin text-blue-600", sizeClasses[size])} />
      <span className={cn("text-slate-600", textSizes[size])}>{message}</span>
    </div>
  )
}
