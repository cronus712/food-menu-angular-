import { Component, EventEmitter, Output } from '@angular/core';
import { Food } from 'src/app/food';

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
   rating !: number;

   onImageSelected(event: any) {
    this.imageFile = event.target.files[0]; // Access the selected file
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
          rating: this.rating
        };

        this.onAddFood.emit(newFoodItem);

        this.name = '';
        this.description = '';
        this.imageFile = null;
        this.image = '';
        this.rating = 0;
      };

      reader.onerror = (error) => {
        console.error("Error reading image file:", error);
        // Handle error (e.g., display an error message to the user)
      };
    } else {
      console.error("Please fill in all fields.");
    }
  }


}
