import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Food } from 'src/app/food';
import { FoodService } from 'src/app/services/food-service.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent {

 @Input() food !: Food;
 @Output() onDeleteTask : EventEmitter<Food> = new EventEmitter()

  constructor() {}

  onDelete(food : Food) {
    this.onDeleteTask.emit(food);
    console.log('delete')
  }

}
