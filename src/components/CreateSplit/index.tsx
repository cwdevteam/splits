'use client'

import { RequestError } from '@0xsplits/splits-sdk-react/dist/types'
import CreateSplitForm from '../CreateSplit/CreateSplitForm'
import { ADDRESS_ZERO } from '../../constants/addresses'
import ComponentLayout from '../util/ComponentLayout'
import { IAddress, Recipient } from '../../types'
import {
  DEFAULT_DISTRIBUTOR_FEE,
  DEFAULT_DISTRIBUTOR_FEE_OPTIONS,
  DEFAULT_RECIPIENTS,
} from '../../constants/splits'
import { Log } from 'viem'

export interface ICreateSplitProps {
  defaultDistributorFee?: number
  defaultController?: IAddress
  defaultRecipients?: Recipient[]
  defaultDistributorFeeOptions?: number[]
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  theme?: 'light' | 'dark' | 'system'
  displayChain?: boolean
  onSuccess?: (events: Log[]) => void
  onError?: (error: RequestError) => void
}

const CreateSplit = ({
  defaultDistributorFee = DEFAULT_DISTRIBUTOR_FEE,
  defaultController = ADDRESS_ZERO,
  defaultRecipients = DEFAULT_RECIPIENTS,
  defaultDistributorFeeOptions = DEFAULT_DISTRIBUTOR_FEE_OPTIONS,
  width = 'lg',
  theme = 'system',
  displayChain = true,
  onSuccess,
}: ICreateSplitProps) => {
  return (
    <ComponentLayout width={width} theme={theme} title={'New Split contract'}>
      <CreateSplitForm
        defaultDistributorFee={defaultDistributorFee}
        defaultController={defaultController}
        defaultRecipients={defaultRecipients}
        defaultDistributorFeeOptions={defaultDistributorFeeOptions}
        onSuccess={onSuccess}
      />
    </ComponentLayout>
  )
}

export default CreateSplit
