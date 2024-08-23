import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
export default function Tooltip(_a) {
    var children = _a.children, content = _a.content, position = _a.position, delay = _a.delay, _b = _a.isDisabled, isDisabled = _b === void 0 ? false : _b, _c = _a.showTooltipOnContentHover, showTooltipOnContentHover = _c === void 0 ? false : _c;
    var _d = useState(false), active = _d[0], setActive = _d[1];
    var timer = useRef(0);
    var showTip = function (isContentHover) {
        timer.current = window.setTimeout(function () {
            setActive(true);
        }, isContentHover ? 0 : delay !== null && delay !== void 0 ? delay : 100);
        return function () {
            clearTimeout(timer.current);
        };
    };
    var hideTip = function () {
        clearTimeout(timer.current);
        setActive(false);
    };
    var positionMap = {
        top: 'bottom-full mb-1',
        bottom: 'top-full mt-1',
        left: 'right-full mr-1 -top-1/4',
        right: 'left-full ml-1 -top-1/4',
    };
    return (_jsxs("div", { className: "relative flex cursor-default flex-col items-center", children: [_jsx(Transition, { onPointerEnter: showTooltipOnContentHover ? function () { return showTip(true); } : undefined, onPointerLeave: showTooltipOnContentHover ? hideTip : undefined, show: active && !isDisabled, enter: "transition-all duration-150", enterFrom: "opacity-0 scale-90", enterTo: "opacity-100 scale-100", leave: "transition-all duration-150", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-90", className: "invisible absolute md:visible ".concat(positionMap[position !== null && position !== void 0 ? position : 'top'], " z-40 transform whitespace-nowrap rounded bg-black/90 px-2 py-1.5 text-xs text-white shadow-md backdrop-blur transition dark:border dark:border-white/10 dark:bg-white/10 dark:backdrop-brightness-[0%]"), children: content }), _jsx("div", { className: "flex", onPointerEnter: function () { return showTip(false); }, onPointerLeave: hideTip, children: children })] }));
}
export var InformationLinkTooltip = function (_a) {
    var tooltipContent = _a.tooltipContent, linkHref = _a.linkHref, _b = _a.iconSize, iconSize = _b === void 0 ? '3.5' : _b;
    return (_jsx(Tooltip, { content: tooltipContent, children: _jsx("a", { href: linkHref, target: "_blank", rel: "noreferrer", children: _jsx(InformationCircleIcon, { className: "h-".concat(iconSize, " w-").concat(iconSize, " opacity-30 transition hover:opacity-100") }) }) }));
};
