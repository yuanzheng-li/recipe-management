import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

import { User } from '../auth/user.model';
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { GetRecipesAction } from '../recipes/store/recipe.actions';
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { AppState } from '../store/app.reducer';
import { Ingredient } from "./ingredient.model";

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    const user = this.getUserDataInLocalStorage();

    if (!user) {
      this.router.navigate(['/auth']);
    }

    this.http
      .put(
        `https://recipe-book-e1b99-default-rtdb.firebaseio.com/${user?.id}/recipes.json`,
        recipes
      )
      .subscribe();
  }

  fetchRecipes() {
    const user = this.getUserDataInLocalStorage();

    if (!user) {
      this.router.navigate(['/auth']);
    }

    return this.http
      .get<Recipe[]>(
        `https://recipe-book-e1b99-default-rtdb.firebaseio.com/${user?.id}/recipes.json`
      )
      .pipe(
        map((recipes) => {
          if (!recipes) {
            return [];
          }
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients || [],
            };
          });
        }),
        tap((recipes) => {
          this.store.dispatch(new GetRecipesAction(recipes));
        })
      );
  }

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

  private getUserDataInLocalStorage(): User | null {
    const userStr = localStorage.getItem('userData');

    if (!userStr) {
      return null;
    }

    return JSON.parse(userStr);
  }
}
