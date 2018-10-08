import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
//Install material module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Install flex-layout
import{ FlexLayoutModule } from '@angular/flex-layout';
//material.module
import { MaterialModule } from './material.module';
//new components
import { NoteComponent } from './components/note.component';
//services
import { NoteService } from './services/note.service';
//http
import { HttpClientModule } from '@angular/common/http';
//routing
import { RoutingModule } from './app.routing';
import { ThankComponent } from './components/thank.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    ThankComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
