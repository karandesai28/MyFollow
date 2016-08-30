"use strict";
var router_1 = require('@angular/router');
var ProductList_component_1 = require('./../EndUsers/ProductList.component');
var OwnerForm_component_1 = require('./../EndUsers/OwnerForm.component');
var AddedProducts_component_1 = require('./../Owners/AddedProducts.component');
var AddProduct_component_1 = require('./../Owners/AddProduct.component');
var userroutes = [
    {
        path: 'Home/Index',
        component: ProductList_component_1.ProductList
    },
    {
        path: 'Home/Index/BecomeOwner',
        component: OwnerForm_component_1.OwnerComponent
    }
];
exports.appUserRoutes = [
    router_1.provideRouter(userroutes)
];
var ownerroutes = [
    {
        path: 'Owner/Index',
        component: AddedProducts_component_1.AddedProducts
    },
    {
        path: 'Owner/Index/ProductList',
        component: ProductList_component_1.ProductList
    },
    {
        path: 'Owner/Index/AddProduct',
        component: AddProduct_component_1.AddProduct
    }
];
exports.appOwnerRoutes = [
    router_1.provideRouter(ownerroutes)
];
//# sourceMappingURL=MyFollow.Routes.js.map