import { bootstrap }    from '@angular/platform-browser-dynamic';
import {Http, HTTP_PROVIDERS} from "@angular/http";
import {MyApp } from './LandingPage';

bootstrap(MyApp,[HTTP_PROVIDERS]);
