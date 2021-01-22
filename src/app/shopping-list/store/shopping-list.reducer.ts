import { Ingredient } from 'src/app/shared/ingredient.model';
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  ShoppingListActions,
} from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
}

const initialState: State = {
  ingredients: [],
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients
          ? [...state.ingredients, action.payload]
          : [action.payload],
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: state.ingredients
          ? [...state.ingredients, ...action.payload]
          : [...action.payload],
      };
    default:
      return state;
  }
}
