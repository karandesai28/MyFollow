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
var OwnerRequest = (function () {
    function OwnerRequest(ownerservice) {
        this.ownerservice = ownerservice;
        this.Click = false;
        this.owners = new Array();
        this.owner = new Models_1.OwnerModel();
        if (this.Click == true) {
            this.pendingOwners();
        }
    }
    OwnerRequest.prototype.ngOnInit = function () {
        this.pendingOwners();
    };
    OwnerRequest.prototype.ngOnChanges = function () {
        alert("Removing record");
        if (this.Click == true) {
            this.pendingOwners();
            this.Click = false;
        }
    };
    OwnerRequest.prototype.pendingOwners = function () {
        var _this = this;
        this.ownerservice.getPendingOwners()
            .subscribe(function (owners) {
            _this.owners = owners;
        }, function (err) {
            _this.errorMessage = err;
        });
    };
    OwnerRequest.prototype.UpdateOwnerData = function () {
        var _this = this;
        this.ownerservice.UpdateOwnerState(this.owner)
            .subscribe(function (owners) {
            _this.owners = owners;
        }, function (err) {
            _this.errorMessage = err;
        });
        this.ngOnChanges();
    };
    OwnerRequest.prototype.Approve = function (ownerId) {
        this.Click = true;
        this.owner.Id = ownerId;
        this.owner.OwnerStates = 1;
        this.UpdateOwnerData();
    };
    OwnerRequest.prototype.Reject = function (ownerId) {
        this.Click = true;
        this.owner.Id = ownerId;
        this.owner.OwnerStates = 2;
        this.UpdateOwnerData();
    };
    OwnerRequest = __decorate([
        core_1.Component({
            selector: 'owner-requests',
            providers: [Service_1.Service],
            templateUrl: 'App/Client Side Views/Admin/OwnerRequest.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], OwnerRequest);
    return OwnerRequest;
}());
exports.OwnerRequest = OwnerRequest;
//# sourceMappingURL=OwnerRequest.component.js.map