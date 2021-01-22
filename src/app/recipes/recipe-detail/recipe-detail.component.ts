import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import { DeleteRecipe } from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => params.id),
        switchMap((id) => {
          this.id = parseInt(id);
          return this.store.select('recipes');
        }),
        map((state) => state.recipes)
      )
      .subscribe((recipes) => {
        this.recipe = recipes[this.id];
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onDelete() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['recipes']);
  }
}
