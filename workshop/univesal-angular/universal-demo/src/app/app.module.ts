import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SakilaService } from './sakila.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),HttpClientModule,BrowserTransferStateModule
  ],
  providers: [SakilaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
