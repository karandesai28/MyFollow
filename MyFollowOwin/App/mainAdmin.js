"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var Service_1 = require('./Service');
var OwnerRequest_1 = require('./OwnerRequest');
platform_browser_dynamic_1.bootstrap(OwnerRequest_1.OwnerRequest, [http_1.HTTP_PROVIDERS, Service_1.OwnerService]);
//# sourceMappingURL=mainAdmin.js.map