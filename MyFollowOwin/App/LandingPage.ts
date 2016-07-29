import { Component,OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<h1>Find And Follow Products You Like <br/> <ul> <li *ngFor="let product of products"> {{product}} </li></ul> </h1>'
    
})
export class MyApp implements OnInit {


    products: Array<string> = ["Product1", "Product2", "Product3"];
    constructor() { }
    ngOnInit() { }
}