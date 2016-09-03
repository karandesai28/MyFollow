import {Component, OnInit} from '@angular/core';
import {Service} from './../Shared/Service';
import {OwnerModel, OwnerRequestStates, UserModel} from './../Shared/Models';

@Component({
    selector: 'owner-requests', 
    providers: [Service],   
    templateUrl:'App/ClientSideViews/Admin/OwnerRequest.component.html' 
})

export class OwnerRequest implements OnInit{   
    owners: Array<OwnerModel>;    
    errorMessage: string;
    owner: OwnerModel;
    user: UserModel;
    users: Array<UserModel>;
      
    constructor(private ownerservice: Service) {
        this.owners = new Array<OwnerModel>();
        this.owner = new OwnerModel();
        this.user = new UserModel();
        this.users = new Array<UserModel>();                 
    }   

    
    ngOnInit() {          
        this.pendingOwners();                               
    } 

    //Invokes if accept button is clicked
    Approve(ownerId: number) {
        this.owner.Id = ownerId;
        this.owner.OwnerStates = OwnerRequestStates.Approved;
        this.UpdateOwnerData();
    }

    //Invokes if reject button is clicked
    Reject(ownerId: number) {
        this.owner.Id = ownerId;
        this.owner.OwnerStates = OwnerRequestStates.Rejected;
        this.UpdateOwnerData();
    }
   

    //Service method to get list of pending owners
    pendingOwners() {      
        this.ownerservice.getPendingOwners()
            .subscribe((owners) => {
                this.owners = owners                
            }, err => {
                this.errorMessage = err;
            },
            () => { this.getRelatedUsers(); }
        );          
    }

    //Service method to get list of user records of pending owners from user table
    getRelatedUsers() {
        this.ownerservice.getUsers()
            .subscribe((users) => {
                this.users = users
            }, err => {
                this.errorMessage = err;
            });
    }

    //Service method to change the owner table entry and role as per accept/reject
    UpdateOwnerData() {
        var ownerupdate = this.ownerservice.UpdateOwnerState(this.owner)
            .subscribe(                
            function (response) { console.log("Success Response" + response) },
            function (error) { console.log("Error happened" + error) },
            () => { this.pendingOwners(); }

            );        
    }    
}