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
(function (Media) {
    Media[Media["Pictures"] = 0] = "Pictures";
    Media[Media["videos"] = 1] = "videos";
    Media[Media["GIF"] = 2] = "GIF";
})(exports.Media || (exports.Media = {}));
var Media = exports.Media;
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
var ProductUpdate = (function () {
    function ProductUpdate() {
    }
    return ProductUpdate;
}());
exports.ProductUpdate = ProductUpdate;
//# sourceMappingURL=Models.js.map