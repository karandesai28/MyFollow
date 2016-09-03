import { Component, Injectable, OnInit} from '@angular/core';
import {OwnerModel} from './../Shared/Models';
import {Service} from './../Shared/Service';
import {ProductList} from './../EndUsers/ProductList.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'owner-form',    
    providers: [Service],
    directives: [ProductList, ROUTER_DIRECTIVES],
    templateUrl:'App/ClientSideViews/EndUsers/OwnerForm.component.html'    
})

export class OwnerComponent implements OnInit {   
    owners: Array<OwnerModel>;     
    errorMessage: string;      
    owner: OwnerModel;
   
   constructor(private ownerservice: Service) {      
       this.owners = new Array<OwnerModel>();     
       this.owner = new OwnerModel();      
   }
 
   hideownerform: Boolean=false;  //Variable to hide the form and display message
   
   ngOnInit() {
             
   } 

   //Handles form submission
   onSubmit(owner: OwnerModel) { 
       this.hideownerform = true;       
        this.AddOwnerData();           
   }

    //Service method to post request of owner
    AddOwnerData() {
        this.ownerservice.AddOwner(this.owner)
            .subscribe(
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => {})
    }
}