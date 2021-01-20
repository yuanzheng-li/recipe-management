import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const GET_RECIPES = '[Recipes] Get Recipes';

export class GetRecipesAction implements Action {
  readonly type = GET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export type RecipeActions = GetRecipesAction;
