'use client'

import React from 'react'
import CreateSplit from '../src/components/CreateSplit'
import '../style/global.css'
import Providers from '../providers/Providers'
import { base, baseSepolia } from 'viem/chains'

const chain = process.env.NEXT_PUBLIC_TESTNET ? baseSepolia : base

export default function Page() {
  return (
    <Providers>
      <div className="flex flex-col justify-center items-center h-screen max-w-lg mx-auto">
        <h1>Mesa Splits</h1>
        <CreateSplit chainId={chain.id} width="full" />
      </div>
    </Providers>
  )
}
