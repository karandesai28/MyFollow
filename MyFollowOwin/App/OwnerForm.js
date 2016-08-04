"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
require('rxjs/add/operator/map');
var OwnerForm = (function () {
    function OwnerForm() {
    }
    OwnerForm.prototype.onSubmit = function (form) {
        var body = JSON.stringify({ form: form });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(form);
        return this.http.post("http://localhost:55099/api/Owner/PostProductOwners", body)
            .map(function (res) { return res.json; });
    };
    OwnerForm = __decorate([
        core_1.Component({
            selector: 'owner-form',
            providers: [http_1.HTTP_PROVIDERS],
            templateUrl: 'App/Owner/OwnerForm.html'
        }), 
        __metadata('design:paramtypes', [])
    ], OwnerForm);
    return OwnerForm;
}());
exports.OwnerForm = OwnerForm;
//# sourceMappingURL=OwnerForm.js.map