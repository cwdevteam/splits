export var roundToDecimals = function (num, decimals) {
    var multiplier = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
};
