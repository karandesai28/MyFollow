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
var router_1 = require('@angular/router');
var ProductList = (function () {
    function ProductList(productservice) {
        this.productservice = productservice;
        this.hidebutton = []; //Array whose value will decide the 'follow' or 'unfollow' button to stay on view.
        this.urowner = []; //Array whose value will print "Your Product" for owners viewing their own products in product list
        this.productplatform = Models_1.Platform;
        this.update = []; //Variable to show/hide Update button from view
        this.updateclicked = false; //Variable which invoke ViewUpdate's component selector on true.
        this.products = new Array();
        this.product = new Models_1.ProductModel();
        this.follower = new Models_1.Followers();
        this.followers = new Array();
        this.addedproduct = new Models_1.ProductModel();
        this.addedproducts = new Array();
    }
    ProductList.prototype.ngOnInit = function () {
        this.getProducts();
    };
    //Method which handles follow button click
    ProductList.prototype.Follow = function (productobj) {
        this.hidebutton[productobj.Id] = true;
        this.update[productobj.Id] = true;
        this.FollowProducts(productobj);
        this.product = productobj;
    };
    //Method which handles unfollow button click
    ProductList.prototype.Unfollow = function (productobj) {
        this.hidebutton[productobj.Id] = false;
        this.UnfollowFollowers(productobj.Id);
        this.update[productobj.Id] = false;
    };
    //Method which handles View update button
    ProductList.prototype.ProductUpdates = function (productobj) {
        this.updateclicked = true;
        this.ProductId = productobj.Id;
    };
    //Service method which gets product list
    ProductList.prototype.getProducts = function () {
        var _this = this;
        var displayOwner = this.productservice.getProduct()
            .subscribe(function (products) {
            _this.products = products;
            _this.getFollowProducts();
        }, function (err) {
            _this.errorMessage = err;
        }, function () { });
    };
    //If user is logged in as owner, this service method will give his added products as "Your Product" in list
    ProductList.prototype.getAddedProducts = function () {
        var _this = this;
        this.productservice.getAddedProduct()
            .subscribe(function (products) {
            _this.addedproducts = products;
        }, function (err) {
            _this.errorMessage = err;
        }, function () {
            for (var _i = 0, _a = _this.products; _i < _a.length; _i++) {
                var product = _a[_i];
                for (var _b = 0, _c = _this.addedproducts; _b < _c.length; _b++) {
                    var addedproduct = _c[_b];
                    if (product.Id == addedproduct.Id) {
                        _this.urowner[addedproduct.Id] = true;
                    }
                }
            }
        });
    };
    //Service method invoked when user clicks follow button
    ProductList.prototype.FollowProducts = function (productobj) {
        var _this = this;
        this.productservice.FollowProduct(productobj)
            .subscribe(function (response) { console.log("Success Response" + response); }, function (error) { console.log("Error happened" + error); }, function () {
            _this.getFollowProducts();
            _this.getProducts();
        });
    };
    //Service method invoked to get the earlier records of followed products of current logged in users 
    ProductList.prototype.getFollowProducts = function () {
        var _this = this;
        this.productservice.getFollowBit()
            .subscribe(function (followers) {
            _this.followers = followers;
            _this.getAddedProducts();
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
    //Service method invoked when unfollow button is clicked.
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
            directives: [ViewUpdates_component_1.ViewUpdates, router_1.ROUTER_DIRECTIVES],
            providers: [Service_1.Service],
            templateUrl: 'App/ClientSideViews/EndUsers/ProductList.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], ProductList);
    return ProductList;
}());
exports.ProductList = ProductList;
//# sourceMappingURL=ProductList.component.js.map