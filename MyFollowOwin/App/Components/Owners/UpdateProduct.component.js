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
var AddMedia_Component_1 = require('./../Owners/AddMedia.Component');
var UpdateProduct = (function () {
    function UpdateProduct(productservice) {
        this.productservice = productservice;
        this.Click = true; //Variable to show hide form
        this.Hide = false; //Variable to hide form on submit button click
        this.addmedia = false; //Variable that saves state of user's permission of whether he wants to add media or not
        this.productupdate = new Models_1.ProductUpdate();
        this.productupdates = new Array();
        this.addMedia = new Models_1.AddMedia();
        this.addMedias = new Array();
    }
    UpdateProduct.prototype.ngOnInit = function () {
    };
    UpdateProduct.prototype.onSubmit = function (productupdate) {
        var _this = this;
        this.productupdate.ProductId = this.productId;
        this.UpdateProducts();
        this.Hide = true;
        this.Click = false;
        this.showmediaform = this.addmedia;
        this.productupdate = new Models_1.ProductUpdate();
        setTimeout(function () { return _this.Click = true; }, 0.5);
    };
    //Service method that saves updates
    UpdateProduct.prototype.UpdateProducts = function () {
        this.productservice.UpdateProduct(this.productupdate)
            .subscribe(function (response) { console.log("Success Response" + response); }, function (error) { console.log("Error happened" + error); }, function () { });
    };
    //Method which handles the checkbox click event that ask users whether they want to attach media or not
    UpdateProduct.prototype.Yes = function (value) {
        if (value.target.checked == true) {
            this.addmedia = true;
        }
    };
    __decorate([
        //Variable to invoke media form component
        core_1.Input(), 
        __metadata('design:type', Number)
    ], UpdateProduct.prototype, "productId", void 0);
    UpdateProduct = __decorate([
        core_1.Component({
            selector: 'update-product',
            providers: [Service_1.Service],
            directives: [AddMedia_Component_1.AddMediaComponent],
            templateUrl: 'App/ClientSideViews/Owners/UpdateProduct.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], UpdateProduct);
    return UpdateProduct;
}());
exports.UpdateProduct = UpdateProduct;
//# sourceMappingURL=UpdateProduct.component.js.map