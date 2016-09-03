import { Component, OnInit, Input } from '@angular/core';
import {Service} from './../Shared/Service';
import {ProductUpdate, Media, AddMedia} from './../Shared/Models';


@Component({
    selector: 'add-media',
    providers: [Service],
    templateUrl: 'App/ClientSideViews/Owners/AddMedia.component.html'
})

export class AddMediaComponent implements OnInit {
    
    errorMessage: string;   
    addMedia: AddMedia;
    addMedias: Array<AddMedia>;
    
    constructor(private productservice: Service) {        
        this.addMedia = new AddMedia();       
        this.addMedias = new Array<AddMedia>();
    }

    ngOnInit() {        
    }

    addmedia: boolean = false;   //Variable to show/hide form     
    alert: boolean = false;      //Variable to display message if media uploaded is greather than 5
    count: number;               //Variable to display user how many more medias he can add.

    //Method to handle submit button click
    onSubmit() {
        this.findMedia();    
    }
    responsecame: boolean = false;  //Variable to show/hide message which tells user how many uploads are left.
    //Method invokes on successful response of FindMedia() service method
    submitMedia() {
        this.responsecame = true;  
            if (this.count >= 5) {
                this.addmedia = !this.addmedia;
                this.alert = true;
            }
            else {
                this.AddMedia(this.addMedia);
            }        
    }

    //Service method to save the attached media
    AddMedia(addmedia: AddMedia) {
        this.productservice.PostMedia(addmedia)
            .subscribe(
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => {

            this.addmedia = true;
                this.pic = false;
                this.video = false;
                this.addMedia = new AddMedia();
                setTimeout(() => this.addmedia = false, 0.1);               
        })
    }

   
    picDom: boolean;        //Variable to reset DOM of inner linked pic radio button element
    videoDom: boolean;      //Variable to reset DOM of inner linked video radio button element
    video: boolean = false; //Variable to show hide inner linked video radio button element
    pic: boolean = false;   //Variable to show hide inner linked pic radio button element

    //Method handling the click event of Pic Radio button
    UploadPic(event) {
        if (event.target.checked == true) {
            this.pic = true;
            this.video = false;
            this.picDom = true;
            this.addMedia.ProductMedia = Media.Pictures;
        }
    }

    //Method handling the click event of Video Radio Button
    UploadVideo(event) {
        if (event.target.checked == true) {
            this.videoDom = true;
            this.pic = false;
            this.video = true;
            this.addMedia.ProductMedia = Media.Videos;
        }
    }

    //Method handling the click event of Audio Radio button-PROTOTYPED-Demonstrational only!
    UploadAudio() {
        this.pic = false;
        this.video = false;
        this.addMedia.ProductMedia = Media.Audio;       
    }

    //Method invoke on Image Upload.
    Selected(event: HTMLInputElement) {

        let file = event.files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            this.addMedia.Path = reader.result;
        }
        reader.readAsDataURL(file);
        console.log(this.addMedia);
    }

   //Service method to get number of attachments occured in current update. 
   findMedia() {
        this.productservice.getCount()
            .subscribe((number) => {
                this.count = number;
            }, err => {
                this.errorMessage = err;
            },
            () => {
                this.submitMedia();                                     
            });
    }
    close: boolean = false;

    //Method to close the form if the user dont want to add more media.
    Close() {        
       this.close = true;
   }
}