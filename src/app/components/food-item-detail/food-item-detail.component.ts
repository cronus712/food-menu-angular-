import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/food';
import { FoodService } from 'src/app/services/food-service.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-food-item-detail',
  templateUrl: './food-item-detail.component.html',
  styleUrls: ['./food-item-detail.component.css']
})
export class FoodItemDetailComponent {
  //  @Output() onGetFoodItem : EventEmitter<Food> = new EventEmitter();
   @Input() food !: Food;
   stars!: number[]
   faStar = faStar;

  constructor(private foodService : FoodService, private route: ActivatedRoute, private location : Location) {}

  ngOnInit():void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.foodService.getFoodItem(id).subscribe(food => {
        this.food = food;
        this.stars = Array(food.rating).fill(0);
      });
    });
    console.log("food data:", this.food);
  }
  // getFood():void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.foodService.getFoodItem(id).subscribe((food) => this.food = food);
  // }

}
