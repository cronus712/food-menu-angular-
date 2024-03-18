import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/food';
import { FoodService } from 'src/app/services/food-service.service';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.css']
})
export class UpdateFoodComponent {

  @Input() food !: Food;
  stars!: number[]
  faStar = faStar;
  faHeart = faHeart;

  constructor(private foodService : FoodService, private route : ActivatedRoute) {}

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

}
