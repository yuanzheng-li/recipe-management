import { RecipeActions } from '../recipes/store/recipe.actions';
import { ShoppingListActions } from '../shopping-list/store/shopping-list.actions';

export type AppActions = RecipeActions | ShoppingListActions;
