import { Component, OnInit } from '@angular/core';
import {AddProduct} from './AddProduct';
import {ProductService} from './ProductService';
import {Product} from './Models';
@Component({
    selector: 'product-list',
    directives: [AddProduct],
    providers: [ProductService],
    templateUrl: 'App/Products/ProductList.html',   

})
export class ProductList implements OnInit {

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