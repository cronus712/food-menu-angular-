import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Food } from 'src/app/food';
import { UiService } from 'src/app/services/ui.service';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent {
   @Output() onAddFood : EventEmitter<Food> = new EventEmitter();
   name !: string;
   description !: string;
   image !: string ;
   imageFile !: File | null;
   rating : number = 0;
   showAddFood!: boolean;
   subscription !: Subscription;
   faStar = faStar;
   stars = [1, 2, 3, 4, 5];
   imagePreview: string | null = null;
   favorite : boolean = false;
   faHeart = faHeart


   constructor(private uiService : UiService, private cd: ChangeDetectorRef) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddFood = value)
   }

   onImageSelected(event: any) {
    // this.imageFile = event.target.files[0]; Access the selected file
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

  addFood() {
    if (this.name && this.description && this.imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFile); // Read the image file

      reader.onload = () => {
        // On successful reading
        this.image = reader.result?.toString() || ''; // Extract base64 string
        const newFoodItem: Food = {
          name: this.name,
          description: this.description,
          image: this.image, // Use the base64 encoded image
          rating: this.rating,
          favorite: this.favorite
        };

        this.onAddFood.emit(newFoodItem);

        this.name = '';
        this.description = '';
        this.imageFile = null;
        this.image = '';
        this.rating = 0;
        this.favorite = false;
      };

      reader.onerror = (error) => {
        console.error("Error reading image file:", error);
        // Handle error (e.g., display an error message to the user)
      };
    } else {
      console.error("Please fill in all fields.");
    }

    this.showAddFood = false;
  }

  rate(rating: number) {
    this.rating = rating;
  }
  toggleFavorite() {
    this.favorite = !this.favorite;
  }
}
