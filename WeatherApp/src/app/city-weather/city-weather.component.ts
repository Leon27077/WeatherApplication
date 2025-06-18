import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather.service';

@Component({
  selector: 'app-city-weather',
  imports: [],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.css'
})
export class CityWeatherComponent{

  protected dt: any;
  protected feels_like: any;
  protected humidity: any;
  protected temp: any;
  protected sunrise: any;
  protected sunset: any;
  protected timezone: any;
  protected visibility: any;
  protected weather_description: any;
  protected wind_speed: any;
  protected hide_weather:boolean = false;


  constructor(protected weatherService: WeatherService) {
  }

  loadWeather() {
    this.weatherService.getWeatherByCoordinates(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lon"))).subscribe({
      next: (data:any) => {
        this.dt = data.dt;
        this.feels_like = data.main.feels_like;
        this.humidity = data.main.humidity;
        this.temp = data.main.temp;
        this.sunrise = data.sys.sunrise;
        this.sunset = data.sys.sunset;
        this.timezone = data.timezone;
        this.visibility = data.visibility;
        this.weather_description = data.weather[0].description;
        this.wind_speed = data.wind.speed;
        console.log(data);
      }
      }
    )
  }

}
