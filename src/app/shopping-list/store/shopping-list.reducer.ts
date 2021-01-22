import { Ingredient } from 'src/app/shared/ingredient.model';
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  DELETE_INGREDIENTS,
  EDIT_START,
  EDIT_STOP,
  ShoppingListActions,
  UPDATE_INGREDIENT,
} from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  isEditing: boolean;
  editingIndex: number;
}

const initialState: State = {
  ingredients: [],
  isEditing: false,
  editingIndex: -1,
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
    case EDIT_START:
      return {
        ...state,
        isEditing: true,
        editingIndex: action.payload,
      };
    case EDIT_STOP:
      return {
        ...state,
        isEditing: false,
        editingIndex: -1,
      };
    case UPDATE_INGREDIENT:
      const updatedIngredients = [...state.ingredients];
      const newIngredient = {
        ...updatedIngredients[state.editingIndex],
        ...action.payload,
      };
      updatedIngredients[state.editingIndex] = newIngredient;

      return {
        ...state,
        isEditing: false,
        editingIndex: -1,
        ingredients: updatedIngredients,
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        isEditing: false,
        editingIndex: -1,
        ingredients: state.ingredients.filter(
          (ingredient, index) => index !== state.editingIndex
        ),
      };
    case DELETE_INGREDIENTS:
      return {
        ...state,
        ingredients: [],
      };
    default:
      return state;
  }
}
