import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe-management';
  selectedSection = 'recipes';

  onNavigation(section: string) {
    this.selectedSection = section;
  }
}
