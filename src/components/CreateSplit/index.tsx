'use client'

import CreateSplitForm from '../CreateSplit/CreateSplitForm'
import { ADDRESS_ZERO } from '../../constants/addresses'
import ComponentLayout from '../util/ComponentLayout'
import { IAddress, Recipient } from '../../types'
import {
  DEFAULT_DISTRIBUTOR_FEE,
  DEFAULT_DISTRIBUTOR_FEE_OPTIONS,
  DEFAULT_RECIPIENTS,
} from '../../constants/splits'

export interface ICreateSplitProps {
  defaultDistributorFee?: number
  defaultController?: IAddress
  defaultRecipients?: Recipient[]
  defaultDistributorFeeOptions?: number[]
  theme?: 'light' | 'dark' | 'system'
}

const CreateSplit = ({
  defaultDistributorFee = DEFAULT_DISTRIBUTOR_FEE,
  defaultController = ADDRESS_ZERO,
  defaultRecipients = DEFAULT_RECIPIENTS,
  defaultDistributorFeeOptions = DEFAULT_DISTRIBUTOR_FEE_OPTIONS,
  theme = 'system',
}: ICreateSplitProps) => {
  return (
    <ComponentLayout theme={theme}>
      <CreateSplitForm
        defaultDistributorFee={defaultDistributorFee}
        defaultController={defaultController}
        defaultRecipients={defaultRecipients}
        defaultDistributorFeeOptions={defaultDistributorFeeOptions}
      />
    </ComponentLayout>
  )
}

export default CreateSplit
