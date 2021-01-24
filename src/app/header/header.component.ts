import { Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSubscription!: Subscription;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.userSubscription = this.store.select('auth').subscribe((authState) => {
      this.isAuthenticated = !!authState.user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
    this.store.dispatch(new ShoppingListActions.StoreIngredients());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
    this.store.dispatch(new ShoppingListActions.FetchIngredients());
  }
}
