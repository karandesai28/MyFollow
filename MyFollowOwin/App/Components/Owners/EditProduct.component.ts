﻿import { Component, OnInit,Input,OnChanges } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel} from './../Shared/Models';
@Component({
    selector: 'edit-product',
    providers: [Service],   
    templateUrl: 'App/ClientSideViews/Owners/EditProduct.component.html'
})

export class EditProduct implements OnInit, OnChanges {

    Hide: boolean = false;  //Variable to show/hide form
    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;

    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
    } 
     
    ngOnInit() { }

    //Invoked from property binding with parent component where input parameter is productobj
    @Input() productobj: ProductModel;
    ngOnChanges() {
        if ((this.productobj) != null) {
            this.product = this.productobj;                               
        }
        else {
            console.log("First time loading");
        }

    }  

    //Method invoked on submit button clicked
    onSubmit(product: ProductModel) {
        this.Hide = true;         
        console.log(this.product);       
        this.EditProductData();         
        alert("Product Edited");                   
    }

    //Service method to save edits
    EditProductData() {
        this.productservice.EditProduct(this.product)
            .subscribe(
                function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => {})
    }
}