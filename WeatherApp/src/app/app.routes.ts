import { Routes } from '@angular/router';
import {CityWeatherComponent} from './city-weather/city-weather.component';
import {FavoriteComponent} from './favorite/favourite/favorite.component';

export const routes: Routes = [
  { path:'cityWeather/:name', component:CityWeatherComponent},
  { path:'favorites', component:FavoriteComponent}
];
