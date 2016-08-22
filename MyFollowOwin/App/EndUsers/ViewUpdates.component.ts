import { Component, OnInit,Input,AfterContentChecked,OnDestroy,OnChanges } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel, Platform, ProductUpdate, UserModel, OwnerModel} from './../Shared/Models';
@Component({
    selector: 'view-update',
    providers: [Service],
    templateUrl: 'App/EndUsers/ViewUpdates.component.html'
})
export class ViewUpdates implements OnInit,OnDestroy, OnChanges { 
   
    fname: string;
    path: any;
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

    ngOnChanges() {
        if (this.productId != null) {
            this.ViewData();            
        }
        else {
            console.log("Invalid");
        }
    }

    ngOnDestroy() {console.log("destroyed") }
    
    ngOnInit() {
        
    } 
    
    @Input() productId: number;   
    public ViewData() {
        this.product.Id = this.productId;
        this.getProducts(this.productId);       
        this.getUpdates(this.productId);
        this.productupdate.ImagePath = "https://images.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png";      
        this.ngOnDestroy();
    }

   

    getProducts(productId: number) {
        this.productservice.getProductById(productId)
            .subscribe((products) => {
                this.product = products
            }, err => {
                this.errorMessage = err;
            });
    }

    getUpdates(productId:number) {
        this.productservice.getProductUpdates(productId)
            .subscribe((productupdates) => {
                this.productupdate = productupdates
            }, err => {
                this.errorMessage = err;
            });
    }
    
}