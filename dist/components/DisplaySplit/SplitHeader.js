import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { shortenAddress } from '../../utils/address';
import { copyToClipboard } from '../../utils/clipboard';
import Link from '../util/Link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import SplitsAvatar from '../util/SplitsAvatar';
var SplitHeader = function (_a) {
    var address = _a.address, chainId = _a.chainId;
    var _b = useState(false), showFullAddress = _b[0], setShowFullAddress = _b[1];
    var displayName = showFullAddress ? address : shortenAddress(address);
    return (_jsxs("div", { className: "flex w-full items-center space-x-2 overflow-hidden", children: [_jsx("div", { onMouseEnter: function () { return setShowFullAddress(true); }, onMouseLeave: function () { return setShowFullAddress(false); }, onClick: function () { return copyToClipboard(address); }, className: "cursor-pointer overflow-hidden", children: _jsxs("div", { className: 'flex items-center space-x-2 truncate active:bg-yellow-200 dark:active:text-black', children: [_jsx(SplitsAvatar, { address: address, size: 20, className: "flex-shrink-0" }), _jsx("div", { className: "truncate", children: displayName })] }) }), _jsx(Link, { href: "https://app.splits.org/accounts/".concat(address, "/?chainId=").concat(chainId), className: "cursor-pointer text-gray-500 transition hover:text-black focus:outline-none dark:hover:text-white", children: _jsx(ArrowTopRightOnSquareIcon, { className: "h-4 w-4" }) })] }));
};
export default SplitHeader;
