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
var AddedProducts_component_1 = require('./../Owners/AddedProducts.component');
var AddProduct = (function () {
    function AddProduct(productservice) {
        this.productservice = productservice;
        this.Click = false;
        this.products = new Array();
        this.product = new Models_1.ProductModel();
    }
    AddProduct.prototype.clicked = function () {
        this.Click = true;
    };
    AddProduct.prototype.ngOnInit = function () {
    };
    AddProduct.prototype.clean = function () {
        this.product = null;
    };
    AddProduct.prototype.onSubmit = function (product) {
        console.log(product.Name);
        console.log(product.Description);
        console.log(product.HomepageUrl);
        console.log(product.PlayStoreUrl);
        console.log(product.AppStoreUrl);
        this.AddProductData();
        this.clean;
    };
    AddProduct.prototype.AddProductData = function () {
        var _this = this;
        this.productservice.AddProduct(this.product)
            .subscribe(function (products) {
            _this.products = products;
        }, function (err) {
            _this.errorMessage = err;
        });
    };
    AddProduct = __decorate([
        core_1.Component({
            selector: 'add-product',
            providers: [Service_1.Service],
            directives: [AddedProducts_component_1.AddedProducts],
            templateUrl: 'App/Owners/AddProduct.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], AddProduct);
    return AddProduct;
}());
exports.AddProduct = AddProduct;
//# sourceMappingURL=AddProduct.component.js.map