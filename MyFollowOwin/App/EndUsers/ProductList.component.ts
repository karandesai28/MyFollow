import { Component, OnInit } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel} from './../Shared/Models';
@Component({
    selector: 'product-list',
    providers: [Service],
    templateUrl: 'App/EndUsers/ProductList.component.html'

})
export class ProductList implements OnInit {

    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;    
    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
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