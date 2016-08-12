import { Component, OnInit } from '@angular/core';
import {Service} from './../Shared/Service';
import {Product} from './../Shared/Models';
@Component({
    selector: 'product-list',
    providers: [Service],
    templateUrl: 'App/EndUsers/ProductList.component.html'

})
export class ProductList implements OnInit {

    products: Array<Product>;
    errorMessage: string;
    product: Product;
    constructor(private productservice: Service) {
        this.products = new Array<Product>();
        this.product = new Product();
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