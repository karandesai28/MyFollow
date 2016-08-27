import { Component, OnInit, Input } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductUpdate,Media} from './../Shared/Models';
@Component({
    selector: 'update-product',
    providers: [Service],
    templateUrl: 'App/Client Side Views/Owners/UpdateProduct.component.html'
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
        console.log(this.productupdate);
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
        //var reader = new FileReader();
        this.productupdate.ImagePath = path.target.value;   
          
    }
    

}