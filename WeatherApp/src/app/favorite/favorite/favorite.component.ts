import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-favorite',
  imports: [
    RouterLink
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit{
  protected data: any[] = [];

  constructor(private weather:WeatherService, private router:Router) {
  }

    ngOnInit(): void {
        for(let elem of JSON.parse(<string>localStorage.getItem("favs"))){
          this.weather.getWeatherByCoordinates(elem[0],elem[1]).subscribe({
            next: (data: any) => {
              this.data.push([data.name, data.sys.country, [elem[0], elem[1]]])
            }
          })
        }
    }

    setLat(lat:number){
    localStorage.setItem("lat", JSON.stringify(lat));
    }

    setLon(lon:number){
    localStorage.setItem("lon", JSON.stringify(lon));
    }

  goToCityWeather(city:any) {
    this.router.navigate(['/cityWeather', city], { replaceUrl: true });
    console.log(localStorage.getItem("lat"));
  }
}
