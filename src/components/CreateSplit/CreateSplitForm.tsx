import { useCallback } from 'react'
import { CreateSplitConfig } from '@0xsplits/splits-sdk'
import { useForm, FormProvider } from 'react-hook-form'
import { useAccount, useSwitchChain } from 'wagmi'
import { sum } from 'lodash'
import { CHAIN_INFO, SupportedChainId } from '../../constants/chains'
import { IAddress, Recipient, ICreateSplitForm } from '../../types'
import RecipientSetter from '../CreateSplit/RecipientSetter'
import Tooltip from '../util/Tooltip'
import Button from '../util/Button'
import { Log } from 'viem'
import { baseSepolia } from 'viem/chains'
import useCreateSplit from '../../../hooks/useCreateSplit'
import LoginButton from './ConnectButton'
import CheckBadgeIcon from '@heroicons/react/20/solid/CheckBadgeIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/solid/DocumentDuplicateIcon'
import ValidAddressDisplay from '../ValidAddressDisplay'
import copyToClipboard from '../../utils/copyToClipboard'

const CreateSplitForm = ({
  chainId,
  defaultDistributorFee,
  defaultRecipients,
  defaultController,
  onSuccess,
}: {
  chainId: SupportedChainId
  defaultDistributorFee: number
  defaultController: IAddress
  defaultRecipients: Recipient[]
  defaultDistributorFeeOptions: number[]
  onSuccess?: (events: Log[]) => void
}) => {
  const {
    createSplit,
    loading: creatingSplit,
    result: split,
  } = useCreateSplit()
  const { switchChain } = useSwitchChain()
  const { isConnected, chain } = useAccount()

  const form = useForm<ICreateSplitForm>({
    mode: 'onChange',
    defaultValues: {
      recipients: defaultRecipients,
      controller: defaultController,
      distributorFee: defaultDistributorFee,
    },
  })

  const {
    handleSubmit,
    watch,
    formState: { isValid: isFormValid },
  } = form

  const onSubmit = useCallback(
    async (data: ICreateSplitForm) => {
      await switchChain({ chainId: baseSepolia.id })
      console.log('SWEETS CREATING SPLIT')
      const args: CreateSplitConfig = {
        recipients: data.recipients,
        distributorFeePercent: data.distributorFee,
        controller: data.controller,
      }
      console.log('SWEETS args', args)
      await createSplit(args)
    },
    [createSplit, onSuccess],
  )

  const recipientAllocationTotal = sum(
    watch('recipients').map((recipient) => recipient.percentAllocation),
  )

  const isFullyAllocated = recipientAllocationTotal === 100
  const isWrongChain = chain && chainId !== chain.id
  const isButtonDisabled =
    !isConnected || !isFormValid || !isFullyAllocated || creatingSplit

  return (
    <div className="space-y-8 flex flex-col">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <RecipientSetter chainId={chainId} />
          <div className="my-5 flex flex-col space-y-1 text-center">
            <Tooltip
              isDisabled={isConnected && !isWrongChain}
              content={
                isWrongChain
                  ? `Switch to ${CHAIN_INFO[chainId].label} to distribute funds`
                  : !isConnected
                  ? 'Connect wallet'
                  : ''
              }
            >
              {isConnected ? (
                <Button
                  type="submit"
                  isDisabled={isButtonDisabled}
                  isLoading={creatingSplit}
                >
                  Create Split
                </Button>
              ) : (
                <LoginButton />
              )}
            </Tooltip>
          </div>
        </form>
        {split && (
          <>
            <hr />
            <div className="flex flex-col gap-2">
              <div className="w-full flex justify-center items-center gap-2">
                Split Created Successfully
                <CheckBadgeIcon className="size-4 text-green-600" />
              </div>
              <div className="mx-auto flex justify-center items-center gap-2">
                <ValidAddressDisplay address={split} />
                <button onClick={() => copyToClipboard(split)}>
                  <DocumentDuplicateIcon className="size-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </FormProvider>
    </div>
  )
}

export default CreateSplitForm
