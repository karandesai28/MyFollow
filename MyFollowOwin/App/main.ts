import { bootstrap }    from '@angular/platform-browser-dynamic';
import {OwnerComponent} from './OwnerForm';
import { HTTP_PROVIDERS } from '@angular/http';
import {OwnerService} from './OwnerService';

bootstrap(OwnerComponent, [HTTP_PROVIDERS, OwnerService]);
