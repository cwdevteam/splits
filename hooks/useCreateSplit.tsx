import { SplitV2Client } from '@0xsplits/splits-sdk'
import { baseSepolia } from 'viem/chains'
import {
  useAccount,
  useContractWrite,
  usePublicClient,
  useWalletClient,
  useWriteContract,
} from 'wagmi'
import { pullSplitFactoryAbi } from '../src/components/util/pullSplitFactoryAbi'
import { getRecipientSortedAddressesAndAllocations } from '@0xsplits/splits-sdk/utils'
import { Address, zeroAddress } from 'viem'

const useCreateSplit = () => {
  const { data, writeContract } = useWriteContract()
  const { address } = useAccount()
  console.log('SWEETS data from useWriteContract', data)

  const createSplit = async (args) => {
    console.log('SWEETS ARGS', args)
    const recipients = getRecipientSortedAddressesAndAllocations(
      args.recipients,
    )
    console.log('SWEETS recipients', recipients)

    const pullSplitFactory =
      '0x80f1B766817D04870f115fEBbcCADF8DBF75E017' as Address
    const response = await writeContract({
      account: address,
      chain: baseSepolia,
      address: pullSplitFactory,
      abi: pullSplitFactoryAbi,
      functionName: 'createSplit',
      args: [
        {
          recipients: recipients[0],
          allocations: recipients[1],
          totalAllocation: BigInt(1000000),
          distributionIncentive: 0,
        },
        zeroAddress,
        zeroAddress,
      ],
    })
    console.log('SWEETS response', response)
    return response
  }

  return { createSplit }
}

export default useCreateSplit
