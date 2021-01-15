import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListResolver } from './shopping-list/shopping-list-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

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
    canActivate: [AuthGuardService],
  },
  {
    path: 'recipes/new',
    component: RecipeEditComponent,
    resolve: [RecipesResolverService],
    canActivate: [AuthGuardService],
  },
  {
    path: 'recipes/:id',
    component: RecipeDetailComponent,
    resolve: [RecipesResolverService],
    canActivate: [AuthGuardService],
  },
  {
    path: 'recipes/:id/edit',
    component: RecipeEditComponent,
    resolve: [RecipesResolverService],
    canActivate: [AuthGuardService],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    resolve: [ShoppingListResolver],
    canActivate: [AuthGuardService],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
