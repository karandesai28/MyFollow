import { Component,Injectable } from '@angular/core';
import {ControlGroup} from '@angular/common';

@Component({
    selector: 'owner-form',    
    templateUrl: 'App/Owner/OwnerForm.html'    
})

export class OwnerForm {       
   
    onSubmit(form: ControlGroup) {           
        console.log(form);
    }
}
