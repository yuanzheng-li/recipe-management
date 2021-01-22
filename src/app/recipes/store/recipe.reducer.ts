import { Recipe } from '../recipe.model';
import {
  SET_RECIPES,
  RecipeActions,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  DELETE_RECIPES,
} from './recipe.actions';

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
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case UPDATE_RECIPE:
      const updatedRecipes = [...state.recipes];
      const updatedRecipe = {
        ...updatedRecipes[action.payload.index],
        ...action.payload.newRecipe,
      };

      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes,
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, idx) => idx !== action.payload),
      };
    case DELETE_RECIPES:
      return {
        ...state,
        recipes: [],
      };
    default:
      return state;
  }
}
