import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SearchComponent} from './search/search.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  ngOnInit(): void {
      const storageItem = localStorage.getItem("favs");
      if(!storageItem){
      localStorage.setItem("favs", JSON.stringify([]));
      }
  }
  protected title = 'WeatherApp';


}
