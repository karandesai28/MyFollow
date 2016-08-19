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
var Service = (function () {
    function Service(http) {
        this.http = http;
        this.ownerUrl = 'api/ProductOwners/';
        this.productUrl = 'api/Products/';
        this.addedproductUrl = 'api/OwnerProductMappings/';
        this.followUrl = 'api/Followers/';
        this.updateUrl = 'api/ProductUpdates/';
    }
    Service.prototype.getPendingOwners = function () {
        return this.http.get(this.ownerUrl)
            .map(function (response) { return response.json(); });
    };
    Service.prototype.UpdateOwnerState = function (ownerobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.put(this.ownerUrl + ownerobj.Id, JSON.stringify(ownerobj), { headers: headers }).map(function (res) { return res.json(); });
    };
    Service.prototype.AddOwner = function (ownerobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.ownerUrl, JSON.stringify(ownerobj), { headers: headers }).map(function (res) { return res.json(); });
    };
    Service.prototype.AddProduct = function (productobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.productUrl, JSON.stringify(productobj), { headers: headers }).map(function (res) { return res.json(); });
    };
    Service.prototype.getProduct = function () {
        return this.http.get(this.productUrl)
            .map(function (response) { return response.json(); });
    };
    Service.prototype.getAddedProduct = function () {
        return this.http.get(this.addedproductUrl)
            .map(function (response) { return response.json(); });
    };
    Service.prototype.EditProduct = function (productobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.put(this.productUrl + productobj.Id, JSON.stringify(productobj), { headers: headers }).map(function (res) { return res.json(); });
    };
    Service.prototype.DeleteProduct = function (productobj) {
        return this.http.delete(this.productUrl + productobj.Id);
    };
    Service.prototype.FollowProduct = function (productobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.followUrl + productobj.Id, JSON.stringify(productobj.Id), { headers: headers }).map(function (res) { return res.json(); });
    };
    Service.prototype.UpdateProduct = function (productobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.updateUrl + productobj.ProductId, JSON.stringify(productobj), { headers: headers }).map(function (res) { return res.json(); });
    };
    Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Service);
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=Service.js.map