import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Owner} from './Models';
import {OwnerForm} from './OwnerForm';

@Injectable()
export class OwnerService {
    private ownerUrl = 'api/Owner';
    constructor(private http: Http) { }
    AddOwner() {
        return this.http.post(this.ownerUrl, console.log("Finish!")).map(res => res.json());           
    }
}