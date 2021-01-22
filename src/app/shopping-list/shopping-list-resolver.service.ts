import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Ingredient } from "../shared/ingredient.model";
import { AppState } from '../store/app.reducer';
import { ADD_INGREDIENTS, FetchIngredients } from './store/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListResolver implements Resolve<Ingredient[]> {
  constructor(private store: Store<AppState>,
    private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('shoppingList').pipe(
      take(1),
      map((shoppingListState) => shoppingListState.ingredients),
      switchMap((ingredients) => {
        if (ingredients.length > 0) {
          return of(ingredients);
        } else {
          this.store.dispatch(new FetchIngredients());
          
          return this.actions$.pipe(
            ofType(ADD_INGREDIENTS),
            take(1)
          );
        }
      })
    );
  }
}
