import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
//services
import { WeatherService } from './services/weather.service';

//animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material
import { MaterialModule } from './material.module'

//reactive forms
import { ReactiveFormsModule } from '@angular/forms';

//flex layout
// import { FlexLayoutModule } from '@angular/flex-layout';

//http
import { HttpClientModule } from '@angular/common/http';

//routing
import { RoutingModule } from './app.routing';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    // FlexLayoutModule,
    HttpClientModule,
    RoutingModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
