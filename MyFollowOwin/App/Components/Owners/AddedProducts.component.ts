import { Component, OnInit,OnDestroy,OnChanges,Input} from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel, ProductUpdate, Platform, Followers} from './../Shared/Models';
import {EditProduct} from './../Owners/EditProduct.component';
import {UpdateProduct} from './../Owners/UpdateProduct.component';
import {ViewUpdates} from './../EndUsers/ViewUpdates.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'added-products',     
    providers: [Service],
    directives: [EditProduct, UpdateProduct, ViewUpdates, ROUTER_DIRECTIVES],
    templateUrl: 'App/ClientSideViews/Owners/AddedProducts.component.html'

})
export class AddedProducts implements OnInit, OnChanges {
    
    productplatform = Platform;   
    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;
    productupdate: ProductUpdate;
    follower: Followers;        
    followers: Array<Followers>;
    productobject: ProductModel;
    productobjects: Array<ProductModel>;
    productupdates: Array<ProductUpdate>;
    productupdateobj: ProductUpdate;

    ProductId: number;              //Variable which invokes property binding and ngOnChanges in CRUD components
    hidebutton: any[] = [];         //Array whose value will decide the 'follow' or 'unfollow' button to stay on view.
    update: any[] = [];             //Variable to show/hide Update button from view
    urowner: any[] = [];            //Array whose value will print "Your Product" for owners viewing their own products in product list
    
    updateclicked: boolean = false;

    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
        this.productupdate = new ProductUpdate();
        this.follower = new Followers();
        this.followers = new Array<Followers>();  
        this.productobjects = new Array<ProductModel>();
        this.productobject = new ProductModel();
        this.productupdates = new Array<ProductUpdate>();
        this.productupdateobj = new ProductUpdate();        
    }

    //This is invoked due to property binding in the parent component and input parameter is productId.
    @Input() productobj: ProductModel;    
    ngOnChanges() {
        if (this.productobj != null) {
            this.getProducts();
            this.getProductsToFollow();
        }
        else {
            console.log("first time loading");
        }      
    }

    //Method to handle Edit button click
    Edit: Boolean = false;
    EditClicked(Product:ProductModel) {
        this.Edit = true;
        this.product = Product;        
    }

    //Method to handle Delete button click
    DeleteClicked(ProductId: number) {
        this.product.Id = ProductId;
        this.DeleteProducts();       
    }

    //Method to handle View Update button click
    ViewUpdateClicked(ProductId: number) {
        this.product.Id = ProductId;
        this.ProductId = ProductId;
        this.UpdateClicked[ProductId] = true;
        this.updateclicked = true;  
    }


    //Method to handle update button click
    Update: boolean = false; //Boolean variable to invoke update form component
    UpdateClicked(ProductId: number) {
        this.ProductId = ProductId;
        this.Update = true;
        this.productupdate.ProductId = ProductId;       
        
    }

    //Method to handle Follow Button Click
    Follow(productobj: ProductModel) {
        this.hidebutton[productobj.Id] = true;
        this.update[productobj.Id] = true;
        this.FollowProducts(productobj);
        this.product = productobj;
    }

    //Method to handle Unfollow button click
    Unfollow(productobj: ProductModel) {
        this.hidebutton[productobj.Id] = false;
        this.UnfollowFollowers(productobj.Id);
        this.update[productobj.Id] = false;
    }


    ngOnInit() {
        this.getProducts();
        this.getProductsToFollow();
    }

    //Service method to get Products.
    getProducts() {
       this.productservice.getAddedProduct()
            .subscribe((products) => {
                this.products = products
            }, err => {
                this.errorMessage = err;
            },
            () => {
                this.getFollowProducts();
                this.getProductsToFollow();
            }
       );
    }

    
    //Service method to delete products
    DeleteProducts() {
        this.productservice.DeleteProduct(this.product)
            .subscribe(function (response) {
                console.log("Success Response" + response)
            },
            function (error) { console.log("Error happened" + error) },
            () => {
                this.getProducts();

            });
    }

    //Service method to get list of products
    getProductsToFollow() {
        var displayOwner = this.productservice.getProduct()
            .subscribe((products) => {
                this.productobjects = products;               
            }, err => {
                this.errorMessage = err;
            },
            () => {
                for (let product of this.productobjects) {
                    for (let addedproduct of this.products)
                        if (product.Id == addedproduct.Id) {
                            this.urowner[addedproduct.Id] = true;
                        }
                }

            });
    }

    //Service method to get the records of followed products of logged in user
    getFollowProducts() {
        this.productservice.getFollowBit()
            .subscribe((followers) => {
                this.followers = followers;


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
   

    //Service Method invoked on click of follow button
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

    
    //Service method invoked on click of Unfollow button
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