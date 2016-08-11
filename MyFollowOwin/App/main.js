"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var OwnerForm_1 = require('./OwnerForm');
var http_1 = require('@angular/http');
var OwnerService_1 = require('./OwnerService');
platform_browser_dynamic_1.bootstrap(OwnerForm_1.OwnerComponent, [http_1.HTTP_PROVIDERS, OwnerService_1.OwnerService]);
//# sourceMappingURL=main.js.map