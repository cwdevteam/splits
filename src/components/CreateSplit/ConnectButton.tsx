'use client'

import Button from '../util/Button'
import useConnectWallet from '../../../hooks/useConnectWallet'

const LoginButton = () => {
  const { connectWallet } = useConnectWallet()

  return (
    <div>
      <Button onClick={connectWallet}>Connect</Button>
    </div>
  )
}

export default LoginButton
