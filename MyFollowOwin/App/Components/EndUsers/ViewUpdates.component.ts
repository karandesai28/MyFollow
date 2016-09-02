import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel, Platform, ProductUpdate, UserModel, OwnerModel, Media, AddMedia} from './../Shared/Models';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {DomSanitizationService} from '@angular/platform-browser';

@Component({
    selector: 'view-update',
    directives: [ROUTER_DIRECTIVES],
    providers: [Service],
    templateUrl: 'App/ClientSideViews/EndUsers/ViewUpdates.component.html'
})
export class ViewUpdates implements OnInit, OnChanges, OnDestroy {

    video: any;
    message: string;
    show: boolean = false;
    fname: string;
    path: any;
    productplatform = Platform;
    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;
    productupdate: ProductUpdate;
    productupdates: Array<ProductUpdate>;
    addMedia: AddMedia;
    addMedias: Array<AddMedia>;
   
    constructor(private productservice: Service, private sanitizer: DomSanitizationService) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
        this.productupdate = new ProductUpdate();
        this.productupdates = new Array<ProductUpdate>();
        this.addMedia = new AddMedia();
        this.addMedias = new Array<AddMedia>();
        this.sanitizer = sanitizer;     
    }

    ngOnChanges() {

        if (this.productId != null) {
            this.getUpdates(this.productId);
            this.getProducts(this.productId);
        }
        else {
            console.log("Invalid");
        }
    }
    checkUpdates(productId: number, update) {
        if (update != null) {
            this.ViewData();
        }
        else {
            this.getProducts(this.productId);
            this.message = "Owner has not added any updates for this product yet!";
            this.show = true;
        }
    }

    ngOnDestroy() { console.log("destroyed") }

    ngOnInit() {
        this.videoUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(this.addMedia.Path);
    }
    videoUrl: any;
    showVideo: boolean = false;;
    @Input() productId: number;
    public ViewData() {
        this.product.Id = this.productId;
        this.getProducts(this.productId);
        this.getUpdates(this.productId);
        if (this.addMedia.ProductMedia == Media.Videos) {
            this.showVideo = true;
           // this.allowVideo(this.productupdate.Media);
           
        }
        this.productId = null;
        this.ngOnDestroy();
    }

    allowVideo(productmedia) {
       
          return this.sanitizer.bypassSecurityTrustResourceUrl(productmedia);
    }



    getProducts(productId: number) {
        this.productservice.getProductById(productId)
            .subscribe((products) => {
                this.checkUpdates(productId, this.productupdate);
                this.product = products
            }, err => {
                this.errorMessage = err;
            });
    }
    
    getUpdates(productId: number) {
        this.productservice.getProductUpdates(productId)
            .subscribe((productupdates) => {
                this.productupdate = productupdates;
                    
                   
            }, err => {
                this.errorMessage = err;
            },
            () => {
                console.log("Update Found");               
            });
    }

}