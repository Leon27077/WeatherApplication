import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CityWeatherComponent} from '../city-weather/city-weather.component';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private geoUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://pro.openweathermap.org/data/2.5/forecast';
  private apiKey = '89836a59d86d39b9fc8e232f73d7c2ce';

  constructor(private http: HttpClient) {

  }

  getInfo(city:any): Observable<any>{
    return this.http.get(`${this.geoUrl}?q=${city}&limit=5&appid=${this.apiKey}`);
  }

  getWeatherByCoordinates(lat:number, lon:number) {
    return this.http.get(`${this.weatherUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
  }

  getForecastByCoordinates(lat:number, lon:number){
    return this.http.get(`${this.forecastUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)
  }


}
