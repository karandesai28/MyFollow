import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {OwnerModel} from './Models';
import {OwnerForm} from './OwnerForm';

@Injectable()
export class OwnerService {
    ownerobj: Array<OwnerModel>;
    private ownerUrl = 'api/Owner';
    constructor(private http: Http) { }
    AddOwner(ownerobj: OwnerModel) {
        console.log("I'm here");
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.ownerUrl, JSON.stringify(ownerobj)).map(res => res.json());           
    }
}