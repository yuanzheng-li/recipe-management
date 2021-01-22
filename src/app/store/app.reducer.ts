import { ActionReducerMap } from '@ngrx/store';

import * as fromRecipes from '../recipes/store/recipe.reducer';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import { AppActions } from './app.actions';

export interface AppState {
  recipes: fromRecipes.State;
  shoppingList: fromShoppingList.State;
}

export const appReducer: ActionReducerMap<AppState, AppActions> = {
  recipes: fromRecipes.recipeReducer,
  shoppingList: fromShoppingList.shoppingListReducer,
};
