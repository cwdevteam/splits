import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { round } from 'lodash';
import { SPLIT_RECIPIENT_MAX_DECIMALS } from '../../constants/splits';
import Tooltip from '../util/Tooltip';
var ProgressIndicator = function (_a) {
    var percentFilled = _a.percentFilled, size = _a.size, color = _a.color, className = _a.className;
    var _size = size !== null && size !== void 0 ? size : 20;
    var _center = _size / 2;
    var _r = _size / 4;
    var _c = 2 * Math.PI * _r;
    return (_jsx("div", { className: "rounded-full border border-white ring-2 dark:border-black ".concat(color !== null && color !== void 0 ? color : "text-gray-300 ring-gray-300 dark:text-gray-600 dark:ring-gray-600", " ").concat(className), children: _jsxs("svg", { height: _size, width: _size, viewBox: "0 0 ".concat(_size, " ").concat(_size), children: [_jsx("circle", { r: _center, cx: _center, cy: _center, fill: "transparent" }), _jsx("circle", { r: _r, cx: _center, cy: _center, fill: "transparent", stroke: "currentColor", strokeWidth: _center, strokeDasharray: "calc(".concat(percentFilled, " * ").concat(_c, " / 100) ").concat(_c), transform: "rotate(-90) translate(-".concat(_size, ")") })] }) }));
};
var TotalAllocated = function (_a) {
    var totalAllocated = _a.totalAllocated;
    return (_jsx(Tooltip, { content: "".concat(round(100 - totalAllocated, SPLIT_RECIPIENT_MAX_DECIMALS), "% remaining"), delay: 0, children: _jsxs("div", { className: "flex items-center justify-end space-x-2", children: [_jsxs("div", { className: "flex items-center text-xs text-gray-500 dark:text-gray-400", children: [round(totalAllocated, SPLIT_RECIPIENT_MAX_DECIMALS), "%"] }), _jsxs("div", { className: "relative hidden md:flex", children: [round(totalAllocated, SPLIT_RECIPIENT_MAX_DECIMALS) === 100.0 && (_jsx("div", { className: "absolute inset-x-0 inset-y-0 flex items-center justify-center", children: _jsx(CheckIcon, { className: "h-2.5 w-2.5 text-white" }) })), round(totalAllocated, SPLIT_RECIPIENT_MAX_DECIMALS) > 100.0 && (_jsx("div", { className: "absolute inset-x-0 inset-y-0 flex items-center justify-center", children: _jsx(ExclamationCircleIcon, { className: "h-2.5 w-2.5 text-white" }) })), _jsx(ProgressIndicator, { size: 12, percentFilled: totalAllocated, color: round(totalAllocated, SPLIT_RECIPIENT_MAX_DECIMALS) > 100.0
                                ? "text-red-500 dark:text-red-800 ring-red-500 dark:ring-red-800"
                                : round(totalAllocated, SPLIT_RECIPIENT_MAX_DECIMALS) == 100.0
                                    ? "text-green-500 dark:text-green-600 ring-green-500 dark:ring-green-600"
                                    : round(totalAllocated, SPLIT_RECIPIENT_MAX_DECIMALS) > 0
                                        ? "text-blue-500 dark:text-blue-600 ring-blue-500 dark:ring-blue-600"
                                        : undefined })] })] }) }));
};
export default TotalAllocated;
