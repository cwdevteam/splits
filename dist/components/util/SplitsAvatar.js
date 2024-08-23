import { jsx as _jsx } from "react/jsx-runtime";
import Blockies from 'react-blockies';
import { getAddress } from 'viem';
import { normalize } from 'viem/ens';
import { useEnsAvatar, useEnsName } from 'wagmi';
export default function SplitsAvatar(_a) {
    var address = _a.address, _b = _a.size, size = _b === void 0 ? 18 : _b, className = _a.className;
    var ensName = useEnsName({
        address: getAddress(address),
    });
    var ensAvatar = useEnsAvatar({
        name: ensName.data ? normalize(ensName.data) : undefined,
    });
    if (ensAvatar.data) {
        return (_jsx("img", { src: ensAvatar.data, alt: ensName.data || address, width: size, height: size, className: "rounded-full ".concat(className) }));
    }
    return (_jsx(Blockies, { seed: getAddress(address), size: size / 4, className: "rounded-full ".concat(className) }));
}
