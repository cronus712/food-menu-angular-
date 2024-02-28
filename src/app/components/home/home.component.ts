import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/food';
import { FoodService } from 'src/app/services/food-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  foods : Food [] = [];

  constructor(private foodService : FoodService) {}

  ngOnInit(): void {
     this.foodService.getAllFood().subscribe((food) => this.foods = food);
  }

}
