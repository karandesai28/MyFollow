import { Component, OnInit } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel,Platform} from './../Shared/Models';
@Component({
    selector: 'product-list',
    providers: [Service],
    templateUrl: 'App/EndUsers/ProductList.component.html'
})
export class ProductList implements OnInit {
    //hide: boolean = false;
    //hidebutton: any=false;
    //hidebutton:boolean=false;
    //hidebutton: string = '';  
    productplatform: Platform;
    products: Array<ProductModel>;    
    errorMessage: string;
    product: ProductModel;  
    yourInt: number;      
    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();                               
    }
    ngOnInit() {        
        this.getProducts();
        //this.productplatform = (Platform) enum.ToObject(typeof (this.productplatform), this.yourInt);
    }
    
    Follow(productId: number) {        
        this.product.Id = productId;             
        this.FollowProducts();
        //hidebutton = true;             
    }

    getProducts() {
        var displayOwner = this.productservice.getProduct()
            .subscribe((products) => {
                this.products = products
            }, err => {
                this.errorMessage = err;
            });        
    }

    FollowProducts() {        
        this.productservice.FollowProduct(this.product)
            .subscribe((products) => {
                this.products = products
            },
            err => {
                this.errorMessage = err;
            });
    }

}