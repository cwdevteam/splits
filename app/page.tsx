'use client'

import React from 'react'
import CreateSplit from '../src/components/CreateSplit'
import '../style/global.css'
import Providers from '../providers/Providers'

export default function Page() {
  return (
    <Providers>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1>Mesa Splits</h1>
        <CreateSplit chainId={8453} />
      </div>
    </Providers>
  )
}
