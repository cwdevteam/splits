import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DistributeBalance from './DistributeBalance';
var SplitBalances = function (_a) {
    var chainId = _a.chainId, address = _a.address, formattedSplitEarnings = _a.formattedSplitEarnings, onSuccess = _a.onSuccess, onError = _a.onError;
    var balances = formattedSplitEarnings === null || formattedSplitEarnings === void 0 ? void 0 : formattedSplitEarnings.activeBalances;
    var hasBalances = balances && Object.keys(balances).length > 0;
    return (_jsxs("div", { className: "space-y-1 text-xs", children: [_jsx("div", { className: "font-medium", children: "Balances" }), hasBalances ? (_jsx("div", { children: Object.entries(balances).map(function (_a, idx) {
                    var token = _a[0], balance = _a[1];
                    return (_jsx(DistributeBalance, { chainId: chainId, token: token, balance: balance, address: address, onSuccess: onSuccess, onError: onError }, idx));
                }) })) : (_jsx("div", { className: "rounded-sm bg-gray-50 p-3 text-xs leading-relaxed dark:bg-gray-800", children: "This Split's earnings will show up here once funds have been received." }))] }));
};
export default SplitBalances;
