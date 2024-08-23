var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Controller, useFormState, } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { ErrorMessage, } from '@hookform/error-message';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { MiniButton } from '../util/Button';
import { AddressInputMessage } from './AddressInput';
var NumberInput = function (_a) {
    var control = _a.control, inputName = _a.inputName, placeholder = _a.placeholder, decimalScale = _a.decimalScale, minVal = _a.minVal, maxVal = _a.maxVal, suffix = _a.suffix, onClearInput = _a.onClearInput, autoFocus = _a.autoFocus, secondaryDisplay = _a.secondaryDisplay;
    var errors = useFormState({
        control: control,
    }).errors;
    return (_jsxs("div", { className: 'relative w-full max-w-xs flex-grow rounded border border-gray-200 ring-gray-500/10 transition focus-within:border-gray-400 dark:border-gray-700 dark:focus-within:border-gray-500', children: [_jsx(Controller, { render: function (_a) {
                    var field = _a.field;
                    return (
                    // TODO: should we just treat it as a string input instead? And convert to a number when necessary?
                    _jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(NumericFormat, { className: "w-full flex-grow bg-transparent py-2 px-3 transition focus:outline-none", decimalScale: decimalScale, suffix: suffix, placeholder: placeholder, onValueChange: function (_a) {
                                            var floatValue = _a.floatValue;
                                            // TODO: how can we handle this better. Reverts back to start value if it's set to undefined.
                                            // Pretty annoying on the edit flow.
                                            field.onChange(floatValue);
                                        }, value: field.value, autoFocus: autoFocus }), secondaryDisplay && secondaryDisplay(field.value)] }), onClearInput && (_jsx(MiniButton, { type: "button", compact: true, onClick: onClearInput, eventName: 'clearedNumberInput', className: "absolute inset-y-0 right-0 focus:outline-none", children: _jsx(XMarkIcon, { className: "h-4 w-4" }) }))] }));
                }, name: inputName, control: control, rules: __assign(__assign({ required: {
                        value: true,
                        message: 'Required',
                    } }, (maxVal
                    ? {
                        max: {
                            value: maxVal,
                            message: "".concat(maxVal).concat(suffix, " max"),
                        },
                    }
                    : {})), (minVal
                    ? {
                        min: {
                            value: minVal,
                            message: "".concat(minVal).concat(suffix, " min"),
                        },
                    }
                    : {})) }), _jsx("div", { className: 'absolute -bottom-2.5 left-2 flex items-center bg-white px-px text-[12px] dark:bg-black', children: errors && Object.keys(errors).length > 0 && (_jsx(ErrorMessage, { errors: errors, name: inputName, render: function (_a) {
                        var message = _a.message;
                        return (_jsx(AddressInputMessage, { isError: true, message: message !== null && message !== void 0 ? message : 'Error' }));
                    } })) })] }));
};
export default NumberInput;
