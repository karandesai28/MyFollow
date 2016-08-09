import { Component, Injectable, OnInit} from '@angular/core';
import {OwnerModel} from './Models';
import {OwnerService} from './Service';
import {ProductList} from './ProductComponent';

@Component({
    selector: 'my-app',    
    providers: [OwnerService],
    directives: [ProductList],
    templateUrl: 'App/Owner/OwnerForm.html'     
})

export class OwnerComponent implements OnInit {   
    owners: Array<OwnerModel>;     
    errorMessage: string;      
   owner: OwnerModel;
   constructor(private ownerservice: OwnerService) {
       this.owners = new Array<OwnerModel>();     
       this.owner = new OwnerModel();
   }

   Click: Boolean = false;
   clicked() {
       this.Click = true;
   }

   ngOnInit() {
       var getId = this.ownerservice.getUserId();
       console.log(getId);
   }
    
    onSubmit(owner: OwnerModel) {
        console.log(owner.CompanyName);
        console.log(owner.Description);
        console.log(owner.FoundedYear);
        console.log(owner.WebsiteUrl);

        this.ownerservice.AddOwner(this.owner)
            .subscribe((owners) => {
                this.owners = owners
            },
            err => {
                this.errorMessage = err;               
            });
    }
}