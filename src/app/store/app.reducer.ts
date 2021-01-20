import { ActionReducerMap } from '@ngrx/store';

import * as fromRecipes from '../recipes/store/recipe.reducer';
import { AppActions } from './app.actions';

export interface AppState {
  recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState, AppActions> = {
  recipes: fromRecipes.recipeReducer,
};
