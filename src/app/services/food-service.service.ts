import { Injectable } from '@angular/core';
import { Food } from '../food';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  baseUrl = 'http://localhost:3000/food'
  constructor(private http : HttpClient) { }

  getAllFood() : Observable<Food[]> {
   return this.http.get<Food[]>(this.baseUrl);
  }

}
