'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import config from '../src/utils/wagmi/config'
import { WagmiProvider } from 'wagmi'
import { SplitsProvider } from '@0xsplits/splits-sdk-react'
import { ReactNode } from 'react'

const queryClient = new QueryClient()

const splitsConfig = {
  chainId: 1,
  publicClient: (config as any).publicClient,
}

const Providers = ({ children }: { children: ReactNode }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <SplitsProvider config={splitsConfig}>{children}</SplitsProvider>
    </QueryClientProvider>
  </WagmiProvider>
)

export default Providers
