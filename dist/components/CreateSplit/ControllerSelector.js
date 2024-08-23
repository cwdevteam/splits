var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SplitsAvatar from '../util/SplitsAvatar';
import { useAccount } from 'wagmi';
import AddressSelectInput from '../inputs/AddressSelectInput';
import { ADDRESS_ZERO } from '../../constants/addresses';
import { shortenAddress } from '../../utils/address';
export var ControllerSelector = function (_a) {
    var control = _a.control, inputName = _a.inputName, setValue = _a.setValue, setError = _a.setError, chainId = _a.chainId;
    var connectedAddress = useAccount().address;
    var accountDisplayName = connectedAddress && shortenAddress(connectedAddress);
    return (_jsx(AddressSelectInput, { control: control, inputName: inputName, chainId: chainId, options: __spreadArray([
            {
                value: ADDRESS_ZERO,
                display: function () { return _jsx("div", { children: "No controller (immutable)" }); },
            }
        ], (connectedAddress
            ? [
                {
                    value: connectedAddress,
                    display: function () { return (_jsxs("div", { className: "flex w-full flex-grow items-center space-x-2", children: [_jsx(SplitsAvatar, { address: connectedAddress, size: 18 }), _jsx("div", { className: 'flex truncate', children: accountDisplayName }), _jsx("div", { className: "flex-shrink-0 rounded-lg bg-blue-100/50 px-2 text-[80%] text-blue-500 dark:bg-blue-900/50", children: "You" })] })); },
                },
            ]
            : []), true), emptyText: 'No controller (immutable)', setValue: setValue, setError: setError, validationFunc: function () {
            return true;
        }, clearAddressDefaultValue: ADDRESS_ZERO }));
};
