import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SakilaService } from './sakila.service';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    HttpClientModule
  ],
  providers:[SakilaService],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
