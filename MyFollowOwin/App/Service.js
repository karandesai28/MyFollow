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
var OwnerService = (function () {
    function OwnerService(http) {
        this.http = http;
        this.ownerUrl = 'api/ProductOwners/';
        this.userUrl = 'api/ApplicationUsers/';
    }
    OwnerService.prototype.getUserId = function () {
        return this.http.get(this.userUrl)
            .map(function (response) { return response.json(); });
    };
    OwnerService.prototype.AddOwner = function (ownerobj) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.ownerUrl, JSON.stringify(ownerobj), { headers: headers }).map(function (res) { return res.json(); });
    };
    OwnerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OwnerService);
    return OwnerService;
}());
exports.OwnerService = OwnerService;
//# sourceMappingURL=Service.js.map