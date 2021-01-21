import { Recipe } from '../recipe.model';
import { SET_RECIPES, RecipeActions } from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState = {
  recipes: [],
};

export function recipeReducer(
  state: State = initialState,
  action: RecipeActions
) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, ...action.payload],
      };
    default:
      return state;
  }
}
