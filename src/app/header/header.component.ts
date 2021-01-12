import { Component} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  name: string = 'Recipe Management';

  constructor(private dataStorageService: DataStorageService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
    this.dataStorageService.storeShoppingList();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
    this.dataStorageService.fetchShoppingList().subscribe();
  }
}
