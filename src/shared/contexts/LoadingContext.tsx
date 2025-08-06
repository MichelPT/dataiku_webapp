'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface LoadingContextType {
  isPageLoading: boolean
  isApiLoading: boolean
  apiLoadingMessage: string
  setPageLoading: (loading: boolean) => void
  setApiLoading: (loading: boolean, message?: string) => void
  withPageLoading: <T>(fn: () => Promise<T>) => Promise<T>
  withApiLoading: <T>(fn: () => Promise<T>, message?: string) => Promise<T>
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isPageLoading, setPageLoading] = useState(false)
  const [isApiLoading, setIsApiLoadingState] = useState(false)
  const [apiLoadingMessage, setApiLoadingMessage] = useState('')

  const setApiLoading = useCallback((loading: boolean, message = 'Loading...') => {
    setIsApiLoadingState(loading)
    setApiLoadingMessage(message)
  }, [])

  const withPageLoading = useCallback(async <T,>(fn: () => Promise<T>): Promise<T> => {
    try {
      setPageLoading(true)
      const result = await fn()
      // Reduced delay for better performance
      await new Promise(resolve => setTimeout(resolve, 100))
      return result
    } finally {
      setPageLoading(false)
    }
  }, [])

  const withApiLoading = useCallback(async <T,>(
    fn: () => Promise<T>, 
    message = 'Loading data...'
  ): Promise<T> => {
    try {
      setApiLoading(true, message)
      // Execute immediately for fastest performance
      return await fn()
    } finally {
      // Minimal delay to prevent flashing
      setTimeout(() => setApiLoading(false), 50)
    }
  }, [setApiLoading])

  return (
    <LoadingContext.Provider value={{
      isPageLoading,
      isApiLoading,
      apiLoadingMessage,
      setPageLoading,
      setApiLoading,
      withPageLoading,
      withApiLoading
    }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
