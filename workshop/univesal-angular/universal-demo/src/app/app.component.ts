import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Film,SakilaService } from './sakila.service';

import * as qs from 'querystring';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  films: Film[]=[];

 constructor(private sakilaSvc:SakilaService,
  @Inject(PLATFORM_ID) private platformId){}

 ngOnInit(){
   
   let opt={limit:20, offset:0};
   
   if (window.location.search) {
    // /?a=1&b=2 => { a: 1, b: 2 }
    const tmp = qs.parse(window.location.search.substr(1));
    opt = {
      ...opt,
      ...tmp
    }
  }

   this.sakilaSvc.getFilms(opt.limit,opt.offset)
    .then(result => this.films = result)
    .catch(err=>{
      console.log(">>> error:",err);
    })

 }
}
