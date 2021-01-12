import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListResolver implements Resolve<Ingredient[]> {
  constructor(private dataStorageService: DataStorageService,
    private shoppingListService: ShoppingListService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const ingredients = this.shoppingListService.getIngredients();

    if(ingredients.length > 0) {
      return ingredients;
    } else {
      return this.dataStorageService.fetchShoppingList();
    }
  }
}
