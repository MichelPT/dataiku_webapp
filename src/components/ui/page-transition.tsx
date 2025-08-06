'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLoading } from '@/shared/contexts/LoadingContext'
import { LoadingOverlay } from '@/components/ui/loading-overlay'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { setPageLoading } = useLoading()
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setPageLoading(true)
    
    // Simulate page loading time
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setPageLoading(false)
    }, 500) // 500ms loading untuk smooth transition

    return () => clearTimeout(timer)
  }, [pathname, children, setPageLoading])

  return (
    <>
      <LoadingOverlay type="page" message="Loading page..." />
      {displayChildren}
    </>
  )
}
