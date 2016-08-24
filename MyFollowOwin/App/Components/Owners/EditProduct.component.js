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
var EditProduct = (function () {
    function EditProduct(productservice) {
        this.productservice = productservice;
        this.Hide = false;
        this.products = new Array();
        this.product = new Models_1.ProductModel();
    }
    EditProduct.prototype.ngOnInit = function () {
    };
    EditProduct.prototype.onSubmit = function (product) {
        this.Hide = true;
        this.product.Id = this.productId;
        console.log(this.product);
        this.EditProductData();
        alert("Product Edited");
    };
    EditProduct.prototype.EditProductData = function () {
        this.productservice.EditProduct(this.product)
            .subscribe(function (response) { console.log("Success Response" + response); }, function (error) { console.log("Error happened" + error); }, function () { });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], EditProduct.prototype, "productId", void 0);
    EditProduct = __decorate([
        core_1.Component({
            selector: 'edit-product',
            providers: [Service_1.Service],
            templateUrl: 'App/Client Side Views/Owners/EditProduct.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], EditProduct);
    return EditProduct;
}());
exports.EditProduct = EditProduct;
//# sourceMappingURL=EditProduct.component.js.map