import { sortBy } from 'lodash';
export var getSplitsAccountUrl = function (address, chainId) {
    var chainQueryParam = chainId ? "?chainId=".concat(chainId) : '';
    return "https://app.splits.org/accounts/".concat(address, "/").concat(chainQueryParam);
};
export var sortRecipients = function (recipients, account) {
    return sortBy(recipients, [
        function (r) { return -(r.address === account); },
        function (r) { return -r.percentAllocation; },
    ]);
};
export var getSplitRouterParams = function (split, account) {
    var distributorFee = split.distributorFee * 10000;
    var controller = split.controller;
    var _a = sortRecipients(split.recipients, account).reduce(function (acc, recipient) {
        acc[0].push(recipient.address);
        acc[1].push(recipient.percentAllocation * 10000);
        return acc;
    }, [[], []]), addresses = _a[0], allocations = _a[1];
    return "type=split&distributorFee=".concat(distributorFee, "&controller=").concat(controller, "&addresses=").concat(addresses.join(','), "&allocations=").concat(allocations.join(','), "&sponsor=").concat(false);
};
