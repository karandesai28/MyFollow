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
    ProductId: number;
    productplatform = Platform;   
    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;
    productupdate: ProductUpdate;
    follower: Followers;
    followers: Array<Followers>;
    hidebutton: any[] = []; 
    update: any[] = [];
    urowner: any[] = [];
    productobject: ProductModel;
    productobjects: Array<ProductModel>;
    productupdates : Array<ProductUpdate>;
    productupdateobj: ProductUpdate;
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
        
    Click: Boolean = false;
    clicked() {
        this.Click = true;       
    }

    Edit: Boolean = false;
    EditClicked(Product:ProductModel) {
        this.Edit = true;
        this.product = Product;        
    }

    DeleteClicked(ProductId: number) {
        this.product.Id = ProductId;
        this.DeleteProducts()
        
    }

    ViewUpdateClicked(ProductId: number) {
        this.product.Id = ProductId;
        this.ProductId = ProductId;
        this.UpdateClicked[ProductId] = true;
        this.updateclicked = true;
      

    }

    Update: boolean = false;
    UpdateClicked(ProductId: number) {
        this.ProductId = ProductId;
        this.Update = true;
        this.productupdate.ProductId = ProductId;
        
        
    }
    
    ngOnInit() {
        this.getProducts();
        this.getProductsToFollow();
    }

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

    Follow(productobj: ProductModel) {
        //this.follower.StatusBit = true;
        this.hidebutton[productobj.Id] = true;
        this.update[productobj.Id] = true;
        this.FollowProducts(productobj);
        this.product = productobj;
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

    Unfollow(productobj: ProductModel) {
        this.hidebutton[productobj.Id] = false;
        this.UnfollowFollowers(productobj.Id);
        this.update[productobj.Id] = false;
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