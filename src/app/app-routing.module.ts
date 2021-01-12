import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListResolver } from './shopping-list/shopping-list-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/recipes',
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: [RecipesResolverService],
  },
  {
    path: 'recipes/new',
    component: RecipeEditComponent,
  },
  {
    path: 'recipes/:id',
    component: RecipeDetailComponent,
    resolve: [RecipesResolverService],
  },
  {
    path: 'recipes/:id/edit',
    component: RecipeEditComponent,
    resolve: [RecipesResolverService],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    resolve: [ShoppingListResolver]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
