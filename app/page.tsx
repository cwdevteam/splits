'use client'

import React from 'react'
import CreateSplit from '../src/components/CreateSplit'
import '../style/global.css'
import Providers from '../providers/Providers'

export default function Page() {
  return (
    <Providers>
      <div className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center">
        <h1>Mesa Splits</h1>
        <CreateSplit />
      </div>
    </Providers>
  )
}
