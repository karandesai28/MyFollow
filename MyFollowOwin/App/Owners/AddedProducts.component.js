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
var Service_1 = require('./../Shared/Service');
var Models_1 = require('./../Shared/Models');
var AddedProducts = (function () {
    function AddedProducts(productservice) {
        this.productservice = productservice;
        this.Click = false;
        this.products = new Array();
        this.product = new Models_1.Product();
    }
    AddedProducts.prototype.clicked = function () {
        this.Click = true;
    };
    AddedProducts.prototype.ngOnInit = function () {
        this.getProducts();
    };
    AddedProducts.prototype.getProducts = function () {
        var _this = this;
        var displayOwner = this.productservice.getProduct()
            .subscribe(function (products) {
            _this.products = products;
        }, function (err) {
            _this.errorMessage = err;
        });
    };
    AddedProducts = __decorate([
        core_1.Component({
            selector: 'added-products',
            providers: [Service_1.Service],
            templateUrl: 'App/Owners/AddedProducts.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], AddedProducts);
    return AddedProducts;
}());
exports.AddedProducts = AddedProducts;
//# sourceMappingURL=AddedProducts.component.js.map