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
var UpdateProduct = (function () {
    function UpdateProduct(productservice) {
        this.productservice = productservice;
        this.Hide = false;
        this.uploadpic = false;
        this.uploadvideo = false;
        this.uploadgif = false;
        this.productupdate = new Models_1.ProductUpdate();
        this.productupdates = new Array();
    }
    UpdateProduct.prototype.ngOnInit = function () {
    };
    UpdateProduct.prototype.onSubmit = function (productupdate) {
        this.productupdate.ProductId = this.productId;
        console.log(this.productupdate);
        this.UpdateProducts();
        this.Hide = true;
        alert("Product Updated");
    };
    UpdateProduct.prototype.UpdateProducts = function () {
        this.productservice.UpdateProduct(this.productupdate)
            .subscribe(function (response) { console.log("Success Response" + response); }, function (error) { console.log("Error happened" + error); }, function () { });
    };
    UpdateProduct.prototype.UploadPic = function () {
        this.uploadpic = !this.uploadpic;
        this.productupdate.ProductMedia = Models_1.Media.Pictures;
    };
    UpdateProduct.prototype.UploadVideo = function () {
        this.uploadvideo = !this.uploadvideo;
        this.productupdate.ProductMedia = Models_1.Media.videos;
    };
    UpdateProduct.prototype.UploadGif = function () {
        this.uploadgif = !this.uploadgif;
        this.productupdate.ProductMedia = Models_1.Media.GIF;
        console.log(this.productupdate);
    };
    UpdateProduct.prototype.PicUpload = function (path) {
        var reader = new FileReader();
        this.productupdate.ImagePath = path.target.value;
        //reader.onload = (e) => {
        //    this.productupdate.ImagePath = e.target.result;
        //}
        //this.productupdate.ImagePath = path.target.result;
        //    console.log(reader.readAsDataURL(path.target.files[0]));
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], UpdateProduct.prototype, "productId", void 0);
    UpdateProduct = __decorate([
        core_1.Component({
            selector: 'update-product',
            providers: [Service_1.Service],
            templateUrl: 'App/Client Side Views/Owners/UpdateProduct.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], UpdateProduct);
    return UpdateProduct;
}());
exports.UpdateProduct = UpdateProduct;
//# sourceMappingURL=UpdateProduct.component.js.map