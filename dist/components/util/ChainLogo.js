import { jsx as _jsx } from "react/jsx-runtime";
import Tooltip from '../util/Tooltip';
var ChainLogo = function (_a) {
    var chainInfo = _a.chainInfo;
    return (_jsx(Tooltip, { content: chainInfo.label, position: "left", children: _jsx("img", { src: "https://kit.splits.org/".concat(chainInfo.logoUrl), alt: chainInfo.label, style: { width: 20 } }) }));
};
export default ChainLogo;
