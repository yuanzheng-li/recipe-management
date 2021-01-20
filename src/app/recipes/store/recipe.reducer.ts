import { Recipe } from '../recipe.model';
import { GET_RECIPES, RecipeActions } from './recipe.actions';

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
    case GET_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, ...action.payload],
      };
    default:
      return state;
  }
}
