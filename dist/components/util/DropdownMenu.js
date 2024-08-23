import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu } from '@headlessui/react';
var DropdownMenu = function (_a) {
    var buttonBody = _a.buttonBody, menuTitle = _a.menuTitle, menuItems = _a.menuItems, menuPosition = _a.menuPosition;
    var positionMap = {
        top: 'bottom-full mb-0.5',
        right: 'top-full mt-0.5 left-0',
        bottom: 'top-full mt-0.5',
        left: 'top-full mt-0.5 right-0',
        bottomRight: 'top-full mt-0.5 right-0',
    };
    return (_jsx(Menu, { as: 'div', children: _jsxs("div", { className: 'relative', children: [_jsx(Menu.Button, { className: "flex w-full", children: buttonBody }), _jsxs(Menu.Items, { className: "absolute z-40 ".concat(positionMap[menuPosition !== null && menuPosition !== void 0 ? menuPosition : 'bottom'], " w-40 overflow-hidden rounded bg-black py-1 text-xs focus:outline-none dark:bg-[#000] md:shadow-lg"), children: [menuTitle && (_jsx("div", { className: 'px-3 py-1.5 opacity-50', children: menuTitle })), menuItems.map(function (item, idx) { return (_jsx(Menu.Item, { children: function (_a) {
                                var active = _a.active;
                                return (_jsxs("button", { onClick: function () {
                                        item.onClick();
                                    }, className: "flex w-full items-center justify-between px-3 py-1.5 text-left text-white focus:outline-none ".concat(active && "bg-blue-500"), children: [_jsx("div", { className: 'flex-grow', children: item.title }), item.icon && _jsx("div", { children: item.icon })] }));
                            } }, idx)); })] })] }) }));
};
export default DropdownMenu;
