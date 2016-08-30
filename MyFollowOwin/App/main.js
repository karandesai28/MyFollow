"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var EndUser_component_1 = require('./Components/EndUsers/EndUser.component');
var http_1 = require('@angular/http');
var Service_1 = require('./Components/Shared/Service');
var OwnerRequest_component_1 = require('./Components/Admin/OwnerRequest.component');
var Owner_component_1 = require('./Components/Owners/Owner.component');
var MyFollow_Routes_1 = require('./Components/Shared/MyFollow.Routes');
platform_browser_dynamic_1.bootstrap(OwnerRequest_component_1.OwnerRequest, [http_1.HTTP_PROVIDERS, Service_1.Service]); // For Admin
platform_browser_dynamic_1.bootstrap(EndUser_component_1.EndUserComponent, [http_1.HTTP_PROVIDERS, Service_1.Service, MyFollow_Routes_1.appUserRoutes]); // For User
platform_browser_dynamic_1.bootstrap(Owner_component_1.OwnerComponent, [http_1.HTTP_PROVIDERS, Service_1.Service, MyFollow_Routes_1.appOwnerRoutes]); //For Owner
//# sourceMappingURL=main.js.map