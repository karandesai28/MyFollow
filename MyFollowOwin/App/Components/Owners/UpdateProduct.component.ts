import { Component, OnInit, Input } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductUpdate,Media} from './../Shared/Models';
@Component({
    selector: 'update-product',
    providers: [Service],
    templateUrl: 'App/Client Side Views/Owners/UpdateProduct.component.html'
})

export class UpdateProduct implements OnInit {
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
        console.log(this.productupdate);
        this.UpdateProducts();
        this.Hide = true;
        alert("Product Updated");
    }
    

    UpdateProducts() {
        this.productservice.UpdateProduct(this.productupdate)
            .subscribe(
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => { })
    }

    uploadpic: boolean = false;
    uploadvideo: boolean = false;
    uploadgif: boolean = false;
    UploadPic() {
        this.uploadpic = !this.uploadpic;
        this.productupdate.ProductMedia = Media.Pictures;
    }

    UploadVideo() {        
        this.uploadvideo = !this.uploadvideo;
        this.productupdate.ProductMedia = Media.videos;       
    }

    UploadGif() {       
        this.uploadgif = !this.uploadgif;
        this.productupdate.ProductMedia = Media.GIF;
        console.log(this.productupdate);
    }
   

    PicUpload(path) {
        var reader = new FileReader();
        this.productupdate.ImagePath = path.target.value;
        //reader.onload = (e) => {
        //    this.productupdate.ImagePath = e.target.result;
        //}

        //this.productupdate.ImagePath = path.target.result;
        //    console.log(reader.readAsDataURL(path.target.files[0]));
    }
    

}