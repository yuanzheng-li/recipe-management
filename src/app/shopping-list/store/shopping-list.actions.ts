import { Action } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const FETCH_INGREDIENTS = '[Shopping List] Fetch Ingredients';
export const STORE_INGREDIENTS = '[Shopping List] Store Ingredients';
export const EDIT_START = '[Shopping List] Edit Start';
export const EDIT_STOP = '[Shopping List] Edit Stop';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const DELETE_INGREDIENTS = '[Shopping List] Delete Ingredients';

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

export class EditStart implements Action {
  readonly type = EDIT_START;

  constructor(public payload: number) {}
}

export class EditStop implements Action {
  readonly type = EDIT_STOP;
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class DeleteIngredients implements Action {
  readonly type = DELETE_INGREDIENTS;
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | FetchIngredients
  | StoreIngredients
  | EditStart
  | EditStop
  | UpdateIngredient
  | DeleteIngredient
  | DeleteIngredients;
