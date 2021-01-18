import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanges = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipeByIndex(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeChanges.next([...this.recipes]);
  }

  addRecipes(recipes: Recipe[]): void {
    this.recipes.push(...recipes);
    this.recipeChanges.next([...this.recipes]);
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.recipeChanges.next([...this.recipes]);
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipeChanges.next([...this.recipes]);
  }

  deleteRecipes(): void {
    this.recipes = [];
    this.recipeChanges.next([]);
  }
}
