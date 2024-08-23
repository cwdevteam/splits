import { CHAIN_INFO } from '../constants/chains';
import { PERCENTAGE_SCALE } from '../constants/splits';
import { formatUnits } from 'viem';
export var displayPercentage = function (percentage, decimals, isScaled) {
    if (decimals === void 0) { decimals = 1; }
    if (isScaled === void 0) { isScaled = true; }
    return ((100 * percentage) / (isScaled ? PERCENTAGE_SCALE : 1)).toFixed(decimals) +
        '%';
};
export var displayBigNumber = function (amount, displayDecimals, tokenDecimals) {
    if (displayDecimals === void 0) { displayDecimals = 3; }
    if (tokenDecimals === void 0) { tokenDecimals = 18; }
    return parseFloat(formatUnits(amount, tokenDecimals)).toLocaleString(undefined, {
        minimumFractionDigits: displayDecimals,
        maximumFractionDigits: displayDecimals,
    });
};
export var getNativeTokenSymbol = function (chainId) {
    if (!chainId)
        return 'ETH';
    return CHAIN_INFO[chainId].nativeCurrency.symbol;
};
