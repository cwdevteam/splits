import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import Tooltip from '../util/Tooltip';
function InputRow(_a) {
    var label = _a.label, input = _a.input, tooltip = _a.tooltip, link = _a.link, size = _a.size;
    var sizeMap = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
    };
    return (_jsxs("div", { className: "grid grid-cols-1 items-center gap-1 md:grid-cols-2 md:gap-2 ".concat(sizeMap[size !== null && size !== void 0 ? size : 'sm']), children: [_jsxs("div", { className: "-space-y-1", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { children: label }), tooltip && (_jsx(Tooltip, { content: tooltip, delay: 5, children: _jsx(InformationCircleIcon, { className: "ml-1 hidden h-3.5 w-3.5 opacity-20 transition md:flex" }) }))] }), link && (_jsx("div", { children: _jsx("a", { href: link, target: "blank", rel: "noreferrer", className: "text-[90%] underline opacity-40 transition hover:opacity-80", children: "Learn more" }) }))] }), _jsx("div", { children: input })] }));
}
export default InputRow;
