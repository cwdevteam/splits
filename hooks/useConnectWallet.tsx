import { useAccount, useConnect } from 'wagmi'

const useConnectWallet = () => {
  const { address } = useAccount()

  const { connectors, connect } = useConnect()
  const connector = connectors[0]
  console.log('SWEETS address', address)
  console.log('SWEETS connector', connector)

  const connectWallet = () => connect({ connector })

  return {
    connectWallet,
  }
}

export default useConnectWallet
