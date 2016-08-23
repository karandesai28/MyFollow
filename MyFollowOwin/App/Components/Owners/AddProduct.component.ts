import { Component, Injectable, OnInit} from '@angular/core';
import {ProductModel} from './../Shared/Models';
import {Service} from './../Shared/Service';
import {AddedProducts} from './../Owners/AddedProducts.component';

@Component({
    selector: 'add-product',
    providers: [Service],
    directives: [AddedProducts],  
    templateUrl: 'App/Client Side Views/Owners/AddProduct.component.html'
})

export class AddProduct implements OnInit {
    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;
    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
    }

    Click: Boolean = false;
    hideclicked: Boolean = false;
    hideproductform: Boolean = false;
    clicked() {
        this.Click = true;        
    }

    hide() {
        this.hideclicked = true;
        this.hideproductform = false;
    }

    ngOnInit() {

    }

    clean() {
        this.product.Name = "";
        this.product.Description = "";
        this.product.HomepageUrl = "";
        this.product.AppStoreUrl = "";
        this.product.PlayStoreUrl = "";
    }

    onSubmit(product: ProductModel) {        
        this.AddProductData();        
        this.clean();  
        this.hideclicked = false;
        this.hideproductform = true;  
        alert("Product is added!");
    }
    
    AddProductData() {
        this.productservice.AddProduct(this.product)
            .subscribe((products) => {
                this.products = products
            },
            err => {
                this.errorMessage = err;
            });
    }
}