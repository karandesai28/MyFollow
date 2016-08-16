import { Component, OnInit } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel} from './../Shared/Models';
@Component({
    selector: 'product-list',
    providers: [Service],
    templateUrl: 'App/EndUsers/ProductList.component.html'
})
export class ProductList implements OnInit {

    hideclicked: boolean = false;
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

    Follow(productId: number) {
        this.product.Id = productId;
        this.FollowProducts();
        this.hideclicked = true;
    }
    getProducts() {
        var displayOwner = this.productservice.getProduct()
            .subscribe((products) => {
                this.products = products
            }, err => {
                this.errorMessage = err;
            });
    }

    FollowProducts() {
        this.productservice.FollowProduct(this.product)
            .subscribe((products) => {
                this.products = products
            },
            err => {
                this.errorMessage = err;
            });
    }

}