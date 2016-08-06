import { Component, OnInit } from '@angular/core';
import {OwnerForm} from './OwnerForm';
import {ProductList} from './ProductComponent';
import { ROUTER_DIRECTIVES } from '@angular/router';
@Component({
    selector: 'my-app',
    directives: [OwnerForm, ProductList, ROUTER_DIRECTIVES],       
    template: `<button routerLink="Home/Index/Owner" routerLinkActive="active">Become Owner</button>
<router-outlet></router-outlet>
<product-list></product-list>`    
})
export class MyApp implements OnInit {    
    constructor() { }
    ngOnInit() { }    
}