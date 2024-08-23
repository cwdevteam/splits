var _a;
import { mainnet, goerli, polygon, polygonMumbai, optimismGoerli, optimism, arbitrumGoerli, arbitrum, gnosis, fantom, bsc, avalanche, aurora, base, zora, zoraTestnet, } from 'viem/chains';
export var SupportedChainsList = [
    mainnet,
    goerli,
    polygon,
    polygonMumbai,
    optimism,
    optimismGoerli,
    arbitrum,
    arbitrumGoerli,
    gnosis,
    fantom,
    avalanche,
    bsc,
    aurora,
    zora,
    zoraTestnet,
    base,
];
export var CHAIN_INFO = (_a = {},
    _a[mainnet.id] = {
        label: 'Ethereum',
        logoUrl: '/networks/ethereum_logo.svg',
        nativeCurrency: {
            symbol: 'ETH',
        },
    },
    _a[goerli.id] = {
        label: 'Goerli',
        logoUrl: '/networks/ethereum_logo.svg',
        nativeCurrency: {
            symbol: 'ETH',
        },
    },
    _a[polygon.id] = {
        label: 'Polygon',
        logoUrl: '/networks/polygon_logo.svg',
        nativeCurrency: {
            symbol: 'MATIC',
        },
    },
    _a[polygonMumbai.id] = {
        label: 'Polygon Mumbai',
        logoUrl: '/networks/polygon_logo.svg',
        nativeCurrency: {
            symbol: 'MATIC',
        },
    },
    _a[optimism.id] = {
        label: 'Optimism',
        logoUrl: '/networks/optimism_logo.svg',
        nativeCurrency: {
            symbol: 'ETH',
        },
    },
    _a[optimismGoerli.id] = {
        label: 'Optimism Goerli',
        logoUrl: '/networks/optimism_logo.svg',
        nativeCurrency: {
            symbol: 'ETH',
        },
    },
    _a[arbitrum.id] = {
        label: 'Arbitrum',
        logoUrl: '/networks/arbitrum_logo.svg',
        nativeCurrency: {
            symbol: 'ETH',
        },
    },
    _a[arbitrumGoerli.id] = {
        label: 'Arbitrum Goerli',
        logoUrl: '/networks/arbitrum_logo.svg',
        nativeCurrency: {
            symbol: 'ETH',
        },
    },
    _a[gnosis.id] = {
        label: 'Gnosis',
        logoUrl: '/networks/gnosis_logo.svg',
        nativeCurrency: {
            symbol: 'xDai',
        },
    },
    _a[fantom.id] = {
        label: 'Fantom',
        logoUrl: '/networks/fantom_logo.svg',
        nativeCurrency: {
            symbol: 'FTM',
        },
    },
    _a[avalanche.id] = {
        label: 'Avalanche',
        logoUrl: '/networks/avalanche_logo.svg',
        nativeCurrency: {
            symbol: 'AVAX',
        },
    },
    _a[bsc.id] = {
        label: 'BSC',
        logoUrl: '/networks/bsc_logo.svg',
        nativeCurrency: {
            symbol: 'BNB',
        },
    },
    _a[aurora.id] = {
        label: 'Aurora',
        logoUrl: '/networks/aurora_logo.svg',
        nativeCurrency: {
            symbol: 'ETH',
        },
    },
    _a[zora.id] = {
        label: 'Zora',
        logoUrl: '/networks/zora_logo.svg',
        nativeCurrency: {
            symbol: 'ETH',
        },
    },
    _a[zoraTestnet.id] = {
        label: 'Zora Goerli',
        logoUrl: '/networks/zora_logo.svg',
        nativeCurrency: {
            symbol: 'ETH',
        },
    },
    _a[base.id] = {
        label: 'Base',
        logoUrl: '/networks/base_logo.svg',
        nativeCurrency: {
            symbol: 'ETH',
        },
    },
    _a);
