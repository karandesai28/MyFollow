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
    Click: boolean = true;
    Hide: boolean = false;
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
    showmediaform: boolean;
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


    UpdateProducts() {
        this.productservice.UpdateProduct(this.productupdate)
            .subscribe(
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => { })
    }

   
    addmedia: boolean=false;
    Yes(value) {
        if (value.target.checked==true) {
            this.addmedia = true;
        }
    }
    //picDom: boolean;
    //videoDom: boolean;
    //video: boolean = false;
    //pic: boolean = false;
    //UploadPic() {
    //    this.pic = true;
    //    this.video = false;
    //    this.picDom = true;
    //    this.addMedia.ProductMedia = Media.Pictures;
    //}


    //UploadVideo() {
    //    this.videoDom = true;
    //    this.pic = false;
    //    this.video = true;       
    //    this.addMedia.ProductMedia = Media.Videos;
    //}

    //UploadAudio() {
    //    this.pic = false;
    //    this.video = false;        
    //    this.addMedia.ProductMedia = Media.Audio;
    //    console.log(this.productupdate);
    //}
    
    //Selected(event: HTMLInputElement) {  
        
    //        let file = event.files[0];
    //        var reader = new FileReader();
    //        reader.onload = (e) => {
    //            this.addMedia = reader.result;
    //        }        
    //        reader.readAsDataURL(file);
    //        console.log(this.addMedia);           
    //}
    
}