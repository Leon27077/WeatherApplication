import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city-weather',
  imports: [],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.css'
})
export class CityWeatherComponent implements OnInit{

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


  constructor(protected weatherService: WeatherService, private route: ActivatedRoute) {
  }



  ngOnInit() {
    this.route.params.subscribe(params => {

      const lat = Number(sessionStorage.getItem("lat"));
      const lon = Number(sessionStorage.getItem("lon"));

      this.weatherService.getWeatherByCoordinates(lat, lon).subscribe({
        next: (data: any) => {
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
      });
    });
  }

  private calculateTime(dt: any, timezone: any){
    const utcDate = new Date(dt*1000);
    const localOffset = utcDate.getTimezoneOffset() * 60;
    const finalDate = new Date((this.dt + timezone + localOffset)*1000);
    return finalDate.toLocaleString();

  }

  getDt(){
    return this.calculateTime(this.dt, this.timezone).split(',')[1];
  }


}
