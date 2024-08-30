import { useCallback } from 'react'
import { CreateSplitConfig } from '@0xsplits/splits-sdk'
import { useForm, FormProvider } from 'react-hook-form'
import { useAccount, useSwitchChain } from 'wagmi'
import { sum } from 'lodash'
import { CHAIN } from '../../constants/chains'
import { IAddress, Recipient, ICreateSplitForm } from '../../types'
import RecipientSetter from '../CreateSplit/RecipientSetter'
import Tooltip from '../util/Tooltip'
import Button from '../util/Button'
import useCreateSplit from '../../../hooks/useCreateSplit'
import LoginButton from './ConnectButton'
import CheckBadgeIcon from '@heroicons/react/20/solid/CheckBadgeIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/solid/DocumentDuplicateIcon'
import ValidAddressDisplay from '../ValidAddressDisplay'
import copyToClipboard from '../../utils/copyToClipboard'

const CreateSplitForm = ({
  defaultDistributorFee,
  defaultRecipients,
  defaultController,
}: {
  defaultDistributorFee: number
  defaultController: IAddress
  defaultRecipients: Recipient[]
  defaultDistributorFeeOptions: number[]
}) => {
  const {
    createSplit,
    loading: creatingSplit,
    result: split,
  } = useCreateSplit()
  const { switchChainAsync } = useSwitchChain()
  const { isConnected } = useAccount()

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
      await switchChainAsync({ chainId: CHAIN.id })
      const args: CreateSplitConfig = {
        recipients: data.recipients,
        distributorFeePercent: data.distributorFee,
        controller: data.controller,
      }
      await createSplit(args)
    },
    [createSplit, switchChainAsync],
  )

  const recipientAllocationTotal = sum(
    watch('recipients').map((recipient) => recipient.percentAllocation),
  )

  const isFullyAllocated = recipientAllocationTotal === 100

  const isButtonDisabled =
    !isConnected || !isFormValid || !isFullyAllocated || creatingSplit

  return (
    <div className="flex flex-col space-y-8">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <RecipientSetter />
          <div className="my-5 flex flex-col space-y-1 text-center">
            <Tooltip
              isDisabled={isConnected}
              content={!isConnected ? 'Connect wallet' : ''}
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
              <div className="flex w-full items-center justify-center gap-2">
                Split Created Successfully
                <CheckBadgeIcon className="size-4 text-green-600" />
              </div>
              <div className="mx-auto flex items-center justify-center gap-2">
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
