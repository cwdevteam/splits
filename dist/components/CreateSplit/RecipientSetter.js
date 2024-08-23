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
import { useEffect } from 'react';
import { EllipsisHorizontalIcon, UserPlusIcon } from '@heroicons/react/20/solid';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { round, sumBy } from 'lodash';
import { EMPTY_RECIPIENT, SPLIT_RECIPIENT_MAX_DECIMALS, } from '../../constants/splits';
import { RecipientRow } from '../CreateSplit/RecipientRow';
import TotalAllocated from '../CreateSplit/TotalAllocated';
import { SecondaryButton } from '../util/Button';
import DropdownMenu from '../util/DropdownMenu';
var RecipientSetter = function (_a) {
    var chainId = _a.chainId;
    var _b = useFormContext(), watch = _b.watch, control = _b.control, setValue = _b.setValue;
    var _c = useFieldArray({
        name: 'recipients',
        control: control,
    }), fields = _c.fields, append = _c.append, remove = _c.remove;
    var recipients = watch('recipients');
    useEffect(function () {
        if (recipients.length < 2)
            append(EMPTY_RECIPIENT, { shouldFocus: false });
    }, [append, recipients.length]);
    var totalAllocated = sumBy(recipients, function (r) { return r.percentAllocation || 0; });
    var numRecipientsWithNoOwnership = recipients.filter(function (r) { return !!r.percentAllocation; }).length;
    var splitEvenly = function () {
        var num = fields.length;
        var roundedSplit = round(100 / num, SPLIT_RECIPIENT_MAX_DECIMALS);
        var roundedSplitLeftover = round(100 - roundedSplit * num, SPLIT_RECIPIENT_MAX_DECIMALS);
        fields.forEach(function (_, index) {
            return setValue("recipients.".concat(index, ".percentAllocation"), roundedSplit + (index == 0 ? roundedSplitLeftover : 0));
        });
    };
    var splitRemaining = function () {
        var emptyRowIndices = [];
        recipients.forEach(function (recipient, index) {
            if ([0, null, undefined].includes(recipient.percentAllocation)) {
                emptyRowIndices.push(index);
            }
        });
        if (totalAllocated < 100) {
            var remainingOwnership = 100 - totalAllocated;
            var roundedSplit_1 = round(remainingOwnership / emptyRowIndices.length, SPLIT_RECIPIENT_MAX_DECIMALS);
            var roundedSplitLeftover_1 = round(remainingOwnership - roundedSplit_1 * emptyRowIndices.length, SPLIT_RECIPIENT_MAX_DECIMALS);
            emptyRowIndices.forEach(function (recipientIndex, index) {
                setValue("recipients.".concat(recipientIndex, ".percentAllocation"), roundedSplit_1 + (index === 0 ? roundedSplitLeftover_1 : 0));
            });
        }
    };
    var menuOptions = __spreadArray(__spreadArray([], (numRecipientsWithNoOwnership !== 0 && totalAllocated < 100
        ? [
            {
                title: 'Split remaining',
                onClick: splitRemaining,
            },
        ]
        : []), true), [
        {
            title: 'Split evenly',
            onClick: splitEvenly,
        },
    ], false);
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { children: "Recipients" }), fields.map(function (f, index) { return (_jsx(RecipientRow, { index: index, chainId: chainId, onRemove: function () { return remove(index); } }, f.id)); }), _jsxs("div", { className: "flex justify-between", children: [_jsxs(SecondaryButton, { onClick: function () { return append(EMPTY_RECIPIENT, { shouldFocus: true }); }, compact: true, className: "border-gray-200 transition hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-400", children: [_jsx(UserPlusIcon, { className: "mr-1 h-3 w-3" }), "Add Recipient"] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(TotalAllocated, { totalAllocated: totalAllocated }), _jsx(DropdownMenu, { menuPosition: "left", buttonBody: _jsx(EllipsisHorizontalIcon, { className: "h-4 w-4 text-gray-600" }), menuItems: menuOptions })] })] })] }));
};
export default RecipientSetter;
