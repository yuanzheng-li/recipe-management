import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AppState } from 'src/app/store/app.reducer';
import {
  AddIngredients,
  FETCH_INGREDIENTS,
  STORE_INGREDIENTS,
} from './shopping-list.actions';

@Injectable()
export class ShoppingListEffects {
  @Effect()
  fetchIngredients = this.action$.pipe(
    ofType(FETCH_INGREDIENTS),
    switchMap(() => {
      const user = this.dataStorageService.getUserDataInLocalStorage();

      if (!user) {
        this.router.navigate(['/auth']);
      }

      return this.http.get<Ingredient[]>(
        `https://recipe-book-e1b99-default-rtdb.firebaseio.com/${user?.id}/ingredients.json`
      );
    }),
    map((ingredients) => {
      if (!ingredients) {
        return [];
      }

      return new AddIngredients(ingredients);
    })
  );

  @Effect({
    dispatch: false,
  })
  storeIngredients = this.action$.pipe(
    ofType(STORE_INGREDIENTS),
    withLatestFrom(this.store.select('shoppingList')),
    switchMap(([actionData, shoppingListState]) => {
      const user = this.dataStorageService.getUserDataInLocalStorage();

      if (!user) {
        this.router.navigate(['/auth']);
      }

      return this.http.put(
        `https://recipe-book-e1b99-default-rtdb.firebaseio.com/${user?.id}/ingredients.json`,
        shoppingListState.ingredients
      );
    })
  );

  constructor(
    private action$: Actions,
    private dataStorageService: DataStorageService,
    private router: Router,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
}
