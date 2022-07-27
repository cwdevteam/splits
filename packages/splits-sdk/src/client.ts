import { Interface } from '@ethersproject/abi'
import type { Signer } from '@ethersproject/abstract-signer'
import { isAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import { Contract, Event } from '@ethersproject/contracts'

import SPLIT_MAIN_ARTIFACT_ETHEREUM from './artifacts/splits/ethereum/contracts/SplitMain.sol/SplitMain.json'
import SPLIT_MAIN_ARTIFACT_POLYGON from './artifacts/splits/polygon/contracts/SplitMain.sol/SplitMain.json'
import type { SplitMain as SplitMainEthereumType } from './typechain/ethereum'
import type { SplitMain as SplitMainPolygonType } from './typechain/polygon'
import {
  InvalidDistributorFeePercentError,
  InvalidRecipientsError,
  UnsupportedChainIdError,
} from './errors'
import {
  ETHEREUM_CHAIN_IDS,
  PERCENTAGE_SCALE,
  PERCENT_ALLOCATION_MAX_PRECISION_DECIMALS,
  POLYGON_CHAIN_IDS,
  SPLIT_MAIN_ADDRESS,
} from './constants'

const SPLIT_MAIN_ABI_ETHEREUM = SPLIT_MAIN_ARTIFACT_ETHEREUM.abi
const splitMainInterfaceEthereum = new Interface(SPLIT_MAIN_ABI_ETHEREUM)
const SPLIT_MAIN_ABI_POLYGON = SPLIT_MAIN_ARTIFACT_POLYGON.abi
const splitMainInterfacePolygon = new Interface(SPLIT_MAIN_ABI_POLYGON)

const SplitMainEthereum = new Contract(
  SPLIT_MAIN_ADDRESS,
  splitMainInterfaceEthereum,
) as SplitMainEthereumType
const SplitMainPolygon = new Contract(
  SPLIT_MAIN_ADDRESS,
  splitMainInterfacePolygon,
) as SplitMainPolygonType

type SplitMainType = SplitMainEthereumType | SplitMainPolygonType

export type SplitsClientConfig = {
  chainId: number
  signer: Signer
}

export type SplitRecipient = {
  address: string
  percentAllocation: number
}

export type CreateSplitConfig = {
  recipients: SplitRecipient[]
  distributorFeePercent: number
  controller?: string
}

export type UpdateSplitConfig = {
  splitId: string
  recipients: SplitRecipient[]
  distributorFeePercent: number
}

export type DistributeTokenConfig = {
  splitId: string
  token?: string
  recipients: SplitRecipient[]
  distributorFeePercent: number
  distributorAddress?: string
}

const getRecipientSortedAddressesAndAllocations = (
  recipients: SplitRecipient[],
): [string[], BigNumber[]] => {
  const accounts: string[] = []
  const percentAllocations: BigNumber[] = []

  recipients
    .sort((a, b) => {
      if (a.address.toLowerCase() > b.address.toLowerCase()) return 1
      return -1
    })
    .map((value) => {
      accounts.push(value.address)
      percentAllocations.push(
        BigNumber.from(
          Math.round(PERCENTAGE_SCALE.toNumber() * value.percentAllocation) /
            100,
        ),
      )
    })

  return [accounts, percentAllocations]
}

const getNumDigitsAfterDecimal = (value: number): number => {
  if (Number.isInteger(value)) return 0

  const decimalStr = value.toString().split('.')[1]
  return decimalStr.length
}

const validateRecipients = (recipients: SplitRecipient[]): void => {
  const seenAddresses = new Set<string>([])
  let totalPercentAllocation = 0

  recipients.forEach((recipient) => {
    if (!isAddress(recipient.address))
      throw new InvalidRecipientsError(`Invalid address: ${recipient.address}`)
    if (seenAddresses.has(recipient.address.toLowerCase()))
      throw new InvalidRecipientsError(
        `Address cannot be used for multiple recipients: ${recipient.address}`,
      )

    if (recipient.percentAllocation <= 0 || recipient.percentAllocation >= 100)
      throw new InvalidRecipientsError(
        `Invalid percent allocation: ${recipient.percentAllocation}. Must be between 0 and 100`,
      )
    if (
      getNumDigitsAfterDecimal(recipient.percentAllocation) >
      PERCENT_ALLOCATION_MAX_PRECISION_DECIMALS
    )
      throw new InvalidRecipientsError(
        `Invalid precision on percent allocation: ${recipient.percentAllocation}. Maxiumum allowed precision is ${PERCENT_ALLOCATION_MAX_PRECISION_DECIMALS} decimals`,
      )

    seenAddresses.add(recipient.address.toLowerCase())
    totalPercentAllocation += recipient.percentAllocation
  })

  // Cutoff any decimals beyond the max precision, they may get introduced due
  // to javascript floating point precision
  const factorOfTen = Math.pow(10, PERCENT_ALLOCATION_MAX_PRECISION_DECIMALS)
  totalPercentAllocation =
    Math.round(totalPercentAllocation * factorOfTen) / factorOfTen
  if (totalPercentAllocation !== 100)
    throw new InvalidRecipientsError(
      `Percent allocation must add up to 100. Currently adds up to ${totalPercentAllocation}`,
    )
}

const validateDistributorFeePercent = (distributorFeePercent: number): void => {
  if (distributorFeePercent < 0 || distributorFeePercent > 10)
    throw new InvalidDistributorFeePercentError(distributorFeePercent)
}

export class SplitsClient {
  private readonly signer: Signer
  private readonly splitMain: SplitMainType

  constructor({ chainId, signer }: SplitsClientConfig) {
    this.signer = signer

    if (ETHEREUM_CHAIN_IDS.includes(chainId)) this.splitMain = SplitMainEthereum
    else if (POLYGON_CHAIN_IDS.includes(chainId))
      this.splitMain = SplitMainPolygon
    else throw new UnsupportedChainIdError(chainId)
  }

  async createSplit({
    recipients,
    distributorFeePercent,
    controller = AddressZero,
  }: CreateSplitConfig): Promise<{
    splitId: string
    event: Event
  }> {
    validateRecipients(recipients)
    validateDistributorFeePercent(distributorFeePercent)

    const [accounts, percentAllocations] =
      getRecipientSortedAddressesAndAllocations(recipients)
    const distributorFee = BigNumber.from(
      (PERCENTAGE_SCALE.toNumber() * distributorFeePercent) / 100,
    )

    const createSplitTx = await this.splitMain
      .connect(this.signer)
      .createSplit(accounts, percentAllocations, distributorFee, controller)
    const createSplitReceipt = await createSplitTx.wait()
    if (createSplitReceipt.status === 1) {
      const cse = createSplitReceipt.events?.filter(
        (e) =>
          e.eventSignature ===
          this.splitMain.interface.getEvent('CreateSplit').format(),
      )?.[0]
      if (cse && cse.args)
        return {
          splitId: cse.args.split,
          event: cse,
        }
    }

    throw new Error('Failed to complete transaction')
  }

  async updateSplit({
    splitId,
    recipients,
    distributorFeePercent,
  }: UpdateSplitConfig): Promise<{
    event: Event
  }> {
    validateRecipients(recipients)
    validateDistributorFeePercent(distributorFeePercent)

    const [accounts, percentAllocations] =
      getRecipientSortedAddressesAndAllocations(recipients)
    const distributorFee = BigNumber.from(
      (PERCENTAGE_SCALE.toNumber() * distributorFeePercent) / 100,
    )

    const updateSplitTx = await this.splitMain
      .connect(this.signer)
      .updateSplit(splitId, accounts, percentAllocations, distributorFee)
    const updateSplitReceipt = await updateSplitTx.wait()
    if (updateSplitReceipt.status === 1) {
      const cse = updateSplitReceipt.events?.filter(
        (e) =>
          e.eventSignature ===
          this.splitMain.interface.getEvent('UpdateSplit').format(),
      )?.[0]
      if (cse)
        return {
          event: cse,
        }
    }

    throw new Error('Failed to complete transaction')
  }

  async distributeToken({
    splitId,
    token = AddressZero,
    recipients,
    distributorFeePercent,
    distributorAddress,
  }: DistributeTokenConfig): Promise<{
    event: Event
  }> {
    const [accounts, percentAllocations] =
      getRecipientSortedAddressesAndAllocations(recipients)
    const distributorFee = BigNumber.from(
      (PERCENTAGE_SCALE.toNumber() * distributorFeePercent) / 100,
    )

    const distributorPayoutAddress = distributorAddress
      ? distributorAddress
      : await this.signer.getAddress()

    const distributeTokenTx = await (token === AddressZero
      ? this.splitMain
          .connect(this.signer)
          .distributeETH(
            splitId,
            accounts,
            percentAllocations,
            distributorFee,
            distributorPayoutAddress,
          )
      : this.splitMain
          .connect(this.signer)
          .distributeERC20(
            splitId,
            token,
            accounts,
            percentAllocations,
            distributorFee,
            distributorPayoutAddress,
          ))
    const distributeTokenReceipt = await distributeTokenTx.wait()
    if (distributeTokenReceipt.status === 1) {
      const dte = distributeTokenReceipt.events?.filter(
        (e) =>
          e.eventSignature ===
          (token === AddressZero
            ? this.splitMain.interface.getEvent('DistributeETH').format()
            : this.splitMain.interface.getEvent('DistributeERC20').format()),
      )?.[0]

      if (dte)
        return {
          event: dte,
        }
    }

    throw new Error('Failed to complete transaction')
  }
}
