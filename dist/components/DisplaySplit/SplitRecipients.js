import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { shortenENS, shortenAddress } from '../../utils/address';
import { getSplitsAccountUrl } from '../../utils/splits';
import { displayPercentage } from '../../utils/display';
import Button from '../util/Button';
import Label from '../util/Label';
import Link from '../util/Link';
import SplitsAvatar from '../util/SplitsAvatar';
var SplitRecipients = function (_a) {
    var split = _a.split;
    var _b = useState(false), viewAll = _b[0], setViewAll = _b[1];
    var connectedAddress = useAccount().address;
    var displayAddress = function (recipient) {
        if (recipient.ens) {
            return shortenENS(recipient.ens);
        }
        if (recipient.address) {
            return shortenAddress(recipient.address);
        }
    };
    var recipients = split === null || split === void 0 ? void 0 : split.recipients;
    return (_jsxs("div", { className: "space-y-2 text-xs", children: [(split === null || split === void 0 ? void 0 : split.controller) && (_jsxs("div", { className: "border-yellow-500/50 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 w-full rounded-sm border p-2 ", children: [connectedAddress === (split === null || split === void 0 ? void 0 : split.controller.address)
                        ? 'You control'
                        : "".concat(shortenAddress(split === null || split === void 0 ? void 0 : split.controller.address), " controls"), ' ', "this Split"] })), _jsxs("div", { className: "flex items-center justify-between  text-gray-400 dark:text-gray-500", children: [_jsxs("div", { children: ["Recipients ", recipients && "(".concat(recipients === null || recipients === void 0 ? void 0 : recipients.length, ")")] }), _jsx("div", { children: "Share" })] }), _jsx("div", { children: recipients === null || recipients === void 0 ? void 0 : recipients.slice(0, viewAll ? recipients === null || recipients === void 0 ? void 0 : recipients.length : 10).map(function (_a, idx) {
                    var _b;
                    var recipient = _a.recipient, percentAllocation = _a.percentAllocation;
                    return (_jsxs("div", { className: "py-2 flex items-stretch justify-between space-x-0.5", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(SplitsAvatar, { address: recipient.address, size: 20 }), _jsx(Link, { href: getSplitsAccountUrl(recipient.address), children: _jsx("div", { children: displayAddress(recipient) }) }), recipient.address === connectedAddress && (_jsx(Label, { text: "You" })), recipient.address === ((_b = split === null || split === void 0 ? void 0 : split.controller) === null || _b === void 0 ? void 0 : _b.address) && (_jsx(Label, { text: "Controller" }))] }), _jsx("div", { children: displayPercentage(percentAllocation * 10000, 2) })] }, idx));
                }) }), (recipients === null || recipients === void 0 ? void 0 : recipients.length) && (recipients === null || recipients === void 0 ? void 0 : recipients.length) > 10 && !viewAll && (_jsx(Button, { onClick: function () { return setViewAll(true); }, children: "View All" }))] }));
};
export default SplitRecipients;
