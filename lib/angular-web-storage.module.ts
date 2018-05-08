import { NgModule } from '@angular/core';
import { LocalStorageService, SessionStorageService } from './src/service';

@NgModule({
  providers: [LocalStorageService, SessionStorageService],
})
export class AngularWebStorageModule {}
