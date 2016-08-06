"use strict";
var router_1 = require('@angular/router');
var LandingPage_1 = require('./LandingPage');
var OwnerForm_1 = require('./OwnerForm');
var Routes = [
    {
        path: '',
        component: LandingPage_1.MyApp
    },
    {
        path: 'Home/Index/Owner',
        component: OwnerForm_1.OwnerForm
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(Routes)
];
//# sourceMappingURL=routes.js.map