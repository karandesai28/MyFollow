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
var Service = (function () {
    function Service(http) {
        this.http = http;
        this.ownerUrl = 'api/ProductOwners/';
        this.productUrl = 'api/Products/';
        this.followUrl = 'api/Followers/';
        this.addedproductUrl = 'api/OwnerProductMappings/';
        this.updateUrl = 'api/ProductUpdates/';
        this.userUrl = 'api/ApplicationUsers/';
        this.mediaUrl = 'api/AddMedias/';
    }
    Service.prototype.getPendingOwners = function () {
        return this.http.get(this.ownerUrl)
            .map(function (response) { return response.json(); });
    };
    Service.prototype.UpdateOwnerState = function (ownerobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.put(this.ownerUrl + ownerobj.Id, JSON.stringify(ownerobj), { headers: headers });
    };
    Service.prototype.AddOwner = function (ownerobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.ownerUrl, JSON.stringify(ownerobj), { headers: headers });
    };
    Service.prototype.AddProduct = function (productobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.productUrl, JSON.stringify(productobj), { headers: headers });
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
        return this.http.put(this.productUrl + productobj.Id, JSON.stringify(productobj), { headers: headers });
    };
    Service.prototype.DeleteProduct = function (productobj) {
        return this.http.delete(this.productUrl + productobj.Id);
    };
    Service.prototype.FollowProduct = function (productobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.followUrl + productobj.Id, JSON.stringify(productobj.Id), { headers: headers });
    };
    Service.prototype.UpdateProduct = function (productobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.updateUrl + productobj.ProductId, JSON.stringify(productobj), { headers: headers });
    };
    Service.prototype.getProductUpdates = function (productId) {
        return this.http.get(this.updateUrl + productId)
            .map(function (response) { return response.json(); });
    };
    Service.prototype.getProductById = function (productId) {
        return this.http.get(this.productUrl + productId)
            .map(function (response) { return response.json(); });
    };
    Service.prototype.getUsers = function () {
        return this.http.get(this.userUrl)
            .map(function (response) { return response.json(); });
    };
    Service.prototype.getFollowBit = function () {
        return this.http.get(this.followUrl)
            .map(function (response) { return response.json(); });
    };
    Service.prototype.DeleteFollower = function (productId) {
        return this.http.delete(this.followUrl + productId);
    };
    Service.prototype.getCount = function () {
        return this.http.get(this.mediaUrl)
            .map(function (response) { return response.json(); });
    };
    Service.prototype.getMedia = function (UpdateId) {
        return this.http.get(this.mediaUrl + UpdateId)
            .map(function (response) { return response.json(); });
    };
    Service.prototype.PostMedia = function (media) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.mediaUrl, JSON.stringify(media), { headers: headers });
    };
    Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Service);
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=Service.js.map