import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Link from './Link';
import { CHAIN_INFO } from '../../constants/chains';
import SplitsLogo from './SplitsLogo';
var ComponentLayout = function (_a) {
    var title = _a.title, titleButton = _a.titleButton, body = _a.body, corner = _a.corner, error = _a.error, chainId = _a.chainId, _b = _a.width, width = _b === void 0 ? 'md' : _b, _c = _a.theme, theme = _c === void 0 ? 'system' : _c;
    var widthValue = {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        full: '100%',
    };
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var _d = useState(mq.matches), userPrefersDark = _d[0], setUserPrefersDark = _d[1];
    var handleThemeChange = function (evt) {
        setUserPrefersDark(evt.matches);
    };
    useEffect(function () {
        mq.addEventListener('change', handleThemeChange);
        return function () { return mq.removeEventListener('change', handleThemeChange); };
    }, []);
    var themeClass = {
        light: '',
        dark: 'dark',
        system: userPrefersDark ? 'dark' : '',
    };
    var unsupportedChainId = chainId && !Object.keys(CHAIN_INFO).includes(chainId.toString());
    var errorDisplay = unsupportedChainId
        ? {
            title: 'Unsupported Chain ID',
            body: "Chain ID ".concat(chainId, " is not supported by Splits. Supported chainId's include: ").concat(Object.keys(CHAIN_INFO).join(', '), "."),
        }
        : error;
    var isDark = themeClass[theme] === 'dark';
    return (_jsx("div", { className: "".concat(themeClass[theme]), style: { width: widthValue[width] }, children: _jsxs("div", { className: "w-full grid font-sans text-left text-sm min-h-[18rem] dark:text-white border rounded bg-white dark:bg-black border-gray-200 dark:border-gray-700 divide-y dark:divide-gray-700 divide-gray-200", children: [_jsxs("div", { className: "px-4 py-3.5 flex items-center justify-between space-x-2 rounded-t overflow-hidden", children: [_jsxs("div", { className: "flex items-center overflow-x-hidden ", children: [title && _jsx("div", { className: "font-medium", children: title }), titleButton && _jsx("div", { className: "", children: titleButton })] }), corner && _jsx("div", { className: "", children: corner })] }), _jsx("div", { className: "p-4", children: errorDisplay ? (_jsxs("div", { className: "text-center my-8 space-y-2", children: [_jsx("div", { className: "text-lg", children: errorDisplay.title }), _jsx("div", { className: "text-xs max-w-md", children: errorDisplay.body })] })) : (body) }), _jsxs("div", { className: "p-4 self-end flex items-center justify-between text-xs bg-gray-50 dark:bg-[#1f1f1f] rounded-b", children: [_jsxs("div", { className: "flex space-x-2 items-center", children: [_jsx(SplitsLogo, { dark: isDark }), _jsx("div", { className: "font-medium", children: "Powered by Splits" })] }), _jsx(Link, { href: "https://splits.org", className: "text-gray-500 dark:text-gray-400", children: "splits.org" })] })] }) }));
};
export default ComponentLayout;
