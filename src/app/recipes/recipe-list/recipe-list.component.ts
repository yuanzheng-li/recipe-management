import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Kungpao Chicken', 'This is kungpao chicken', ''),
    new Recipe('Mushroom Chicken', 'This is mushroom chicken', '')
  ];

  constructor() {}

  ngOnInit(): void {}
}
