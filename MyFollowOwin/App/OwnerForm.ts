import { Component,Injectable } from '@angular/core';
import {ControlGroup} from '@angular/common';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {OwnerService} from './Service';
import {Owner} from './Models';


@Component({
    selector: 'owner-form',    
    templateUrl: 'App/Owner/OwnerForm.html'    
})

export class OwnerForm {
    obj: Owner;    
    constructor() { }
    onSubmit(form: ControlGroup) {         
        console.log(this.obj);       
    }  
}
