import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {ProductList} from './../EndUsers/ProductList.component';
import {OwnerComponent} from './../EndUsers/OwnerForm.component';


@Component({
    selector: 'user-component',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'App/ClientSideViews/EndUsers/EndUser.component.html'   
})

export class EndUserComponent {
   //Master component whose template file contains button elements of routes.
}   
