import { bootstrap }    from '@angular/platform-browser-dynamic';
import {OwnerRequest} from './OwnerRequest';
import { HTTP_PROVIDERS } from '@angular/http';
bootstrap(OwnerRequest, [HTTP_PROVIDERS]);
