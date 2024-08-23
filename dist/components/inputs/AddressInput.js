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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { Controller, useFormState, useWatch, } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { MiniButton } from '../util/Button';
import { shortenAddress, shortenENS } from '../../utils/address';
import { useEnsName, useEnsAddress } from 'wagmi';
import { isAddress } from 'viem';
import SplitsAvatar from '../util/SplitsAvatar';
var AddressInput = function (_a) {
    var control = _a.control, inputName = _a.inputName, placeholder = _a.placeholder, setValue = _a.setValue, setError = _a.setError, validationFunc = _a.validationFunc, onClearInput = _a.onClearInput, autoFocus = _a.autoFocus, validAddressDisplay = _a.validAddressDisplay, _b = _a.chainId, chainId = _b === void 0 ? 1 : _b;
    var _c = useState(''), addressEns = _c[0], setAddressEns = _c[1];
    var inputVal = useWatch({
        control: control,
        name: inputName,
    });
    var errors = useFormState({
        control: control,
        name: inputName,
    }).errors;
    var error = getNestedObj(errors, inputName);
    var _d = useEnsName({
        address: inputVal,
        chainId: chainId,
        enabled: inputVal && isAddress(inputVal),
    }), data = _d.data, isError = _d.isError, isLoading = _d.isLoading;
    var _e = useEnsAddress({
        name: inputVal,
        chainId: chainId,
        enabled: inputVal && inputVal.endsWith('.eth'),
    }), ensResolverData = _e.data, ensResolverLoading = _e.isLoading;
    var onValidEns = useCallback(function (address) {
        setAddressEns(inputVal);
        var typedAddress = address;
        setValue(inputName, typedAddress, { shouldValidate: true });
    }, [inputName, inputVal, setValue]);
    var onInvalidEns = useCallback(function () {
        setAddressEns('');
        setError(inputName, { type: 'ensFailure', message: "ENS not found" });
    }, [inputName, setError]);
    var onValidAddressWithEns = useCallback(function (ens) { return setAddressEns(ens); }, []);
    useEffect(function () {
        if ((inputVal && !inputVal.endsWith('.eth')) || ensResolverLoading)
            return;
        if (ensResolverData)
            onValidEns(ensResolverData);
    }, [ensResolverData, ensResolverLoading, inputVal, onValidEns]);
    useEffect(function () {
        if ((inputVal && inputVal.endsWith('.eth')) || isLoading)
            return;
        if (isError)
            onInvalidEns();
        if (data)
            onValidAddressWithEns(data);
    }, [data, inputVal, isError, isLoading, onInvalidEns, onValidAddressWithEns]);
    var clearInput = useCallback(function () {
        var typedAddress = '';
        setValue(inputName, typedAddress);
        setAddressEns('');
        if (onClearInput)
            onClearInput();
    }, [inputName, onClearInput, setValue]);
    return (_jsxs("div", { className: 'relative w-full flex-grow rounded border border-gray-200 ring-gray-500/10 transition focus-within:border-gray-400 focus-within:shadow-none dark:border-gray-700 dark:focus-within:border-gray-500', children: [_jsx(Controller, { control: control, name: inputName, render: function (_a) {
                    var field = _a.field;
                    return isAddress(field.value) && !error ? (_jsx(ValidAddressDisplay, { address: field.value, ens: addressEns, onClearInput: clearInput, validAddressDisplay: validAddressDisplay })) : (_jsxs(_Fragment, { children: [_jsx("input", __assign({ className: "flex w-full flex-grow items-center space-x-2 bg-transparent py-2 px-3 transition focus:outline-none", placeholder: placeholder, autoComplete: 'off', autoFocus: autoFocus }, field)), onClearInput && (_jsx(MiniButton, { type: "button", compact: true, onClick: onClearInput, eventName: 'clearedTokenToBeneficiary', className: "absolute inset-y-0 right-0 focus:outline-none", children: _jsx(XMarkIcon, { className: "h-4 w-4" }) }))] }));
                }, rules: {
                    required: {
                        value: true,
                        message: 'Required',
                    },
                    validate: validationFunc,
                } }), _jsx(AddressErrorsDisplay, { fieldError: error, address: inputVal, ens: addressEns })] }));
};
var ValidAddressDisplay = function (_a) {
    var address = _a.address, ens = _a.ens, onClearInput = _a.onClearInput, validAddressDisplay = _a.validAddressDisplay;
    return (_jsxs("div", { className: "flex w-full", children: [_jsx("div", { className: "flex w-full flex-grow items-center space-x-1.5 p-2", children: validAddressDisplay ? (validAddressDisplay(address)) : (_jsxs(_Fragment, { children: [_jsx(SplitsAvatar, { address: address, size: 18, className: 'flex-shrink-0' }), ens ? (_jsx("div", { className: 'flex', children: shortenENS(ens) })) : (_jsx("div", { className: 'flex', children: shortenAddress(address) }))] })) }), _jsx(MiniButton, { type: "button", compact: true, onClick: onClearInput, eventName: 'clearedTokenToBeneficiary', children: _jsx(XMarkIcon, { className: "h-4 w-4" }) })] }));
};
var AddressErrorsDisplay = function (_a) {
    var fieldError = _a.fieldError, address = _a.address, ens = _a.ens;
    return (_jsx("div", { className: 'absolute -bottom-2.5 left-2 flex items-center bg-white px-px text-[12px] dark:bg-black', children: (function () {
            var _a;
            if (fieldError)
                return (_jsx(AddressInputMessage, { isError: true, message: (_a = fieldError.message) !== null && _a !== void 0 ? _a : 'Error' }));
            else if (isAddress(address))
                return (_jsx(AddressInputMessage, { message: ens ? shortenAddress(address) : 'Valid address' }));
        })() }));
};
export var AddressInputMessage = function (_a) {
    var message = _a.message, isError = _a.isError;
    return (_jsx("p", { className: isError
            ? "text-red-500 dark:text-red-400"
            : "text-green-500 dark:text-green-400", children: message }));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var getNestedObj = function (object, pathName) {
    var currentObj = object;
    var pathParts = pathName.split('.');
    pathParts.map(function (part) {
        if (currentObj) {
            currentObj = currentObj[part];
        }
    });
    return currentObj;
};
export default AddressInput;
