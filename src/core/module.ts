import { NgModule } from "@angular/core";
import { LocalStorageService, SessionStorageService } from './service';

@NgModule({
    providers: [LocalStorageService, SessionStorageService]
})
export class AngularWebStorageModule { }
