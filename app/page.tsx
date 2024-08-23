'use client'

import React from 'react'
import CreateSplit from '../src/components/CreateSplit'
import { WagmiProvider } from 'wagmi'
import { SplitsProvider } from '@0xsplits/splits-sdk-react'
import config from '../src/utils/wagmi/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../style/global.css'
import LoginButton from '../src/components/CreateSplit/ConnectButton'

const queryClient = new QueryClient()

const splitsConfig = {
  chainId: 1,
  publicClient: (config as any).publicClient,
}

export default function Page() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SplitsProvider config={splitsConfig}>
          <h1>Mesa Splits</h1>
          <LoginButton />
          <CreateSplit chainId={8453} />
        </SplitsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
