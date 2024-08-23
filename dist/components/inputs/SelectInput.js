import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, LockClosedIcon } from '@heroicons/react/20/solid';
var SelectInput = function (_a) {
    var selectedOption = _a.selectedOption, options = _a.options, emptyText = _a.emptyText, selectValue = _a.selectValue, _b = _a.hideSelectedValue, hideSelectedValue = _b === void 0 ? true : _b, _c = _a.isDisabled, isDisabled = _c === void 0 ? false : _c;
    var validSelection = options.filter(function (option) { return option.value === selectedOption; }).length > 0;
    var hasSelectedOption = validSelection && (selectedOption || selectedOption === 0);
    var selectedDisplay = hasSelectedOption
        ? getSelectedDisplay(selectedOption, options)
        : undefined;
    return (_jsx(Listbox, { value: selectedOption, disabled: isDisabled, onChange: selectValue, children: function (_a) {
            var open = _a.open;
            return (_jsxs("div", { className: "relative transition", children: [_jsxs(Listbox.Button, { className: "group flex w-full items-center justify-between rounded border transition md:max-w-xs ".concat(open
                            ? "border-gray-300 dark:border-gray-600"
                            : isDisabled
                                ? "cursor-not-allowed border-gray-200 bg-black/5 dark:border-gray-700 dark:bg-white/5"
                                : "border-gray-200 dark:border-gray-700"), children: [_jsx("div", { className: "w-full py-2 px-3 text-left", children: hasSelectedOption ? selectedDisplay : emptyText }), isDisabled ? (_jsx(LockClosedIcon, { className: "mr-1.5 h-3 w-3 flex-shrink-0 opacity-25" })) : (_jsx(ChevronDownIcon, { className: "mr-1.5 h-4 w-4 flex-shrink-0 transition ".concat(open ? "opacity-100" : "opacity-50 group-hover:opacity-100") }))] }), _jsx(Transition, { show: open, as: Fragment, enter: "transform duration-100 transition", enterFrom: "opacity-50 -translate-y-0.5", enterTo: "opacity-100", leave: "transform duration-100 transition", leaveFrom: "opacity-100 translate-y-0 ", leaveTo: "opacity-25 -translate-y-1", children: _jsx(Listbox.Options, { className: "absolute z-40 mt-1 max-h-48 w-full max-w-xs overflow-hidden overflow-y-scroll rounded border border-gray-300 bg-white p-1 focus:outline-none dark:border-gray-600 dark:bg-black md:shadow-lg", children: options
                                .filter(function (option) {
                                if (!hideSelectedValue)
                                    return true;
                                return option.value !== selectedOption;
                            })
                                .map(function (option, index) { return (_jsx(Listbox.Option, { value: option.value, children: function (_a) {
                                    var active = _a.active;
                                    return (_jsx("div", { className: "focus:outline-none-sm w-full cursor-pointer rounded-sm px-3 py-2 ".concat(active && "bg-gray-100 dark:bg-white/5"), children: option.display(active) }, index));
                                } }, index)); }) }) })] }));
        } }));
};
var getSelectedDisplay = function (selected, options) {
    var selectedOption = options.filter(function (option) { return option.value === selected; });
    if (selectedOption.length !== 1)
        throw new Error('Invalid arguments, selected not found in options');
    return selectedOption[0].display(false);
};
export default SelectInput;
