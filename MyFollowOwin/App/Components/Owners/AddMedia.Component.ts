import { Component, OnInit, Input } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductUpdate, Media, AddMedia} from './../Shared/Models';


@Component({
    selector: 'add-media',
    providers: [Service],
    templateUrl: 'App/ClientSideViews/Owners/AddMedia.component.html'
})

export class AddMediaComponent implements OnInit {
    media: Media;
    errorMessage: string;
   
    addMedia: AddMedia;
    addMedias: Array<AddMedia>;
    
    constructor(private productservice: Service) {        
        this.addMedia = new AddMedia();
       
        this.addMedias = new Array<AddMedia>();
    }

    ngOnInit() {
        
        this.findMedia();
    }

    addmedia: boolean = false;
    
    
    alert: boolean = false;
    count: number;
    onSubmit() {
       this.findMedia();    
         
    }

    SubmitMedia(addmedia: AddMedia) {
        this.productservice.PostMedia(addmedia)
            .subscribe(
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => {
            this.addmedia = true;
                this.pic = false;
                this.video = false;
                this.addMedia = new AddMedia();
                setTimeout(() => this.addmedia = false, 0.1);  })
    }

   
    picDom: boolean;
    videoDom: boolean;
    video: boolean = false;
    pic: boolean = false;
    UploadPic() {
        this.pic = true;
        this.video = false;
        this.picDom = true;
        this.addMedia.ProductMedia = Media.Pictures;
    }


    UploadVideo() {
        this.videoDom = true;
        this.pic = false;
        this.video = true;
        this.addMedia.ProductMedia = Media.Videos;
    }

    UploadAudio() {
        this.pic = false;
        this.video = false;
        this.addMedia.ProductMedia = Media.Audio;       
    }

    Selected(event: HTMLInputElement) {

        let file = event.files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            this.addMedia.Path = reader.result;
        }
        reader.readAsDataURL(file);
        console.log(this.addMedia);
    }

    responsecame: boolean = false;
   findMedia() {
        this.productservice.getCount()
            .subscribe((number) => {
                this.count = number;
            }, err => {
                this.errorMessage = err;
            },
            () => {
                
                    if (this.count > 5) {
                        this.addmedia = !this.addmedia;
                        this.alert = true;
                    }
                    else {
                        this.SubmitMedia(this.addMedia);
                    }
                     
            });
    }


}