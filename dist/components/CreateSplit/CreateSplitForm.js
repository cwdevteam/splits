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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
import { useCallback, useEffect } from 'react';
import { useCreateSplit } from '@0xsplits/splits-sdk-react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAccount, useNetwork } from 'wagmi';
import { sum, uniq } from 'lodash';
import { ControllerSelector } from '../CreateSplit/ControllerSelector';
import { CHAIN_INFO } from '../../constants/chains';
import RecipientSetter from '../CreateSplit/RecipientSetter';
import NumberSelectInput from '../inputs/NumberSelectInput';
import { getNativeTokenSymbol } from '../../utils/display';
import { getSplitRouterParams } from '../../utils/splits';
import InputRow from '../inputs/InputRow';
import Tooltip from '../util/Tooltip';
import Button from '../util/Button';
import Link from '../util/Link';
var CreateSplitForm = function (_a) {
    var chainId = _a.chainId, defaultDistributorFee = _a.defaultDistributorFee, defaultRecipients = _a.defaultRecipients, defaultController = _a.defaultController, defaultDistributorFeeOptions = _a.defaultDistributorFeeOptions, onSuccess = _a.onSuccess, onError = _a.onError;
    var _b = useCreateSplit(), createSplit = _b.createSplit, error = _b.error;
    useEffect(function () {
        if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            onError && onError(error);
        }
    }, [error, onError]);
    var _c = useAccount(), isConnected = _c.isConnected, connectedAddress = _c.address;
    var chain = useNetwork().chain;
    var form = useForm({
        mode: 'onChange',
        defaultValues: {
            recipients: defaultRecipients,
            controller: defaultController,
            distributorFee: defaultDistributorFee,
        },
    });
    var handleSubmit = form.handleSubmit, control = form.control, watch = form.watch, setValue = form.setValue, setError = form.setError, isFormValid = form.formState.isValid;
    var onSubmit = useCallback(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var args, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    args = {
                        recipients: data.recipients,
                        distributorFeePercent: data.distributorFee,
                        controller: data.controller,
                    };
                    return [4 /*yield*/, createSplit(args)];
                case 1:
                    result = _a.sent();
                    if (result) {
                        onSuccess && onSuccess(result);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [createSplit, onSuccess]);
    var recipientAllocationTotal = sum(watch('recipients').map(function (recipient) { return recipient.percentAllocation; }));
    var isFullyAllocated = recipientAllocationTotal === 100;
    var isWrongChain = chain && chainId !== chain.id;
    var isButtonDisabled = !isConnected || isWrongChain || !isFormValid || !isFullyAllocated;
    var formData = watch();
    var createOnSplitsAppLink = "https://app.splits.org/new/split?".concat(getSplitRouterParams(formData, connectedAddress));
    return (_jsx("div", { className: "space-y-8 flex flex-col", children: _jsxs(FormProvider, __assign({}, form, { children: [_jsxs("div", { className: "leading-relaxed text-gray-500", children: ["Split is a payable smart contract that splits all incoming", ' ', getNativeTokenSymbol(chainId), " & ERC20 tokens among the recipients according to predefined ownership shares.", ' ', _jsx(Link, { href: "https://docs.splits.org/core/split", className: "underline transition hover:opacity-80", children: "Learn more" })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(RecipientSetter, { chainId: chainId }), _jsx(InputRow, { label: "Controller", input: _jsx(ControllerSelector, { chainId: chainId, control: control, inputName: 'controller', setValue: setValue, setError: setError }), link: "https://docs.splits.org/create#split" }), _jsx(InputRow, { label: "Distributor Fee", input: _jsx(NumberSelectInput, { control: control, inputName: 'distributorFee', defaultVal: defaultDistributorFee, setValue: setValue, options: uniq(__spreadArray(__spreadArray([], defaultDistributorFeeOptions, true), [
                                    defaultDistributorFee,
                                ], false))
                                    .sort()
                                    .map(function (value) {
                                    return {
                                        value: value,
                                        display: function () { return _jsxs("span", { children: [value, "%"] }); },
                                    };
                                })
                                    .concat([
                                    {
                                        value: 0,
                                        display: function () { return _jsx("span", { children: "Manually distribute (0%)" }); },
                                    },
                                ]), placeholder: "".concat(defaultDistributorFee, "%"), decimalScale: 2, suffix: "%", minVal: 0.01, maxVal: 99.99, hideSelectedValue: false }), link: "https://docs.splits.org/distribute#distribution-bounty" }), _jsxs("div", { className: "my-5 flex flex-col space-y-1 text-center", children: [_jsx(Tooltip, { isDisabled: isConnected && !isWrongChain, content: isWrongChain
                                        ? "Switch to ".concat(CHAIN_INFO[chainId].label, " to distribute funds")
                                        : !isConnected
                                            ? 'Connect wallet'
                                            : '', children: _jsx(Button, { type: "submit", isDisabled: isButtonDisabled, children: "Create Split" }) }), _jsx("span", { className: "text-gray-400", children: "or" }), _jsx("div", { children: _jsx(Link, { href: createOnSplitsAppLink, className: "font-medium text-gray-500 dark:text-gray-300", children: "Create on app.splits.org" }) })] })] }), _jsx(Disclaimer, {})] })) }));
};
var Disclaimer = function () {
    return (_jsxs("div", { className: "text-xs max-w-md mx-auto text-center text-gray-500 mt-4", children: ["By creating a Split you agree to the", ' ', _jsx(Link, { href: "https://splits.org/terms/", className: "underline", children: "Terms of Service" }), ' ', "and acknowledge that you have read & understand the", ' ', _jsx(Link, { href: "https://splits.org/disclaimer/", className: "underline", children: "Protocol Disclaimer" })] }));
};
export default CreateSplitForm;
