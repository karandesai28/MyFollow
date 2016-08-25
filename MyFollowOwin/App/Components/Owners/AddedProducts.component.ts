import { Component, OnInit,OnDestroy,OnChanges,Input} from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductModel, ProductUpdate, Platform} from './../Shared/Models';
import {EditProduct} from './../Owners/EditProduct.component';
import {UpdateProduct} from './../Owners/UpdateProduct.component';

@Component({
    selector: 'added-products',     
    providers: [Service],
    directives: [EditProduct, UpdateProduct],
    templateUrl: 'App/Client Side Views/Owners/AddedProducts.component.html'

})
export class AddedProducts implements OnInit, OnChanges {
    ProductId: number;
    productplatform = Platform;   
    products: Array<ProductModel>;
    errorMessage: string;
    product: ProductModel;
    productupdate: ProductUpdate;
    
    constructor(private productservice: Service) {
        this.products = new Array<ProductModel>();
        this.product = new ProductModel();
        this.productupdate = new ProductUpdate();
                  
    }

    @Input() productobj: ProductModel;
    ngOnChanges() {
        if (this.productobj != null) {
            this.getProducts();
        }
        else {
            console.log("first time loading");
        }      
    }
        
    Click: Boolean = false;
    clicked() {
        this.Click = true;       
    }

    Edit: Boolean = false;
    EditClicked(Product:ProductModel) {
        this.Edit = true;
        this.product = Product;        
    }

    DeleteClicked(ProductId: number) {
        this.product.Id = ProductId;
        this.DeleteProducts()
        
    }

    Update: boolean = false;
    UpdateClicked(ProductId: number) {
        this.ProductId = ProductId;
        this.Update = true;
        this.productupdate.ProductId = ProductId;
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
            },
            () => {  }
       );
    }

    DeleteProducts() {
        this.productservice.DeleteProduct(this.product)
            .subscribe(function (response) {
                console.log("Success Response" + response)
            },
            function (error) { console.log("Error happened" + error) },
            () => {
                this.getProducts();

            });
    }

}