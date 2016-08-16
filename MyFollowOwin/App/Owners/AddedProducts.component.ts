import { Component, OnInit } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel} from './../Shared/Models';
import {EditProduct} from './../Owners/EditProduct.component';

@Component({
    selector: 'added-products',   
    providers: [Service],
    directives:[EditProduct],
    templateUrl: 'App/Owners/AddedProducts.component.html'

})
export class AddedProducts implements OnInit {
    ProductId: number;
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

    Edit: Boolean = false;
    EditClicked(ProductId:number) {
        this.Edit = true;
        this.ProductId = ProductId;        
    }

    DeleteClicked(ProductId: number) {
        this.product.Id = ProductId;
        this.DeleteProducts()
        
    }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
       this.productservice.getAddedProduct()
            .subscribe((products) => {
                this.products = products
            }, err => {
                this.errorMessage = err;
            });
    }

    DeleteProducts() {
        this.productservice.DeleteProduct(this.product).subscribe((res) => {
        });
    }

}