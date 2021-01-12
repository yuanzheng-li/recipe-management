import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanges = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Kungpao Chicken',
  //     'This is kungpao chicken',
  //     'https://www.onceuponachef.com/images/2018/05/Kung-Pao-Chicken-16-scaled.jpg',
  //     [new Ingredient('Chicken', 1), new Ingredient('Cucumber', 1)]
  //   ),
  //   new Recipe(
  //     'Frog Dry pot',
  //     'This is frog dry pot',
  //     'https://cdn2.lamag.com/wp-content/uploads/sites/6/2013/09/frogcasserole.jpg',
  //     [new Ingredient('Frog', 1), new Ingredient('Celery', 1)]
  //   ),
  // ];
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
