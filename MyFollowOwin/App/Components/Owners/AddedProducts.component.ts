import { Component, OnInit,OnDestroy,OnChanges } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel, ProductUpdate, Platform} from './../Shared/Models';
import {EditProduct} from './../Owners/EditProduct.component';
import {UpdateProduct} from './../Owners/UpdateProduct.component';

@Component({
    selector: 'added-products',   
    providers: [Service],
    directives: [EditProduct, UpdateProduct],
    templateUrl: 'App/Client Side Views/Owners/AddedProducts.component.html'

})
export class AddedProducts implements OnInit, OnChanges {
    productplatform = Platform;
    ProductId: number;
    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;
    productupdate: ProductUpdate;
    
    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
        this.productupdate = new ProductUpdate();          
    }

    ngOnChanges() {
        alert("I am here");
        this.getProducts();
    }
        
    Click: Boolean = false;
    clicked() {
        this.Click = true;       
    }

    Edit: Boolean = false;
    EditClicked(ProductId:number) {
        this.Edit = true;
        this.ProductId = ProductId;        
    }

    DeleteClicked(ProductId: number) {
        this.product.Id = ProductId;
        this.DeleteProducts()
        
    }

    Update: boolean = false;
    UpdateClicked(ProductId: number) {
        this.ProductId = ProductId;
        this.Update = true;
        this.productupdate.ProductId = ProductId;
    }
    
    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
       this.productservice.getAddedProduct()
            .subscribe((products) => {
                this.products = products
            }, err => {
                this.errorMessage = err;
            });
    }

    DeleteProducts() {
        this.productservice.DeleteProduct(this.product).subscribe((res) => {
        });
    }

}