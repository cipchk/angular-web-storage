import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AngularWebStorageModule } from 'angular-web-storage';

import { AppComponent } from './app.component';
import { DemoComponent } from './components/demo.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,

    AngularWebStorageModule,
  ],
  declarations: [AppComponent, DemoComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
