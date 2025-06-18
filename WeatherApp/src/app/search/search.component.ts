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

  searchValue: any;
  data: any[] = [];
  latitude: any;
  longitude: any;
  showResults: boolean = false;

  constructor(protected weatherService: WeatherService) {
  }

  search(city:any){
    this.weatherService.getInfo(city).subscribe({
      next: (data) => {
        this.data = data;
        this.showResults = true;
        console.log(this.data);
      }
    })
  }
}
