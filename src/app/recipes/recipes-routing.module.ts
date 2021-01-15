import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuardService } from "../auth/auth-guard.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
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
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule {}
