import { Injectable } from '@angular/core';
import { Food } from '../food';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
import { FoodService } from './food-service.service';
type ResolveFoodFn = () => Promise<Food> | Observable<Food>; // Define type for resolve function

@Injectable({
  providedIn: 'root'
})
export class FoodResolverService {
  constructor(private foodService : FoodService) { }

    resolve(route: ActivatedRouteSnapshot): ResolveFoodFn {
    const id = Number(route.paramMap.get('id'));
    return () => this.foodService.getFoodItem(id); 
  }
}
