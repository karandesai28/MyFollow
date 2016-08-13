import { Component, OnInit } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel} from './../Shared/Models';
@Component({
    selector: 'added-products',   
    providers: [Service],
    templateUrl: 'App/Owners/AddedProducts.component.html'

})
export class AddedProducts implements OnInit {

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
        this.getProducts();
    }

    getProducts() {
        var displayOwner = this.productservice.getProduct()
            .subscribe((products) => {
                this.products = products
            }, err => {
                this.errorMessage = err;
            });
    }

}