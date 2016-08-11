import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {OwnerModel} from './Models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class OwnerService {
   
    private ownerUrl = 'api/ProductOwners/';
   
    constructor(private http: Http) { }

    getOwner() {
        return this.http.get(this.ownerUrl)
            .map(response => response.json());
    }  

    UpdateOwnerState(ownerobj: OwnerModel) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        return this.http.put(this.ownerUrl + ownerobj.Id, JSON.stringify(ownerobj), { headers: headers }).map(res => res.json());
    }
}