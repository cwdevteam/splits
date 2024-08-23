import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function MiniButton(btn) {
    var isDisabled = btn.isDisabled || btn.isLoading;
    var eventName = btn.eventName;
    var onClick = eventName
        ? function (e) {
            var _a;
            (_a = btn.onClick) === null || _a === void 0 ? void 0 : _a.call(btn, e);
        }
        : btn.onClick;
    return (_jsxs("button", { disabled: isDisabled, onClick: onClick, type: btn.type ? btn.type : 'button', className: "whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-medium backdrop-blur-sm ".concat(!btn.compact && "w-full", " flex items-center justify-center transition focus:outline-none ").concat(isDisabled
            ? "disabled cursor-default opacity-50"
            : btn.isActive
                ? "cursor-wait opacity-50"
                : "hover:opacity-80", "\n      ").concat(btn.className), children: [btn.isLoading && (_jsx("div", { children: _jsx("div", { style: { borderTopColor: 'transparent' }, className: "mr-2 h-2.5 w-2.5 animate-spin rounded-full border-2 border-solid border-gray-500" }) })), btn.children] }));
}
export function SecondaryButton(btn) {
    var textSize = btn.size ? "text-".concat(btn.size) : 'text-xs';
    var isDisabled = btn.isDisabled || btn.isLoading;
    var eventName = btn.eventName;
    var onClick = eventName
        ? function (e) {
            var _a;
            (_a = btn.onClick) === null || _a === void 0 ? void 0 : _a.call(btn, e);
        }
        : btn.onClick;
    return (_jsxs("button", { disabled: isDisabled, onClick: onClick, type: btn.type ? btn.type : 'button', className: "whitespace-nowrap rounded ".concat(textSize, " border border-gray-500/20 shadow shadow-black/5 px-2 py-1 text-black bg-gray-400/5 dark:border-white/20 dark:bg-white/5 dark:text-white ").concat(!btn.compact && "w-full", " flex items-center justify-center transition focus:outline-none ").concat(isDisabled
            ? "disabled cursor-default opacity-50"
            : btn.isActive
                ? "opacity-50"
                : "hover:border-black/20 hover:shadow dark:hover:border-white/40 focus:ring-2", "\n      ").concat(btn.className), children: [btn.isLoading && (_jsx("div", { children: _jsx("div", { style: { borderTopColor: 'transparent' }, className: "mr-2 h-3 w-3 animate-spin rounded-full border-2 border-solid border-gray-500" }) })), btn.children] }));
}
export default function Button(btn) {
    var textSize = btn.size ? "text-".concat(btn.size) : 'text-sm';
    var isDisabled = btn.isDisabled || btn.isLoading;
    var eventName = btn.eventName;
    var onClick = eventName
        ? function (e) {
            var _a;
            (_a = btn.onClick) === null || _a === void 0 ? void 0 : _a.call(btn, e);
        }
        : btn.onClick;
    return (_jsxs("button", { disabled: isDisabled, onClick: onClick, type: btn.type ? btn.type : 'button', className: "whitespace-nowrap rounded ".concat(textSize, " border border-gray-900 bg-gray-800 px-3 py-1 text-white dark:border-gray-200 dark:bg-gray-300 dark:text-black ").concat(!btn.compact && "w-full", " flex transform items-center justify-center transition focus:outline-none ").concat(isDisabled
            ? "disabled cursor-default opacity-30"
            : btn.isActive
                ? "opacity-50"
                : "shadow ring-gray-100 hover:border-black hover:bg-gray-700 focus:ring-2 dark:ring-gray-800 dark:hover:border-gray-100 dark:hover:bg-gray-200", "\n      ").concat(btn.className), children: [btn.isLoading && (_jsx("div", { children: _jsx("div", { style: { borderTopColor: 'transparent' }, className: "mr-2 h-3 w-3 animate-spin rounded-full border-2 border-solid border-white" }) })), btn.children] }));
}
