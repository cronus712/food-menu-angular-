import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from 'src/app/food';
import { FoodService } from 'src/app/services/food-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  foods : Food [] = [];
  food !: Food;
  constructor(private foodService : FoodService) {}

  ngOnInit(): void {
     this.foodService.getAllFood().subscribe((food) => this.foods = food);
  }

  onDelete(food : Food) {
    this.foodService.deleteFoodItem(food).subscribe(
      () => (this.foods = this.foods.filter((f) => f.id !== food.id))
      )
  }

  AddFood(food : Food) {
    this.foodService.addFoodItem(food).subscribe(
      (food) =>this.foods.push(food)
    )
  }

  onToggleLike(food : Food ) {
    food.favorite = !food.favorite
    this.foodService.updateFavorite(food).subscribe();
    console.log(food.favorite)
  }

  // getFood(food : Food) {
  //   this.foodService.getFoodItem(food).subscribe((food) => this.food = food);
  //   console.log('here')
  // }
}
