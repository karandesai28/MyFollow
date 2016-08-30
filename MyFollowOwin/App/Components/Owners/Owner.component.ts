import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {ProductList} from './../EndUsers/ProductList.component';
import {AddedProducts} from './../Owners/AddedProducts.component';


@Component({
    selector: 'owner-component',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'App/Client Side Views/Owners/Owner.component.html'   
})

export class OwnerComponent {
   
}   
