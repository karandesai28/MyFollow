import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {OwnerModel, ProductModel, ProductUpdate} from './Models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class Service {
   
    private ownerUrl = 'api/ProductOwners/';
    private productUrl = 'api/Products/';
    private followUrl = 'api/Followers/';
    private addedproductUrl = 'api/OwnerProductMappings/';   
    private updateUrl = 'api/ProductUpdates/';
    private userUrl = 'api/ApplicationUsers/';
    constructor(private http: Http) { }    

    getPendingOwners() {
        return this.http.get(this.ownerUrl)
            .map(response => response.json());
    }  


    UpdateOwnerState(ownerobj: OwnerModel) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.put(this.ownerUrl + ownerobj.Id, JSON.stringify(ownerobj), { headers: headers }).map(res => res.json().data);
    }

    AddOwner(ownerobj: OwnerModel) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.ownerUrl, JSON.stringify(ownerobj), { headers: headers }).map(res => res.json().data);
    }

    AddProduct(productobj: ProductModel) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.productUrl, JSON.stringify(productobj), { headers: headers }).map(res => res.json().data);
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
        return this.http.put(this.productUrl + productobj.Id, JSON.stringify(productobj), { headers: headers }).map(res => res.json().data);
    }

    DeleteProduct(productobj: ProductModel) {        
        return this.http.delete(this.productUrl + productobj.Id);
    }

    FollowProduct(productobj: ProductModel) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.followUrl + productobj.Id, JSON.stringify(productobj.Id), { headers: headers }).map(res => res.json().data);
    }

    UpdateProduct(productobj: ProductUpdate) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.updateUrl + productobj.ProductId, JSON.stringify(productobj), { headers: headers }).map(res => res.json().data);
    }

    getProductUpdates(productId:number) {
        return this.http.get(this.updateUrl + productId)
            .map(response => response.json());
    }

    getProductById(productId: number) {
        return this.http.get(this.productUrl + productId)
            .map(response => response.json());
    }
  

    getUsers() {
        return this.http.get(this.userUrl)
            .map(response => response.json());
    }
}