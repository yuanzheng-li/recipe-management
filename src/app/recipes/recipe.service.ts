import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanges = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  getRecipes() {
    return [...this.recipes];
  }

  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanges.next([...this.recipes]);
  }

  addRecipes(recipes: Recipe[]) {
    this.recipes.push(...recipes);
    this.recipeChanges.next([...this.recipes]);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanges.next([...this.recipes]);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanges.next([...this.recipes]);
  }
}
