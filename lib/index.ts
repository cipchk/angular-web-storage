import { NgModule } from '@angular/core';
import { LocalStorageService, SessionStorageService } from './src/service';

export { LocalStorage, SessionStorage } from './src/decorator';
export { LocalStorageService, SessionStorageService } from './src/service';

@NgModule({
    providers: [LocalStorageService, SessionStorageService]
})
export class AngularWebStorageModule { }
