import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    //variables
    result = {
      country: '',
      temp: '',
      humidity: '',
      pressure: '',
      desc: ''
    };
    selectedCity: '';
  
    //back button
    goBack(){
      this.route.navigate(['/add']);
    }

  constructor() { }

  ngOnInit() {
    console.log ('Selected city in service: ', this.weatherSvc.selectedCity);
    this.weatherSvc.getWeather(this.weatherSvc.selectedCity)  //everytime init (redirected from add) get the weather data for selected city recorded in service
        .subscribe((data: any) => {
          console.log('Data passed back from api: ', data);
          this.result = data.main;
          this.result.temp = (data.main.temp - 273).toFixed(2)+' Celcius'; //transforms temp from kelvin to celcius
          this.result.desc = data.weather[0].description;
          this.result.country = data.name;
        })
  }

}
