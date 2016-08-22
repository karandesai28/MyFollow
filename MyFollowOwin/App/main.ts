import { bootstrap }    from '@angular/platform-browser-dynamic';
import {OwnerComponent} from './EndUsers/OwnerForm.component';
import { HTTP_PROVIDERS } from '@angular/http';
import {Service} from './Shared/Service';
import {OwnerRequest} from './Admin/OwnerRequest.component';
import {AddProduct} from './Owners/AddProduct.component';

bootstrap(OwnerComponent, [HTTP_PROVIDERS, Service]);
bootstrap(OwnerRequest, [HTTP_PROVIDERS, Service]);
bootstrap(AddProduct, [HTTP_PROVIDERS, Service]);