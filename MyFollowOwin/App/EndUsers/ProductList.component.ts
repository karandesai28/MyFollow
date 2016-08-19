import { Component, OnInit } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel,Platform} from './../Shared/Models';
@Component({
    selector: 'product-list',
    providers: [Service],
    templateUrl: 'App/EndUsers/ProductList.component.html'
})
export class ProductList implements OnInit {
    hidebutton: any[] = []; 
    len: number;
    productplatform = Platform;
    products: Array<ProductModel>;    
    errorMessage: string;
    product: ProductModel;  
         
    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();                               
    }
    ngOnInit() {        
        this.getProducts();      
    }

    Follow(productId: number) {           
        this.hidebutton[productId] = true;      
        this.product.Id = productId;             
        this.FollowProducts();                    
    }

    Unfollow(productId: number) {
        this.hidebutton[productId] = false;       
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