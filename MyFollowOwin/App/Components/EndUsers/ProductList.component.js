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
        this.updateclicked = false;
        this.products = new Array();
        this.product = new Models_1.ProductModel();
        this.follower = new Models_1.Followers();
        this.followers = new Array();
    }
    ProductList.prototype.ngOnInit = function () {
        this.getProducts();
    };
    ProductList.prototype.Follow = function (productobj) {
        //this.follower.StatusBit = true;
        this.hidebutton[productobj.Id] = true;
        this.update[productobj.Id] = true;
        this.FollowProducts(productobj);
        this.product = productobj;
    };
    ProductList.prototype.Unfollow = function (productobj) {
        this.hidebutton[productobj.Id] = false;
        this.UnfollowFollowers(productobj.Id);
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
            _this.getFollowProducts();
        }, function (err) {
            _this.errorMessage = err;
        }, function () {
        });
    };
    ProductList.prototype.FollowProducts = function (productobj) {
        var _this = this;
        this.productservice.FollowProduct(productobj)
            .subscribe(function (response) { console.log("Success Response" + response); }, function (error) { console.log("Error happened" + error); }, function () {
            _this.getFollowProducts();
            _this.getProducts();
        });
    };
    ProductList.prototype.getFollowProducts = function () {
        var _this = this;
        this.productservice.getFollowBit()
            .subscribe(function (followers) {
            _this.followers = followers;
        }, function (err) {
            _this.errorMessage = err;
        }, function () {
            //alert(this.followers);
            for (var _i = 0, _a = _this.followers; _i < _a.length; _i++) {
                var follower = _a[_i];
                _this.hidebutton[follower.ProductId] = true;
                _this.update[follower.ProductId] = true;
            }
        });
    };
    ProductList.prototype.UnfollowFollowers = function (productId) {
        var _this = this;
        this.productservice.DeleteFollower(productId)
            .subscribe(function (response) {
            console.log("Success Response" + response);
        }, function (error) { console.log("Error happened" + error); }, function () {
            _this.getProducts();
        });
    };
    ProductList = __decorate([
        core_1.Component({
            selector: 'product-list',
            directives: [ViewUpdates_component_1.ViewUpdates],
            providers: [Service_1.Service],
            templateUrl: 'App/Client Side Views/EndUsers/ProductList.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], ProductList);
    return ProductList;
}());
exports.ProductList = ProductList;
//# sourceMappingURL=ProductList.component.js.map