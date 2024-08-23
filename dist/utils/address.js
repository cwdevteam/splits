export var shortenAddress = function (address) {
    if (!address)
        return 'no address provided';
    var start = address.slice(0, 6);
    var end = address.slice(address.length - 4);
    return "".concat(start, "...").concat(end);
};
export var shortenENS = function (ens) {
    return ens && ens.length > 25
        ? ens.substring(0, 11) + '...' + ens.substring(ens.length - 11)
        : ens;
};
