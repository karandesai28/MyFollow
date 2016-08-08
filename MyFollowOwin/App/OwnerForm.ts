import { Component, Injectable,Input } from '@angular/core';
import {ControlGroup, FORM_DIRECTIVES} from '@angular/common';
import {OwnerModel} from './Models';
import {OwnerService} from './Service';


@Component({
    selector: 'owner-form',
    directives: [FORM_DIRECTIVES],
    providers: [OwnerService],
    templateUrl: 'App/Owner/OwnerForm.html'
})

export class OwnerForm {
    //public obj = new OwnerModel()    

    owners: Array<OwnerModel>;
    owner: OwnerModel;
    ownerservice: OwnerService;
    errorMessage: string;
    constructor() {
    }
    

    onSubmit(obj) {

        alert(`saved!!! ${JSON.stringify(obj)}`);
        obj = new OwnerModel();       
        console.log(obj);
        console.log(obj.CompanyName);   
        var postOwner = this.ownerservice.AddOwner(obj)
            .subscribe((owners) => {
                this.owners = owners
            },
            err => {
                this.errorMessage = err;
                console.log(this.errorMessage);
            });

    }
}