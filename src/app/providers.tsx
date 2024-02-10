'use client'

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  children?: React.ReactNode
}

interface AxiosError extends Error {
  response?: {
    data?: {
      message?: string
    }
  }
}

export const AppProviders = ({ children }: Props) => {
  const mutationCache = new MutationCache({
    onError: (error) => {
      const axiosError = error as AxiosError
      if (axiosError) {
        toast.error(
          `Something went wrong: ${axiosError?.response?.data?.message}`
        )
      }
    },
  })

  const queryCache = new QueryCache({
    onError: (error) => {
      const axiosError = error as AxiosError
      if (axiosError) {
        toast.error(
          `Something went wrong: ${axiosError?.response?.data?.message}`
        )
      }
    },
  })

  const [queryClient] = useState(
    () => new QueryClient({ mutationCache, queryCache })
  )

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
