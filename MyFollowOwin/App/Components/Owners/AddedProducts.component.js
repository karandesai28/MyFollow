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
var ViewUpdates_component_1 = require('./../EndUsers/ViewUpdates.component');
var AddedProducts = (function () {
    function AddedProducts(productservice) {
        this.productservice = productservice;
        this.productplatform = Models_1.Platform;
        this.hidebutton = [];
        this.update = [];
        this.urowner = [];
        this.updateclicked = false;
        this.Click = false;
        this.Edit = false;
        this.Update = false;
        this.products = new Array();
        this.product = new Models_1.ProductModel();
        this.productupdate = new Models_1.ProductUpdate();
        this.follower = new Models_1.Followers();
        this.followers = new Array();
        this.productobjects = new Array();
        this.productobject = new Models_1.ProductModel();
        this.productupdates = new Array();
        this.productupdateobj = new Models_1.ProductUpdate();
    }
    AddedProducts.prototype.ngOnChanges = function () {
        if (this.productobj != null) {
            this.getProducts();
            this.getProductsToFollow();
        }
        else {
            console.log("first time loading");
        }
    };
    AddedProducts.prototype.clicked = function () {
        this.Click = true;
    };
    AddedProducts.prototype.EditClicked = function (Product) {
        this.Edit = true;
        this.product = Product;
    };
    AddedProducts.prototype.DeleteClicked = function (ProductId) {
        this.product.Id = ProductId;
        this.DeleteProducts();
    };
    AddedProducts.prototype.ViewUpdateClicked = function (ProductId) {
        this.product.Id = ProductId;
        this.ProductId = ProductId;
        this.UpdateClicked[ProductId] = true;
        this.updateclicked = true;
    };
    AddedProducts.prototype.UpdateClicked = function (ProductId) {
        this.ProductId = ProductId;
        this.Update = true;
        this.productupdate.ProductId = ProductId;
    };
    AddedProducts.prototype.ngOnInit = function () {
        this.getProducts();
        this.getProductsToFollow();
    };
    AddedProducts.prototype.getProducts = function () {
        var _this = this;
        this.productservice.getAddedProduct()
            .subscribe(function (products) {
            _this.products = products;
        }, function (err) {
            _this.errorMessage = err;
        }, function () {
            _this.getFollowProducts();
            _this.getProductsToFollow();
        });
    };
    AddedProducts.prototype.DeleteProducts = function () {
        var _this = this;
        this.productservice.DeleteProduct(this.product)
            .subscribe(function (response) {
            console.log("Success Response" + response);
        }, function (error) { console.log("Error happened" + error); }, function () {
            _this.getProducts();
        });
    };
    AddedProducts.prototype.getProductsToFollow = function () {
        var _this = this;
        var displayOwner = this.productservice.getProduct()
            .subscribe(function (products) {
            _this.productobjects = products;
        }, function (err) {
            _this.errorMessage = err;
        }, function () {
            for (var _i = 0, _a = _this.productobjects; _i < _a.length; _i++) {
                var product = _a[_i];
                for (var _b = 0, _c = _this.products; _b < _c.length; _b++) {
                    var addedproduct = _c[_b];
                    if (product.Id == addedproduct.Id) {
                        _this.urowner[addedproduct.Id] = true;
                    }
                }
            }
        });
    };
    AddedProducts.prototype.getFollowProducts = function () {
        var _this = this;
        this.productservice.getFollowBit()
            .subscribe(function (followers) {
            _this.followers = followers;
        }, function (err) {
            _this.errorMessage = err;
        }, function () {
            for (var _i = 0, _a = _this.followers; _i < _a.length; _i++) {
                var follower = _a[_i];
                _this.hidebutton[follower.ProductId] = true;
                _this.update[follower.ProductId] = true;
            }
        });
    };
    AddedProducts.prototype.Follow = function (productobj) {
        //this.follower.StatusBit = true;
        this.hidebutton[productobj.Id] = true;
        this.update[productobj.Id] = true;
        this.FollowProducts(productobj);
        this.product = productobj;
    };
    AddedProducts.prototype.FollowProducts = function (productobj) {
        var _this = this;
        this.productservice.FollowProduct(productobj)
            .subscribe(function (response) { console.log("Success Response" + response); }, function (error) { console.log("Error happened" + error); }, function () {
            _this.getFollowProducts();
            _this.getProducts();
        });
    };
    AddedProducts.prototype.Unfollow = function (productobj) {
        this.hidebutton[productobj.Id] = false;
        this.UnfollowFollowers(productobj.Id);
        this.update[productobj.Id] = false;
    };
    AddedProducts.prototype.UnfollowFollowers = function (productId) {
        var _this = this;
        this.productservice.DeleteFollower(productId)
            .subscribe(function (response) {
            console.log("Success Response" + response);
        }, function (error) { console.log("Error happened" + error); }, function () {
            _this.getProducts();
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Models_1.ProductModel)
    ], AddedProducts.prototype, "productobj", void 0);
    AddedProducts = __decorate([
        core_1.Component({
            selector: 'added-products',
            providers: [Service_1.Service],
            directives: [EditProduct_component_1.EditProduct, UpdateProduct_component_1.UpdateProduct, ViewUpdates_component_1.ViewUpdates],
            templateUrl: 'App/Client Side Views/Owners/AddedProducts.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], AddedProducts);
    return AddedProducts;
}());
exports.AddedProducts = AddedProducts;
//# sourceMappingURL=AddedProducts.component.js.map