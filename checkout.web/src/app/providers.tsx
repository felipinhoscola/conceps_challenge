'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'

import { QueryClient, } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}><ChakraProvider>{children}</ChakraProvider></QueryClientProvider>
}