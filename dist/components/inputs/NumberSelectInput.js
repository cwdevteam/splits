import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { useWatch, } from 'react-hook-form';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
var NumberSelectInput = function (_a) {
    var control = _a.control, inputName = _a.inputName, defaultVal = _a.defaultVal, options = _a.options, setValue = _a.setValue, placeholder = _a.placeholder, decimalScale = _a.decimalScale, suffix = _a.suffix, minVal = _a.minVal, maxVal = _a.maxVal, _b = _a.isDisabled, isDisabled = _b === void 0 ? false : _b, _c = _a.hideSelectedValue, hideSelectedValue = _c === void 0 ? false : _c, secondaryDisplay = _a.secondaryDisplay;
    var inputVal = useWatch({
        control: control,
        name: inputName,
    });
    var currentValInList = options.filter(function (option) { return option.value === inputVal; }).length > 0;
    var _d = useState(!currentValInList), showCustom = _d[0], setShowCustom = _d[1];
    useEffect(function () {
        if (!currentValInList)
            setShowCustom(true);
    }, [currentValInList]);
    var clearNumber = useCallback(function () {
        var typedValue = defaultVal;
        setValue(inputName, typedValue);
        setShowCustom(false);
    }, [defaultVal, inputName, setValue]);
    var selectNumber = function (value) {
        if (value === 'custom') {
            setShowCustom(true);
        }
        else {
            var typedValue = parseFloat(value);
            setValue(inputName, typedValue);
        }
    };
    if (showCustom)
        return (_jsx(NumberInput, { control: control, inputName: inputName, placeholder: placeholder, decimalScale: decimalScale, suffix: suffix, minVal: minVal, maxVal: maxVal, onClearInput: clearNumber, autoFocus: true, secondaryDisplay: secondaryDisplay }));
    return (_jsx(SelectInput, { selectedOption: "".concat(inputVal), emptyText: '', options: options
            .map(function (option) {
            return {
                value: "".concat(option.value),
                display: option.display,
            };
        })
            .concat([
            {
                value: 'custom',
                display: function () { return _jsx("div", { children: "Custom" }); },
            },
        ]), selectValue: selectNumber, hideSelectedValue: hideSelectedValue, isDisabled: isDisabled }));
};
export default NumberSelectInput;
