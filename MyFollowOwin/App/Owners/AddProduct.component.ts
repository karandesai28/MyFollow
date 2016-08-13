import { Component, Injectable, OnInit} from '@angular/core';
import {ProductModel} from './../Shared/Models';
import {Service} from './../Shared/Service';
import {AddedProducts} from './../Owners/AddedProducts.component';

@Component({
    selector: 'add-product',
    providers: [Service],
    directives: [AddedProducts],  
    templateUrl: 'App/Owners/AddProduct.component.html'
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
    clicked() {
        this.Click = true;
    }

    ngOnInit() {

    }

    clean() {
        this.product = null;
    }

    onSubmit(product: ProductModel) {
        console.log(product.Name);
        console.log(product.Description);
        console.log(product.HomepageUrl);
        console.log(product.PlayStoreUrl);
        console.log(product.AppStoreUrl)
        this.AddProductData();
        this.clean;
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