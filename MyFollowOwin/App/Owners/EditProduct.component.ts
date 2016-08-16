import { Component, OnInit,Input } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel} from './../Shared/Models';
@Component({
    selector: 'edit-product',
    providers: [Service],   
    templateUrl: 'App/Owners/EditProduct.component.html'
})

export class EditProduct implements OnInit {
    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;
    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
    }  

    ngOnInit() {

    }

    

    @Input() productId: number;
    onSubmit(product: ProductModel) {
        this.product.Id = this.productId;
        console.log(this.product);       
        this.EditProductData();               
    }

    EditProductData() {
        this.productservice.EditProduct(this.product)
            .subscribe((products) => {
                this.products = products
            },
            err => {
                this.errorMessage = err;
            });
    }
}