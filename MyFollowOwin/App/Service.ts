import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {OwnerModel} from './Models';
import {OwnerComponent} from './OwnerForm';
import 'rxjs/add/operator/map';

@Injectable()
export class OwnerService {
   
    private ownerUrl = 'api/ProductOwners/';
    private userUrl = 'api/ApplicationUsers/';
    constructor(private http: Http) { }


    getUserId() {
        return this.http.get(this.userUrl)
            .map(response => response.json());
    }


    AddOwner(ownerobj: OwnerModel) {       
        let headers = new Headers({
            'Content-Type': 'application/json',           
        });              
        return this.http.post(this.ownerUrl, JSON.stringify(ownerobj), {headers: headers}).map(res => res.json());           
    }
}