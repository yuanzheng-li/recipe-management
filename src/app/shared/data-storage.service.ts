import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { User } from '../auth/user.model';
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "./ingredient.model";

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  storeShoppingList() {
    const ingredients = this.shoppingListService.getIngredients();
    const user = this.getUserDataInLocalStorage();

    if (!user) {
      this.router.navigate(['/auth']);
    }

    this.http
      .put(
        `https://recipe-book-e1b99-default-rtdb.firebaseio.com/${user?.id}/ingredients.json`,
        ingredients
      )
      .subscribe();
  }

  fetchShoppingList() {
    const ingredients = this.shoppingListService.getIngredients();
    const user = this.getUserDataInLocalStorage();

    if (!user) {
      this.router.navigate(['/auth']);
    }

    return this.http

      .get<Ingredient[]>(
        `https://recipe-book-e1b99-default-rtdb.firebaseio.com/${user?.id}/ingredients.json`
      )

      .pipe(
        tap((ingredients) => {
          if (ingredients) {
            this.shoppingListService.addIngredients(ingredients);
          }
        })
      );
  }

  getUserDataInLocalStorage(): User | null {
    const userStr = localStorage.getItem('userData');

    if (!userStr) {
      return null;
    }

    return JSON.parse(userStr);
  }
}
