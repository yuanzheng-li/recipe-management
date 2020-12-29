import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Beef', 1),
    new Ingredient('Potato', 1),
  ];

  constructor() {}

  ngOnInit(): void {}

  onIngredientAdd(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
