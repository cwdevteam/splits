import { XMarkIcon } from '@heroicons/react/20/solid'
import { MiniButton } from './util/Button'
import SplitsAvatar from './util/SplitsAvatar'
import { shortenAddress, shortenENS } from '../utils/address'
import { IAddress } from '../types'

export default function ValidAddressDisplay({
  address,
  ens,
  onClearInput,
  validAddressDisplay,
}: {
  address: IAddress
  ens?: string
  onClearInput?: () => void
  validAddressDisplay?: (address: string) => JSX.Element
}) {
  return (
    <div className="flex w-full">
      <div className="flex w-full grow items-center space-x-1.5 p-2">
        {validAddressDisplay ? (
          validAddressDisplay(address)
        ) : (
          <>
            <SplitsAvatar
              address={address}
              size={18}
              className={'shrink-0'}
            />
            {ens ? (
              <div className={'flex'}>{shortenENS(ens)}</div>
            ) : (
              <div className={'flex'}>{shortenAddress(address)}</div>
            )}
          </>
        )}
      </div>
      {onClearInput && (
        <MiniButton
          type="button"
          compact
          onClick={onClearInput}
          eventName={'clearedTokenToBeneficiary'}
        >
          <XMarkIcon className="size-4" />
        </MiniButton>
      )}
    </div>
  )
}
