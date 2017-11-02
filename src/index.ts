import { NgModule } from "@angular/core";
import { LocalStorageService, SessionStorageService } from './core/service';

export { LocalStorage, SessionStorage } from './core/decorator';
export { LocalStorageService, SessionStorageService } from './core/service';

@NgModule({
    providers: [LocalStorageService, SessionStorageService]
})
export class AngularWebStorageModule { }
