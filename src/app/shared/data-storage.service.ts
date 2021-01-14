import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "./ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-e1b99-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe((res) => {
      console.log(res);
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-e1b99-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients || [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.addRecipes(recipes);
        })
      );
  }

  storeShoppingList() {
    const ingredients = this.shoppingListService.getIngredients();
    this.http.put(
      'https://recipe-book-e1b99-default-rtdb.firebaseio.com/ingredients.json',
      ingredients
    ).subscribe((res) => {
      console.log(res);
    });
  }

  fetchShoppingList() {
    return this.http.get<Ingredient[]>(
      'https://recipe-book-e1b99-default-rtdb.firebaseio.com/ingredients.json'
    ).pipe(tap((ingredients) => {
      this.shoppingListService.addIngredients(ingredients);
    }));
  }
}
