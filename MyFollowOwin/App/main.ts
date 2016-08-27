import { bootstrap }    from '@angular/platform-browser-dynamic';
import {OwnerComponent} from './Components/EndUsers/OwnerForm.component';
import { HTTP_PROVIDERS } from '@angular/http';
import {Service} from './Components/Shared/Service';
import {OwnerRequest} from './Components/Admin/OwnerRequest.component';
import {AddProduct} from './Components/Owners/AddProduct.component';


bootstrap(OwnerComponent, [HTTP_PROVIDERS, Service]);
bootstrap(OwnerRequest, [HTTP_PROVIDERS, Service]);
bootstrap(AddProduct, [HTTP_PROVIDERS, Service]);