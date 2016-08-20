import { Component, OnInit,Input } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel, Platform, ProductUpdate, UserModel, OwnerModel} from './../Shared/Models';
@Component({
    selector: 'view-update',
    providers: [Service],
    templateUrl: 'App/EndUsers/ViewUpdates.component.html'
})
export class ViewUpdates implements OnInit { 
   
    productplatform = Platform;
    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;
    productupdate: ProductUpdate;
    productupdates: Array<ProductUpdate>;
    
    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
        this.productupdate = new ProductUpdate();
        this.productupdates = new Array<ProductUpdate>();        
    }

    
    ngOnInit() {
          
    } 
    
    @Input() productId: number;
    ViewData() {
        this.product.Id = this.productId;
        this.getProducts(this.productId);       
        this.getUpdates(this.productId);
    }
   

    getProducts(productId: number) {
        this.productservice.getProductById(productId)
            .subscribe((products) => {
                this.products = products
            }, err => {
                this.errorMessage = err;
            });
    }

    getUpdates(productId:number) {
        this.productservice.getProductUpdates(productId)
            .subscribe((productupdates) => {
                this.productupdates = productupdates
            }, err => {
                this.errorMessage = err;
            });
    }
    
}