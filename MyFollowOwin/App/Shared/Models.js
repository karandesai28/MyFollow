"use strict";
(function (OwnerRequestStates) {
    OwnerRequestStates[OwnerRequestStates["Pending"] = 0] = "Pending";
    OwnerRequestStates[OwnerRequestStates["Approved"] = 1] = "Approved";
    OwnerRequestStates[OwnerRequestStates["Rejected"] = 2] = "Rejected";
})(exports.OwnerRequestStates || (exports.OwnerRequestStates = {}));
var OwnerRequestStates = exports.OwnerRequestStates;
(function (Platform) {
    Platform[Platform["Mobile"] = 0] = "Mobile";
    Platform[Platform["Web"] = 1] = "Web";
    Platform[Platform["IOT"] = 2] = "IOT";
})(exports.Platform || (exports.Platform = {}));
var Platform = exports.Platform;
var OwnerModel = (function () {
    function OwnerModel() {
        this.OwnerStates = OwnerRequestStates.Pending;
    }
    return OwnerModel;
}());
exports.OwnerModel = OwnerModel;
var ProductModel = (function () {
    function ProductModel() {
    }
    return ProductModel;
}());
exports.ProductModel = ProductModel;
//# sourceMappingURL=Models.js.map