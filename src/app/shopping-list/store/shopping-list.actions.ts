import { Action } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const FETCH_INGREDIENTS = '[Shopping List] FETCH_INGREDIENTS';
export const STORE_INGREDIENTS = '[Shopping List] STORE_INGREDIENTS';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class FetchIngredients implements Action {
  readonly type = FETCH_INGREDIENTS;
}

export class StoreIngredients implements Action {
  readonly type = STORE_INGREDIENTS;
}

export type ShoppingListActions = AddIngredient | AddIngredients | FetchIngredients | StoreIngredients;
