import {Component, Inject, OnInit, Optional, PLATFORM_ID} from '@angular/core';
import {Film, SakilaService} from './sakila.service';

import * as qs from 'querystring';
import {isPlatformBrowser} from '@angular/common';
import {makeStateKey, Meta, Title, TransferState} from '@angular/platform-browser';

const SAKILA_DATA = makeStateKey('SAKILA_DATA');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  films: Film[] = [];

  constructor(private sakilaSvc: SakilaService,
          @Optional() @Inject('sakila') private sakila: Film[],
          private state: TransferState,
          private title: Title, private meta: Meta,
          @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {

      console.log('Running on the browser');

      this.films = this.state.get(SAKILA_DATA, []);

      if (!this.films.length) {
        console.log('Making a request to get initial data');
        let opt = {limit: 20, offset: 0};

        if (window.location.search) {
          // /?a=1&b=2 => { a: 1, b: 2 }
          const tmp = qs.parse(window.location.search.substr(1));
          opt = {
            ...opt,
            ...tmp
          }
        }

        this.sakilaSvc.getFilms(opt.limit, opt.offset)
          .then(result => this.films = result)
          .catch(err => {
            console.log(">>> error: ", err);
          })
      }
    } else {
      console.log('Running on the SERVER');
      this.state.set(SAKILA_DATA, this.sakila);
      //SEO
      this.title.setTitle('Rendered on the server');
      this.meta.addTag({
        name: 'specials', content: 'movies'
      });
    }
  }

}
