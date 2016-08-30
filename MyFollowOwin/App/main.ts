import { bootstrap }    from '@angular/platform-browser-dynamic';
import {EndUserComponent} from './Components/EndUsers/EndUser.component';
import { HTTP_PROVIDERS } from '@angular/http';
import {Service} from './Components/Shared/Service';
import {OwnerRequest} from './Components/Admin/OwnerRequest.component';
import {OwnerComponent} from './Components/Owners/Owner.component';
import {appUserRoutes, appOwnerRoutes} from './Components/Shared/MyFollow.Routes';


bootstrap(OwnerRequest, [HTTP_PROVIDERS, Service]); // For Admin
bootstrap(EndUserComponent, [HTTP_PROVIDERS, Service, appUserRoutes]);   // For User
bootstrap(OwnerComponent, [HTTP_PROVIDERS, Service, appOwnerRoutes]);     //For Owner