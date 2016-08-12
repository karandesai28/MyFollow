"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var OwnerForm_component_1 = require('./EndUsers/OwnerForm.component');
var http_1 = require('@angular/http');
var Service_1 = require('./Shared/Service');
var OwnerRequest_component_1 = require('./Admin/OwnerRequest.component');
var AddProduct_component_1 = require('./Owners/AddProduct.component');
platform_browser_dynamic_1.bootstrap(OwnerForm_component_1.OwnerComponent, [http_1.HTTP_PROVIDERS, Service_1.Service]);
platform_browser_dynamic_1.bootstrap(OwnerRequest_component_1.OwnerRequest, [http_1.HTTP_PROVIDERS, Service_1.Service]);
platform_browser_dynamic_1.bootstrap(AddProduct_component_1.AddProduct, [http_1.HTTP_PROVIDERS, Service_1.Service]);
//# sourceMappingURL=main.js.map