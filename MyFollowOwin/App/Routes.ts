import {provideRouter, RouterConfig} from '@angular/router';
import {MyApp} from './LandingPage';
import {OwnerForm} from './OwnerForm';

const Routes: RouterConfig = [
    {
        path: '',
        component: MyApp
    },
    {
        path: 'Home/Index/Owner',
        component: OwnerForm
    }
];

export const appRouterProviders = [
    provideRouter(Routes)
];