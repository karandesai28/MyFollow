import {Component,OnInit} from '@angular/core';
import {OwnerService} from './Service';
import {OwnerModel} from './Models';

@Component({
    selector: "owner-requests",
    providers: [OwnerService],    
    templateUrl: 'App/Owner/ListForAdmin.html'
})
export class OwnerRequest implements OnInit {

    owners: Array<OwnerModel>;
    errorMessage: string;
    owner: OwnerModel;
    constructor(private ownerservice: OwnerService) {
        this.owners = new Array<OwnerModel>();
        this.owner = new OwnerModel();
    }

    ngOnInit() {
        this.getOwners();
    }

    getOwners() {
        var displayOwner = this.ownerservice.getOwner()
            .subscribe((owners) => {
                this.owners = owners
            }, err => {
                this.errorMessage = err;
            });
    } 


}