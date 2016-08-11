import { Component, Injectable, OnInit} from '@angular/core';
import {Product} from './Models';
import {ProductService} from './ProductService';


@Component({
    selector: 'add-product',
    providers: [ProductService],   
    templateUrl: 'App/Products/AddProduct.html'
})

export class AddProduct implements OnInit {
    products: Array<Product>;
    errorMessage: string;
    product: Product;
    constructor(private productservice: ProductService) {
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