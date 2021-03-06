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
    Media[Media["Videos"] = 1] = "Videos";
    Media[Media["Audio"] = 2] = "Audio";
})(exports.Media || (exports.Media = {}));
var Media = exports.Media;
var OwnerModel = (function () {
    function OwnerModel() {
        this.OwnerStates = OwnerRequestStates.Pending;
    }
    return OwnerModel;
}());
exports.OwnerModel = OwnerModel;
var CommonProperty = (function () {
    function CommonProperty() {
    }
    return CommonProperty;
}());
exports.CommonProperty = CommonProperty;
var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
}());
exports.UserModel = UserModel;
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
var Followers = (function () {
    function Followers() {
    }
    return Followers;
}());
exports.Followers = Followers;
var AddMedia = (function () {
    function AddMedia() {
    }
    return AddMedia;
}());
exports.AddMedia = AddMedia;
//# sourceMappingURL=Models.js.map