import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { range } from 'lodash';
var SkeletonLoader = function () {
    var SKELETON_ACCOUNTS = 4;
    var skeletonAccounts = range(SKELETON_ACCOUNTS);
    return (_jsx("div", { children: skeletonAccounts.map(function (i) { return (_jsxs("div", { className: 'flex w-full items-center justify-between py-2.5 text-xs md:text-sm', children: [_jsxs("div", { className: 'flex items-center space-x-1.5', children: [_jsx("div", { className: "h-5 w-5 animate-pulse rounded-full bg-black/5 dark:bg-white/5" }), _jsx("div", { className: 'h-4 w-24 animate-pulse rounded bg-black/5 dark:bg-white/5' })] }), _jsx("div", { className: "flex items-center space-x-3", children: _jsx("div", { className: 'h-5 w-20 animate-pulse rounded bg-black/5 dark:bg-white/5' }) })] }, i)); }) }));
};
export default SkeletonLoader;
