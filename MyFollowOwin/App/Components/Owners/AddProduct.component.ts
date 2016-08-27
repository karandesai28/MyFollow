import { Component, Injectable, OnInit,Output} from '@angular/core';
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
    
    Product: ProductModel;
    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;
    addedproducts: AddedProducts;
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
        this.Click = false;  
        this.product = new ProductModel();       
        setTimeout(() => this.Click = true, 0.5);
    }

    ngOnInit() {
        this.product = new ProductModel();       

    }

   
    onSubmit(product: ProductModel) {         
        this.AddProductData();
        this.hideclicked = false;
        this.hideproductform = true;  
       
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