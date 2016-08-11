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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.productUrl = 'api/Products/';
    }
    ProductService.prototype.AddProduct = function (productobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.productUrl, JSON.stringify(productobj), { headers: headers }).map(function (res) { return res.json(); });
    };
    ProductService.prototype.getProduct = function () {
        return this.http.get(this.productUrl)
            .map(function (response) { return response.json(); });
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map