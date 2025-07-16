import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {FavoriteComponent} from './favorite/favourite/favorite.component';
import {WeatherService} from './services/weather.service';
import {NgIf} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchComponent, FavoriteComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected showFavsComponent: boolean | undefined;
  private sub!: Subscription;

  constructor(private weather: WeatherService) {
  }

  ngOnInit(): void {
      this.sub = this.weather.showFavourites$.subscribe(value => {
        this.showFavsComponent = value;
     });
      console.log(this.showFavsComponent)
      const storageItem = localStorage.getItem("favs");
      if(!storageItem){
      localStorage.setItem("favs", JSON.stringify([]));
      }

  }
  protected title = 'WeatherApp';
  // @ts-ignore


}
