import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { FETCH_RECIPES, SetRecipes, STORE_RECIPES } from './recipe.actions';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { AppState } from 'src/app/store/app.reducer';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(FETCH_RECIPES),
    switchMap(() => {
      const user = this.dataStorageService.getUserDataInLocalStorage();

      if (!user) {
        this.router.navigate(['/auth']);
      }

      return this.http.get<Recipe[]>(
        `https://recipe-book-e1b99-default-rtdb.firebaseio.com/${user?.id}/recipes.json`
      );
    }),
    map((recipes) => {
      if (!recipes) {
        return [];
      }
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients || [],
        };
      });
    }),
    map((recipes) => {
      return new SetRecipes(recipes);
    })
  );

  @Effect({
    dispatch: false
  })
  storeRecipes = this.actions$.pipe(
    ofType(STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      const user = this.dataStorageService.getUserDataInLocalStorage();

      if (!user) {
        this.router.navigate(['/auth']);
      }

      return this.http.put(
        `https://recipe-book-e1b99-default-rtdb.firebaseio.com/${user?.id}/recipes.json`,
        recipesState.recipes
      );
    })
  )

  constructor(
    private actions$: Actions,
    private dataStorageService: DataStorageService,
    private router: Router,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
}
