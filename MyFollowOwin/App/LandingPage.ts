import { Component, OnInit } from '@angular/core';
import {OwnerForm} from './OwnerForm';
import {ProductList} from './ProductComponent';
import {ControlGroup} from "@angular/common";



@Component({
    selector: 'my-app',
    directives: [OwnerForm, ProductList],      
    template: `<button (click)="clicked()">Become Owner</button>
<owner-form *ngIf="Click"></owner-form>
<product-list></product-list>`
    
})
export class MyApp implements OnInit {
    Click: Boolean=false;
    clicked() {
        this.Click = true;
    }
    constructor() { }
    ngOnInit() { }
    
}