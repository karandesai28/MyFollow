import { Component, OnInit } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel, Platform, Followers} from './../Shared/Models';
import {ViewUpdates} from './../EndUsers/ViewUpdates.component';

@Component({
    selector: 'product-list',
    directives: [ViewUpdates],
    providers: [Service],
    templateUrl: 'App/Client Side Views/EndUsers/ProductList.component.html'
})
export class ProductList implements OnInit{
    
    ProductId: number;
    hidebutton: any[] = []; 
    len: number;
    productplatform = Platform;
    products: Array<ProductModel>;    
    errorMessage: string;
    product: ProductModel;
    follower: Followers;
    followers: Array<Followers>;
       

    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
        this.follower = new Followers();
        this.followers = new Array<Followers>();          
                                                    
    }
    ngOnInit() {        
        this.getProducts(); 
    }

    update: any[] = [];

   
    Follow(productobj: ProductModel) {        
        this.hidebutton[productobj.Id]    
        this.update[productobj.Id] = true;
        this.FollowProducts(productobj);
        this.product = productobj;                          
    }

  

    Unfollow(productobj: ProductModel) {
        this.hidebutton[productobj.Id] = this.follower.StatusBit; 
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
            .subscribe(
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => { this.getProducts(); })  
    }


    getFollowProducts(productId:number) {
        this.productservice.getFollowBit(productId)
            .subscribe((followers) => {
                this.followers = followers
            }, err => {
                this.errorMessage = err;
            });
    }

}