import { Component, OnInit, Input } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductUpdate,Media} from './../Shared/Models';
@Component({
    selector: 'update-product',
    providers: [Service],
    templateUrl: 'App/Owners/UpdateProduct.component.html'
})

export class UpdateProduct implements OnInit {
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
    }
    

    UpdateProducts() {
        this.productservice.UpdateProduct(this.productupdate)
            .subscribe((productupdates) => {
                this.productupdates = productupdates
            },
            err => {
                this.errorMessage = err;
            });
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
   

    PicUpload(path: any) {
        this.productupdate.ImagePath = path.target.value;
    }

}