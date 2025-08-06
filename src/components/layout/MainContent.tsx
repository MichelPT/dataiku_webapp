"use client"

import type React from "react"

import { memo } from "react"

interface MainContentProps {
  children: React.ReactNode
}

export const MainContent = memo(function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 relative overflow-y-auto bg-gray-100 p-4 h-screen">
        {children}
    </main>
  )
})
