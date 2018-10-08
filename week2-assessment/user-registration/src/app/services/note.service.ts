import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getCity(city): Observable<any>{
    console.log("getWeather>");
    return this.http.get(`${environment.city_url}${city}&APPID=${environment.city_api_key}`);
  }

  addNote(note){
    return this.http.post(`${environment.api_url}form`, note);
  }
}
