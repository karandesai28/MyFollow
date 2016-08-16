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
var Models_1 = require('./../Shared/Models');
var Service_1 = require('./../Shared/Service');
var ProductList_component_1 = require('./../EndUsers/ProductList.component');
var OwnerComponent = (function () {
    function OwnerComponent(ownerservice) {
        this.ownerservice = ownerservice;
        this.Click = false;
        this.owners = new Array();
        this.owner = new Models_1.OwnerModel();
    }
    OwnerComponent.prototype.hide = function () {
        this.hideclicked = true;
    };
    OwnerComponent.prototype.hideform = function () {
        this.hideownerform = true;
    };
    OwnerComponent.prototype.clicked = function () {
        this.Click = true;
    };
    OwnerComponent.prototype.ngOnInit = function () {
    };
    OwnerComponent.prototype.clean = function () {
        this.owner.CompanyName = "";
        this.owner.Description = "";
        this.owner.FoundedYear = null;
        this.owner.WebsiteUrl = "";
    };
    OwnerComponent.prototype.onSubmit = function (owner) {
        console.log(owner.CompanyName);
        console.log(owner.Description);
        console.log(owner.FoundedYear);
        console.log(owner.WebsiteUrl);
        console.log(owner.OwnerStates);
        this.AddOwnerData();
        this.clean();
    };
    OwnerComponent.prototype.AddOwnerData = function () {
        var _this = this;
        this.ownerservice.AddOwner(this.owner)
            .subscribe(function (owners) {
            _this.owners = owners;
        }, function (err) {
            _this.errorMessage = err;
        });
    };
    OwnerComponent = __decorate([
        core_1.Component({
            selector: 'owner-form',
            providers: [Service_1.Service],
            directives: [ProductList_component_1.ProductList],
            templateUrl: 'App/EndUsers/OwnerForm.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], OwnerComponent);
    return OwnerComponent;
}());
exports.OwnerComponent = OwnerComponent;
//# sourceMappingURL=OwnerForm.component.js.map