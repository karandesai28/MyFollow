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
var ViewUpdates_component_1 = require('./../EndUsers/ViewUpdates.component');
var ProductList = (function () {
    function ProductList(productservice) {
        this.productservice = productservice;
        this.hidebutton = [];
        this.productplatform = Models_1.Platform;
        this.update = [];
        this.j = 0;
        this.k = 0;
        this.updateclicked = false;
        this.products = new Array();
        this.product = new Models_1.ProductModel();
    }
    ProductList.prototype.ngOnInit = function () {
        this.getProducts();
    };
    ProductList.prototype.Follow = function (productobj) {
        this.hidebutton[productobj.Id] = true;
        this.update[productobj.Id] = true;
        this.FollowProducts(productobj);
        this.product = productobj;
        this.count = this.hidebutton.length;
        for (this.i = 0; this.i < this.count; this.i++) {
            if (this.hidebutton[this.i] == true) {
                this.sf[this.j] = this.i;
                this.j++;
            }
        }
        this.StayFollowed();
    };
    ProductList.prototype.StayFollowed = function () {
        this.count = this.sf.length;
        for (this.i = 0; this.i < this.count; this.i++) {
            if (this.sf[this.i] == this.k) {
                this.hidebutton[this.k] = true;
            }
            this.k++;
        }
    };
    ProductList.prototype.Unfollow = function (productobj) {
        this.hidebutton[productobj.Id] = false;
        this.update[productobj.Id] = false;
    };
    ProductList.prototype.ProductUpdates = function (productobj) {
        this.updateclicked = true;
        this.ProductId = productobj.Id;
    };
    ProductList.prototype.getProducts = function () {
        var _this = this;
        var displayOwner = this.productservice.getProduct()
            .subscribe(function (products) {
            _this.products = products;
        }, function (err) {
            _this.errorMessage = err;
        });
    };
    ProductList.prototype.FollowProducts = function (productobj) {
        var _this = this;
        this.productservice.FollowProduct(productobj)
            .subscribe(function (products) {
            _this.products = products;
            _this.getProducts();
        }, function (err) {
            _this.errorMessage = err;
        });
    };
    ProductList = __decorate([
        core_1.Component({
            selector: 'product-list',
            directives: [ViewUpdates_component_1.ViewUpdates],
            providers: [Service_1.Service],
            templateUrl: 'App/EndUsers/ProductList.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], ProductList);
    return ProductList;
}());
exports.ProductList = ProductList;
//# sourceMappingURL=ProductList.component.js.map