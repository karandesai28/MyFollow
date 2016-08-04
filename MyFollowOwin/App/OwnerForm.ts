import { Component,Injectable } from '@angular/core';
import {ControlGroup} from '@angular/common';
import {Http, HTTP_PROVIDERS, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
    selector: 'owner-form',
    providers: [HTTP_PROVIDERS],
    templateUrl: 'App/Owner/OwnerForm.html'    
})

export class OwnerForm {
    public http: Http;
    
   
    onSubmit(form: ControlGroup) {  
        let body = JSON.stringify({ form });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });    
        console.log(form);


        return this.http.post("http://localhost:55099/api/Owner/PostProductOwners", body)
            .map(res=>res.json);
    }


}
