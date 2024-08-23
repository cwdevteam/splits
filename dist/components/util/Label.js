import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Label(_a) {
    var icon = _a.icon, text = _a.text, variant = _a.variant;
    var colorMap = {
        green: 'border-green-500/50 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500 dark:border-green-700',
        blue: 'border-blue-500/50 bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-600 dark:border-blye-700',
        gray: 'border-gray-900/10 text-gray-500 dark:border-gray-700 dark:text-gray-400',
    };
    return (_jsxs("div", { className: "text-[12px] ".concat(!text ? "px-1" : "px-1.5", " no-scrollbar flex items-center space-x-1 whitespace-nowrap rounded-full border ").concat(colorMap[variant !== null && variant !== void 0 ? variant : 'gray']), children: [icon && _jsx("div", { className: "flex", children: icon }), text && _jsx("div", { children: text })] }));
}
