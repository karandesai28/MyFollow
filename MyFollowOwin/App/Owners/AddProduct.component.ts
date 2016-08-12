import { Component, Injectable, OnInit} from '@angular/core';
import {Product} from './../Shared/Models';
import {Service} from './../Shared/Service';
import {AddedProducts} from './../Owners/AddedProducts.component';

@Component({
    selector: 'add-product',
    providers: [Service],
    directives: [AddedProducts],  
    templateUrl: 'App/Owners/AddProduct.component.html'
})

export class AddProduct implements OnInit {
    products: Array<Product>;
    errorMessage: string;
    product: Product;
    constructor(private productservice: Service) {
        this.products = new Array<Product>();
        this.product = new Product();
    }

    Click: Boolean = false;
    clicked() {
        this.Click = true;
    }

    ngOnInit() {

    }

    onSubmit(product: Product) {
        console.log(product.Name);
        console.log(product.Description);
        console.log(product.HomePageUrl);
        console.log(product.PlayStoreUrl);
        console.log(product.AppStoreUrl)
        this.AddProductData();
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