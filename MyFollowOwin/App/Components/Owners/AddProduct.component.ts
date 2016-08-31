import { Component, Injectable, OnInit,Output} from '@angular/core';
import {ProductModel} from './../Shared/Models';
import {Service} from './../Shared/Service';
import {AddedProducts} from './../Owners/AddedProducts.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'add-product',
    providers: [Service],
    directives: [AddedProducts, ROUTER_DIRECTIVES],  
    templateUrl: 'App/ClientSideViews/Owners/AddProduct.component.html'
})

export class AddProduct implements OnInit {
    refreshform: Boolean = false;
    Product: ProductModel;
    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;
    addedproducts: AddedProducts;
    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
    }   


    ngOnInit() {
        this.product = new ProductModel();       

    }

   
    onSubmit(product: ProductModel) {         
        this.AddProductData();
        this.refreshform = true;
        this.product = new ProductModel();
        setTimeout(() => this.refreshform = false, 500);   
       
    }
    
    AddProductData() {
        this.productservice.AddProduct(this.product)
            .subscribe(
            function (response) {                                         
                console.log("Success Response" + response)
            },
                function (error) { console.log("Error happened" + error) },
                () => {
                    this.Product = this.product;       
                    
                })  
    }
}