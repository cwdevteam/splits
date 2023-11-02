import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CreateSplit } from '../../src'
import ConnectWallet from '../components/ConnectWallet'
import { SupportedChainId } from '../../src/constants/chains'

const DEFAULT_ARGS = {
  chainId: 1 as SupportedChainId,
}

const meta: Meta<typeof CreateSplit> = {
  title: 'Components/CreateSplit',
  component: CreateSplit,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Create a split contract',
      },
    },
  },
  argTypes: {
    chainId: {
      description: 'Chain ID of a supported network',
    },
  },
  args: DEFAULT_ARGS,
  decorators: [
    (Story, context) => {
      return (
        <ConnectWallet chainId={context.args.chainId}>
          <Story />
        </ConnectWallet>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof CreateSplit>

export const Basic: Story = {}

export const DefaultRecipients: Story = {
  args: {
    defaultRecipients: [
      {
        address: '0xA8b2e53C70743309f8D668B52ea09158008FAf91',
        percentAllocation: 99.0,
      },
      {
        address: '0xEc8Bfc8637247cEe680444BA1E25fA5e151Ba342',
        percentAllocation: 1.0,
      },
    ],
  },
}

export const MultiChain: Story = {
  args: {
    chainId: 5,
    defaultDistributorFee: 0.01,
    defaultDistributorFeeOptions: [0.1, 1, 10],
    defaultController: '0xA8b2e53C70743309f8D668B52ea09158008FAf91',
    defaultRecipients: [
      {
        address: '0xA8b2e53C70743309f8D668B52ea09158008FAf91',
        percentAllocation: 99.0,
      },
      {
        address: '0xEc8Bfc8637247cEe680444BA1E25fA5e151Ba342',
        percentAllocation: 1.0,
      },
    ],
  },
}
