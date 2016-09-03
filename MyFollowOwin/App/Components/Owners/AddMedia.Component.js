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
var AddMediaComponent = (function () {
    function AddMediaComponent(productservice) {
        this.productservice = productservice;
        this.addmedia = false; //Variable to show/hide form     
        this.alert = false; //Variable to display message if media uploaded is greather than 5
        this.responsecame = false; //Variable to show/hide message which tells user how many uploads are left.
        this.video = false; //Variable to show hide inner linked video radio button element
        this.pic = false; //Variable to show hide inner linked pic radio button element
        this.close = false;
        this.addMedia = new Models_1.AddMedia();
        this.addMedias = new Array();
    }
    AddMediaComponent.prototype.ngOnInit = function () {
    };
    //Method to handle submit button click
    AddMediaComponent.prototype.onSubmit = function () {
        this.findMedia();
    };
    //Method invokes on successful response of FindMedia() service method
    AddMediaComponent.prototype.submitMedia = function () {
        this.responsecame = true;
        if (this.count >= 5) {
            this.addmedia = !this.addmedia;
            this.alert = true;
        }
        else {
            this.AddMedia(this.addMedia);
        }
    };
    //Service method to save the attached media
    AddMediaComponent.prototype.AddMedia = function (addmedia) {
        var _this = this;
        this.productservice.PostMedia(addmedia)
            .subscribe(function (response) { console.log("Success Response" + response); }, function (error) { console.log("Error happened" + error); }, function () {
            _this.addmedia = true;
            _this.pic = false;
            _this.video = false;
            _this.addMedia = new Models_1.AddMedia();
            setTimeout(function () { return _this.addmedia = false; }, 0.1);
        });
    };
    //Method handling the click event of Pic Radio button
    AddMediaComponent.prototype.UploadPic = function (event) {
        if (event.target.checked == true) {
            this.pic = true;
            this.video = false;
            this.picDom = true;
            this.addMedia.ProductMedia = Models_1.Media.Pictures;
        }
    };
    //Method handling the click event of Video Radio Button
    AddMediaComponent.prototype.UploadVideo = function (event) {
        if (event.target.checked == true) {
            this.videoDom = true;
            this.pic = false;
            this.video = true;
            this.addMedia.ProductMedia = Models_1.Media.Videos;
        }
    };
    //Method handling the click event of Audio Radio button-PROTOTYPED-Demonstrational only!
    AddMediaComponent.prototype.UploadAudio = function () {
        this.pic = false;
        this.video = false;
        this.addMedia.ProductMedia = Models_1.Media.Audio;
    };
    //Method invoke on Image Upload.
    AddMediaComponent.prototype.Selected = function (event) {
        var _this = this;
        var file = event.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            _this.addMedia.Path = reader.result;
        };
        reader.readAsDataURL(file);
        console.log(this.addMedia);
    };
    //Service method to get number of attachments occured in current update. 
    AddMediaComponent.prototype.findMedia = function () {
        var _this = this;
        this.productservice.getCount()
            .subscribe(function (number) {
            _this.count = number;
        }, function (err) {
            _this.errorMessage = err;
        }, function () {
            _this.submitMedia();
        });
    };
    //Method to close the form if the user dont want to add more media.
    AddMediaComponent.prototype.Close = function () {
        this.close = true;
    };
    AddMediaComponent = __decorate([
        core_1.Component({
            selector: 'add-media',
            providers: [Service_1.Service],
            templateUrl: 'App/ClientSideViews/Owners/AddMedia.component.html'
        }), 
        __metadata('design:paramtypes', [Service_1.Service])
    ], AddMediaComponent);
    return AddMediaComponent;
}());
exports.AddMediaComponent = AddMediaComponent;
//# sourceMappingURL=AddMedia.Component.js.map