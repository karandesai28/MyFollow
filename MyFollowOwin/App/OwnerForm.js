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
var Models_1 = require('./Models');
var Service_1 = require('./Service');
var ProductComponent_1 = require('./ProductComponent');
var OwnerComponent = (function () {
    function OwnerComponent(ownerservice) {
        this.ownerservice = ownerservice;
        this.Click = false;
        this.owners = new Array();
        this.owner = new Models_1.OwnerModel();
    }
    OwnerComponent.prototype.clicked = function () {
        this.Click = true;
    };
    OwnerComponent.prototype.ngOnInit = function () {
        var getId = this.ownerservice.getUserId();
        console.log(getId);
    };
    OwnerComponent.prototype.onSubmit = function (owner) {
        var _this = this;
        console.log(owner.CompanyName);
        console.log(owner.Description);
        console.log(owner.FoundedYear);
        console.log(owner.WebsiteUrl);
        this.ownerservice.AddOwner(this.owner)
            .subscribe(function (owners) {
            _this.owners = owners;
        }, function (err) {
            _this.errorMessage = err;
        });
    };
    OwnerComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [Service_1.OwnerService],
            directives: [ProductComponent_1.ProductList],
            templateUrl: 'App/Owner/OwnerForm.html'
        }), 
        __metadata('design:paramtypes', [Service_1.OwnerService])
    ], OwnerComponent);
    return OwnerComponent;
}());
exports.OwnerComponent = OwnerComponent;
//# sourceMappingURL=OwnerForm.js.map