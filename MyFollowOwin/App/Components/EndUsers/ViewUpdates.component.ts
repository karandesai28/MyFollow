import { Component, OnInit,OnDestroy,Input,OnChanges } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel, Platform, ProductUpdate, UserModel, OwnerModel} from './../Shared/Models';
@Component({
    selector: 'view-update',
    providers: [Service],
    templateUrl: 'App/Client Side Views/EndUsers/ViewUpdates.component.html'
})
export class ViewUpdates implements OnInit,OnChanges,OnDestroy { 
   
    message: string;
    show: boolean=false;
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
            var update=this.getUpdates(this.productId);
            if (update != null) {
                this.ViewData();
            }
            else {
                this.getProducts(this.productId);
                this.message = "Owner has not added any updates for this product yet!";
                this.show = true;
            }            
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
        this.productupdate.ImagePath;      
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