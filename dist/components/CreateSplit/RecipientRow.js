import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useFormContext } from 'react-hook-form';
import { isAddress } from 'viem';
import AddressInput from '../inputs/AddressInput';
import { SecondaryButton } from '../util/Button';
import NumberInput from '../inputs/NumberInput';
export var RecipientRow = function (_a) {
    var index = _a.index, onRemove = _a.onRemove, chainId = _a.chainId;
    var _b = useFormContext(), control = _b.control, getValues = _b.getValues, setValue = _b.setValue, setError = _b.setError;
    var isAddressValid = function () {
        var address = getValues("recipients.".concat(index, ".address"));
        var otherRecipients = getValues('recipients').filter(function (_, i) { return i !== index; });
        var isDuplicate = otherRecipients.some(function (r) { return r.address.toLowerCase() === address.toLowerCase(); });
        if (isDuplicate)
            return 'Address in use';
        return isAddress(address) || 'Invalid address';
    };
    return (_jsx("fieldset", { children: _jsxs("div", { className: 'flex items-stretch space-x-3', children: [_jsx(AddressInput, { chainId: chainId, control: control, inputName: "recipients.".concat(index, ".address"), placeholder: "Enter address", setValue: setValue, setError: setError, validationFunc: isAddressValid }), _jsx("div", { className: "w-1/3", children: _jsx(NumberInput, { inputName: "recipients.".concat(index, ".percentAllocation"), control: control, maxVal: 99.9999, minVal: 0.0001, decimalScale: 4, placeholder: '0.00%', suffix: "%" }) }), _jsx(SecondaryButton, { compact: true, onClick: onRemove, className: "border-gray-200 transition hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500", children: _jsx(XMarkIcon, { className: "w-4" }) })] }) }));
};
