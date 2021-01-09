import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  form!: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params.id);
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  initForm(): void {
    const recipe = this.recipeService.getRecipeByIndex(this.id);
    let name = '';
    let description = '';
    let imagePath = '';
    let ingredients = new FormArray([]);

    if(this.editMode) {
      name = recipe.name;
      description = recipe.description;
      imagePath = recipe.imagePath;
      if(recipe.ingredients) {
        recipe.ingredients.forEach((ingredient) => {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        });
      }
    }

    this.form = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients: ingredients,
    });
  }

  onSubmit() {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.form.value);
    } else {
      this.recipeService.addRecipe(this.form.value);
    }
    this.onCancel();
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['recipes']);
  }

  onIngredientDelete(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  onIngredientAdd() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  get ingredientControls() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }
}
