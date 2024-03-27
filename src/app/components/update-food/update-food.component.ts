import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/food';
import { FoodService } from 'src/app/services/food-service.service';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; // Import ReactiveFormsModule
@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.css']
})
export class UpdateFoodComponent {

  @Input() food !: Food;
  stars!: number[]
  starss = [1, 2, 3, 4, 5];
  faStar = faStar;
  faHeart = faHeart;
  // rating : number = 0;
  // name = new FormControl('');

  constructor(private foodService : FoodService, private route : ActivatedRoute, private fb : FormBuilder) {}

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

  rate(rating: number) {
    this.food.rating = rating;
  }

  toggleFavorite() {
    this.food.favorite = !this.food.favorite;
  }

}
