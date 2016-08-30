import { provideRouter, RouterConfig }  from '@angular/router';
import {ProductList} from './../EndUsers/ProductList.component';
import {OwnerComponent} from './../EndUsers/OwnerForm.component';
import {AddedProducts} from './../Owners/AddedProducts.component';
import {AddProduct} from './../Owners/AddProduct.component';


const userroutes: RouterConfig = [
    {
        path: 'Home/Index',
        component: ProductList
    },
    {
        path: 'Home/Index/BecomeOwner',
        component: OwnerComponent

    }
]

export const appUserRoutes = [
    provideRouter(userroutes)
];

const ownerroutes: RouterConfig = [
    {
        path: 'Owner/Index',
        component: AddedProducts
    },
    {
        path: 'Owner/Index/ProductList',
        component: ProductList
    },
    {
        path: 'Owner/Index/AddProduct',
        component: AddProduct
    }
]

export const appOwnerRoutes = [
    provideRouter(ownerroutes)
];