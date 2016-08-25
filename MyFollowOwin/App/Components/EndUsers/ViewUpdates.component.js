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
var ViewUpdates = (function () {
    function ViewUpdates(productservice) {
        this.productservice = productservice;
        this.show = false;
        this.productplatform = Models_1.Platform;
        this.products = new Array();
        this.product = new Models_1.ProductModel();
        this.productupdate = new Models_1.ProductUpdate();
        this.productupdates = new Array();
    }
    ViewUpdates.prototype.ngOnChanges = function () {
        if (this.productId != null) {
            var update = this.getUpdates(this.productId);
            if (update != null) {
                this.ViewData();
            }
            else {
                this.getProducts(this.productId);
                this.message = "Owner has not added any updates for this product yet!";
                this.show = true;
            }
        }
        else {
            console.log("Invalid");
        }
    };
    ViewUpdates.prototype.ngOnDestroy = function () { console.log("destroyed"); };
    ViewUpdates.prototype.ngOnInit = function () {
    };
    ViewUpdates.prototype.ViewData = function () {
        this.product.Id = this.productId;
        this.getProducts(this.productId);
        this.getUpdates(this.productId);
        this.productupdate.ImagePath;
        this.ngOnDestroy();
    };
    ViewUpdates.prototype.getProducts = function (productId) {
        var _this = this;
        this.productservice.getProductById(productId)
            .subscribe(function (products) {
            _this.product = products;
        }, function (err) {
            _this.errorMessage = err;
        });
    };
    ViewUpdates.prototype.getUpdates = function (productId) {
        var _this = this;
        this.productservice.getProductUpdates(productId)
            .subscribe(function (productupdates) {
            _this.productupdate = productupdates;
        }, function (err) {
            _this.errorMessage = err;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ViewUpdates.prototype, "productId", void 0);
    ViewUpdates = __decorate([
        core_1.Component({
            selector: 'view-update',
            providers: [Service_1.Service],
            templateUrl: 'App/Client Side Views/EndUsers/ViewUpdates.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], ViewUpdates);
    return ViewUpdates;
}());
exports.ViewUpdates = ViewUpdates;
//# sourceMappingURL=ViewUpdates.component.js.map