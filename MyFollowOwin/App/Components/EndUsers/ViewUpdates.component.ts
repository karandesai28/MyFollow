import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
export class ViewUpdates implements OnInit, OnChanges {    
    
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

    //This is invoked due to property binding in the parent component and input parameter is productId.
    @Input() productId: number;
    ngOnChanges() {
        if (this.productId != null) {
            this.getUpdates(this.productId);
            this.getProducts(this.productId);
        }
        else {
            console.log("Invalid");
        }
    }

    //Invokes when the response comes from getUpdates() and getProducts() methods.
    checkUpdates(productId: number, update) {
        if (update!=null) {
            this.ViewData();
        }
        else {           
            
            this.getProducts(this.productId);
        }
    }

    //By passing security to tell angular 2 explicitly that youtube links are secure.
    videoUrl: any;
    ngOnInit() {
        this.videoUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(this.addMedia.Path);
    }
    

    //Method to display updates and call media if that update had media.
    showVideo: boolean = false;
    i: number = 0;   
    public ViewData() {
        this.product.Id = this.productId;
        this.getProducts(this.productId);
        this.getUpdates(this.productId);
        for (this.i = 0; this.i < length; this.i++) {
            if (this.addMedias[this.i].ProductMedia == Media.Videos) {
                this.showVideo = true;             
            }
            else if (this.addMedias[this.i].ProductMedia == Media.Pictures) {
                this.showVideo = false;
            }
        }
        this.productId = null;     
    }

    //Getting the link from HTML view, by passing security.
    allowVideo(productmedia) {       
        return this.sanitizer.bypassSecurityTrustResourceUrl(productmedia);
    }


    //Service method to get product by ID.
    getProducts(productId: number) {
        this.productservice.getProductById(productId)
            .subscribe((products) => {
                this.checkUpdates(productId, this.productupdate);
                this.product = products
            }, err => {
                this.errorMessage = err;
            },
            () => { });
    }

    //Service method to get Updates corresponding to product Id.
    getUpdates(productId: number) {
        this.productservice.getProductUpdates(productId)
            .subscribe((productupdates) => {
                this.productupdate = productupdates;
                this.getMedias(productupdates.Id);
                    
                   
            }, err => {
                this.errorMessage = err;
            },
            () => {                
                console.log("Update Found");               
            });
    }

    //Service method to get medias if any.
    length: number=0;
    getMedias(updateId: number) {
        this.productservice.getMedia(updateId)
            .subscribe((medias) => {
                this.addMedias = medias;

            }, err => {
                this.errorMessage = err;
            },
            () => {
                this.length = this.getMedias.length;
                console.log("Media Found");
            });
    }

}