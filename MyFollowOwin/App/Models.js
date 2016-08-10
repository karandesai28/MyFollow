"use strict";
var OwnerRequestStates;
(function (OwnerRequestStates) {
    OwnerRequestStates[OwnerRequestStates["Pending"] = 0] = "Pending";
    OwnerRequestStates[OwnerRequestStates["Approved"] = 1] = "Approved";
    OwnerRequestStates[OwnerRequestStates["Rejected"] = 2] = "Rejected";
})(OwnerRequestStates || (OwnerRequestStates = {}));
var OwnerModel = (function () {
    function OwnerModel() {
        this.OwnerStates = OwnerRequestStates.Pending;
    }
    return OwnerModel;
}());
exports.OwnerModel = OwnerModel;
//# sourceMappingURL=Models.js.map