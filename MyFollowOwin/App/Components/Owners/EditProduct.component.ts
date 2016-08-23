import { Component, OnInit,Input } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel} from './../Shared/Models';
@Component({
    selector: 'edit-product',
    providers: [Service],   
    templateUrl: 'App/Client Side Views/Owners/EditProduct.component.html'
})

export class EditProduct implements OnInit {
    Hide: boolean = false;
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
        this.Hide = true; 
        this.product.Id = this.productId;
        console.log(this.product);       
        this.EditProductData(); 
        alert("Product Edited");                   
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