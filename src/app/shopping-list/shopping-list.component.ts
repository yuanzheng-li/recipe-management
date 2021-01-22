import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ingredient } from '../shared/ingredient.model';
import { AppState } from '../store/app.reducer';
import { EditStart } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  ingredientsSubscription!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ingredientsSubscription = this.store
      .select('shoppingList')
      .pipe(map((shoppingListState) => shoppingListState.ingredients))
      .subscribe((ingredients) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
  }

  onIngredientEdit(index: number) {
    this.store.dispatch(new EditStart(index));
  }
}
