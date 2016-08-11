import {Component,OnInit} from '@angular/core';
import {OwnerService} from './Service';
import {OwnerModel, OwnerRequestStates} from './Models';
@Component({
    selector: 'owner-requests', 
    providers: [OwnerService],
    templateUrl:'AppAdmin/AdminView.html' 
})
export class OwnerRequest implements OnInit {

    Click: Boolean = false;
    

    owners: Array<OwnerModel>;
    errorMessage: string;
    owner: OwnerModel;
    constructor(private ownerservice: OwnerService) {
        this.owners = new Array<OwnerModel>();
        this.owner = new OwnerModel();
    }

    ngOnInit() {
        this.getOwners();
        console.log(this.owner.Id);
    }

    getOwners() {
        var displayOwner = this.ownerservice.getOwner()
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