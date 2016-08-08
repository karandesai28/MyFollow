"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var Models_1 = require('./Models');
var Service_1 = require('./Service');
var OwnerForm = (function () {
    function OwnerForm() {
    }
    OwnerForm.prototype.onSubmit = function (obj) {
        var _this = this;
        alert("saved!!! " + JSON.stringify(obj));
        obj = new Models_1.OwnerModel();
        console.log(obj);
        console.log(obj.CompanyName);
        var postOwner = this.ownerservice.AddOwner(obj)
            .subscribe(function (owners) {
            _this.owners = owners;
        }, function (err) {
            _this.errorMessage = err;
            console.log(_this.errorMessage);
        });
    };
    OwnerForm = __decorate([
        core_1.Component({
            selector: 'owner-form',
            directives: [common_1.FORM_DIRECTIVES],
            providers: [Service_1.OwnerService],
            templateUrl: 'App/Owner/OwnerForm.html'
        }), 
        __metadata('design:paramtypes', [])
    ], OwnerForm);
    return OwnerForm;
}());
exports.OwnerForm = OwnerForm;
//# sourceMappingURL=OwnerForm.js.map