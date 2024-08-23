import { jsx as _jsx } from "react/jsx-runtime";
import { CHAIN_INFO } from '../../constants/chains';
import CreateSplitForm from '../CreateSplit/CreateSplitForm';
import { ADDRESS_ZERO } from '../../constants/addresses';
import ComponentLayout from '../util/ComponentLayout';
import ChainLogo from '../util/ChainLogo';
import { DEFAULT_DISTRIBUTOR_FEE, DEFAULT_DISTRIBUTOR_FEE_OPTIONS, DEFAULT_RECIPIENTS, } from '../../constants/splits';
var CreateSplit = function (_a) {
    var chainId = _a.chainId, _b = _a.defaultDistributorFee, defaultDistributorFee = _b === void 0 ? DEFAULT_DISTRIBUTOR_FEE : _b, _c = _a.defaultController, defaultController = _c === void 0 ? ADDRESS_ZERO : _c, _d = _a.defaultRecipients, defaultRecipients = _d === void 0 ? DEFAULT_RECIPIENTS : _d, _e = _a.defaultDistributorFeeOptions, defaultDistributorFeeOptions = _e === void 0 ? DEFAULT_DISTRIBUTOR_FEE_OPTIONS : _e, _f = _a.width, width = _f === void 0 ? 'lg' : _f, _g = _a.theme, theme = _g === void 0 ? 'system' : _g, _h = _a.displayChain, displayChain = _h === void 0 ? true : _h, onSuccess = _a.onSuccess, onError = _a.onError;
    return (_jsx(ComponentLayout, { chainId: chainId, width: width, theme: theme, title: 'New Split contract', corner: displayChain
            ? CHAIN_INFO[chainId] && _jsx(ChainLogo, { chainInfo: CHAIN_INFO[chainId] })
            : undefined, body: _jsx(CreateSplitForm, { defaultDistributorFee: defaultDistributorFee, defaultController: defaultController, defaultRecipients: defaultRecipients, defaultDistributorFeeOptions: defaultDistributorFeeOptions, chainId: chainId, onSuccess: onSuccess, onError: onError }) }));
};
export default CreateSplit;
