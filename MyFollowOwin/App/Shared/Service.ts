import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {OwnerModel, ProductModel} from './Models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class Service {
   
    private ownerUrl = 'api/ProductOwners/';
    private productUrl = 'api/Products/';
    private addedproductUrl = 'api/OwnerProductMappings/';
    private followUrl = 'api/Followers/';
    constructor(private http: Http) { }    

    getPendingOwners() {
        return this.http.get(this.ownerUrl)
            .map(response => response.json());
    }  


    UpdateOwnerState(ownerobj: OwnerModel) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.put(this.ownerUrl + ownerobj.Id, JSON.stringify(ownerobj), { headers: headers }).map(res => res.json());
    }

    AddOwner(ownerobj: OwnerModel) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.ownerUrl, JSON.stringify(ownerobj), { headers: headers }).map(res => res.json());
    }

    AddProduct(productobj: ProductModel) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.productUrl, JSON.stringify(productobj), { headers: headers }).map(res => res.json());
    }

    getProduct() {
        return this.http.get(this.productUrl)
            .map(response => response.json());
    }

    getAddedProduct() {
        return this.http.get(this.addedproductUrl)
            .map(response => response.json());
    }

    EditProduct(productobj: ProductModel) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.put(this.productUrl + productobj.Id, JSON.stringify(productobj), { headers: headers }).map(res => res.json());
    }

    DeleteProduct(productobj: ProductModel) {        
        return this.http.delete(this.productUrl + productobj.Id);
    }

    FollowProduct(productobj: ProductModel) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.followUrl + productobj.Id, JSON.stringify(productobj.Id), { headers: headers }).map(res => res.json());
    }
}