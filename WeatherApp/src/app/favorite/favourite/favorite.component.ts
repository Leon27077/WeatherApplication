import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-favourite',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favourite.component.css'
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

    removeFromFavourites(lat:number, lon:number){
      let list = JSON.parse(<string>localStorage.getItem("favs"));
      list = list.filter(([x, y]:[number,number]) => !(x === lat && y === lon));
      localStorage.setItem("favs", JSON.stringify(list));
      console.log(JSON.parse(<string>localStorage.getItem("favs")));
      this.data = this.data.filter(([name, country, [x, y]]) => !(x === lat && y === lon));
    }


    setLat(lat:number){
    sessionStorage.setItem("lat", JSON.stringify(lat));
    }

    setLon(lon:number){
    sessionStorage.setItem("lon", JSON.stringify(lon));
    }

  goToCityWeather(city:any) {
    this.router.navigate(['/cityWeather', city], { replaceUrl: true });
    console.log(localStorage.getItem("lat"));
  }
}
