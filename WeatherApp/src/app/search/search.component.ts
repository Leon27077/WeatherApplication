import { Component } from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  search_value: any;
  data: any[] = [];
  show_results: boolean = false;

  constructor(protected weatherService: WeatherService) {
  }

  search(city:any){
    this.weatherService.getInfo(city).subscribe({
      next: (data) => {
        this.data = data;
        this.show_results = true;
        console.log(this.data);
      }
    })
  }

  setLat(idx:number){
    let latitude = this.data[idx].lat;
    sessionStorage.setItem("lat", String(latitude));
  }

  setLon(idx:number){
    let longitude = this.data[idx].lon;
    sessionStorage.setItem("lon", String(longitude));
  }

  hideResults(){
    this.show_results = false;
  }

}
