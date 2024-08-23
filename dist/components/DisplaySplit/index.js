import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { isLogsPublicClient } from '@0xsplits/splits-sdk/utils';
import { useSplitEarnings, useSplitMetadata, useSplitsClient, } from '@0xsplits/splits-sdk-react';
import { CHAIN_INFO } from '../../constants/chains';
import SplitRecipients from '../DisplaySplit/SplitRecipients';
import SkeletonLoader from '../DisplaySplit/SkeletonLoader';
import SplitBalances from '../DisplaySplit/SplitBalances';
import SplitHeader from '../DisplaySplit/SplitHeader';
import ChainLogo from '../util/ChainLogo';
import ComponentLayout from '../util/ComponentLayout';
var ERC20_TOKEN_LIST = [];
var DisplaySplit = function (_a) {
    var address = _a.address, chainId = _a.chainId, _b = _a.displayBalances, displayBalances = _b === void 0 ? true : _b, _c = _a.displayChain, displayChain = _c === void 0 ? true : _c, _d = _a.width, width = _d === void 0 ? 'md' : _d, _e = _a.theme, theme = _e === void 0 ? 'system' : _e, onSuccess = _a.onSuccess, onError = _a.onError;
    var splitsClient = useSplitsClient();
    var _f = useSplitMetadata(chainId, address), split = _f.splitMetadata, metadataError = _f.error, isLoadingMetadata = _f.isLoading;
    if (!splitsClient.splitV1)
        throw new Error('Split v1 not supported');
    var includeActiveBalances = true;
    var erc20TokenList = splitsClient.splitV1._publicClient
        ? isLogsPublicClient(splitsClient.splitV1._publicClient)
            ? undefined
            : ERC20_TOKEN_LIST
        : ERC20_TOKEN_LIST;
    var _g = useSplitEarnings(chainId, address, includeActiveBalances, erc20TokenList), splitEarnings = _g.splitEarnings, isLoadingEarnings = _g.isLoading, earningsError = _g.error;
    useEffect(function () {
        if (earningsError) {
            // eslint-disable-next-line no-console
            console.error(earningsError);
            onError && onError(earningsError);
        }
        if (metadataError) {
            // eslint-disable-next-line no-console
            console.error(metadataError);
            onError && onError(metadataError);
        }
    }, [earningsError, metadataError, onError]);
    return (_jsx(ComponentLayout, { chainId: chainId, width: width, theme: theme, title: _jsx(SplitHeader, { chainId: chainId, address: address }), corner: displayChain && _jsx(ChainLogo, { chainInfo: CHAIN_INFO[chainId] }), error: metadataError &&
            ((metadataError.name === 'AccountNotFoundError' && {
                title: 'Split not found',
                body: "This account is not a Splits contract on the ".concat(CHAIN_INFO[chainId].label, " network."),
            }) ||
                (metadataError.name === 'InvalidArgumentError' && {
                    title: 'Invalid Address',
                    body: "Address ".concat(address, " is not a valid Ethereum address."),
                })), body: _jsx("div", { className: "flex flex-col text-xs", children: isLoadingMetadata || isLoadingEarnings ? (_jsx(SkeletonLoader, {})) : (_jsxs("div", { className: "space-y-4", children: [_jsx(SplitRecipients, { split: split }), displayBalances && !isLoadingEarnings && (_jsx(SplitBalances, { chainId: chainId, address: address, formattedSplitEarnings: splitEarnings, onSuccess: onSuccess, onError: onError }))] })) }) }));
};
export default DisplaySplit;
