'use client'

import React from 'react'
import CreateSplit from '../src/components/CreateSplit'
import '../style/global.css'
import Providers from '../providers/Providers'
import { CHAIN } from '../src/constants/chains'

export default function Page() {
  return (
    <Providers>
      <div className="flex flex-col justify-center items-center h-screen max-w-lg mx-auto">
        <h1>Mesa Splits</h1>
        <CreateSplit chainId={CHAIN.id} width="full" />
      </div>
    </Providers>
  )
}
