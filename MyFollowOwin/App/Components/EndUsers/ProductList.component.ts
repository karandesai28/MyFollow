import { Component, OnInit,OnChanges } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel, Platform, Followers} from './../Shared/Models';
import {ViewUpdates} from './../EndUsers/ViewUpdates.component';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
    selector: 'product-list',
    directives: [ViewUpdates, ROUTER_DIRECTIVES],
    providers: [Service],
    templateUrl: 'App/Client Side Views/EndUsers/ProductList.component.html'
})
export class ProductList implements OnInit{
   
    ProductId: number;
    hidebutton: any[] = []; 
    urowner: any[] = [];
    len: number;
    productplatform = Platform;
    products: Array<ProductModel>;    
    errorMessage: string;
    product: ProductModel;
    follower: Followers;
    followers: Array<Followers>;
    addedproduct: ProductModel;
    addedproducts: Array<ProductModel>;
       

    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
        this.follower = new Followers();
        this.followers = new Array<Followers>();
        this.addedproduct = new ProductModel();
        this.addedproducts = new Array<ProductModel>();        
                                                    
    }
    ngOnInit() {
        this.getProducts();
       
    }
   
    update: any[] = [];

   
    Follow(productobj: ProductModel) {
        //this.follower.StatusBit = true;
        this.hidebutton[productobj.Id] = true;
        this.update[productobj.Id] = true;
        this.FollowProducts(productobj);
        this.product = productobj;                          
    }

  

    Unfollow(productobj: ProductModel) {       
        this.hidebutton[productobj.Id] = false;
        this.UnfollowFollowers(productobj.Id);
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
                this.getFollowProducts();
            }, err => {
                this.errorMessage = err;
            },
            () => { });
                
    }

    getAddedProducts() {
        this.productservice.getAddedProduct()
            .subscribe((products) => {
                this.addedproducts = products
            }, err => {
                this.errorMessage = err;
            },
            () => {
                for (let product of this.products) {
                    for (let addedproduct of this.addedproducts) {
                        if (product.Id == addedproduct.Id) {
                            this.urowner[addedproduct.Id] = true;
                        }
                    }
                }           
               
            }
            );
    }

    FollowProducts(productobj: ProductModel) {        
        this.productservice.FollowProduct(productobj)
            .subscribe(
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => {
                this.getFollowProducts();
                this.getProducts();
            })  
    }


    getFollowProducts() {
        this.productservice.getFollowBit()
            .subscribe((followers) => {
                this.followers = followers;
                this.getAddedProducts();
                     
           
            }, err => {
                this.errorMessage = err;
            },
            () => {
                //alert(this.followers);
                for (let follower of this.followers) {               
                    this.hidebutton[follower.ProductId] = true;
                    this.update[follower.ProductId] = true;
                }
            });
    }

    UnfollowFollowers(productId: number) {
        this.productservice.DeleteFollower(productId)
            .subscribe(function (response) {
                console.log("Success Response" + response)
            },
            function (error) { console.log("Error happened" + error) },
            () => {
                this.getProducts();

            });
    }
}