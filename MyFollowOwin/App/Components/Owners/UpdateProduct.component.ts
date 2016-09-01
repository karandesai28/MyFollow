import { Component, OnInit, Input } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductUpdate, Media} from './../Shared/Models';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';


@Component({
    selector: 'update-product',
    providers: [Service],
    templateUrl: 'App/ClientSideViews/Owners/UpdateProduct.component.html'
})

export class UpdateProduct implements OnInit {
    Click: boolean = true;
    Hide: boolean = false;
    media: Media;
    errorMessage: string;
    productupdate: ProductUpdate;
    productupdates: Array<ProductUpdate>;

    constructor(private productservice: Service) {
        this.productupdate = new ProductUpdate();
        this.productupdates = new Array<ProductUpdate>();

    }

    ngOnInit() {

    }

    @Input() productId: number;
    onSubmit(productupdate: ProductUpdate) {
        this.productupdate.ProductId = this.productId;
        this.UpdateProducts();
        this.Hide = true;
        this.Click = false;
        this.productupdate = new ProductUpdate();
        setTimeout(() => this.Click = true, 0.5);
    }


    UpdateProducts() {
        this.productservice.UpdateProduct(this.productupdate)
            .subscribe(
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => { })
    }
    picDom: boolean;
    videoDom: boolean;
    video: boolean = false;
    pic: boolean = false;
    UploadPic() {
        this.pic = true;
        this.video = false;
        this.picDom = true;
        this.productupdate.ProductMedia = Media.Pictures;
    }


    UploadVideo() {
        this.videoDom = true;
        this.pic = false;
        this.video = true;       
        this.productupdate.ProductMedia = Media.Videos;
    }

    UploadAudio() {
        this.pic = false;
        this.video = false;        
        this.productupdate.ProductMedia = Media.Audio;
        console.log(this.productupdate);
    }
    
    Selected(event: HTMLInputElement) {  
        
            let file = event.files[0];
            var reader = new FileReader();
            reader.onload = (e) => {
                this.productupdate.Media = reader.result;
            }        
            reader.readAsDataURL(file);
            console.log(this.productupdate.Media);           
    }
    
}