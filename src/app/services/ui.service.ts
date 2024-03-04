import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddFood : boolean = false;
  private subject = new Subject;

  constructor() { }

  toggleAddFood() : void {
    this.showAddFood = !this.showAddFood;
    this.subject.next(this.showAddFood);
  }

  onToggle() : Observable<any> {
    return this.subject.asObservable();
  }

}
