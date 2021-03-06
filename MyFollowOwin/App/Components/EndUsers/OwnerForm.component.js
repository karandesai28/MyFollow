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
var router_1 = require('@angular/router');
var OwnerComponent = (function () {
    function OwnerComponent(ownerservice) {
        this.ownerservice = ownerservice;
        this.hideownerform = false; //Variable to hide the form and display message
        this.owners = new Array();
        this.owner = new Models_1.OwnerModel();
    }
    OwnerComponent.prototype.ngOnInit = function () {
    };
    //Handles form submission
    OwnerComponent.prototype.onSubmit = function (owner) {
        this.hideownerform = true;
        this.AddOwnerData();
    };
    //Service method to post request of owner
    OwnerComponent.prototype.AddOwnerData = function () {
        this.ownerservice.AddOwner(this.owner)
            .subscribe(function (response) { console.log("Success Response" + response); }, function (error) { console.log("Error happened" + error); }, function () { });
    };
    OwnerComponent = __decorate([
        core_1.Component({
            selector: 'owner-form',
            providers: [Service_1.Service],
            directives: [ProductList_component_1.ProductList, router_1.ROUTER_DIRECTIVES],
            templateUrl: 'App/ClientSideViews/EndUsers/OwnerForm.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], OwnerComponent);
    return OwnerComponent;
}());
exports.OwnerComponent = OwnerComponent;
//# sourceMappingURL=OwnerForm.component.js.map