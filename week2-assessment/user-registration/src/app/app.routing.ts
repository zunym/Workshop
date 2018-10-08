import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule,Routes} from '@angular/router'

import { NoteComponent } from './components/note.component';
import {ThankComponent} from './components/thank.component'
const appRoutes = [
    {
        path: 'form',
        component: NoteComponent,
    },
    {
        path: 'thank',
        component: ThankComponent,
    },
    {
        path: '',
        redirectTo: '/form',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NoteComponent,
    }
];


@NgModule({
    declarations: [
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes)
    ],
    exports: [ RouterModule ],
    providers: []
  })
  export class RoutingModule { }