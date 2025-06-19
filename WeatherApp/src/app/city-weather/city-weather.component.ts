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

  protected city_name: any;
  protected country: any;
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

  protected current_day: any[] = [];
  protected first_day: any[] = [];
  protected second_day: any[] = [];
  protected third_day: any[] = [];
  protected fourth_day: any[] = [];
  protected fifth_day: any[] = [];

  protected forecast_num: number = 0;


  constructor(protected weatherService: WeatherService, private route: ActivatedRoute) {
  }



  ngOnInit() {
    this.route.params.subscribe(params => {

      this.current_day = [];
      this.first_day = [];
      this.second_day = [];
      this.third_day = [];
      this.fourth_day = [];
      this.fifth_day = [];

      const lat = Number(sessionStorage.getItem("lat"));
      const lon = Number(sessionStorage.getItem("lon"));

      this.weatherService.getWeatherByCoordinates(lat, lon).subscribe({
        next: (data: any) => {
          this.city_name = data.name;
          this.country = data.sys.country;
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
      this.forecast_num = 0;
    this.weatherService.getForecastByCoordinates(lat, lon).subscribe({
      next: (data: any) => {
        for (let item of data.list){
          let date = new Date();
          let itemDate: Date = new Date(item.dt*1000)
          if (this.checkForDay(0, itemDate, date)){
            this.current_day = this.saveDate(this.current_day, itemDate, item);
          }
          else if(this.checkForDay(1, itemDate, date)){
            this.first_day = this.saveDate(this.first_day, itemDate, item);
            console.log(this.first_day)
          }
          else if(this.checkForDay(2, itemDate, date)){
            this.second_day = this.saveDate(this.second_day, itemDate, item);
          }
          else if(this.checkForDay(3, itemDate, date)){
            this.third_day = this.saveDate(this.third_day, itemDate, item);
          }
          else if(this.checkForDay(4, itemDate, date)){
            this.fourth_day = this.saveDate(this.fourth_day, itemDate, item);
          }
          else if(this.checkForDay(5, itemDate, date)) {
            this.fifth_day = this.saveDate(this.fifth_day, itemDate, item);
          }
        }
      }
    })
    });
  }

  private calculateTime(dt: any, timezone: any){
    const utcDate = new Date(dt*1000);
    const localOffset = utcDate.getTimezoneOffset() * 60;
    const finalDate = new Date((dt + timezone + localOffset)*1000);
    return finalDate.toLocaleString();

  }

  private checkForDay(day: number, itemDate: Date, date: Date){
    let compareDate = new Date(date);
    compareDate.setDate(date.getDate() + day);
    return itemDate.toLocaleString().split(',')[0] === compareDate.toLocaleString().split(',')[0]
  }

  private saveDate(li: any, itemDate:Date, item:any){
    return [...li, [this.getDayByInt(itemDate.getDay()), itemDate.toLocaleString().split(',')[1], Math.round(item.main.temp - 273.15), item.weather[0].icon]];
  }

  private getDayByInt(int: number): string {
    switch (int) {
      case 0: return 'Sonntag';
      case 1: return 'Montag';
      case 2: return 'Dienstag';
      case 3: return 'Mittwoch';
      case 4: return 'Donnerstag';
      case 5: return 'Freitag';
      case 6: return 'Samstag';
      default: return 'Ungültiger Tag';
    }
  }

  getDt(){
    return this.calculateTime(this.dt, this.timezone).split(',')[1];
  }

  getTemp(){
    return Math.round(this.temp -273.15);
  }

  getFeelsLike(){
    return Math.round(this.feels_like -273.15);
  }

  getSunrise(){
    return this.calculateTime(this.sunrise, this.timezone).split(',')[1];
  }

  getSunset(){
    return this.calculateTime(this.sunset, this.timezone).split(',')[1];
  }

  getForecastByNumber(num:number){
    switch (num){
      case 0: return this.current_day;
      case 1: return this.first_day;
      case 2: return this.second_day;
      case 3: return this.third_day;
      case 4: return this.fourth_day;
      case 5: return this.fifth_day;
    }
    return null;
  }

  increaseCounter(){
    this.forecast_num += 1;
  }

  decreaseCounter(){
    this.forecast_num -= 1;
  }

}
