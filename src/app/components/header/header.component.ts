import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showAddFood : boolean = false;
  subscription !: Subscription;

  constructor(private uiService : UiService, private route:Router) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddFood = value);
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onToggleShow() : void {
    this.uiService.toggleAddFood();
  }

  hasRoute(route : string) {
    return this.route.url === route;
  }

}
