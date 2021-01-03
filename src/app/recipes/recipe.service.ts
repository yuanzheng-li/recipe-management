import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Kungpao Chicken',
      'This is kungpao chicken',
      'https://www.onceuponachef.com/images/2018/05/Kung-Pao-Chicken-16-scaled.jpg',
      [new Ingredient('Chicken', 1), new Ingredient('Cucumber', 1)]
    ),
    new Recipe(
      'Frog Dry pot',
      'This is frog dry pot',
      'https://cdn2.lamag.com/wp-content/uploads/sites/6/2013/09/frogcasserole.jpg',
      [
        new Ingredient('Frog', 1),
        new Ingredient('Celery', 1)
      ]
    ),
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  getRecipes() {
    return [...this.recipes];
  }
}
