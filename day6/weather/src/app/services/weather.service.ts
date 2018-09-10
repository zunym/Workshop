import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  //variable
  cities: Array<string> = []; //array of city list added
  city: string = ''; //selected city for api call
  init() { //initialize the variables on start of service
    this.cities = [];
    this.city = '';
  }

  constructor(private http: HttpClient) { }

  getWeather(city): Observable<any> {
    console.log("getting Weather data from API...");
    return this.http
      .get(`${environment.openweather_url}${city}&APPID=${environment.openweather_api_key}`) //get weather data from api
      .pipe(
        catchError(this.handleError('getWeather', []))
      );;
  }

  addCity(city) {
    console.log('Cities array inside service', this.cities);
    this.cities.push(city); //add new city into array
    localStorage.setItem('cities', JSON.stringify(this.cities)); //save new array into localstorage
    console.log('List inside localStorage', JSON.parse(localStorage.getItem('cities')));
    return of(); //of means observable
  }

  getCities() {
    this.cities = JSON.parse(localStorage.getItem('cities')); //gets list from localstorage
    return of(this.cities); //of means observable
  }

  deleteCity(index) {
    this.cities.splice(index, 1); //remove item from array
    localStorage.setItem('cities', JSON.stringify(this.cities)); //save new array into localstorage
    return of(this.cities); //of means observable
  }

  selectCity(city) {
    return of(this.selectedCity = city); //of means observable
  }

  selectedCity() {
    return of(this.selectedCity); //of means observable
  }

  //error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
}
