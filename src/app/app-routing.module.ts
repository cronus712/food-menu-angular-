import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FoodItemComponent } from './components/food-item/food-item.component';
import { FoodItemDetailComponent } from './components/food-item-detail/food-item-detail.component';



const routes : Routes = [
{path:'', component: HomeComponent, pathMatch: 'full'},
{ path: 'food-item/:id', component : FoodItemDetailComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
