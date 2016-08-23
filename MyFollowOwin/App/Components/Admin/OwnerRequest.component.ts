import {Component, OnInit,OnChanges} from '@angular/core';
import {Service} from './../Shared/Service';
import {OwnerModel, OwnerRequestStates} from './../Shared/Models';
@Component({
    selector: 'owner-requests', 
    providers: [Service],   
    templateUrl:'App/Client Side Views/Admin/OwnerRequest.component.html' 
})

export class OwnerRequest implements OnInit,OnChanges{
    
    Click: boolean = false;
    owners: Array<OwnerModel>;    
    errorMessage: string;
    owner: OwnerModel;
      
    constructor(private ownerservice: Service) {
        this.owners = new Array<OwnerModel>();
        this.owner = new OwnerModel(); 
        if (this.Click == true) {
            this.pendingOwners();
        }             
    }   

    
    ngOnInit() {          
        this.pendingOwners();                               
    }

    ngOnChanges() {
        alert("Removing record");
        if (this.Click == true) {
            this.pendingOwners();
            this.Click = false;
        } 
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
        this.ownerservice.UpdateOwnerState(this.owner)
            .subscribe((owners) => {
                this.owners = owners                                 
            },
            err => {
                this.errorMessage = err;
            });
        this.ngOnChanges();      
    }

    Approve(ownerId: number) {
        this.Click = true;
        this.owner.Id = ownerId;
        this.owner.OwnerStates = 1;
        this.UpdateOwnerData();                                   
    }

    Reject(ownerId: number) {
        this.Click = true;    
        this.owner.Id = ownerId;
        this.owner.OwnerStates = 2;
        this.UpdateOwnerData();             
    }
}