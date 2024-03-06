import { Injectable } from '@angular/core';
import { Food } from '../food';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

     httpOptions = {
     Headers : new HttpHeaders ({'Content-type' : 'application/json' }),
};

  baseUrl = 'http://localhost:3000/food'
  constructor(private http : HttpClient) { }

  getAllFood() : Observable<Food[]> {
   return this.http.get<Food[]>(this.baseUrl);
  }

  deleteFoodItem(food : Food) : Observable<Food> {
   const url = `${this.baseUrl}/${food.id}`;
   return this.http.delete<Food>(url);
  }

  addFoodItem(food : Food) : Observable<Food> {
    return this.http.post<Food>(this.baseUrl, food)
  }

  getFoodItem(id : number) : Observable<Food> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Food>(url);
  }

  //to do
  //update task item && and like button in food item
}
