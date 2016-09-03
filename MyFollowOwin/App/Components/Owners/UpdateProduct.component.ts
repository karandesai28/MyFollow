import { Component, OnInit, Input } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductUpdate, Media, AddMedia} from './../Shared/Models';
import {AddMediaComponent} from './../Owners/AddMedia.Component';


@Component({
    selector: 'update-product',
    providers: [Service],
    directives: [AddMediaComponent],
    templateUrl: 'App/ClientSideViews/Owners/UpdateProduct.component.html'
})

export class UpdateProduct implements OnInit {

    Click: boolean = true;  //Variable to show hide form
    Hide: boolean = false;  //Variable to hide form on submit button click

    media: Media;           
    errorMessage: string;
    productupdate: ProductUpdate;
    productupdates: Array<ProductUpdate>;
    addMedia: AddMedia;
    addMedias: Array<AddMedia>;

    constructor(private productservice: Service) {
        this.productupdate = new ProductUpdate();
        this.productupdates = new Array<ProductUpdate>();
        this.addMedia = new AddMedia();
        this.addMedias = new Array<AddMedia>();
    }

    ngOnInit() {

    }

    showmediaform: boolean; //Variable to invoke media form component

    //Method that handles submit button click
    @Input() productId: number;
    onSubmit(productupdate: ProductUpdate) {
        this.productupdate.ProductId = this.productId;
        this.UpdateProducts();
        this.Hide = true;
        this.Click = false;
        this.showmediaform = this.addmedia;
        this.productupdate = new ProductUpdate();
        setTimeout(() => this.Click = true, 0.5);
    }

    //Service method that saves updates
    UpdateProducts() {
        this.productservice.UpdateProduct(this.productupdate)
            .subscribe(
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => { })
    }

   
    addmedia: boolean=false;    //Variable that saves state of user's permission of whether he wants to add media or not

    //Method which handles the checkbox click event that ask users whether they want to attach media or not
    Yes(value) {
        if (value.target.checked==true) {
            this.addmedia = true;
        }
    }   
}