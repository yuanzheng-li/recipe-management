import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Kungpao Chicken',
      'This is kungpao chicken',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872'
    ),
    new Recipe(
      'Mushroom Chicken',
      'This is mushroom chicken',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872'
    ),
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  getRecipes() {
    return [...this.recipes];
  }
}
