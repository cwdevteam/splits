import { createConfig, http } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'
import { base, baseSepolia } from 'viem/chains'

const wagmiConfig = createConfig({
  ssr: true,
  chains: [base, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'mesa',
      preference: 'smartWalletOnly',
    }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  } as any,
})

export default wagmiConfig
