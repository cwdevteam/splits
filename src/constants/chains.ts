import { base, baseSepolia } from 'viem/chains'

export const CHAIN = process.env.NEXT_PUBLIC_TESTNET ? baseSepolia : base
