import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Food } from 'src/app/food';
import { FoodService } from 'src/app/services/food-service.service';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent {

 @Input() food !: Food;
 @Output() onDeleteTask : EventEmitter<Food> = new EventEmitter()
 @Output() onFoodDetails = new EventEmitter<Food>();
 @Output() onLikeFood : EventEmitter<Food> = new EventEmitter()
 faStar = faStar;
 faHeart = faHeart;
 stars!: number[]

  gotoDetails(food: Food) {
    this.onFoodDetails.emit(food)
  }

  ngOnInit() {
    this.stars = Array(this.food.rating).fill(0); // Create array with length of rating
  }

  constructor() {}

  onDelete(food : Food) {
    this.onDeleteTask.emit(food);
    console.log('delete')
  }
  toggleFavorite() {
    this.onLikeFood.emit()
  }
}
