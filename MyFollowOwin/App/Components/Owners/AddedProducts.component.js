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
var EditProduct_component_1 = require('./../Owners/EditProduct.component');
var UpdateProduct_component_1 = require('./../Owners/UpdateProduct.component');
var AddedProducts = (function () {
    function AddedProducts(productservice) {
        this.productservice = productservice;
        this.productplatform = Models_1.Platform;
        this.Click = false;
        this.Edit = false;
        this.Update = false;
        this.products = new Array();
        this.product = new Models_1.ProductModel();
        this.productupdate = new Models_1.ProductUpdate();
    }
    AddedProducts.prototype.ngOnChanges = function () {
        alert("I am here");
        this.getProducts();
    };
    AddedProducts.prototype.clicked = function () {
        this.Click = true;
    };
    AddedProducts.prototype.EditClicked = function (ProductId) {
        this.Edit = true;
        this.ProductId = ProductId;
    };
    AddedProducts.prototype.DeleteClicked = function (ProductId) {
        this.product.Id = ProductId;
        this.DeleteProducts();
    };
    AddedProducts.prototype.UpdateClicked = function (ProductId) {
        this.ProductId = ProductId;
        this.Update = true;
        this.productupdate.ProductId = ProductId;
    };
    AddedProducts.prototype.ngOnInit = function () {
        this.getProducts();
    };
    AddedProducts.prototype.getProducts = function () {
        var _this = this;
        this.productservice.getAddedProduct()
            .subscribe(function (products) {
            _this.products = products;
        }, function (err) {
            _this.errorMessage = err;
        });
    };
    AddedProducts.prototype.DeleteProducts = function () {
        this.productservice.DeleteProduct(this.product).subscribe(function (res) {
        });
    };
    AddedProducts = __decorate([
        core_1.Component({
            selector: 'added-products',
            providers: [Service_1.Service],
            directives: [EditProduct_component_1.EditProduct, UpdateProduct_component_1.UpdateProduct],
            templateUrl: 'App/Client Side Views/Owners/AddedProducts.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], AddedProducts);
    return AddedProducts;
}());
exports.AddedProducts = AddedProducts;
//# sourceMappingURL=AddedProducts.component.js.map