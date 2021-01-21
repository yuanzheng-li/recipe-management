import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { AppState } from '../store/app.reducer';
import { Recipe } from "./recipe.model";
import { FetchRecipesAction, SET_RECIPES } from './store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new FetchRecipesAction());
    return this.actions$.pipe(
      ofType(SET_RECIPES),
      take(1)
    );
  }
}
