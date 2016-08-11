import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Product} from './Models';
import {OwnerComponent} from './OwnerForm';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ProductService {

    private productUrl = 'api/Products/';

    constructor(private http: Http) { }

    AddProduct(productobj: Product) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.productUrl, JSON.stringify(productobj), { headers: headers }).map(res => res.json());
    }

    getProduct() {
        return this.http.get(this.productUrl)
            .map(response => response.json());
    } 
}