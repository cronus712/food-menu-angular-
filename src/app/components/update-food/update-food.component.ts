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
  rating : number = 0;
  // name = new FormControl('');
   name !: string;
   description !: string;
   image !: string ;
   imageFile !: File | null;
   imagePreview: string | null = null;
   favorite : boolean = false;

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

  onImageSelected(event: any) {
    // this.imageFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0]; // Store the selected file
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFile! as Blob);  // Read the file
      reader.onload = () => {
        this.imagePreview = reader.result?.toString() || '';
      };
    } else {
      console.log('here')
      this.imageFile = null; // Clear imageFile and imagePreview
      this.imagePreview = null;
    }
  }

  save() {
    if ( this.imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFile); // Read the image file

      reader.onload = () => {
        // On successful reading
        this.image = reader.result?.toString() || ''; // Extract base64 string
        // const newFoodItem: Food = {
        //   name: this.name,
        //   description: this.description,
        //   image: this.image, // Use the base64 encoded image
        //   rating: this.rating,
        //   favorite: this.favorite
        // };

        this.food.name = this.name;
        this.food.description = this.description;
        this.food.image = this.image;
        this.food.rating = this.rating;
        this.food.favorite = this.favorite;

      };

      reader.onerror = (error) => {
        console.error("Error reading image file:", error);
      };
    }
    this.foodService.updateFood(this.food).subscribe();

      console.log('here')
  }

}
