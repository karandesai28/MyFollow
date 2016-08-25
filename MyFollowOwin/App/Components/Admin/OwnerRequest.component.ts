import {Component, OnInit} from '@angular/core';
import {Service} from './../Shared/Service';
import {OwnerModel, OwnerRequestStates} from './../Shared/Models';

@Component({
    selector: 'owner-requests', 
    providers: [Service],   
    templateUrl:'App/Client Side Views/Admin/OwnerRequest.component.html' 
})

export class OwnerRequest implements OnInit{   
    owners: Array<OwnerModel>;    
    errorMessage: string;
    owner: OwnerModel;
      
    constructor(private ownerservice: Service) {
        this.owners = new Array<OwnerModel>();
        this.owner = new OwnerModel();                  
    }   

    
    ngOnInit() {          
        this.pendingOwners();                               
    }    
   
    pendingOwners() {      
        this.ownerservice.getPendingOwners()
            .subscribe((owners) => {
                this.owners = owners
            }, err => {
                this.errorMessage = err;
            });          
    }

    UpdateOwnerData() {
        var ownerupdate = this.ownerservice.UpdateOwnerState(this.owner)
            .subscribe(                
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => { this.pendingOwners(); }

            );        
    }

    Approve(ownerId: number) {
        this.owner.Id = ownerId;
        this.owner.OwnerStates = OwnerRequestStates.Approved;
        this.UpdateOwnerData();                                   
    }

    Reject(ownerId: number) {       
        this.owner.Id = ownerId;
        this.owner.OwnerStates = OwnerRequestStates.Rejected;
        this.UpdateOwnerData();             
    }
}