import { Component, OnInit,OnChanges } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel, Platform, Followers} from './../Shared/Models';
import {ViewUpdates} from './../EndUsers/ViewUpdates.component';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
    selector: 'product-list',
    directives: [ViewUpdates, ROUTER_DIRECTIVES],
    providers: [Service],
    templateUrl: 'App/ClientSideViews/EndUsers/ProductList.component.html'
})
export class ProductList implements OnInit{
   
    ProductId: number;          //Variable which invokes property binding and ngOnChanges in CRUD components
    hidebutton: any[] = [];     //Array whose value will decide the 'follow' or 'unfollow' button to stay on view.
    urowner: any[] = [];        //Array whose value will print "Your Product" for owners viewing their own products in product list
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
   
    update: any[] = [];         //Variable to show/hide Update button from view


    //Method which handles follow button click
    Follow(productobj: ProductModel) {       
        this.hidebutton[productobj.Id] = true;
        this.update[productobj.Id] = true;
        this.FollowProducts(productobj);
        this.product = productobj;                          
    }

  
    //Method which handles unfollow button click
    Unfollow(productobj: ProductModel) {       
        this.hidebutton[productobj.Id] = false;
        this.UnfollowFollowers(productobj.Id);
        this.update[productobj.Id] = false;      
    }

    updateclicked: boolean = false;         //Variable which invoke ViewUpdate's component selector on true.

    //Method which handles View update button
    ProductUpdates(productobj: ProductModel) {
        this.updateclicked = true;
        this.ProductId = productobj.Id; 
              
    }
    
    //Service method which gets product list
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

    //If user is logged in as owner, this service method will give his added products as "Your Product" in list
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

    //Service method invoked when user clicks follow button
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

    //Service method invoked to get the earlier records of followed products of current logged in users 
    getFollowProducts() {
        this.productservice.getFollowBit()
            .subscribe((followers) => {
                this.followers = followers;
                this.getAddedProducts();
                     
           
            }, err => {
                this.errorMessage = err;
            },
            () => {               
                for (let follower of this.followers) {               
                    this.hidebutton[follower.ProductId] = true;
                    this.update[follower.ProductId] = true;
                }
            });
    }


    //Service method invoked when unfollow button is clicked.
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