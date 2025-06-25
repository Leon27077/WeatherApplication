import { Component } from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NgClass
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

  isFavourite(lat:number, lon:number):boolean{
    let list = JSON.parse(<string>localStorage.getItem("favs"));
    if(list.find((e: [number,number]) => e[0] == lat && e[1] == lon)){
      return true;
    }
    return false;
  }

  addToFavorites(lat:number, lon:number){
    let list = JSON.parse(<string>localStorage.getItem("favs"));
    if(this.isFavourite(lat, lon)){
      console.log("!")
      list = list.filter(([x, y]:[number,number]) => !(x === lat && y === lon));
      localStorage.setItem("favs", JSON.stringify(list));
      console.log(JSON.parse(<string>localStorage.getItem("favs")));
    }
    else{
    list.push([lat,lon]);
    localStorage.setItem("favs", JSON.stringify(list));
    console.log(JSON.parse(<string>localStorage.getItem("favs")));
    }


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
