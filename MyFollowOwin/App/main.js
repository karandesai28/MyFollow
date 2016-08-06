"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var LandingPage_1 = require('./LandingPage');
var routes_1 = require('./routes');
var http_1 = require('@angular/http');
platform_browser_dynamic_1.bootstrap(LandingPage_1.MyApp, [routes_1.appRouterProviders, http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=main.js.map