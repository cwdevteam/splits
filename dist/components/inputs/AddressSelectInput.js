import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useWatch, } from 'react-hook-form';
import AddressInput from './AddressInput';
import SelectInput from './SelectInput';
var AddressSelectInput = function (_a) {
    var control = _a.control, inputName = _a.inputName, options = _a.options, emptyText = _a.emptyText, setValue = _a.setValue, setError = _a.setError, validationFunc = _a.validationFunc, validAddressDisplay = _a.validAddressDisplay, _b = _a.clearAddressDefaultValue, clearAddressDefaultValue = _b === void 0 ? '' : _b, _c = _a.isDisabled, isDisabled = _c === void 0 ? false : _c, chainId = _a.chainId;
    var inputVal = useWatch({
        control: control,
        name: inputName,
    });
    var currentValInList = options.filter(function (option) { return option.value === inputVal; }).length > 0;
    var defaultInputBox = !currentValInList && inputVal;
    var _d = useState(defaultInputBox ? 'address' : inputVal), selectedAddress = _d[0], setSelectedAddress = _d[1];
    useEffect(function () {
        if (selectedAddress === 'address')
            return;
        if (selectedAddress !== inputVal) {
            var currentValInList_1 = options.filter(function (option) { return option.value === inputVal; }).length > 0;
            if (currentValInList_1)
                setSelectedAddress(inputVal);
            else
                setSelectedAddress('address');
        }
    }, [options, inputVal, selectedAddress]);
    var clearAddress = function () {
        setSelectedAddress(clearAddressDefaultValue);
        var typedAddress = clearAddressDefaultValue;
        setValue(inputName, typedAddress);
    };
    var selectAddress = function (value) {
        setSelectedAddress(value);
        var valueToSet = value === 'address' ? '' : value;
        var typedAddress = valueToSet;
        setValue(inputName, typedAddress);
    };
    if (selectedAddress === 'address')
        return (_jsx(AddressInput, { chainId: chainId, control: control, inputName: inputName, setValue: setValue, setError: setError, placeholder: 'Enter address', validationFunc: validationFunc, onClearInput: clearAddress, autoFocus: true, validAddressDisplay: validAddressDisplay }));
    return (_jsx(SelectInput, { selectedOption: selectedAddress, emptyText: emptyText, options: options.concat([
            {
                value: 'address',
                display: function () { return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(MagnifyingGlassIcon, { className: "mx-0.5 h-4 w-4" }), _jsx("div", { children: "Enter address" })] })); },
            },
        ]), selectValue: selectAddress, isDisabled: isDisabled }));
};
export default AddressSelectInput;
