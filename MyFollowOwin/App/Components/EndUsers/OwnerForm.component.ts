import { Component, Injectable, OnInit} from '@angular/core';
import {OwnerModel} from './../Shared/Models';
import {Service} from './../Shared/Service';
import {ProductList} from './../EndUsers/ProductList.component';

@Component({
    selector: 'owner-form',    
    providers: [Service],
    directives: [ProductList],
    templateUrl:'App/Client Side Views/EndUsers/OwnerForm.component.html'    
})

export class OwnerComponent implements OnInit {   
    
    owners: Array<OwnerModel>;     
    errorMessage: string;      
    owner: OwnerModel;
   
   constructor(private ownerservice: Service) {      
       this.owners = new Array<OwnerModel>();     
       this.owner = new OwnerModel();      
   }
   hideclicked: Boolean;
   hideownerform: Boolean=false;
   Click: Boolean = false;
   hide() {
       this.hideclicked = true;
   }

   hideform() {
       this.hideownerform = true;
       alert("Thanks your request has been submitted!");
   }

   clicked() {
       this.Click = true;
   }
    
   ngOnInit() {
             
   } 

   clean() {
       this.owner.CompanyName = "";
       this.owner.Description = "";
       this.owner.FoundedYear = null;
       this.owner.WebsiteUrl = "";
   }
    
   onSubmit(owner: OwnerModel) {      
        console.log(owner.CompanyName);
        console.log(owner.Description);
        console.log(owner.FoundedYear);
        console.log(owner.WebsiteUrl);
        console.log(owner.OwnerStates);       
        this.AddOwnerData();
        this.hideform();
        this.clean();        
   }
    AddOwnerData() {
        this.ownerservice.AddOwner(this.owner)
            .subscribe((owners) => {
                this.owners = owners
            },
            err => {
                this.errorMessage = err;
            });
    }
}