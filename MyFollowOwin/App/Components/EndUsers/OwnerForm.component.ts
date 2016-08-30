import { Component, Injectable, OnInit} from '@angular/core';
import {OwnerModel} from './../Shared/Models';
import {Service} from './../Shared/Service';
import {ProductList} from './../EndUsers/ProductList.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'owner-form',    
    providers: [Service],
    directives: [ProductList, ROUTER_DIRECTIVES],
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
 
   hideownerform: Boolean=false;
   
   ngOnInit() {
             
   } 

  
   onSubmit(owner: OwnerModel) { 
       this.hideownerform = true;       
        this.AddOwnerData();           
   }
    AddOwnerData() {
        this.ownerservice.AddOwner(this.owner)
            .subscribe(
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => {})
    }
}