import { Component, OnInit } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel, Platform} from './../Shared/Models';
import {ViewUpdates} from './../EndUsers/ViewUpdates.component';

@Component({
    selector: 'product-list',
    directives: [ViewUpdates],
    providers: [Service],
    templateUrl: 'App/EndUsers/ProductList.component.html'
})
export class ProductList implements OnInit{
    
    ProductId: number;
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

    update: any[] = [];
    count: number;
    sf: number[];
    i: number;
    j: number = 0;
    k: number = 0;
    Follow(productobj: ProductModel) {
        this.hidebutton[productobj.Id] = true;    
        this.update[productobj.Id] = true;
        this.FollowProducts(productobj);
        this.product = productobj;
        this.count = this.hidebutton.length;
        for (this.i = 0; this.i < this.count; this.i++) {

            if (this.hidebutton[this.i] == true) {
                this.sf[this.j] = this.i;
                this.j++;
            }
        }
        this.StayFollowed();
                           
    }

    StayFollowed() {
        this.count = this.sf.length;
        for (this.i = 0; this.i < this.count; this.i++) {
            if (this.sf[this.i] == this.k) {
                this.hidebutton[this.k] = true;
            }
            this.k++;         
        }
      
    }

    Unfollow(productobj: ProductModel) {
        this.hidebutton[productobj.Id] = false; 
        this.update[productobj.Id] = false;      
    }

    updateclicked: boolean = false;
    ProductUpdates(productobj: ProductModel) {
        this.updateclicked = true;
        this.ProductId = productobj.Id;
                              
    }

    getProducts() {
        var displayOwner = this.productservice.getProduct()
            .subscribe((products) => {
                this.products = products                
            }, err => {
                this.errorMessage = err;
            });    
    }

    FollowProducts(productobj: ProductModel) {        
        this.productservice.FollowProduct(productobj)
            .subscribe((products) => {
                this.products = products  
                 this.getProducts();
            },
            err => {
                this.errorMessage = err;
            });
    }

}