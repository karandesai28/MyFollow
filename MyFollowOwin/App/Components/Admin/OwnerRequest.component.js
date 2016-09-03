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
        this.owners = new Array();
        this.owner = new Models_1.OwnerModel();
        this.user = new Models_1.UserModel();
        this.users = new Array();
    }
    OwnerRequest.prototype.ngOnInit = function () {
        this.pendingOwners();
    };
    //Invokes if accept button is clicked
    OwnerRequest.prototype.Approve = function (ownerId) {
        this.owner.Id = ownerId;
        this.owner.OwnerStates = Models_1.OwnerRequestStates.Approved;
        this.UpdateOwnerData();
    };
    //Invokes if reject button is clicked
    OwnerRequest.prototype.Reject = function (ownerId) {
        this.owner.Id = ownerId;
        this.owner.OwnerStates = Models_1.OwnerRequestStates.Rejected;
        this.UpdateOwnerData();
    };
    //Service method to get list of pending owners
    OwnerRequest.prototype.pendingOwners = function () {
        var _this = this;
        this.ownerservice.getPendingOwners()
            .subscribe(function (owners) {
            _this.owners = owners;
        }, function (err) {
            _this.errorMessage = err;
        }, function () { _this.getRelatedUsers(); });
    };
    //Service method to get list of user records of pending owners from user table
    OwnerRequest.prototype.getRelatedUsers = function () {
        var _this = this;
        this.ownerservice.getUsers()
            .subscribe(function (users) {
            _this.users = users;
        }, function (err) {
            _this.errorMessage = err;
        });
    };
    //Service method to change the owner table entry and role as per accept/reject
    OwnerRequest.prototype.UpdateOwnerData = function () {
        var _this = this;
        var ownerupdate = this.ownerservice.UpdateOwnerState(this.owner)
            .subscribe(function (response) { console.log("Success Response" + response); }, function (error) { console.log("Error happened" + error); }, function () { _this.pendingOwners(); });
    };
    OwnerRequest = __decorate([
        core_1.Component({
            selector: 'owner-requests',
            providers: [Service_1.Service],
            templateUrl: 'App/ClientSideViews/Admin/OwnerRequest.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], OwnerRequest);
    return OwnerRequest;
}());
exports.OwnerRequest = OwnerRequest;
//# sourceMappingURL=OwnerRequest.component.js.map