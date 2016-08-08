﻿import { bootstrap }    from '@angular/platform-browser-dynamic';
import {MyApp } from './LandingPage';
import { appRouterProviders } from './routes';
import { HTTP_PROVIDERS } from '@angular/http';
import {OwnerService} from './Service';

bootstrap(MyApp, [appRouterProviders, HTTP_PROVIDERS, OwnerService]);
